"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get all item codes
export async function getItemCodes() {
  try {
    return await prisma.itemCode.findMany({});
  } catch (error) {
    console.error("Error fetching item codes:", error);
    throw new Error("Failed to retrieve item codes from the database.");
  }
}

// Delete single item code
export async function deleteItemCode({ itemCodeId }: { itemCodeId: string }) {
  try {
    await prisma.itemCode.delete({
      where: {
        id: Number(itemCodeId),
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "[ITEM_CODES_DELETE]: SERVER ERROR",
    };
  }

  revalidatePath("/items-codes");
}
