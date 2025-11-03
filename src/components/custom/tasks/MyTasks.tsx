import { Card } from "@/components/ui/card";
import Image from "next/image";
import profileImg from "@/assets/profile.jpg";
import { TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { useGetTasks } from "@/hooks/use-task";
import { Task } from "@/types/dataInterface";
import { useRouter } from "next/navigation"; // Add this import

export default function MyTasksList() {
  const { data: tasks = [], isLoading } = useGetTasks();
  const router = useRouter(); // Initialize useRouter

  const getDifficultyColor = (difficulty: string) =>
    ({
      Easy: "text-[#219653]",
      Moderate: "text-[#F2994A]",
      Hard: "text-[#EB5757]",
    }[difficulty] || "text-[#828282]");

  const getProgressColor = (difficulty: string) =>
    ({
      Easy: "#219653",
      Moderate: "#F2994A",
      Hard: "#EB5757",
    }[difficulty] || "#BDBDBD");

  const getBackgroundColor = (difficulty: string) =>
    ({
      Easy: "bg-[#219653]/60",
      Moderate: "bg-[#F2994A]/60",
      Hard: "bg-[#EB5757]/60",
    }[difficulty] || "#BDBDBD");

  const getStatusColor = (status: string) =>
    status === "Completed"
      ? "text-[#219653]"
      : status === "To Do"
      ? "text-[#EB5757]"
      : status === "For Review"
      ? "text-[#2F80ED]"
      : "text-[#F2994A]";

  const getDueDateColor = (dueDate: string) =>
    dueDate === "Due Today" ? "text-[#EB5757]" : "text-[#BDBDBD]";

  const toggleTaskComplete = (id: string) => {
    // setTasks(prev =>
    //   prev.map((t: Task) => {
    //     if (t.id !== id) return t;
    //     const isCompleted = t.status === "Completed";
    //     return isCompleted
    //       ? { ...t, status: "In progress", progress: t.originalProgress }
    //       : { ...t, status: "Completed", originalProgress: t.progress, progress: 100 };
    //   })
    // );
  };

  if (isLoading) {
    return (
      <TabsContent value="list">
        <Card className="bg-white border w-full border-[#D9D9D9] rounded-lg p-8">
          <p className="text-center text-gray-500">Loading tasks...</p>
        </Card>
      </TabsContent>
    );
  }

  const handleRowClick = (taskId: string) => {
    router.push(`./tasks/${taskId}`);
  };

  return (
    <TabsContent value="mytasks">
      <Card className="bg-white border w-full border-[#D9D9D9] rounded-lg overflow-hidden">
        <div className="px-4 sm:px-5 py-4">
          <h2 className="text-sm sm:text-base font-semibold text-[#333]">
            All Tasks
          </h2>
        </div>
        <Table className="hidden lg:table w-full">
          <TableHeader className="border-t border-b border-[#E0E0E0] px-6 py-2">
            <TableRow className="gap-6">
              <TableHead className="text-[12px] text-[#828282]">
                Task Name
              </TableHead>
              <TableHead className="text-[12px] text-[#828282]">
                Difficulty
              </TableHead>
              <TableHead className="text-[12px] text-[#828282]">
                Status
              </TableHead>
              <TableHead className="text-[12px] text-[#828282]">
                Due Date
              </TableHead>
              <TableHead className="text-[12px] text-[#828282] text-right">
                Assigned to
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="px-6 py-6 space-y-12">
            {tasks.map((task: Task) => (
                // Navigate to task details page on row click
              <TableRow key={task.task_id} className="relative cursor-pointer" onClick={() => handleRowClick(task.task_id)}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button
                      aria-label={
                        task.status === "Completed"
                          ? "Mark as in progress"
                          : "Mark as completed"
                      }
                      onClick={() => toggleTaskComplete(task.task_id)}
                      className="cursor-pointer flex items-center justify-center"
                    >
                      {task.status === "Completed" ? (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <circle cx="9" cy="9" r="8" fill="#219653" />
                          <path
                            d="M5.5 9.2l2.3 2.3 4.2-5"
                            stroke="#F2F2F2"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                        >
                          <circle
                            cx="9"
                            cy="9"
                            r="8"
                            stroke="#BDBDBD"
                            strokeWidth="1.4"
                          />
                        </svg>
                      )}
                    </button>
                    <div>
                      <span className="text-[13px] font-semibold text-[#4F4F4F]">
                        {task.title}
                      </span>
                      <div className="flex items-center gap-3">
                        <Progress
                          className={`w-[320px] h-1`}
                          value={task.progress}
                        />
                        <span className="text-[11px] text-[#BDBDBD]">
                          {task.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: getProgressColor(task.difficulty),
                      }}
                    />
                    <span
                      className={`text-[11px] ${getDifficultyColor(
                        task.difficulty
                      )}`}
                    >
                      {task.difficulty}
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  className={`text-[11px] ${getStatusColor(task.status)}`}
                >
                  {task.status}
                </TableCell>
                <TableCell
                  className={`text-[11px] ${getDueDateColor(task.due_date)}`}
                >
                  {task.due_date}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-0">
                    {task.assignees.map((_, index) => (
                      <div
                        key={index}
                        className="w-7 h-7 rounded-full overflow-hidden border-2 border-white -ml-2 first:ml-0"
                      >
                        <Image
                          src={profileImg}
                          alt=""
                          width={28}
                          height={28}
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </TableCell>
                <button className="absolute right-0 top-0"></button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </TabsContent>
  );
}
