"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get all brands
export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({});

    return brands;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw new Error("Failed to retrieve brands from the database.");
  }
}
