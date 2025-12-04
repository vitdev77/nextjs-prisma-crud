import { Series, Model, Brand, ModelColor } from "@/generated/prisma/client";

export type SeriesWithRelations = Series;

export type ModelWithRelations = Model & {
  series: Series;
} & {
  brand: Brand;
} & {
  color: ModelColor;
};
