"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  requestNotificationPermission,
  useGetActiveVerification,
  useSnoozeVerification,
  useValidateCode,
} from "@/hooks/use-code";
import { useGetUser } from "@/hooks/use-user";
import codeSchema from "@/schemas/code";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

export default function CodeCheck({
  isOpen: externalOpen,
}: {
  isOpen: boolean;
}) {
  const { data: user, isLoading: isUserLoading } = useGetUser();
  const { data: verificationData } = useGetActiveVerification();
  const validateMutation = useValidateCode();
  const snoozeMutation = useSnoozeVerification();
  const verification = verificationData?.verification;
  const isOpen = !!verification || externalOpen;

  const form = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: "",
    },
    mode: "onBlur",
  });

  // Request notification permission on mount
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (!verification) {
      setTimeRemaining(0);
      return;
    }
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const expiration = new Date(verification.expiration).getTime();
      const remaining = Math.max(0, Math.floor((expiration - now) / 1000));
      setTimeRemaining(remaining);

      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [verification]);

  const handleSubmit = form.handleSubmit(async (data) => {
    if (verification) {
      await validateMutation.mutateAsync({
        verificationId: verification.verification_id,
        code: data.code.toUpperCase(),
      });
      form.reset();
    }
  });

  const handleSnooze = async () => {
    if (verification) {
      await snoozeMutation.mutateAsync(verification.verification_id);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  // Calculate the displayed time based on snoozes
  const getDisplayTime = () => {
    if (!verification) return "N/A";

    // If snoozed, show the updated time, otherwise show original time
    if (verification.snooze_count > 0 && verification.last_snooze_time) {
      return formatDateTime(verification.time);
    }
    return formatDateTime(verification.time);
  };

  const canSnooze = verification && verification.snooze_count < 3;
  const isExpiringSoon = timeRemaining < 60;

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Random Code Checks</DialogTitle>
          <div>
            <div className="flex items-center mb-4">
              <p className="mr-2">For</p>
              <p className="bg-primary-blue text-white px-2 py-1 rounded-xl mr-2">
                {isUserLoading
                  ? "Loading..."
                  : user
                  ? `${user.first_name} ${user.last_name}`.trim()
                  : "Unknown User"}
              </p>
              <p className="mr-2">on</p>
              <p className="bg-gray-200 px-2 py-1 border-dashed border-2 border-gray-400 rounded-xl">
                {getDisplayTime()}
              </p>
            </div>

            {/* Countdown Timer */}
            <div
              className={`flex items-center justify-between p-3 rounded-lg ${
                isExpiringSoon ? "bg-red-50" : "bg-blue-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock
                  className={`w-5 h-5 ${
                    isExpiringSoon ? "text-red-500" : "text-primary-blue"
                  }`}
                />
                <span className="font-semibold">Time Remaining:</span>
              </div>
              <span
                className={`font-mono text-xl font-bold ${
                  isExpiringSoon
                    ? "text-red-500 animate-pulse"
                    : "text-primary-blue"
                }`}
              >
                {formatTime(timeRemaining)}
              </span>
            </div>

            {/* Expiring Soon Warning */}
            {isExpiringSoon && (
              <div className="flex items-center gap-2 text-amber-600 text-sm bg-amber-50 p-2 rounded">
                <AlertTriangle className="w-4 h-4" />
                <span>Code expires soon! Please enter the code now.</span>
              </div>
            )}
            {/* Display the Code */}
            <div className="flex flex-col items-center mb-4">
              <h2 className="font-bold text-2xl mb-2">YOUR CODE</h2>
              <Input
                value={verification?.code || "-------"}
                className="w-28 border-2 border-black placeholder block
                placeholder:text-black placeholder:font-extrabold placeholder:text-center"
                disabled
              />
            </div>

            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Controller
                  name="code"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-1">
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        maxLength={7}
                        placeholder="Type the Correct Code Above"
                        onChange={(e) =>
                          field.onChange(e.target.value.toUpperCase())
                        }
                        autoFocus
                      />
                      {fieldState.error && (
                        <p className="text-xs text-red-500">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </FieldGroup>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={
                    !form.formState.isValid || validateMutation.isPending
                  }
                  className="flex-1 bg-primary-blue hover:bg-primary-blue/90"
                >
                  {validateMutation.isPending ? "Validating..." : "Submit Code"}
                </Button>

                {canSnooze && (
                  <Button
                    type="button"
                    onClick={handleSnooze}
                    disabled={snoozeMutation.isPending}
                    variant="outline"
                    className="flex-1"
                  >
                    {snoozeMutation.isPending
                      ? "Snoozing..."
                      : `Snooze (${verification.snooze_count}/3)`}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
