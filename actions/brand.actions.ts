"use server";

import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get all brands
export async function getBrands() {
  try {
    return await prisma.brand.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
        // brand: {
        //   select: {
        //     _count: true,
        //   },
        // },
      },
      orderBy: {
        id: "asc",
      },
    });
  } catch (err) {
    console.error("Error fetching brands:", err);
    throw new Error("Failed to retrieve brands from the database.");
  }
}

// Get single brand
export async function getBrandById({ brandId }: { brandId: string }) {
  try {
    return await prisma.brand.findFirst({
      where: {
        id: Number(brandId),
      },
    });
  } catch (err) {
    console.error("Error fetching single brand:", err);
    throw new Error("Failed to retrieve single brand from the database.");
  }
}

// Get products list by Brand ID
export async function getProductsByBrandId({ brandId }: { brandId: string }) {
  try {
    return await prisma.product.findMany({
      where: {
        brandId: Number(brandId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (err) {
    console.error("Error fetching products by selected brand:", err);
    throw new Error(
      "Failed to retrieve products by selected brand from the database.",
    );
  }
}

// Create new brand
export async function createBrand({ name }: { name: string }) {
  try {
    await prisma.brand.create({
      data: {
        name,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return { error: "Brand name already exists" };
      }
    }
    console.error(err);
    return {
      error: "[BRAND_CREATE]: SERVER ERROR",
    };
  }

  revalidatePath("/brands");
}

// Edit single brand
export async function editBrand({
  brandId,
  name,
  isUpdated,
}: {
  brandId: string;
  name: string;
  isUpdated: boolean;
}) {
  try {
    await prisma.brand.update({
      where: {
        id: Number(brandId),
      },
      data: {
        name,
        isUpdated,
      },
    });
  } catch (err) {
    console.error(err);
    return {
      error: "[BRAND_EDIT]: SERVER ERROR",
    };
  }

  revalidatePath("/brands");
}

// Delete single brand
export async function deleteBrand({ brandId }: { brandId: string }) {
  try {
    await prisma.brand.delete({
      where: {
        id: Number(brandId),
      },
    });
  } catch (err) {
    console.error(err);
    return {
      error: "[BRAND_DELETE]: SERVER ERROR",
    };
  }

  revalidatePath("/brands");
}
