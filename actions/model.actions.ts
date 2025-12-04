"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get all models
export async function getModels() {
  try {
    const models = await prisma.model.findMany({
      include: {
        series: true,
        brand: true,
      },
    });

    return models;
  } catch (error) {
    console.error("Error fetching models:", error);
    throw new Error("Failed to retrieve models from the database.");
  }
}

// Get single model
export async function getModelById({ modelId }: { modelId: string }) {
  try {
    const singleModel = await prisma.model.findFirst({
      where: {
        id: Number(modelId),
      },
    });

    return singleModel;
  } catch (error) {
    console.error("Error fetching single model:", error);
    throw new Error("Failed to retrieve single model from the database.");
  }
}

// Create new model
export async function createModel({
  name,
  seriesId,
  brandId,
  modelColorId,
}: {
  name: string;
  seriesId: number;
  brandId: number;
  modelColorId: number;
}) {
  try {
    await prisma.model.create({
      data: {
        name,
        seriesId,
        brandId,
        modelColorId,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "[MODEL_CREATE]: SERVER ERROR",
    };
  }

  revalidatePath("/models");
}

// Edit single model
export async function editModel({
  modelId,
  name,
  seriesId,
  brandId,
  modelColorId,
}: {
  modelId: string;
  name: string;
  seriesId: number;
  brandId: number;
  modelColorId: number;
}) {
  try {
    await prisma.model.update({
      where: {
        id: Number(modelId),
      },
      data: {
        name,
        seriesId,
        brandId,
        modelColorId,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "[MODEL_EDIT]: SERVER ERROR",
    };
  }

  revalidatePath("/models");
}

// Delete single model
export async function deleteModel({ modelId }: { modelId: string }) {
  try {
    await prisma.model.delete({
      where: {
        id: Number(modelId),
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "[MODEL_DELETE]: SERVER ERROR",
    };
  }

  revalidatePath("/models");
}
