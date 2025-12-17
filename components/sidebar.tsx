"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import {
  Atom01Icon,
  BinaryCodeIcon,
  FlowConnectionIcon,
  FlowIcon,
  Home01Icon,
  RefrigeratorIcon,
  Settings02Icon,
  TestTube01Icon,
  UserMultiple03Icon,
} from "@hugeicons/core-free-icons";

const NavItems = [
  { label: "Home", link: "/", icon: Home01Icon },
  { label: "Test", link: "/test", icon: TestTube01Icon },
  { label: "Brands", link: "/brands", icon: Atom01Icon },
  { label: "Series", link: "/series", icon: FlowIcon },
  { label: "Products", link: "/products", icon: RefrigeratorIcon },
  { label: "Items", link: "/items", icon: FlowConnectionIcon },
  { label: "Item Codes", link: "/item-codes", icon: BinaryCodeIcon },
  { label: "Users", link: "/users", icon: UserMultiple03Icon },
  { label: "Settings", link: "/settings", icon: Settings02Icon },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("min-w-45 border-r border-dashed py-6 pr-6", className)}>
      <ul className="flex w-full min-w-0 flex-col gap-1">
        {NavItems.map((navItem, key) => {
          const IconComponent = navItem.icon as IconSvgElement;
          return (
            <li key={key}>
              <Link
                className={cn(
                  "hover:bg-muted/50 flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm",
                  pathname === navItem.link &&
                    "bg-accent hover:bg-accent font-medium",
                )}
                href={navItem.link}
              >
                <HugeiconsIcon
                  icon={IconComponent}
                  strokeWidth={2}
                  className="size-4"
                />{" "}
                {navItem.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
