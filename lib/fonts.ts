import {
  Geist_Mono as FontMono,
  Geist as FontSans,
  Inter,
  Roboto_Flex,
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

const fontRobotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
});

export const fontVariables = cn(
  fontSans.variable,
  fontMono.variable,
  fontInter.variable,
);
