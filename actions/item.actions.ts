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
  } catch (err) {
    console.error("Error fetching items:", err);
    throw new Error("Failed to retrieve items from the database.");
  }
}

// Get single item
export async function getItemById({ itemId }: { itemId: string }) {
  try {
    return await prisma.item.findFirst({
      where: {
        id: Number(itemId),
      },
    });
  } catch (err) {
    console.error("Error fetching single item:", err);
    throw new Error("Failed to retrieve single item from the database.");
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
  } catch (err) {
    console.error(err);
    return {
      error: "[ITEM_CREATE]: SERVER ERROR",
    };
  }

  revalidatePath("/items");
}

// Edit single item
export async function editItem({
  itemId,
  name,
  nameExt,
  attr,
  isMaterial,
  isUpdated,
}: {
  itemId: string;
  name: string;
  nameExt?: string;
  attr?: string;
  isMaterial?: boolean;
  isUpdated: boolean;
}) {
  try {
    await prisma.item.update({
      where: {
        id: Number(itemId),
      },
      data: {
        name,
        nameExt,
        attr,
        isMaterial,
        isUpdated,
      },
    });
  } catch (err) {
    console.error(err);
    return {
      error: "[ITEM_EDIT]: SERVER ERROR",
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
  } catch (err) {
    console.error(err);
    return {
      error: "[ITEM_DELETE]: SERVER ERROR",
    };
  }

  revalidatePath("/items");
}
