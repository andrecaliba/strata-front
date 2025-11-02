"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Users, Clock, CheckCircle2, Check } from "lucide-react";
import AppSidebar from "@/components/custom/sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import profileImg from "@/assets/profile.jpg";
import STRATA_FULL_LOGO from "@/assets/strataLogoHd.png";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetTaskById, useToggleSubtask } from "@/hooks/use-task";
import { useParams } from "next/dist/client/components/navigation";
import { Subtask, Task } from "@/types/dataInterface";

export default function TaskDetails() {
  const params = useParams(); // Get URL parameters
  const taskId = params.taskId as string; // Extract taskId from URL

  const {
    data: task,
    isLoading,
    error,
  } = useGetTaskById(taskId) as {
    data: Task;
    isLoading: boolean;
    error: Error;
  };
  const { mutate: toggleSubtask } = useToggleSubtask();

  const handleToggleSubtask = (subtaskId: string, currentStatus: boolean) => {
    toggleSubtask({
      subtaskId,
      completed: !currentStatus, // Toggle the current status
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white py-4 px-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-center">Loading task details...</p>
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="bg-white py-4 px-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-red-500">
            Failed to load task details.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-4 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[10px] border border-[#D9D9D9] overflow-hidden">
          <div className="w-full bg-white relative overflow-hidden flex justify-center">
            <div className="w-full max-w-[600px] aspect-[1226/300]">
              <Image
                src={STRATA_FULL_LOGO}
                alt="Hero Image"
                className="w-full h-full object-contain rounded-t-[10px]"
                priority
              />
            </div>
          </div>

          <div className="p-3 md:p-4 lg:p-6">
            <div className="flex flex-col gap-3 mb-8">
              <h1 className="text-[24px] font-bold leading-[28px] text-[#141522]">
                {task.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-[14px] font-normal leading-[18px] text-[#54577A]">
                  {task.difficulty}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-[4px]">
                  <Users className="w-4 h-4 text-[#54577A]" strokeWidth={1.5} />
                  <span className="text-[13px] font-normal leading-4 text-[#141522]">
                    {task.assignees.length} Members involved
                  </span>
                </div>
                <div className="flex items-center gap-[4px]">
                  <Clock className="w-4 h-4 text-[#54577A]" strokeWidth={1.5} />
                  <span className="text-[13px] font-normal leading-4 text-[#141522]">
                    Due: {new Date(task.due_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-8">
              <h2 className="text-[20px] font-bold leading-6 text-[#141522]">
                Description
              </h2>
              <p className="text-[13px] font-normal leading-[24px] text-[#141522] max-w-[672px]">
                {task.description || "No description provided."}
              </p>
            </div>

            <div className="flex flex-col gap-2 mb-8">
              <h2 className="text-[20px] font-bold leading-6 text-[#141522]">
                Subtasks
              </h2>
              <div>
                {task.subtasks && task.subtasks.length > 0 ? (
                  task.subtasks.map((subtask: Subtask) => (
                    <div key={subtask.subtask_id} className="flex mb-2">
                      <Checkbox
                        checked={subtask.completed}
                        onCheckedChange={() =>
                          handleToggleSubtask(
                            subtask.subtask_id.toString(),
                            subtask.completed
                          )
                        }
                        className="cursor-pointer"
                      />
                      <Label
                        className={`ml-2 cursor-pointer flex-1 ${
                          subtask.completed
                            ? "line-through text-gray-400"
                            : "text-[#141522]"
                        }`}
                        onClick={() =>
                          handleToggleSubtask(
                            subtask.subtask_id.toString(),
                            subtask.completed
                          )
                        }
                      >
                        {subtask.title}
                      </Label>
                    </div>
                  ))
                ) : (
                  <p className="text-[13px] text-[#54577A]">
                    No subtasks available.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
