import {
  Card,
  CardContent,
  CardTitle,
  CardHeader
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TaskCreate from "@/components/custom/tasks/TaskCreate";

export default function CreateTask() {
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
      <Card>
        <CardHeader>
          <CardTitle>Create Task</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskCreate />
        </CardContent>
      </Card>
    </div>
  );
}