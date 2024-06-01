"use server";

import type { BasicFormSchema } from "@/components/forms/basic";
import { sleep } from "@/lib/utils";
import type { FormActionReturn } from "@/types";

export async function basicFormAction(data: BasicFormSchema): Promise<FormActionReturn> {
  console.log(data);
  await sleep(1000);

  return {
    success: data.password === "password",
  };
}
