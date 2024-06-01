import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number) {
  console.log(`Sleeping for ${ms}ms`);
  return new Promise((resolve) => setTimeout(resolve, ms));
}
