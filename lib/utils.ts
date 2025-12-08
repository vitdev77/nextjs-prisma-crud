import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function underscoreToCapitalizedText(text: string): string {
  return text
    .replaceAll(/_/g, " ") // Replace underscores with spaces
    .toLowerCase()
    .split(" ") // Split into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
    .join(" "); // Join words back with spaces
}

export function underscoreWithHyphensToUppercasedText(text: string): string {
  return text
    .replaceAll(/_/g, "-") // Replace underscores with hyphens
    .toUpperCase();
}
