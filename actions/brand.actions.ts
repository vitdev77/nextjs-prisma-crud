"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get all brands
export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
        // series: {
        //   select: {
        //     _count: true,
        //   },
        // },
      },
    });

    return brands;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw new Error("Failed to retrieve brands from the database.");
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
  } catch (error) {
    console.log(error);
    return {
      error: "[BRAND_CREATE]: SERVER ERROR",
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
  } catch (error) {
    console.log(error);
    return {
      error: "[BRAND_DELETE]: SERVER ERROR",
    };
  }

  revalidatePath("/brands");
}
