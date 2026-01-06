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
      {
        name: "MDRB471MGF33O",
        seriesAttr: SeriesAttr.CE_BCD345WE_ST,
        color: ProductColor.BEIGE,
        displayPlaced: DisplayPlaced.ON_DOOR,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[0].id,
      },
      {
        name: "MDRB471MGF46O",
        seriesAttr: SeriesAttr.CE_BCD345WE_ST,
        color: ProductColor.INOX,
        displayPlaced: DisplayPlaced.ON_DOOR,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[0].id,
      },
      {
        name: "MDRB472MGF01OM",
        seriesAttr: SeriesAttr.CE_BCD345WE_ST,
        color: ProductColor.WHITE,
        displayPlaced: DisplayPlaced.ON_DOOR,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[0].id,
      },
      {
        name: "MDRB472MGF33OM",
        seriesAttr: SeriesAttr.CE_BCD345WE_ST,
        color: ProductColor.BEIGE,
        displayPlaced: DisplayPlaced.ON_DOOR,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[0].id,
      },
      {
        name: "MDRB472MGF46OM",
        seriesAttr: SeriesAttr.CE_BCD345WE_ST,
        color: ProductColor.INOX,
        displayPlaced: DisplayPlaced.ON_DOOR,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[0].id,
      },
      {
        name: "MDRB473MGF01OM",
        seriesAttr: SeriesAttr.CE_BCD345WE_ST,
        color: ProductColor.WHITE,
        displayPlaced: DisplayPlaced.ON_DOOR,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[0].id,
      },
      {
        name: "MDRB473MGF46OM",
        seriesAttr: SeriesAttr.CE_BCD345WE_ST,
        color: ProductColor.INOX,
        displayPlaced: DisplayPlaced.ON_DOOR,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[0].id,
      },
      {
        name: "MDRB469MGF01I",
        seriesAttr: SeriesAttr.CE_BCD345WE1_ST,
        color: ProductColor.WHITE,
        displayPlaced: DisplayPlaced.INSIDE,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[0].id,
      },
      {
        name: "MDRB469MGF46I",
        seriesAttr: SeriesAttr.CE_BCD345WE1_ST,
        color: ProductColor.INOX,
        displayPlaced: DisplayPlaced.INSIDE,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[0].id,
      },
      // 385
      {
        name: "MDRB522MGE01OD",
        seriesAttr: SeriesAttr.CE_BCD385WX1_JT,
        color: ProductColor.WHITE,
        displayPlaced: DisplayPlaced.ON_DOOR,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[1].id,
      },
      {
        name: "MDRB522MGE33OD",
        seriesAttr: SeriesAttr.CE_BCD385WX1_JT,
        color: ProductColor.BEIGE,
        displayPlaced: DisplayPlaced.ON_DOOR,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[1].id,
      },
      {
        name: "MDRB522MGE45OD",
        seriesAttr: SeriesAttr.CE_BCD385WX1_JT,
        color: ProductColor.BLACK,
        displayPlaced: DisplayPlaced.ON_DOOR,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[1].id,
      },
      {
        name: "MDRB522MGE46OD",
        seriesAttr: SeriesAttr.CE_BCD385WX1_JT,
        color: ProductColor.INOX,
        displayPlaced: DisplayPlaced.ON_DOOR,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[1].id,
      },
      {
        name: "MDRB523MGE01ODM",
        seriesAttr: SeriesAttr.CE_BCD385WX1_JT,
        color: ProductColor.WHITE,
        displayPlaced: DisplayPlaced.ON_DOOR,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[1].id,
      },
      {
        name: "MDRB523MGE28ODM",
        seriesAttr: SeriesAttr.CE_BCD385WX1_JT,
        color: ProductColor.BLACK,
        displayPlaced: DisplayPlaced.ON_DOOR,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[1].id,
      },
      {
        name: "MDRB523MGE33ODM",
        seriesAttr: SeriesAttr.CE_BCD385WX1_JT,
        color: ProductColor.BEIGE,
        displayPlaced: DisplayPlaced.ON_DOOR,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[1].id,
      },
      {
        name: "MDRB523MGE46ODM",
        seriesAttr: SeriesAttr.CE_BCD385WX1_JT,
        color: ProductColor.INOX,
        displayPlaced: DisplayPlaced.ON_DOOR,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[1].id,
      },
      {
        name: "MDRB524MGE01ODM",
        seriesAttr: SeriesAttr.CE_BCD385WX1_JT,
        color: ProductColor.WHITE,
        displayPlaced: DisplayPlaced.ON_DOOR,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[1].id,
      },
      {
        name: "MDRB524MGE28ODM",
        seriesAttr: SeriesAttr.CE_BCD385WX1_JT,
        color: ProductColor.BLACK,
        displayPlaced: DisplayPlaced.ON_DOOR,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[1].id,
      },
      {
        name: "MDRB524MGE46ODM",
        seriesAttr: SeriesAttr.CE_BCD385WX1_JT,
        color: ProductColor.INOX,
        displayPlaced: DisplayPlaced.ON_DOOR,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[1].id,
      },
      {
        name: "MDRB519MGE01ID",
        seriesAttr: SeriesAttr.CE_BCD385WX2_JT,
        color: ProductColor.WHITE,
        displayPlaced: DisplayPlaced.INSIDE,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[1].id,
      },
      {
        name: "MDRB519MGE46ID",
        seriesAttr: SeriesAttr.CE_BCD385WX2_JT,
        color: ProductColor.INOX,
        displayPlaced: DisplayPlaced.INSIDE,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[1].id,
      },
      // 405
      {
        name: "MDRB548MMF01",
        seriesAttr: SeriesAttr.CE_BCD405WX_JQ,
        color: ProductColor.WHITE,
        displayPlaced: DisplayPlaced.INSIDE,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[2].id,
      },
      {
        name: "MDRB548MMF46",
        seriesAttr: SeriesAttr.CE_BCD405WX_JQ,
        color: ProductColor.STEEL_GRAY,
        displayPlaced: DisplayPlaced.INSIDE,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[2].id,
      },
      // 445
      {
        name: "MDRB600MMF01",
        seriesAttr: SeriesAttr.CE_BCD445WX_JQ,
        color: ProductColor.WHITE,
        displayPlaced: DisplayPlaced.INSIDE,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[3].id,
      },
      {
        name: "MDRB600MMF46",
        seriesAttr: SeriesAttr.CE_BCD445WX_JQ,
        color: ProductColor.STEEL_GRAY,
        displayPlaced: DisplayPlaced.INSIDE,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[3].id,
      },
      // 335
      {
        name: "MDRB457FGF01ID",
        seriesAttr: SeriesAttr.CE_BCD335WX_JQ,
        color: ProductColor.WHITE,
        displayPlaced: DisplayPlaced.INSIDE,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[4].id,
      },
      {
        name: "MDRB457FGF33ID",
        seriesAttr: SeriesAttr.CE_BCD335WX_JQ,
        color: ProductColor.BEIGE,
        displayPlaced: DisplayPlaced.INSIDE,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[4].id,
      },
      {
        name: "MDRB457FGF46ID",
        seriesAttr: SeriesAttr.CE_BCD335WX_JQ,
        color: ProductColor.INOX,
        displayPlaced: DisplayPlaced.INSIDE,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[4].id,
      },
      {
        name: "MDRB458FGF01IDM",
        seriesAttr: SeriesAttr.CE_BCD335WX_JQ,
        color: ProductColor.WHITE,
        displayPlaced: DisplayPlaced.INSIDE,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[4].id,
      },
      {
        name: "MDRB458FGF33IDM",
        seriesAttr: SeriesAttr.CE_BCD335WX_JQ,
        color: ProductColor.BEIGE,
        displayPlaced: DisplayPlaced.INSIDE,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[4].id,
      },
      {
        name: "MDRB458FGF46IDM",
        seriesAttr: SeriesAttr.CE_BCD335WX_JQ,
        color: ProductColor.INOX,
        displayPlaced: DisplayPlaced.INSIDE,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[4].id,
      },
      // 375
      {
        name: "MDRB509FGF01ID",
        seriesAttr: SeriesAttr.CE_BCD375WX_JQ,
        color: ProductColor.WHITE,
        displayPlaced: DisplayPlaced.INSIDE,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[5].id,
      },
      {
        name: "MDRB509FGF33ID",
        seriesAttr: SeriesAttr.CE_BCD375WX_JQ,
        color: ProductColor.BEIGE,
        displayPlaced: DisplayPlaced.INSIDE,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[5].id,
      },
      {
        name: "MDRB509FGF46ID",
        seriesAttr: SeriesAttr.CE_BCD375WX_JQ,
        color: ProductColor.INOX,
        displayPlaced: DisplayPlaced.INSIDE,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[5].id,
      },
      {
        name: "MDRB510FGF01IDM",
        seriesAttr: SeriesAttr.CE_BCD375WX_JQ,
        color: ProductColor.WHITE,
        displayPlaced: DisplayPlaced.INSIDE,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[5].id,
      },
      {
        name: "MDRB510FGF33IDM",
        seriesAttr: SeriesAttr.CE_BCD375WX_JQ,
        color: ProductColor.BEIGE,
        displayPlaced: DisplayPlaced.INSIDE,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[5].id,
      },
      {
        name: "MDRB510FGF46IDM",
        seriesAttr: SeriesAttr.CE_BCD375WX_JQ,
        color: ProductColor.INOX,
        displayPlaced: DisplayPlaced.INSIDE,
        businessType: BusinessType.OBM,
        brandId: brands[0].id,
        seriesId: series[5].id,
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
        parts: [],
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
        parts: [],
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
