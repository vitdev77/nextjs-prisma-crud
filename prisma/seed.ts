import {
  BusinessType,
  DisplayPlaced,
  GreenLogo,
  ProductColor,
  SeriesAttr,
} from "@/generated/prisma/enums";
import prisma from "@/lib/prisma";

async function up() {
  // adding brands
  const brands = await prisma.brand.createManyAndReturn({
    data: [
      { name: "Midea" },
      { name: "General Electronics" },
      { name: "DEXP" },
      { name: "Körting" },
      { name: "Schaub Lorenz" },
      { name: "Kuppersberg" },
      { name: "Weissgauff" },
      { name: "Comfee" },
      { name: "HOME" },
    ],
  });

  // adding series
  const series = await prisma.series.createManyAndReturn({
    data: [
      { name: "BCD345" },
      { name: "BCD385" },
      { name: "BCD405" },
      { name: "BCD445" },
      { name: "BCD335" },
      { name: "BCD375" },
    ],
  });

  // adding products
  const products = await prisma.product.createMany({
    data: [
      {
        name: "MDRB471MGF01O",
        seriesAttr: SeriesAttr.CE_BCD345WE_ST,
        color: ProductColor.WHITE,
        displayPlaced: DisplayPlaced.ON_DOOR,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[0].id,
      },
    ],
  });

  // adding items
  const items = await prisma.item.createManyAndReturn({
    data: [
      {
        name: "Color masterbatch",
        nameExt: "White",
        attr: "RE-WH101",
        isMaterial: true,
      },
      {
        name: "Color masterbatch",
        nameExt: "Transparent Light Gray",
        attr: "RE-GY901",
        isMaterial: true,
      },
      {
        name: "Sponge tape",
        attr: "502101000155",
      },
      {
        name: "The screw base",
        attr: "A0084-202",
      },
      {
        name: "Copper tube",
        nameExt: "ф4.76x0.65",
        attr: "GJ-0060",
      },
      {
        name: "Packaging bag",
        attr: "502604040011",
      },
      {
        name: "European standard power cord",
        greenLogo: GreenLogo.REACH_RoHS,
        attr: "DYX-1127",
      },
      {
        name: "PE film",
        attr: "A0248-717",
      },
      {
        name: "Magnetic strip",
        attr: "MC9x2.6-01",
      },
      {
        name: "Door Gasket of Freezer",
        attr: "A1630-343",
        isAssembly: true,
      },
      {
        name: "PVC",
        nameExt: "Polyvinyl chloride",
        attr: "RE-GY102",
        isMaterial: true,
      },
      {
        name: "F Bottom Drawer Assembly",
        attr: "A1630-113",
        greenLogo: GreenLogo.REACH_RoHS,
        isAssembly: true,
      },
      {
        name: "F Bottom Drawer",
        attr: "A1630-114",
        greenLogo: GreenLogo.REACH_RoHS,
      },
      {
        name: "Drawer Panel",
        attr: "A1630-116",
        greenLogo: GreenLogo.REACH_RoHS,
      },
    ],
  });

  // adding item codes
  const itemCodes = await prisma.itemCode.createMany({
    data: [
      { code: "10403002001668", itemId: items[0].id },
      { code: "10403002001546", itemId: items[0].id },
      { code: "10403002001556", itemId: items[0].id },
      { code: "10403002001543", itemId: items[0].id },
      { code: "10403002006811", itemId: items[1].id },
    ],
  });

  return { brands, series, products, items, itemCodes };
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "brands" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "series" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "products" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "items" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "item_codes" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (err) {
    console.error(err);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    prisma.$disconnect();
    process.exit(1);
  });
