"use server";

import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get all series
export async function getSeries() {
  try {
    return await prisma.series.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  } catch (err) {
    console.error("Error fetching series:", err);
    throw new Error("Failed to retrieve series from the database.");
  }
}

// Get single series
export async function getSeriesById({ seriesId }: { seriesId: string }) {
  try {
    return await prisma.series.findFirst({
      where: {
        id: seriesId,
      },
    });
  } catch (err) {
    console.error("Error fetching single series:", err);
    throw new Error("Failed to retrieve single series from the database.");
  }
}

// Get products list by Series ID
export async function getProductsBySeriesId({
  seriesId,
}: {
  seriesId: string;
}) {
  try {
    return await prisma.product.findMany({
      where: {
        seriesId: seriesId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (err) {
    console.error("Error fetching products by selected series:", err);
    throw new Error(
      "Failed to retrieve products by selected series from the database.",
    );
  }
}

// Create new series
export async function createSeries({ name }: { name: string }) {
  try {
    await prisma.series.create({
      data: {
        name,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return { error: "Series name already exists" };
      }
    }
    console.error(err);
    return {
      error: "[SERIES_CREATE]: SERVER ERROR",
    };
  }

  revalidatePath("/series");
}

// Edit single series
export async function editSeries({
  seriesId,
  name,
  isUpdated,
}: {
  seriesId: string;
  name: string;
  isUpdated: boolean;
}) {
  try {
    await prisma.series.update({
      where: {
        id: seriesId,
      },
      data: {
        name,
        isUpdated,
      },
    });
  } catch (err) {
    console.error(err);
    return {
      error: "[SERIES_EDIT]: SERVER ERROR",
    };
  }

  revalidatePath("/series");
}

// Delete single series
export async function deleteSeries({ seriesId }: { seriesId: string }) {
  try {
    await prisma.series.delete({
      where: {
        id: seriesId,
      },
    });
  } catch (err) {
    console.error(err);
    return {
      error: "[SERIES_DELETE]: SERVER ERROR",
    };
  }

  revalidatePath("/series");
}
