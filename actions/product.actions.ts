"use server";

import prisma from "@/lib/prisma";
import {
  BusinessType,
  DisplayPlaced,
  ProductColor,
} from "@/generated/prisma/enums";
import { revalidatePath } from "next/cache";

// Get all products
export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      include: {
        series: true,
        brand: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to retrieve products from the database.");
  }
}

// Get single product
export async function getProductById({ productId }: { productId: string }) {
  try {
    const singleProduct = await prisma.product.findFirst({
      where: {
        id: Number(productId),
      },
    });

    return singleProduct;
  } catch (error) {
    console.error("Error fetching single product:", error);
    throw new Error("Failed to retrieve single product from the database.");
  }
}

// Create new product
export async function createProduct({
  name,
  color,
  displayPlaced,
  businessType,
  seriesId,
  brandId,
}: {
  name: string;
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
        color,
        displayPlaced,
        businessType,
        seriesId: Number(seriesId),
        brandId: Number(brandId),
      },
    });
  } catch (error) {
    console.log(error);
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
}: {
  productId: string;
  name: string;
  color: ProductColor;
  displayPlaced: DisplayPlaced;
  businessType: BusinessType;
  seriesId: string;
  brandId: string;
}) {
  try {
    await prisma.product.update({
      where: {
        id: Number(productId),
      },
      data: {
        name,
        color,
        displayPlaced,
        businessType,
        seriesId: Number(seriesId),
        brandId: Number(brandId),
      },
    });
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
    return {
      error: "[PRODUCT_DELETE]: SERVER ERROR",
    };
  }

  revalidatePath("/products");
}
