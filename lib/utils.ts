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

export function underscoreWithCommas(text: string): string {
  return text.replaceAll(/_/g, ", "); // Replace underscores with commas
}

export function addSpacesBeforeCaps(text: string): string {
  // Regex finds a lowercase letter ([a-z]) followed by an uppercase letter ([A-Z])
  // and replaces it with the first group ($1), a space, and the second group ($2).
  return text.replace(/([a-z])([A-Z])/g, "$1 $2").trim();
}

/**
 * Truncates a string by keeping a specified number of characters from the beginning
 * and the end, placing an ellipsis (...) in the middle.
 * @param str The original string.
 * @param firstCharCount The number of characters to show at the beginning.
 * @param endCharCount The number of characters to show at the end.
 * @returns The truncated string with a middle ellipsis, or the original string if no truncation is needed.
 */
export function truncateMiddle(
  str: string,
  firstCharCount: number,
  endCharCount: number,
): string {
  const minLength = firstCharCount + endCharCount + 3; // +3 for the '...'

  if (str.length <= minLength) {
    return str;
  }

  const start = str.substring(0, firstCharCount);
  const end = str.substring(str.length - endCharCount);

  return `${start}...${end}`;
}
