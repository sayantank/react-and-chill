"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Clusters } from "@/types";
import { capitalize } from "@/lib/utils";
import type { getEndpoints } from "@/app/forms/prefetched-conditional-data-form/actions";
import { EndpointPicker } from "../shared/endpoint-picker";
import { useMemo } from "react";
import { TypographyMuted } from "../ui/typography";
import { SubmitButton } from "../shared/submit-btn";

export const conditionalDataFormSchema = z.object({
  cluster: z.enum(["mainnet", "devnet"]),
  endpoints: z.array(z.object({ value: z.number(), label: z.string() })).min(1, {
    message: "At least one endpoint is required.",
  }),
});
export type ConditionalDataFormSchema = z.infer<typeof conditionalDataFormSchema>;

const clusterOptions = Clusters.map((c) => ({ value: c, label: capitalize(c) }));

export function PrefetchedConditionalDataForm({
  endpoints,
}: { endpoints: Awaited<ReturnType<typeof getEndpoints>> }) {
  const form = useForm<ConditionalDataFormSchema>({
    resolver: zodResolver(conditionalDataFormSchema),
    defaultValues: {
      cluster: "mainnet",
      endpoints: [],
    },
  });

  // NOTE: useFieldArray expects the field property to be an array of *object*
  // In our case, we have, { value: number, label: string }
  const { fields, append } = useFieldArray<ConditionalDataFormSchema>({
    control: form.control,
    name: "endpoints",
  });

  const cluster = form.watch("cluster");

  const endpointOptions = useMemo(() => {
    return endpoints.filter(
      (ep) => ep.cluster === cluster && !fields.map((f) => f.value).includes(ep.id),
    );
  }, [fields, endpoints, cluster]);

  async function onSubmit(data: ConditionalDataFormSchema) {
    console.log(data);
    // toast(<TypographySmall>{success ? "Success!" : "Error!"}</TypographySmall>);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 p-4 border rounded-md"
      >
        <FormField
          control={form.control}
          name="cluster"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cluster</FormLabel>
              <Select
                onValueChange={(event) => {
                  field.onChange(event);
                  form.setValue("endpoints", []);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a cluster" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clusterOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endpoints"
          render={() => (
            <>
              <div className="space-y-2">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Endpoints</FormLabel>
                  <EndpointPicker
                    endpoints={endpointOptions}
                    onSelect={(ep) => {
                      append({ value: ep.id, label: ep.name });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  {fields.map((field) => (
                    <div
                      key={field.id}
                      className="w-full p-2 border rounded-md"
                    >
                      <TypographyMuted>{field.label}</TypographyMuted>
                    </div>
                  ))}
                </div>
              </div>
              <FormMessage />
            </>
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
