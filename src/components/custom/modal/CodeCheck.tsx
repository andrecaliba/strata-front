"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import codeSchema from "@/schemas/code";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from 'zod';

export default function CodeCheck({ isOpen }: { isOpen: boolean }) {
  const form = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: ""
    },
    mode: "onBlur"
  })
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Random Code Checks</DialogTitle>
          <div>
            <div className="flex items-center mb-4">
              <p className="mr-2">For</p>
              <p
                className="bg-primary-blue text-white px-2 py-1 rounded-xl mr-2"
              >
                Justin Carlo Unggoy
              </p>
              <p className="mr-2">on</p>
              <p className="bg-gray-200 px-2 py-1 border-dashed border-2 border-gray-400 rounded-xl">
                09:00:00 AM
              </p>
            </div>
            <div className="flex flex-col items-center mb-4">
              <h2 className="font-bold text-2xl mb-2">YOUR CODE</h2>
              <Input
                placeholder="143BCPF"
                className="w-28 border-2 border-black placeholder block
                placeholder:text-black placeholder:font-extrabold placeholder:text-center"
                disabled
              />
            </div>
            <form>
              <FieldGroup>
                <Controller
                  name="code"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Type the Correct Code Above"
                    />
                  )}
                />
              </FieldGroup>
            </form>
            <Button
              className="bg-primary-blue text-white w-full mt-4"
            >Submit Code</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}