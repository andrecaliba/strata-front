"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from "@/components/ui/select";
import {
  Bell,
  ArrowDownWideNarrow
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Board from "@/components/custom/tasks/Board";
import List from "@/components/custom/tasks/List";
import { useGetUser } from "@/hooks/use-user";

export default function Tasks() {
  const { data: user, isLoading: isUserLoading, error: userError } = useGetUser();

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  if (userError) {
    return <div>Error loading user data.</div>;
  }
  
  return (
    <div className="p-4 w-full">
      <Card>
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
      <div className="flex items-center w-full">
        <Tabs defaultValue="list" className="w-full">
          <div className="flex items-center justify-between w-full">
            <TabsList className="bg-backdrop w-96 my-8 flex">
              <TabsTrigger
                value="list"
                className="cursor-pointer data-[state=active]:bg-primary-blue data-[state=active]:text-white"
              >List</TabsTrigger>
              <TabsTrigger
              value="board"
              className="cursor-pointer data-[state=active]:bg-primary-blue data-[state=active]:text-white"
              >Board</TabsTrigger>
              <TabsTrigger
              value="my-tasks"
              className="cursor-pointer data-[state=active]:bg-primary-blue data-[state=active]:text-white"
              >My Tasks</TabsTrigger>
            </TabsList>
            <div className="flex ml-auto">
              <Select>
                <SelectTrigger className="w-40">
                  <ArrowDownWideNarrow />
                  <SelectValue placeholder="Filter"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Date">Date</SelectItem>
                    <SelectItem value="Name">Name</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              { /* Go to */}
              <Button className="ml-2 bg-primary-blue text-white cursor-pointer" onClick={() => {
                window.location.href = `/${user?.user_id}/tasks/create`;
              }}>New Task</Button>
            </div>
          </div>
          <List />
          <Board />
        </Tabs>
        
      </div>
    </div>
  );
}