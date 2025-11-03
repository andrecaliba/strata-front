"use client";

import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bell, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCalendarConnect, useCalendarSyncTasks } from "@/hooks/use-calendar";
import { useGetUser } from "@/hooks/use-user";
import { useGetTasks } from "@/hooks/use-task";
import { Task } from "@/types/dataInterface";
import { useCallback, useMemo, useState } from "react";

const localizer = momentLocalizer(moment);

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  description: string;
  allDay: boolean;
  status: "Easy" | "Moderate" | "Hard";
};

const eventStyleGetter = (event: CalendarEvent) => {
  let style: React.CSSProperties = {};
  switch (event.status) {
    case "Hard":
      style = {
        backgroundColor: "#f9988f",
        color: "black",
        borderRadius: 4,
        padding: "2px 4px",
        fontSize: "0.75rem",
      };
      break;
    case "Moderate":
      style = {
        backgroundColor: "#fff085",
        color: "black",
        borderRadius: 4,
        padding: "2px 4px",
        fontSize: "0.75rem",
      };
      break;
    case "Easy":
      style = {
        backgroundColor: "#7bf1a8",
        color: "black",
        borderRadius: 4,
        padding: "2px 4px",
        fontSize: "0.75rem",
      };
      break;
  }
  return { style };
};

export default function MyCalendar() {
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const { data: tasks = [], isLoading: isTasksLoading } = useGetTasks();
  const { mutate: calendarConnectMutation, isPending: isConnecting } =
    useCalendarConnect();
  const { mutate: calendarSyncTasksMutation, isPending: isSyncingAll } =
    useCalendarSyncTasks();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<View>("month");

  const tasksToEvent = useMemo(() => {
    if (!tasks || tasks.length === 0) return [];
    // Map Tasks to Calendar Events
    console.log("Mapping tasks to events:", tasks);
    return tasks.map(
      (task: Task): CalendarEvent => ({
        title: task.title,
        description: task.description,
        start: new Date(task.due_date),
        end: new Date(task.due_date),
        allDay: true,
        status: task.difficulty,
      })
    );
  }, [tasks]);

  const handleConnectGoogle = () => {
    calendarConnectMutation();
  };
  const handleSyncAllTasks = () => {
    calendarSyncTasksMutation();
  };

  const onNavigate = useCallback((newDate: Date) => {
    console.log("Navigated to:", newDate);
    setCurrentDate(newDate);
  }, []);

  const onView = useCallback((newView: View) => {
    console.log("View changed to:", newView);
    setCurrentView(newView);
  }, []);

  return (
    <div className="p-4">
      <Card className="mb-4">
        <CardContent className="flex">
          <Input type="search" className="w-80" placeholder="Search" />
          <div className="flex ml-auto">
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
                  : "Unknown Role"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex">
        <div className="flex-1 mr-4">
          <Calendar
            key={tasksToEvent.length}
            localizer={localizer}
            events={tasksToEvent}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            eventPropGetter={eventStyleGetter}
            views={["month", "week", "day"]}
            view={currentView}
            date={currentDate}
            onNavigate={onNavigate}
            onView={onView}
          />
        </div>
        <div>
          <Button
            className="flex bg-primary-blue text-white w-full mb-2"
            onClick={handleConnectGoogle}
            disabled={isConnecting}
          >
            <RefreshCw />
            {isConnecting ? "Connecting..." : "Connect Google Calendar"}
          </Button>
          <Button
            className="flex bg-primary-blue text-white w-full mb-2"
            onClick={handleSyncAllTasks}
            disabled={isSyncingAll || isConnecting}
          >
            <RefreshCw />
            {isSyncingAll ? "Syncing..." : "Sync Tasks"}
          </Button>
          <Card className="px-4">
            <CardTitle className="text-center">Color Guide</CardTitle>
            <CardContent className="p-0">
              <p className="bg-green-300 text-center rounded-sm mb-2">Easy</p>
              <p className="bg-yellow-200 text-center rounded-sm mb-2">
                Medium
              </p>
              <p className="bg-red-300 text-center rounded-sm mb-2">hard</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
