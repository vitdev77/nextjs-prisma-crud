"use server";

import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get all item codes
export async function getItemCodes() {
  try {
    return await prisma.itemCode.findMany({});
  } catch (err) {
    console.error("Error fetching item codes:", err);
    throw new Error("Failed to retrieve item codes from the database.");
  }
}

// Get single item code
export async function getItemCodeById({ itemCodeId }: { itemCodeId: string }) {
  try {
    return await prisma.itemCode.findFirst({
      where: {
        id: Number(itemCodeId),
      },
    });
  } catch (err) {
    console.error("Error fetching single item code:", err);
    throw new Error("Failed to retrieve single item code from the database.");
  }
}

// Create new item code
export async function createItemCode({
  code,
  itemId,
}: {
  code: string;
  itemId: string;
}) {
  try {
    await prisma.itemCode.create({
      data: {
        code,
        itemId: Number(itemId),
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return { error: "Item code already exists" };
      }
    }
    console.error(err);
    return {
      error: "[ITEM_CODE_CREATE]: SERVER ERROR",
    };
  }

  revalidatePath("/item-codes");
}

// Edit single item code
export async function editItemCode({
  itemCodeId,
  code,
  itemId,
  isUpdated,
}: {
  itemCodeId: string;
  code: string;
  itemId: string;
  isUpdated: boolean;
}) {
  try {
    await prisma.itemCode.update({
      where: {
        id: Number(itemCodeId),
      },
      data: {
        code,
        itemId: Number(itemId),
        isUpdated,
      },
    });
  } catch (err) {
    console.error(err);
    return {
      error: "[ITEM_CODE_EDIT]: SERVER ERROR",
    };
  }

  revalidatePath("/item-codes");
}

// Delete single item code
export async function deleteItemCode({ itemCodeId }: { itemCodeId: string }) {
  try {
    await prisma.itemCode.delete({
      where: {
        id: Number(itemCodeId),
      },
    });
  } catch (err) {
    console.error(err);
    return {
      error: "[ITEM_CODES_DELETE]: SERVER ERROR",
    };
  }

  revalidatePath("/item-codes");
}
