"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get all items
export async function getItems() {
  try {
    return await prisma.item.findMany({
      include: {
        _count: {
          select: {
            itemCodes: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching items:", error);
    throw new Error("Failed to retrieve items from the database.");
  }
}

// Create new item
export async function createItem({
  name,
  nameExt,
  attr,
  isMaterial,
}: {
  name: string;
  nameExt?: string;
  attr?: string;
  isMaterial?: boolean;
}) {
  try {
    await prisma.item.create({
      data: {
        name,
        nameExt,
        attr,
        isMaterial,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "[ITEM_CREATE]: SERVER ERROR",
    };
  }

  revalidatePath("/items");
}

// Delete single item
export async function deleteItem({ itemId }: { itemId: string }) {
  try {
    await prisma.item.delete({
      where: {
        id: Number(itemId),
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "[ITEM_DELETE]: SERVER ERROR",
    };
  }

  revalidatePath("/items");
}
