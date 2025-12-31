"use server";

import { Prisma } from "@/generated/prisma/client";
import { GreenLogo, UnitOfMeasure } from "@/generated/prisma/enums";
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
      orderBy: {
        updatedAt: "desc",
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
        id: itemId,
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
  isAssembly,
  unitOfMeasure,
  greenLogo,
  parts,
}: {
  name: string;
  nameExt?: string;
  attr?: string;
  isMaterial?: boolean;
  isAssembly?: boolean;
  unitOfMeasure: UnitOfMeasure;
  greenLogo: GreenLogo;
  parts?: string[];
}) {
  try {
    await prisma.item.create({
      data: {
        name,
        nameExt,
        attr,
        isMaterial,
        isAssembly,
        unitOfMeasure,
        greenLogo,
        parts,
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
  isAssembly,
  unitOfMeasure,
  greenLogo,
  parts,
  isUpdated,
}: {
  itemId: string;
  name: string;
  nameExt?: string;
  attr?: string;
  isMaterial?: boolean;
  isAssembly?: boolean;
  unitOfMeasure: UnitOfMeasure;
  greenLogo: GreenLogo;
  parts?: string[];
  isUpdated: boolean;
}) {
  try {
    await prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        name,
        nameExt,
        attr,
        isMaterial,
        isAssembly,
        unitOfMeasure,
        greenLogo,
        parts,
        isUpdated,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return {
          error:
            "Item ATTRIBUTE already exists in DB. Please insert another one.",
        };
      }
    }
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
        id: itemId,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2003") {
        return { error: "Item has some related item-codes" };
      }
    }
    console.error(err);
    return {
      error: "[ITEM_DELETE]: SERVER ERROR",
    };
  }

  revalidatePath("/items");
}
