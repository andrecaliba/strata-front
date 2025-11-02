"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Timer, Bell, DoorOpen, Clock, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import QuotePic from "@/assets/quote-pic.png";
import Image from "next/image";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import CodeCheck from "@/components/custom/modal/CodeCheck";
import {
  useSyncTime,
  useStartBreak,
  useTimeOut,
  useTimeIn,
  useEndBreak,
  useGetAttendances,
} from "@/hooks/use-work";
import { useGenerateVerification } from "@/hooks/use-code";
import { useGetAllUsers, useGetUser } from "@/hooks/use-user";
import { useGetAllTasks, useToggleSubtask } from "@/hooks/use-task";
import { Attendance, Subtask, Task, User } from "@/types/dataInterface";
import { useRouter } from "next/router";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const { data: tasks = [], isLoading: isTasksLoading } = useGetAllTasks();
  const { data: attendances = [], isLoading: isAttendancesLoading } =
    useGetAttendances();
  const { data: people = [], isLoading: isPeopleLoading } = useGetAllUsers();

  const generateVerificationMutation = useGenerateVerification();
  const [localWorkTime, setLocalWorkTime] = useState(0);
  const [localBreakTime, setLocalBreakTime] = useState(0);
  const { data: workData, isLoading } = useSyncTime();
  const startBreakMutation = useStartBreak();
  const endBreakMutation = useEndBreak();
  const timeInMutation = useTimeIn();
  const timeOutMutation = useTimeOut();
  // Attendance States
  const isOnBreak = workData?.attendance?.status === "Taking a Break";
  const isWorking = workData?.attendance?.status === "Active";
  const hasBreakTime = (workData?.attendance?.remaining_break ?? 0) > 0;
  const isCompleted = workData?.attendance?.status === "Completed";
  const hasNoAttendance = !workData?.attendance;
  const { mutate: toggleSubtask } = useToggleSubtask();
  // const chartData = [
  //   { day: "Oct 1", hours: 0 },
  //   { day: "Oct 2", hours: 1 },
  //   { day: "Oct 3", hours: 2 },
  //   { day: "Oct 4", hours: 3 },
  //   { day: "Oct 5", hours: 4 },
  //   { day: "Oct 6", hours: 5 },
  //   { day: "Oct 7", hours: 6 },
  //   { day: "Oct 8", hours: 0 },
  //   { day: "Oct 9", hours: 1 },
  //   { day: "Oct 10", hours: 2 },
  //   { day: "Oct 11", hours: 3 },
  //   { day: "Oct 12", hours: 4 },
  //   { day: "Oct 13", hours: 5 },
  //   { day: "Oct 14", hours: 6 },
  //   { day: "Oct 15", hours: 0 },
  //   { day: "Oct 16", hours: 1 },
  //   { day: "Oct 17", hours: 2 },
  //   { day: "Oct 18", hours: 3 },
  //   { day: "Oct 19", hours: 4 },
  //   { day: "Oct 20", hours: 5 },
  //   { day: "Oct 21", hours: 6 },
  // ];
  const chartConfig = {
    hours: {
      label: "Hours",
      color: "#455eee",
    },
  } satisfies ChartConfig;

  // Chart Data for Attendances of Last 21 Days
  const chartData = useMemo(() => {
    const data = [];
    const today = new Date();
    console.log("Attendances:", attendances);
    for (let i = 20; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      // Use local date string for comparison
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${day}`;

      // Find attendance for this date
      const attendance = attendances.find((attendance: Attendance) => {
        const attendanceDate = new Date(attendance.date)
          .toISOString()
          .split("T")[0];
        return attendanceDate === dateString;
      });

      data.push({
        day: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        hours: attendance
          ? Math.round((attendance.time_total / 3600) * 10) / 10
          : 0, // Convert seconds to hours with 1 decimal
      });
    }
    return data;
  }, [attendances]);

  // Get today's task (first task with due date today)
  const todayTask = useMemo(() => {
    if (!tasks || tasks.length === 0) return null;

    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    return (
      tasks.find((task: Task) => {
        const taskDate = new Date(task.due_date);
        const taskDateString = `${taskDate.getFullYear()}-${String(
          taskDate.getMonth() + 1
        ).padStart(2, "0")}-${String(taskDate.getDate()).padStart(2, "0")}`;
        return taskDateString === todayString;
      }) || null
    );
  }, [tasks]);

  // For updating local time counters
  useEffect(() => {
    if (workData?.attendance) {
      setLocalWorkTime(workData.attendance.time_total);
      setLocalBreakTime(workData.attendance.remaining_break);
    } else {
      setLocalWorkTime(0);
      setLocalBreakTime(0);
    }
  }, [workData]);

  // Client-side time tracking
  useEffect(() => {
    const interval = setInterval(() => {
      if (!workData?.attendance || workData.attendance.status === "Completed") {
        return;
      }

      const { status, last_sync_at, time_in, break_started_at } =
        workData.attendance;
      const now = new Date().getTime();
      const lastSync = last_sync_at
        ? new Date(last_sync_at).getTime()
        : new Date(time_in).getTime();
      const elapsedSinceSync = Math.floor((now - lastSync) / 1000);

      if (status === "Active") {
        // Increment work time by elapsed time since last sync
        setLocalWorkTime(workData.attendance.time_total + elapsedSinceSync);
      } else if (status === "Taking a Break" && break_started_at) {
        // Decrement break time since break started
        const breakElapsed = Math.floor(
          (now - new Date(break_started_at).getTime()) / 1000
        );
        const remainingBreak =
          workData.attendance.remaining_break - breakElapsed;
        setLocalBreakTime(Math.max(0, remainingBreak));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    workData?.attendance,
    workData?.attendance?.status,
    workData?.attendance?.time_total,
    workData?.attendance?.remaining_break,
    workData?.attendance?.last_sync_at,
  ]);
  const getDifficultyColor = (difficulty: string) =>
    ({
      Easy: "text-[#219653]",
      Moderate: "text-[#F2994A]",
      Hard: "text-[#EB5757]",
    }[difficulty] || "text-[#828282]");

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")} Hr ${mins
      .toString()
      .padStart(2, "0")} Mins ${secs.toString().padStart(2, "0")} Secs`;
  };

  const handleBreakToggle = async () => {
    if (isOnBreak) {
      await endBreakMutation.mutateAsync();
    } else if (isWorking && hasBreakTime) {
      await startBreakMutation.mutateAsync();
    }
  };

  const handleTimeToggle = async () => {
    if (isWorking || isOnBreak) {
      await timeOutMutation.mutateAsync();
    } else if (!isCompleted) {
      await timeInMutation.mutateAsync();
    }
  };

  const handleManualVerification = async () => {
    await generateVerificationMutation.mutateAsync();
  };

  const handleToggleSubtask = (subtaskId: string, currentStatus: boolean) => {
    toggleSubtask({
      subtaskId,
      completed: !currentStatus, // Toggle the current status
    });
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case "Active":
        return "text-green-600";
      case "Completed":
        return "text-green-600";
      case "Flagged":
        return "text-red-600";
      case "Taking a Break":
        return "text-yellow-200";
      default:
        return "";
    }
  };

  return (
    <div className="p-4 w-full overflow-y-auto">
      <CodeCheck isOpen={false} />
      <Card>
        <CardContent className="flex">
          <Input type="search" className="w-80" placeholder="Search" />
          <div className="flex ml-auto">
            {/* Demo Button - Only for Presentation Purposes */}
            {isWorking && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleManualVerification}
                disabled={generateVerificationMutation.isPending}
                className="mr-3 flex items-center gap-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white"
              >
                {generateVerificationMutation.isPending
                  ? "Generating..."
                  : "Demo: Trigger Verification"}
              </Button>
            )}
            <Bell className="w-6 h-6" />
            <div className="ml-2 bg-blue-300 rounded-full w-8 h-8"></div>
            <div className="ml-2">
              <p className="font-semibold text-xs">
                {isUserLoading
                  ? "Loading..."
                  : user
                  ? `${user.first_name} ${user.last_name}`.trim()
                  : "Unknown User"}
              </p>
              <p className="text-xs">
                {isUserLoading
                  ? "Loading..."
                  : user
                  ? user.role
                  : "Unspecified Role"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardContent className="flex gap-4">
          <div className="flex flex-col gap-4">
            <Card className="gap-0 border-blue-100 border-2">
              <CardHeader className="text-primary-dark">
                Total Working Hours
              </CardHeader>
              <CardContent className="text-primary-dark font-bold text-3xl">
                {isLoading ? "Loading..." : formatTime(localWorkTime)}
              </CardContent>
            </Card>
            <Card className="gap-0 border-blue-100 border-2">
              <CardHeader className="text-primary-dark">
                Remaining Break Time
              </CardHeader>
              <CardContent className="text-primary-dark font-bold text-3xl">
                {isLoading ? "Loading..." : formatTime(localBreakTime)}
              </CardContent>
            </Card>
            <Card className="gap-0 border-blue-100 border-2">
              <CardContent className="flex">
                <Timer className="w-8 h-8" color="#455eee" />
                <Button
                  className="ml-2 flex-1 bg-primary-blue cursor-pointer"
                  onClick={handleBreakToggle}
                  disabled={
                    hasNoAttendance ||
                    isCompleted ||
                    (!isWorking && !isOnBreak) ||
                    (!hasBreakTime && !isOnBreak) ||
                    startBreakMutation.isPending ||
                    endBreakMutation.isPending
                  }
                >
                  {isCompleted
                    ? "Work Complete"
                    : isOnBreak
                    ? "End Break"
                    : "Start Break"}
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col gap-4">
            <Card className="flex-1 border-blue-100 border-2">
              <CardContent className="flex justify-center items-center">
                <span className="text-xl text-primary-blue font-semibold">
                  &quot;It&apos;s not the hours you put in your work
                  <br />
                  that counts, it&apos;s the work you put in the <br />
                  hours. &quot; -Sam Ewing
                </span>
              </CardContent>
            </Card>
            <Card className="gap-0 border-blue-100 border-2">
              <CardContent className="flex">
                <DoorOpen
                  className="w-8 h-8"
                  color={isWorking || isOnBreak ? "#f04d23" : "#455eee"}
                />
                <Button
                  className={`ml-2 flex-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                    isWorking || isOnBreak ? "bg-time-out" : "bg-primary-blue"
                  }`}
                  onClick={handleTimeToggle}
                  disabled={
                    isCompleted ||
                    timeInMutation.isPending ||
                    timeOutMutation.isPending
                  }
                >
                  {isCompleted
                    ? "Completed Today"
                    : isWorking || isOnBreak
                    ? "Time Out"
                    : "Time In"}
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1">
            <Card className="flex items-center border-blue-100 border-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-lg border"
              />
            </Card>
          </div>
        </CardContent>
      </Card>
      <div className="flex mt-4 gap-4">
        <div className="w-96">
          <Card>
            <CardHeader className="font-semibold">Task Today</CardHeader>
            <CardContent>
              {isTasksLoading ? (
                <div className="flex items-center justify-center h-40">
                  <p className="text-muted-foreground">Loading task...</p>
                </div>
              ) : todayTask ? (
                <>
                  <div>
                    <h5 className="font-semibold">{todayTask.title}</h5>
                    <h6 className="text-xs">{todayTask.category}</h6>
                  </div>
                  <div className="mt-4 mb-2">
                    <div className="flex">
                      <h5>Progress</h5>
                      <h5 className="ml-auto">{todayTask.progress}%</h5>
                    </div>
                  </div>
                  <Slider
                    defaultValue={[todayTask.progress]}
                    max={100}
                    disabled
                  />
                  <div className="flex mt-4 mb-6">
                    <Clock />
                    <span className="ml-2">Due Today</span>
                  </div>
                  <div className="flex">
                    <h5 className="font-bold">Task Details</h5>
                    <p
                      className={`ml-auto font-light ${getDifficultyColor(
                        todayTask.difficulty
                      )}`}
                    >
                      {todayTask.difficulty}
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      {todayTask.description}
                    </p>
                  </div>
                  <div className="mt-4">
                    {todayTask.subtasks.map((subtask: Subtask) => (
                      <div
                        key={subtask.subtask_id}
                        className="flex items-center mt-4"
                      >
                        <Checkbox checked={subtask.completed}
                        onCheckedChange={() =>
                          handleToggleSubtask(
                            subtask.subtask_id.toString(),
                            subtask.completed
                          )
                        }
                        className="cursor-pointer" />
                        <p
                          className={`text-sm ml-2 ${
                            subtask.completed ? "line-through" : ""
                          }`}
                        >
                          {subtask.title}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex">
                    <Button className="flex-1 bg-primary-blue cursor-pointer" onClick={() => {window.location.href = `/${user?.user_id}/tasks/${todayTask.task_id}`;}}>
                      Go to Details
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-40">
                  <p className="text-muted-foreground">No tasks due today</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div>
          <div className="flex">
            <Card className="h-80 w-[512px]">
              <CardHeader className="gap-0">
                <div className="flex">
                  <h5 className="font-bold">My Tasks</h5>
                  <button className="ml-auto text-xs text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => {window.location.href = `/${user?.user_id}/tasks`;}}>
                    View all
                  </button>
                </div>
              </CardHeader>
              <CardContent className="overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-40">Project</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Assigned To</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task: Task) => (
                      <TableRow key={task.task_id} onClick={() => {window.location.href = `/${user?.user_id}/tasks/${task.task_id}`;}} className="cursor-pointer hover:bg-gray-100">
                        <TableCell className="flex items-center gap-2 pr-4">
                          <div className="flex items-center gap-2 pr-4">
                            <Checkbox />
                            <div>
                              <p className="font-bold">{task.title}</p>
                              <div className="flex items-center">
                                <Progress value={task.progress} />
                                <p className="ml-2">{task.progress}%</p>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div
                              className={`flex items-center ${getDifficultyColor(
                                task.difficulty
                              )}`}
                            >
                              {task.difficulty}
                            </div>
                            <p className="text-gray-400">{task.status}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center -space-x-2">
                            {task.assignees.map((assignee) => (
                              <div
                                key={assignee.user_id}
                                className="w-8 h-8 bg-gray-400 rounded-full text-center text-xs text-white align-middle flex items-center justify-center"
                              >
                                <p> {assignee.first_name.charAt(0)}</p>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="ml-4 w-72 h-96 overflow-y-auto">
              <CardHeader>
                <div className="flex">
                  <h5 className="font-bold">People</h5>
                  <button className="ml-auto text-xs text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => {window.location.href = `/${user?.user_id}/people`;}}>
                    View all
                  </button>
                </div>
              </CardHeader>
              <CardContent className="overflow-y-auto">
                {isPeopleLoading ? (
                  <div className="flex items-center justify-center h-40">
                    <p className="text-muted-foreground">Loading people...</p>
                  </div>
                ) : people.length > 0 ? (
                  people.map((person: User) => (
                    <Card key={person.user_id} className="mb-2">
                      <CardContent>
                        <div className="flex items-center gap-0">
                          <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-white text-xs">
                            {person.first_name?.charAt(0)}
                          </div>
                          <div className="ml-2 flex-1">
                            <p className="text-xs font-semibold">
                              {`${person.first_name} ${person.last_name}`.trim() ||
                                "Unknown"}
                            </p>
                            <p className="text-xs font-light">
                              {person.role || "No Role"}
                            </p>
                          </div>
                          <div className="text-right ml-4">
                            {person.attendances && person.attendances.length > 0
                              ? (() => {
                                  const today = new Date();
                                  const todayString = `${today.getFullYear()}-${String(
                                    today.getMonth() + 1
                                  ).padStart(2, "0")}-${String(
                                    today.getDate()
                                  ).padStart(2, "0")}`;

                                  const todayAttendance =
                                    person.attendances.find(
                                      (att: Attendance) => {
                                        const attDate = new Date(att.date);
                                        const attDateString = `${attDate.getFullYear()}-${String(
                                          attDate.getMonth() + 1
                                        ).padStart(2, "0")}-${String(
                                          attDate.getDate()
                                        ).padStart(2, "0")}`;
                                        return attDateString === todayString;
                                      }
                                    );

                                  return (
                                    <p
                                      className={`text-xs font-light ${getStatusColor(
                                        todayAttendance?.status
                                      )}`}
                                    >
                                      {todayAttendance?.status || "Offline"}
                                    </p>
                                  );
                                })()
                              : (
                                <p className="text-xs font-light">
                                  Offline
                                </p>
                              )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-40">
                    <p className="text-muted-foreground">No people found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Card className="mt-4">
        <CardHeader className="font-bold">My Attendance</CardHeader>
        <CardContent>
          {isAttendancesLoading ? (
            <div className="flex items-center justify-center h-96">
              <p className="text-muted-foreground">
                Loading attendance data...
              </p>
            </div>
          ) : (
            <ChartContainer config={chartConfig} className="w-full h-96">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={true}
                />
                <Bar dataKey="hours" radius={1} fill="#455eee">
                  <LabelList
                    dataKey="hours"
                    position="top"
                    formatter={(value: number) =>
                      value > 0 ? `${value}h` : ""
                    }
                    style={{
                      fill: "#455eee",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
