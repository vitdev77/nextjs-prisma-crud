"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get all series
export async function getSeries() {
  try {
    const series = await prisma.series.findMany({
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

    return series;
  } catch (error) {
    console.error("Error fetching series:", error);
    throw new Error("Failed to retrieve series from the database.");
  }
}

// Get single series
export async function getSeriesById({ seriesId }: { seriesId: string }) {
  try {
    const singleSeries = await prisma.series.findFirst({
      where: {
        id: Number(seriesId),
      },
    });

    return singleSeries;
  } catch (error) {
    console.error("Error fetching single series:", error);
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
    const productsBySeriesId = await prisma.product.findMany({
      where: {
        seriesId: Number(seriesId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return productsBySeriesId;
  } catch (error) {
    console.error("Error fetching products by selected series:", error);
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
  } catch (error) {
    console.log(error);
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
}: {
  seriesId: string;
  name: string;
}) {
  try {
    await prisma.series.update({
      where: {
        id: Number(seriesId),
      },
      data: {
        name,
      },
    });
  } catch (error) {
    console.log(error);
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
        id: Number(seriesId),
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "[SERIES_DELETE]: SERVER ERROR",
    };
  }

  revalidatePath("/series");
}
