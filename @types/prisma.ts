import {
  Brand,
  Item,
  ItemCode,
  Product,
  Series,
} from "@/generated/prisma/client";

export type SeriesWithRelations = Series;

export type BrandWithRelations = Brand;

export type ProductWithRelations = Product;

export type ItemWithRelations = Item;

export type ItemCodeWithRelations = ItemCode;
