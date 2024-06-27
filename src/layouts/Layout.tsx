import React, { ReactNode, FC } from "react"
import Link from "next/link"
import Header from "./app/Header"
import clsx from "clsx"
import { useRouter } from "next/router"
import { motion, AnimatePresence } from "framer-motion"

interface NavLink {
  href: string
  label: string
  icon: string
}

interface LayoutProps {
  children: ReactNode
  isCollapsedByDefault?: boolean
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/gists", label: "Gists", icon: "diversity_3" },
  { href: "/panda-us", label: "Panda-us", icon: "support_agent" },
  { href: "/notifications", label: "Notifications", icon: "notifications" },
  { href: "/messages", label: "Messages", icon: "forum" },
  { href: "/explore", label: "Explore", icon: "explore" },
  { href: "/bookmarks", label: "Bookmarks", icon: "bookmarks" },
]

const Layout: FC<LayoutProps> = ({ children, isCollapsedByDefault }) => {
  const router = useRouter()
  const { asPath, query } = router

  const collapsedList = ["/messages", "/explore"]
  const isCollapsedFromQuery = query.collapsed === "true"
  const isCollapsed =
    isCollapsedByDefault ||
    isCollapsedFromQuery ||
    collapsedList.includes(asPath)

  return (
    <div className="min-h-screen flex flex-col relative px-0 lg:px-8">
      <Header className="" />
      <div className="flex flex-1 overflow-hidden relative">
        <motion.div
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className={clsx(
            "fixed top-[10.1rem] lg:flex lg:flex-col gap-y-7 h-[calc(100vh-10.1rem)] hidden",
            isCollapsed
              ? "lg:items-center lg:w-20 justify-between"
              : "xl:items-start xl:w-60 px-6 justify-between",
            "bottom-0 md:top-[8.1rem] md:bottom-auto", // Position at the bottom on mobile
          )}
        >
          <button
            className={clsx(
              "flex bg-gradient-to-b from-primary-500 to-secondary-500 text-primary-content rounded-full hover:shadow-lg focus:outline-none",
              isCollapsed ? "p-1" : "space-x-3 xl:py-2 xl:px-4",
            )}
          >
            <i className="material-symbols-outlined">draft_orders</i>
            {!isCollapsed ? (
              <span className="hidden xl:inline">Drop a gist</span>
            ) : null}
          </button>

          {navLinks.map((navLink) => (
            <Link key={navLink.href} href={navLink.href}>
              <div
                className={clsx(
                  "flex items-center bg-clip-text text-transparent bg-gradient-to-b from-black to-black hover:from-[#F24055] hover:to-[#1E7881] transition-all duration-[450ms]",
                  !isCollapsed && "xl:space-x-3",
                )}
              >
                <i className="material-symbols-outlined">{navLink.icon}</i>
                {!isCollapsed && (
                  <span className="hidden xl:inline">{navLink.label}</span>
                )}
              </div>
            </Link>
          ))}
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div
            key={asPath}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={clsx(
              "flex-1 overflow-y-auto absolute top-0 left-0 right-0 bottom-0 mt-[1.5rem] mr-0", // Reduced right margin for mobile screens
              isCollapsed
                ? "ml-0 md:ml-[4.5rem]" // Adjusted margin for collapsed state to prevent overlap
                : "ml-0 md:ml-[calc(60px+24px)] lg:ml-[calc(80px+24px)] xl:ml-[calc(215px+24px)]",
            )}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Bottom Navigation for Small Screens */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden flex justify-around bg-white p-2 shadow-md z-50">
        {navLinks.map((navLink) => (
          <Link key={navLink.href} href={navLink.href}>
            <div className="flex flex-col items-center">
              <i className="material-symbols-outlined">{navLink.icon}</i>
              <span className="text-xs hidden">{navLink.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Layout
