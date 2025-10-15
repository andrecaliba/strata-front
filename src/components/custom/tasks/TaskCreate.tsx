"use client";

import createTaskSchema from "@/schemas/taskcreate";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel, FieldGroup, FieldError } from "@/components/ui/field";
import * as z from 'zod';
import { Button } from "@/components/ui/button";

export default function TaskCreate() {
  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      taskTitle: "",
      dueDateAndTime: "",
      description: "",
      difficulty: "",
      manager: "",
      assignees: []
    },
    mode: "onBlur"
  })
  return (
    <form id="create-task">
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
                {fieldState.invalid &&(
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
                {fieldState.invalid &&(
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
              {fieldState.invalid &&(
                <FieldError errors={[fieldState.error]} />
              )}
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
                    ${field.value === "easy" ? "bg-green-200 text-green-500" : "bg-gray-200"}`}
                    type="button"
                    onClick={() => field.onChange("easy")}
                  >Easy</Button>
                  <Button
                    {...field}
                    id="difficulty"
                    aria-invalid={fieldState.invalid}
                    className={`border-primary-blue cursor-pointer text-black
                    hover:bg-orange-200 hover:text-orange-500 ml-2
                    ${field.value === "medium" ? "bg-orange-200 text-orange-500" : "bg-gray-200"}`}
                    type="button"
                    onClick={() => field.onChange("medium")}
                  >Medium</Button>
                  <Button
                    {...field}
                    id="difficulty"
                    aria-invalid={fieldState.invalid}
                    className={`border-primary-blue cursor-pointer text-black
                    hover:bg-red-200 hover:text-red-500 ml-2
                    ${field.value === "hard" ? "bg-red-200 text-red-500" : "bg-gray-200"}`}
                    type="button"
                    onClick={() => field.onChange("hard")}
                  >Hard</Button>
                </div>
                {fieldState.invalid &&(
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
                />
                {fieldState.invalid &&(
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
                <Input
                  {...field}
                  id="assignees"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  className="border-primary-blue"
                />
                {fieldState.invalid &&(
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </FieldGroup>
      <div className="mt-4">
        <Button className="bg-primary-blue text-white cursor-pointer">Create Task</Button>
        <Button className="bg-gray-200 text-black cursor-pointer hover:text-white ml-2">Cancel</Button>
      </div>
    </form>
  );
}