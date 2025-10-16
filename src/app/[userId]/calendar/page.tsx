"use client";

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Card,
  CardContent,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bell, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const localizer = momentLocalizer(moment)

type CalendarEvent = { title: string; start: Date; end: Date; allDay: boolean; status: "easy" | "medium" | "hard"; };

const myEventsList: CalendarEvent[] = [
  { title: "WPH Content Stage1", start: new Date(2025, 8, 2), end: new Date(2025, 8, 2), allDay: true, status: "hard" },
  { title: "Team Standup", start: new Date(2025, 8, 7), end: new Date(2025, 8, 7), allDay: true, status: "easy" },
  { title: "UI Design Review", start: new Date(2025, 8, 12), end: new Date(2025, 8, 12), allDay: true, status: "medium" },
  { title: "FLUX Meeting Update", start: new Date(2025, 8, 19), end: new Date(2025, 8, 19), allDay: true, status: "easy" },
  { title: "STRATA Flowchart", start: new Date(2025, 8, 19), end: new Date(2025, 8, 19), allDay: true, status: "medium" },
];

const eventStyleGetter = (event: CalendarEvent) => {
  let style: React.CSSProperties = {};
  switch (event.status) {
    case "hard": style = { backgroundColor: "#f9988f", color: "black", borderRadius: 4, padding: "2px 4px", fontSize: "0.75rem" }; break;
    case "medium": style = { backgroundColor: "#fff085", color: "black", borderRadius: 4, padding: "2px 4px", fontSize: "0.75rem" }; break;
    case "easy": style = { backgroundColor: "#7bf1a8", color: "black", borderRadius: 4, padding: "2px 4px", fontSize: "0.75rem" }; break;
  }
  return { style };
};

export default function MyCalendar() {
  return (
    <div className="p-4">
      <Card className="mb-4">
        <CardContent className="flex">
          <Input type="search" className="w-80" placeholder="Search"/>
          <div className="flex ml-auto">
            <Bell className="w-6 h-6"/>
            <div className="ml-2 bg-blue-300 rounded-full w-8 h-8"></div>
            <div className="ml-2">
              <p className="font-semibold text-xs">Justin Carlo Unggoy</p>
              <p className="text-xs">Employee</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex">
        <div className="flex-1 mr-4">
          <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            eventPropGetter={eventStyleGetter}
            views={["month","week","day"]}
            defaultView="month" defaultDate={new Date(2025, 8, 1)}
          />
        </div>
        <div>
          <Button className="flex bg-primary-blue text-white w-full mb-2">
            <RefreshCw/>Sync
          </Button>
          <Card className="px-4">
            <CardTitle className="text-center">Color Guide</CardTitle>
            <CardContent className="p-0">
              <p className="bg-green-300 text-center rounded-sm mb-2">Easy</p>
              <p className="bg-yellow-200 text-center rounded-sm mb-2">Medium</p>
              <p className="bg-red-300 text-center rounded-sm mb-2">hard</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}