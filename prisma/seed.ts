import prisma from "@/lib/prisma";
import { brands, series, models, modelColors } from "./data-for-seeding";

async function up() {
  // adding brands
  await prisma.brand.createMany({
    data: brands,
  });

  // adding series
  await prisma.series.createMany({
    data: series,
  });

  // adding models
  await prisma.model.createMany({
    data: models,
  });

  // adding model colors
  await prisma.modelColor.createMany({
    data: modelColors,
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "brands" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "series" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "models" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "model_colors" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
