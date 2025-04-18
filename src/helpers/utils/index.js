import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Function to get CSS variable value
export const getCSSVariable = (variableName = '') =>
  getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();