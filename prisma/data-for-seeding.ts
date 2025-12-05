import { ModelColor } from "@/generated/prisma/enums";

export const brands = [
  { id: 1, name: "Midea" },
  { id: 2, name: "General Electronics" },
  { id: 3, name: "DEXP" },
  { id: 4, name: "Körting" },
  { id: 5, name: "Schaub Lorenz" },
];

export const series = [
  { id: 1, name: "BCD345" },
  { id: 2, name: "BCD385" },
  { id: 3, name: "BCD405" },
  { id: 4, name: "BCD445" },
  { id: 5, name: "BCD335" },
  { id: 6, name: "BCD375" },
];

export const models = [
  {
    id: 1,
    name: "MDRB471MGF01O",
    seriesId: 1,
    brandId: 1,
    color: ModelColor.WHITE,
  },
  {
    id: 2,
    name: "MDRB471MGF33O",
    seriesId: 1,
    brandId: 1,
    color: ModelColor.BEIGE,
  },
  {
    id: 3,
    name: "MDRB471MGF46O",
    seriesId: 1,
    brandId: 1,
    color: ModelColor.INOX,
  },
];

export const colors = [
  { id: 1, name: "White", atribute: "01" },
  { id: 2, name: "Black", atribute: "28" },
  { id: 3, name: "Beige", atribute: "33" },
  { id: 4, name: "Basalt Gray", atribute: "45" },
  { id: 5, name: "Inox", atribute: "46" },
];
