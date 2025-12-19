import React, { useState } from "react";
import {
  HomeIcon,
  CogIcon,
  UserIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  icon?: React.ElementType; // Using React.ElementType for icon components
  path?: string;
  children?: NavItem[]; // The key for nested menus
}

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    icon: HomeIcon,
    path: "/",
  },
  {
    title: "Settings",
    icon: CogIcon,
    children: [
      // Nested children
      {
        title: "Profile",
        path: "/settings/profile",
      },
      {
        title: "Security",
        path: "/settings/security",
      },
      {
        title: "Advanced",
        children: [
          // Deep nesting
          {
            title: "Billing",
            path: "/settings/advanced/billing",
          },
          {
            title: "API",
            path: "/settings/advanced/api",
          },
        ],
      },
    ],
  },
  {
    title: "Users",
    icon: UserIcon,
    path: "/users",
  },
];

interface SidebarItemProps {
  item: NavItem;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = !!item.children;
  const Icon = item.icon;

  const toggleExpansion = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const baseClasses =
    "flex items-center p-3 text-sm font-medium rounded-lg text-gray-900 hover:bg-gray-100 cursor-pointer transition duration-150";

  return (
    <div>
      <div className={baseClasses} onClick={toggleExpansion}>
        {Icon && <Icon className="mr-3 h-5 w-5 text-gray-500" />}
        <span className="flex-1">{item.title}</span>
        {hasChildren &&
          (isExpanded ? (
            <ChevronDownIcon className="h-4 w-4" />
          ) : (
            <ChevronRightIcon className="h-4 w-4" />
          ))}
      </div>

      {hasChildren && isExpanded && (
        <div className="mt-1 ml-6 space-y-1 border-l-2 border-gray-200 pl-4">
          {item.children?.map((child, index) => (
            // Recursively render children
            <SidebarItem key={index} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <aside className="min-h-screen w-64 bg-white p-4 shadow-md">
      <div className="p-4 text-xl font-bold text-gray-800">My App</div>
      <nav className="mt-4 space-y-2">
        {navItems.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
