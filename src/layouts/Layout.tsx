import React, { ReactNode, FC, useState, useEffect } from "react"
import Link from "next/link"
import classnames from "classnames"
import Header from "./app/Header"

interface NavLink {
  href: string
  label: string
  icon: string // We'll keep the icon definition for future use
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home", icon: "home_app_logo" },
  { href: "/gists", label: "Gists", icon: "diversity_3" },
  { href: "/panda-us", label: "Panda-us", icon: "support_agent" },
  { href: "/notifications", label: "Notifications", icon: "notifications" },
  { href: "/messages", label: "Messages", icon: "forum" },
  { href: "/explore", label: "Explore", icon: "explore" },
  { href: "/bookmarks", label: "Bookmarks", icon: "bookmarks" },
]


const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
   const [activeLink, setActiveLink] = useState("/")
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  const sidebarClasses = classnames(
    "w-full lg:w-[80px] xl:w-[280px] p-8 flex flex-col items-center xl:items-start gap-y-4 overflow-hidden transition-all duration-200",
    {
      "xl:w-0": isCollapsed || screenWidth < 768, 
    },
  )

  const linkClasses = (isActive: boolean) =>
    classnames("text-lg", "font-medium", "flex", "items-center", "xl:gap-x-2", {
      "text-hidden xl:text-block": isCollapsed,
      "bg-gradient-to-b from-[#F24055] to-[#1E7881]": isActive,
    })


  const dropGistButtonClasses = classnames(
    "toggleBtn rounded-full text-sm text-white px-4 py-1",
    {
      "bg-gradient-to-b from-[#F24055] to-[#1E7881] flex items-center": true,
      "w-full": isCollapsed,
      "w-auto": !isCollapsed,
    },
  )

  const handleResize = () => setScreenWidth(window.innerWidth)

  useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleLinkClick = (href: string) => {
    setActiveLink(href)
    if (["/messages", "/explore"].includes(href)) {
      setIsCollapsed(true)
    } else {
      setIsCollapsed(false) // Reset collapse for other links
    }
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* <nav className=" h-[80px] flex items-center px-8"></nav> */}
      <Header />

      <div className="flex min-h-[calc(100vh-80px)]">
        <aside className={sidebarClasses}>
          <button className={dropGistButtonClasses}>
            <span className="material-symbols-outlined">draft_orders</span>
            <span className={`mx-2 ${isCollapsed ? "hidden" : "sm:block"}`}>
              Drop a Gist
            </span>
          </button>
          {navLinks.map((navLink) => (
            <Link
              key={navLink.href}
              href={navLink.href}
              className={linkClasses(navLink.href === activeLink)} // Pass active state
              onClick={() => handleLinkClick(navLink.href)}
            >
              <div className="h-10 w-10 overflow-hidden grid place-items-center">
                <span className="material-symbols-outlined">
                  {navLink.icon}
                </span>
              </div>
              {/* Hide text on collapse on all screens */}
              <span
                className={classnames(
                  linkClasses(navLink.href === activeLink),
                  navLink.label,
                )}
              >
                {navLink.label}
              </span>
            </Link>
          ))}
        </aside>

        {/* <p className="font-semibold text-xl uppercase">Scout City</p> */}
        {/* <button className="focus:outline-none" onClick={toggleSidebar}>
          TOGGLE ICON FOR SIDENAV COLLAPSE
          <span className="material-symbols-outlined">switch_left</span>
        </button> */}
        <main className="w-[100%] lg:w-[calc(100%-80px)] xl:w-[calc(100%-280px)] col-span-10 mt-4 ml-4">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
