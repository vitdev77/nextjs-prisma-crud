"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Blocks,
  Database,
  Gauge,
  Hexagon,
  List,
  Palette,
  Settings,
  Users,
} from "lucide-react";

const NavItems = [
  { label: "Dashboard", link: "/admin", icon: Gauge },
  { label: "Brands", link: "/admin/brands", icon: Hexagon },
  { label: "Series", link: "/admin/series", icon: Blocks },
  { label: "Colors", link: "/admin/colors", icon: Palette },
  { label: "Products", link: "/admin/products", icon: Database },
  { label: "Items", link: "/admin/items", icon: List },
  { label: "Users", link: "/admin/users", icon: Users },
  { label: "Settings", link: "/admin/settings", icon: Settings },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("min-w-3xs border-r border-dashed py-6", className)}>
      <ul>
        {NavItems.map((navItem, key) => {
          const IconComponent = navItem.icon;
          return (
            <li key={key}>
              <Link
                className={cn(
                  "hover:bg-primary/15 flex w-full items-center gap-2 px-4 py-2 text-left",
                  pathname === navItem.link &&
                    "bg-primary text-primary-foreground hover:bg-primary",
                )}
                href={navItem.link}
              >
                <IconComponent className="size-4" /> {navItem.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
