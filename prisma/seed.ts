import prisma from "@/lib/prisma";
import { brands, series, products } from "./data-for-seeding";

async function up() {
  // adding brands
  await prisma.brand.createMany({
    data: brands,
  });

  // adding series
  await prisma.series.createMany({
    data: series,
  });

  // adding products
  await prisma.product.createMany({
    data: products,
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "brands" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "series" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "products" RESTART IDENTITY CASCADE`;
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
