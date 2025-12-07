"use client";

import { useTheme } from "next-themes";
import NextTopLoader from "nextjs-toploader";

const TopLoaderComponent = () => {
  const { theme } = useTheme();

  return (
    <NextTopLoader
      showSpinner={false}
      height={2}
      color={theme === "dark" ? "#e5e5e5" : "#171717"}
    />
  );
};

export { TopLoaderComponent };
