"use client";

import createTaskSchema from "@/schemas/taskcreate";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";
import * as z from "zod";
import { Button } from "@/components/ui/button";
// ========================================
import { useGetUser } from "@/hooks/use-user";
import { useCreateTask } from "@/hooks/use-task";

import { useMemo, useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "@/hooks/use-user"

export default function TaskCreate() {
  const router = useRouter();
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const { mutate: createTaskMutation, isPending } = useCreateTask();
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // Get available assignees (current user + subordinates for managers, or just current user for employees)
  const availableAssignees = useMemo(() => {
    if (!user) return [];
    
    const assignees = [user];
    if (user.role === 'Manager' && user.subordinates) {
      assignees.push(...user.subordinates);
    }
    
    return assignees;
  }, [user]);
  

  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      taskTitle: "",
      dueDateAndTime: "",
      description: "",
      difficulty: undefined,
      manager: "",
      assignees: [],
    },
    mode: "onBlur",
  });

  const handleSubmit = form.handleSubmit((data) => {
    createTaskMutation({
      title: data.taskTitle,
      description: data.description,
      dueDate: new Date(data.dueDateAndTime),
      difficulty: data.difficulty,
      assignees: data.assignees,
    });
  });



  const toggleUser = (userId: string) => {
    const userToToggle = availableAssignees.find((u) => u?.user_id === userId);
    if (!userToToggle) return;

    const isSelected = selectedUsers.some((u) => u.user_id === userId);

    if (isSelected) {
      const updated = selectedUsers.filter((u) => u.user_id !== userId);
      setSelectedUsers(updated);
      form.setValue(
        "assignees",
        updated.map((u) => u.user_id)
      );
    } else {
      const updated = [...selectedUsers, userToToggle];
      setSelectedUsers(updated);
      form.setValue(
        "assignees",
        updated.map((u) => u.user_id)
      );
    }
  };

  const removeUser = (userId: string) => {
    const updated = selectedUsers.filter((u) => u.user_id !== userId);
    setSelectedUsers(updated);
    form.setValue(
      "assignees",
      updated.map((u) => u.user_id)
    );
  };

  return (
    <form id="create-task" onSubmit={handleSubmit}>
      <FieldGroup>
        <div className="flex">
          <Controller
            name="taskTitle"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="task-title">Task Title</FieldLabel>
                <Input
                  {...field}
                  id="task-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="e.g. Fix Bug on line 20"
                  autoComplete="off"
                  className="border-primary-blue"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="dueDateAndTime"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="ml-4">
                <FieldLabel htmlFor="due">Due Date & Time</FieldLabel>
                <Input
                  {...field}
                  id="due"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  className="border-primary-blue"
                  type="datetime-local"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                {...field}
                id="description"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                className="border-primary-blue"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <div>
          <Controller
            name="difficulty"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="difficulty">Difficulty</FieldLabel>
                <div>
                  <Button
                    {...field}
                    id="difficulty"
                    aria-invalid={fieldState.invalid}
                    className={`border-primary-blue cursor-pointer text-black
                    hover:bg-green-200 hover:text-green-500
                    ${
                      field.value === "Easy"
                        ? "bg-green-200 text-green-500"
                        : "bg-gray-200"
                    }`}
                    type="button"
                    onClick={() => field.onChange("Easy")}
                  >
                    Easy
                  </Button>
                  <Button
                    {...field}
                    id="difficulty"
                    aria-invalid={fieldState.invalid}
                    className={`border-primary-blue cursor-pointer text-black
                    hover:bg-orange-200 hover:text-orange-500 ml-2
                    ${
                      field.value === "Moderate"
                        ? "bg-orange-200 text-orange-500"
                        : "bg-gray-200"
                    }`}
                    type="button"
                    onClick={() => field.onChange("Moderate")}
                  >
                    Moderate
                  </Button>
                  <Button
                    {...field}
                    id="difficulty"
                    aria-invalid={fieldState.invalid}
                    className={`border-primary-blue cursor-pointer text-black
                    hover:bg-red-200 hover:text-red-500 ml-2
                    ${
                      field.value === "Hard"
                        ? "bg-red-200 text-red-500"
                        : "bg-gray-200"
                    }`}
                    type="button"
                    onClick={() => field.onChange("Hard")}
                  >
                    Hard
                  </Button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        <div className="flex">
          <Controller
            name="manager"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="manager">Manager</FieldLabel>
                <Input
                  {...field}
                  id="manager"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  className="border-primary-blue"
                  disabled
                  value={
                    isUserLoading
                      ? "Loading..."
                      : user?.role === "Manager"
                      ? `You`.trim()
                      : user?.manager
                      ? `${user.manager?.first_name} ${user.manager?.last_name}`.trim()
                      : "No Manager"
                  }
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="assignees"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="ml-4">
                <FieldLabel htmlFor="assignees">Assignees</FieldLabel>
                {/* <Input
                  {...field}
                  id="assignees"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  className="border-primary-blue"
                /> */}

                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between border-primary-blue"
                      type="button"
                    >
                      {selectedUsers.length > 0
                        ? `${selectedUsers.length} selected`
                        : "Select assignees..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search by name or email..." />
                      <CommandEmpty>
                        {user?.role === 'Employee' 
                          ? "You can only assign tasks to yourself" 
                          : "No users found"}
                      </CommandEmpty>
                      <CommandList>
                        <CommandGroup className="max-h-64 overflow-auto">
                          {isUserLoading ? (
                            <CommandItem disabled>Loading users...</CommandItem>
                          ) : (
                            availableAssignees.map((assignee) => {
                              const isSelected = selectedUsers.some(
                                (u) => u.user_id === assignee.user_id
                              );
                              const isCurrentUser = assignee.user_id === user?.user_id;
                              return (
                                <CommandItem
                                  key={assignee.user_id}
                                  value={`${assignee.first_name} ${assignee.last_name} ${assignee.email}`}
                                  onSelect={() => toggleUser(assignee.user_id)}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      isSelected ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  <div className="flex flex-col">
                                    <span>
                                      {`${assignee.first_name} ${assignee.last_name}`}
                                      {isCurrentUser && " (You)"}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {assignee.email}
                                    </span>
                                  </div>
                                </CommandItem>
                              );
                            })
                          )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {/* Selected users badges */}
                {selectedUsers.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedUsers.map((selectedUser) => (
                      <Badge
                        key={selectedUser.user_id}
                        variant="secondary"
                        className="gap-1"
                      >
                        {`${selectedUser.first_name} ${selectedUser.last_name}`}
                        {selectedUser.user_id === user?.user_id && " (You)"}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeUser(selectedUser.user_id)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </FieldGroup>
      <div className="mt-4">
        <Button className="bg-primary-blue text-white cursor-pointer">
          Create Task
        </Button>
        <Button className="bg-gray-200 text-black cursor-pointer hover:text-white ml-2">
          Cancel
        </Button>
      </div>
    </form>
  );
}
