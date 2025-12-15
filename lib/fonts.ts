import {
  Geist_Mono as FontMono,
  Geist,
  Inter,
  Roboto_Flex as FontSans,
} from "next/font/google";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400"],
});

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fontGeist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const fontVariables = cn(
  fontSans.variable,
  fontMono.variable,
  fontInter.variable,
  fontGeist.variable,
);
