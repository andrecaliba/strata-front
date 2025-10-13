import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldGroup, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import formSchema from "@/schemas/login";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onBlur"
  })
  return (
    <TabsContent value="sign-in">
      <form id="login-form">
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="login-email">Email Address</FieldLabel>
                <Input
                  {...field}
                  id="login-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Email Address"
                  autoComplete="off"
                  className="border-primary"
                />
                {fieldState.invalid &&(
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
                <div className="flex justify-between">
                  <FieldLabel htmlFor="login-password">Password</FieldLabel>
                  <Button
                  type="button"
                  className="hover:bg-transparent bg-transparent text-blue-400
                  border-none underline hover:no-underline p-0 cursor-pointer"
                  >Forgot Password?</Button>
                </div>
                <Input
                  {...field}
                  id="login-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Password"
                  autoComplete="off"
                  className="border-primary"
                  type="password"
                />
                {fieldState.invalid &&(
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
          form="login-form"
          className="bg-primary text-white w-full cursor-pointer"
        >Sign In</Button>
      </div>
    </TabsContent>
  );
}