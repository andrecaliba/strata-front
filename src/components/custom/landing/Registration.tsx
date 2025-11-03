"use client";

import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import formSchema from "@/schemas/registration";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useSignUp } from "@/hooks/use-auth";

export default function Registration() {
  // CUSTOM HOOK VERSION
  const { mutate: mutateSignUp, isPending } = useSignUp();

  // NON-HOOK??? VERSION
  // const router = useRouter();
  // const { mutate: mutateSignUp, isPending } = useMutation({
  //   mutationFn: authService.signUp,
  //   onSuccess: () => {
  //     router.push("/");
  //   },
  //   onError: (error) => {
  //     console.error("Sign up failed:", error);
  //   },
  // });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Clear form and mutation after submission
    mutateSignUp(data, {
      onSuccess: () => {
        form.reset();
      }
    });
  };

  return (
    <TabsContent value="sign-up">
      <form id="registration-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="registration-email">
                  Email Address
                </FieldLabel>
                <Input
                  {...field}
                  id="registration-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Email Address"
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
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="registration-fname">First Name</FieldLabel>
                <Input
                  {...field}
                  id="registration-fname"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter First Name"
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
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="registration-lname">Last Name</FieldLabel>
                <Input
                  {...field}
                  id="registration-lname"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Last Name"
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
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="registration-password">
                  Password
                </FieldLabel>
                <Input
                  {...field}
                  id="registration-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Password"
                  autoComplete="off"
                  className="border-primary-blue"
                  type="password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <div className="py-4">
        <Button
          type="submit"
          form="registration-form"
          className="bg-primary-blue text-white w-full cursor-pointer"
          disabled={isPending}
        >
          {isPending ? "Creating Account..." : "Create Account"}
        </Button>
      </div>
    </TabsContent>
  );
}
