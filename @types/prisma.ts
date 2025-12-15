import {
  Brand,
  Item,
  ItemCode,
  Product,
  Series,
} from "@/generated/prisma/client";

export type SeriesWithRelations = Series & {
  _count: {
    products: number;
  };
};

export type BrandWithRelations = Brand & {
  _count: {
    products: number;
  };
};

export type ProductWithRelations = Product & {
  brand: Brand;
  series: Series;
};

export type ItemWithRelations = Item & {
  _count: {
    itemCodes: number;
  };
};

export type ItemCodeWithRelations = ItemCode;
