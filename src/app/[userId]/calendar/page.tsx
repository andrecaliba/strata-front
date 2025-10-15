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
        <Calendar
          localizer={localizer}
          //events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          className="flex-1 mr-4"
        />
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