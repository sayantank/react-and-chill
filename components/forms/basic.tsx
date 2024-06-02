"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { basicFormAction } from "@/app/forms/basic-form/actions";
import { toast } from "sonner";
import { SubmitButton } from "../shared/submit-btn";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { TypographyH3, TypographySmall } from "../ui/typography";
import { RadioCard } from "../shared/radio-card";
import { useMemo } from "react";

// NOTE: Every form should have a zod schema, along with its own inferred type
export const basicFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  theme: z.enum(["light", "dark"]),
});
export type BasicFormSchema = z.infer<typeof basicFormSchema>;

export default function BasicForm({ initialValues }: { initialValues?: BasicFormSchema }) {
  const form = useForm<BasicFormSchema>({
    resolver: zodResolver(basicFormSchema),
    // NOTE: If we don't provide a default value, we get the follo error when typing
    /* 
	  Warning: A component is changing an uncontrolled input to be controlled.
	  This is likely caused by the value changing from undefined to a defined value, which should not happen. 
	  Decide between using a controlled or uncontrolled input element for the lifetime of the component 
	  */
    defaultValues: {
      username: initialValues?.username ?? "",
      password: initialValues?.password ?? "",
      theme: initialValues?.theme ?? "light",
    },
  });

  const isDisabled = useMemo(() => {
    return initialValues != null
      ? // When we are updating, we want to disable the form if the user has not changed anything
        form.formState.isDirty
        ? !form.formState.isValid
        : true
      : // When we are creating, we want to disable the form if inputs are not valid
        !form.formState.isValid;
  }, [form.formState.isDirty, form.formState.isValid, initialValues]);

  async function onSubmit(data: BasicFormSchema) {
    const { success } = await basicFormAction(data);
    toast(<TypographySmall>{success ? "Success!" : "Error!"}</TypographySmall>);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 p-4 border rounded-md"
      >
        <TypographyH3>Basic Form - {initialValues != null ? "Update" : "Create"}</TypographyH3>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Theme</FormLabel>
              <FormDescription>Select the theme for the dashboard.</FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid max-w-md grid-cols-2 gap-8 pt-2"
              >
                <FormItem>
                  {/* NOTE: Using [&:has([data-state=checked])>div] to target the radio card */}
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem
                        value="light"
                        className="sr-only"
                      />
                    </FormControl>
                    <RadioCard
                      title="Light"
                      description="A light theme for the dashboard."
                    />
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem
                        value="dark"
                        className="sr-only"
                      />
                    </FormControl>
                    <RadioCard
                      title="Dark"
                      description="A dark theme for the dashboard."
                    />
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />
        <div className="w-full flex justify-end">
          <SubmitButton
            disabled={isDisabled}
            isSubmitting={form.formState.isSubmitting}
          />
        </div>
      </form>
    </Form>
  );
}
