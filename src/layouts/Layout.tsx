import React, { ReactNode, FC, useState } from "react";
import Link from "next/link";
import classnames from "classnames";
import Header from "./app/Header";

interface NavLink {
  href: string;
  label: string;
  icon: string; // Material symbol name
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home", icon: "home_app_logo" },
  { href: "/gists", label: "Gists", icon: "diversity_3" },
  { href: "/panda-us", label: "Panda-us", icon: "support_agent" },
  { href: "/notifications", label: "Notifications", icon: "notifications" },
  { href: "/messages", label: "Messages", icon: "forum" },
  { href: "/explore", label: "Explore", icon: "explore" },
  { href: "/bookmarks", label: "Bookmarks", icon: "bookmarks" },
];

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  const sidebarClasses = `w-full lg:w-[80px] xl:w-[280px] p-8 flex flex-col items-center xl:items-start gap-y-4 overflow-hidden transition-all duration-200 ${
    isCollapsed ? "xl:w-0" : ""
  }` 

  const linkClasses = classnames(
    "text-lg",
    "font-medium",
    "flex",
    "items-center",
    "xl:gap-x-2",
    {
      "text-hidden xl:text-block": isCollapsed, 
    },
  )

  return (
    <div className="min-h-screen overflow-hidden">
      {/* <nav className=" h-[80px] flex items-center px-8"></nav> */}
      <Header />

      <div className="flex min-h-[calc(100vh-80px)]">
        <aside className={sidebarClasses}>
          {navLinks.map((navLink) => (
            <Link
              key={navLink.href}
              href={navLink.href}
              className={linkClasses}
            >
              <div className="h-10 w-10 overflow-hidden grid place-items-center">
                <span className="material-symbols-outlined">
                  {navLink.icon}
                </span>
              </div>
              <span className={linkClasses}>{navLink.label}</span>
            </Link>
          ))}
        </aside>
        {/* <p className="font-semibold text-xl uppercase">Scout City</p> */}
        <button className="focus:outline-none" onClick={toggleSidebar}>
          {/* Toggle Icon (visible on all screens) */}
          <span className="material-symbols-outlined">switch_left</span>
        </button>
        <main className="w-[100%] lg:w-[calc(100%-80px)] xl:w-[calc(100%-280px)] col-span-10">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout

