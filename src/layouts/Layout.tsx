import React, { ReactNode, FC, useState, useEffect } from "react"
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
  { href: "/", label: "Home", icon: "home_app_logo" },
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

  useEffect(() => {
    console.log({ isCollapsed })
  }, [])

  return (
    <div className="min-h-screen overflow-hidden">
      <Header />

      <div className="w-full min-h-[calc(100vh-137px)] flex">
        <motion.div
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className={clsx(
            "hidden lg:flex lg:flex-col gap-y-8 shadow",
            isCollapsed
              ? "lg:items-center lg:!w-[80px]"
              : "xl:items-start xl:!w-[280px] px-6",
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
            ) : (
              <></>
            )}
          </button>

          <div
            className={clsx(
              "flex flex-col gap-y-8",
              isCollapsed ? "items-center" : "items-start",
            )}
          >
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
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={asPath}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex-1 border border-green-500 overflow-y-auto"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Layout
