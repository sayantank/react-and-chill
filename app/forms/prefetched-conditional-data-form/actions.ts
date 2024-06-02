"use server";

import { ENDPOINTS } from "@/lib/database";
import { sleep } from "@/lib/utils";

export async function getEndpoints() {
  await sleep(2000);
  return ENDPOINTS;
}
