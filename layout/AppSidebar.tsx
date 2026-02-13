"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  BoxCubeIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PieChartIcon,
  PlugInIcon,
  UserCircleIcon,
  RestaurantIcon,
} from "../components/icons/index";
import SidebarWidget from "./SidebarWidget";
import { Album, Settings } from "lucide-react";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <UserCircleIcon />,
    name: "User Management",
    subItems: [
      { name: "Customers", path: "/users/customers" },
      { name: "Sub Admins", path: "/users/sub-admin" },
      { name: "Tailors", path: "/users/tailors" },
      { name: "Tailor Admin", path: "/users/tailor-admin" },
    ],
  },
  {
    icon: <GridIcon />,
    name: "Banner Management",
    subItems: [
      { name: "Banners", path: "/banner" },
      { name: "Subscriptions", path: "/banner/subscriptions" },
      { name: "Approval Queue", path: "/banner/approval-queue" },
    ],
  },
  {
    icon: <UserCircleIcon />,
    name: "Driver Management",
    subItems: [
      { name: "Driver List", path: "/drivers" },
      { name: "Driver Assignment", path: "/drivers/assignments" },
      { name: "Driver Advances", path: "/drivers/advances" },
    ],
  },
  {
    icon: <RestaurantIcon />,
    name: "Restaurant Management",
    subItems: [
      { name: "Restaurants", path: "/restaurants" },
      { name: "Cuisines", path: "/restaurants/cuisines" },
      { name: "Add-Ons Category", path: "/restaurants/addons-category" },
      { name: "Transactions", path: "/restaurants/transactions" },
      { name: "Offers", path: "/restaurants/offers" },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "Orders",
    path: "/orders",
  },
  {
    icon: <BoxCubeIcon />,
    name: "Deliveries",
    path: "/deliveries",
  },

  {
    icon: <GridIcon />,
    name: "Tailor Management",
    path: "/tailors",
  },
];

const othersItems: NavItem[] = [
  {
    icon: <UserCircleIcon />,
    name: "Account Setting",
    path: "/account-setting",
  },
  {
    icon: <Settings />,
    name: "System Settings",
    subItems: [
      {
        name: "Roles & Permissions",
        path: "/system-setting/role-permissions",
      },
      { name: "Delivery Fee", path: "/system-setting/delivery-fee" },
      { name: "Payments", path: "/system-setting/payments" },
      { name: "Referral", path: "/system-setting/referral" },
      { name: "Advanced", path: "/system-setting/advanced" },
    ],
  },
  {
    icon: <Album />,
    name: "Manage Operations",
    subItems: [
      { name: "Activities", path: "/manage/activities" },
      { name: "Backup", path: "/manage/backup" },
      { name: "Scheduler", path: "/manage/scheduler" },
      { name: "Logger", path: "/manage/logger" },
      { name: "Storage", path: "/manage/storage" },
    ],
  },

  {
    icon: <PieChartIcon />,
    name: "Transaction",
    path: "/transactions",
  },
  {
    icon: <PlugInIcon />,
    name: "Manage",
    path: "/manage",
  },
  {
    icon: <ListIcon />,
    name: "FAQ's",
    path: "/faqs",
  },
  {
    icon: <BoxCubeIcon />,
    name: "Chat",
    path: "/chat",
  },
  {
    icon: <GridIcon />,
    name: "Restricted Areas",
    path: "/restricted-areas",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others",
  ) => (
    <ul className="flex flex-col gap-2">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}>
              <span
                className={` ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}>
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-primary"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}>
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}>
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={`menu-item-text`}>{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden border-l-2 border-primary/70 bg-primary/10 ml-4 transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}>
              <ul className="mt-2 space-y-1 ml-9">
                {(() => {
                  const activeSubItemPath = nav.subItems
                    .filter((item) => isActive(item.path))
                    .sort((a, b) => b.path.length - a.path.length)[0]?.path;

                  return nav.subItems.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        href={subItem.path}
                        className={`menu-dropdown-item ${
                          (
                            activeSubItemPath
                              ? subItem.path === activeSubItemPath
                              : isActive(subItem.path)
                          )
                            ? "menu-dropdown-item-active"
                            : "menu-dropdown-item-inactive"
                        }`}>
                        {subItem.name}
                      </Link>
                    </li>
                  ));
                })()}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {},
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => {
      // Exact match for root paths
      if (path === pathname) return true;
      // Check if current pathname starts with the menu path (for child routes)
      // Add a trailing slash to prevent false matches (e.g., /users/customers vs /users/customers-archive)
      return pathname.startsWith(path + "/");
    },
    [pathname],
  );

  useEffect(() => {
    // Check if the current path matches any submenu item
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    // If no submenu item matches, close the open submenu
    if (!submenuMatched) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    // Set the height of the submenu items when the submenu is opened
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
              ? "w-[290px]"
              : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div
        className={`py-8 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}>
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={100}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={100}
                height={40}
              />
            </>
          ) : (
            <Image
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}>
                {isExpanded || isHovered || isMobileOpen ? (
                  "Main"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>

            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}>
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(othersItems, "others")}
            </div>
          </div>
        </nav>
        {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
      </div>
    </aside>
  );
};

export default AppSidebar;
