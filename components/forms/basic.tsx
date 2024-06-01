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
import { TypographyH3, TypographySmall } from "../ui/typography";
import { z } from "zod";
import { basicFormAction } from "@/app/forms/actions";
import { toast } from "sonner";
import { SubmitButton } from "../shared/submit-btn";

// NOTE: Every form should have a zod schema, along with its own inferred type
export const basicFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
export type BasicFormSchema = z.infer<typeof basicFormSchema>;

export default function BasicForm() {
  const form = useForm<BasicFormSchema>({
    resolver: zodResolver(basicFormSchema),
    // NOTE: If we don't provide a default value, we get the follo error when typing
    /* 
	Warning: A component is changing an uncontrolled input to be controlled.
	This is likely caused by the value changing from undefined to a defined value, which should not happen. 
	Decide between using a controlled or uncontrolled input element for the lifetime of the component 
	*/
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: BasicFormSchema) {
    const { success } = await basicFormAction(data);
    toast(<TypographySmall>{success ? "Success!" : "Error!"}</TypographySmall>);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl mx-auto space-y-2 p-4 border rounded-md"
      >
        <TypographyH3>Basic Form</TypographyH3>
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
        <div className="w-full flex justify-end">
          <SubmitButton
            disabled={!form.formState.isValid}
            isSubmitting={form.formState.isSubmitting}
          />
        </div>
      </form>
    </Form>
  );
}
