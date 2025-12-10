"use server";

import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import {
  BusinessType,
  DisplayPlaced,
  ProductColor,
  SeriesAttr,
} from "@/generated/prisma/enums";
import { revalidatePath } from "next/cache";

// Get all products
export async function getProducts() {
  try {
    return await prisma.product.findMany({
      include: {
        series: true,
        brand: true,
      },
      orderBy: {
        id: "asc",
      },
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    throw new Error("Failed to retrieve products from the database.");
  }
}

// Get single product
export async function getProductById({ productId }: { productId: string }) {
  try {
    return await prisma.product.findFirst({
      where: {
        id: Number(productId),
      },
    });
  } catch (err) {
    console.error("Error fetching single product:", err);
    throw new Error("Failed to retrieve single product from the database.");
  }
}

// Create new product
export async function createProduct({
  name,
  seriesAttr,
  color,
  displayPlaced,
  businessType,
  seriesId,
  brandId,
}: {
  name: string;
  seriesAttr: SeriesAttr;
  color: ProductColor;
  displayPlaced: DisplayPlaced;
  businessType: BusinessType;
  seriesId: string;
  brandId: string;
}) {
  try {
    await prisma.product.create({
      data: {
        name,
        seriesAttr,
        color,
        displayPlaced,
        businessType,
        seriesId: Number(seriesId),
        brandId: Number(brandId),
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return { error: "Product name already exists" };
      }
    }
    console.error(err);
    return {
      error: "[PRODUCT_CREATE]: SERVER ERROR",
    };
  }

  revalidatePath("/products");
}

// Edit single product
export async function editProduct({
  productId,
  name,
  color,
  displayPlaced,
  businessType,
  seriesId,
  brandId,
  seriesAttr,
  isUpdated,
}: {
  productId: string;
  name: string;
  seriesAttr: SeriesAttr;
  color: ProductColor;
  displayPlaced: DisplayPlaced;
  businessType: BusinessType;
  seriesId: string;
  brandId: string;
  isUpdated: boolean;
}) {
  try {
    await prisma.product.update({
      where: {
        id: Number(productId),
      },
      data: {
        name,
        seriesAttr,
        color,
        displayPlaced,
        businessType,
        seriesId: Number(seriesId),
        brandId: Number(brandId),
        isUpdated,
      },
    });
  } catch (err) {
    console.error(err);
    return {
      error: "[PRODUCT_EDIT]: SERVER ERROR",
    };
  }

  revalidatePath("/products");
}

// Delete single product
export async function deleteProduct({ productId }: { productId: string }) {
  try {
    await prisma.product.delete({
      where: {
        id: Number(productId),
      },
    });
  } catch (err) {
    console.error(err);
    return {
      error: "[PRODUCT_DELETE]: SERVER ERROR",
    };
  }

  revalidatePath("/products");
}
