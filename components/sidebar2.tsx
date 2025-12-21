"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  Atom01Icon,
  BinaryCodeIcon,
  FlowConnectionIcon,
  FlowIcon,
  Home01Icon,
  RefrigeratorIcon,
  Settings01Icon,
  UserMultiple03Icon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  icon?: IconSvgElement;
  link?: string;
  children?: NavItem[]; // The key for nested menus
}

export const navItems: NavItem[] = [
  { label: "Home", link: "/", icon: Home01Icon },
  { label: "Brands", link: "/brands", icon: Atom01Icon },
  { label: "Series", link: "/series", icon: FlowIcon },
  { label: "Products", link: "/products", icon: RefrigeratorIcon },
  { label: "Items", link: "/items", icon: FlowConnectionIcon },
  { label: "Item Codes", link: "/item-codes", icon: BinaryCodeIcon },
  { label: "Users", link: "/users", icon: UserMultiple03Icon },
  {
    label: "Settings",
    icon: Settings01Icon,
    children: [
      // Nested children
      {
        label: "Profile",
        link: "/settings/profile",
      },
      {
        label: "Security",
        link: "/settings/security",
      },
      {
        label: "Advanced",
        children: [
          // Deep nesting
          {
            label: "Billing",
            link: "/settings/advanced/billing",
          },
          {
            label: "API",
            link: "/settings/advanced/api",
          },
        ],
      },
    ],
  },
];

interface SidebarItemProps {
  item: NavItem;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item }) => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const hasChildren = !!item.children;
  const Icon = item.icon;

  const toggleExpansion = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const ConditionalWrapper = ({
    children,
    link,
    handleClick,
    className,
  }: {
    children: React.ReactNode;
    link?: string;
    handleClick?: () => void;
    className?: string;
  }) => {
    if (link) {
      return (
        <Link href={link} className={className}>
          {children}
        </Link>
      );
    }

    return (
      <div className={className} onClick={handleClick}>
        {children}
      </div>
    );
  };

  return (
    <>
      <ConditionalWrapper
        link={item.link}
        handleClick={toggleExpansion}
        className={cn(
          "hover:bg-muted/50 flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition duration-150",
          pathname === item.link && "bg-accent hover:bg-accent font-medium",
        )}
      >
        {Icon && (
          <HugeiconsIcon
            icon={Icon}
            strokeWidth={2}
            className="text-muted-foreground size-4"
          />
        )}
        <span className="flex-1">{item.label}</span>
        {hasChildren && (
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            strokeWidth={2}
            className={cn(
              "size-4 transition duration-150",
              isExpanded ? "rotate-90" : "rotate-0",
            )}
          />
        )}
      </ConditionalWrapper>

      {/* {!item.link ? (
        <div
          className="hover:bg-muted/50 flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm font-medium transition duration-150"
          onClick={toggleExpansion}
        >
          {Icon && (
            <HugeiconsIcon
              icon={Icon}
              strokeWidth={2}
              className="text-muted-foreground size-4"
            />
          )}
          <span className="flex-1">{item.label}</span>
          {hasChildren && (
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              strokeWidth={2}
              className={cn(
                "size-4 transition duration-150",
                isExpanded ? "rotate-90" : "rotate-0",
              )}
            />
          )}
        </div>
      ) : (
        <Link
          href={item.link}
          className={cn(
            "hover:bg-muted/50 flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition duration-150",
            pathname === item.link && "bg-accent hover:bg-accent font-medium",
          )}
        >
          {" "}
          {Icon && (
            <HugeiconsIcon
              icon={Icon}
              strokeWidth={2}
              className="text-muted-foreground size-4"
            />
          )}
          <span className="flex-1">{item.label}</span>
        </Link>
      )} */}

      {hasChildren && isExpanded && (
        <div className="ml-4 space-y-1 border-l pl-4">
          {item.children?.map((child, index) => (
            // Recursively render children
            <SidebarItem key={index} item={child} />
          ))}
        </div>
      )}
    </>
  );
};

const Sidebar2: React.FC = () => {
  return (
    <aside className="min-w-45 py-8">
      <nav className="space-y-2">
        {navItems.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar2;
