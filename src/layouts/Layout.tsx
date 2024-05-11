import React, { ReactNode, FC, useState, useEffect } from "react"
import Link from "next/link"
import classnames from "classnames"
import Header from "./app/Header"
import clsx from "clsx"

interface NavLink {
  href: string
  label: string
  icon: string
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

  const handleLinkClick = (href: string) => {
    setActiveLink(href)
  }

  // useEffect to handle isCollapsed state based on activeLink
  useEffect(() => {
    setIsCollapsed(["/messages", "/explore"].includes(activeLink))
  }, [activeLink])

  const linkClasses = (isActive: boolean) =>
    classnames("text-lg", "font-medium", "flex", "items-center", "xl:gap-x-2", {
      // "text-hidden": isCollapsed, 
      "bg-gradient-to-b from-[#F24055] to-[#1E7881] bg-clip-text": isActive,
      "bg-clip-text text-transparent bg-gradient-to-b from-black to-black hover:from-primary-500 hover:to-secondary-500 font-medium transition-colors duration-[400ms]":
        !isCollapsed,
    })

 return (
   <div className="min-h-screen overflow-hidden">
     <Header />
     <div className="flex min-h-[calc(100vh-137px)] sticky">
       <aside
         className={classnames(
           "w-10 lg:w-80 xl:w-280 p-8 flex flex-col items-center xl:items-start gap-y-4 overflow-hidden transition-all duration-200 border border-[red] z-10", 
           {
             "flex-shrink": 0,
             "w-full lg:w-80 xl:w-280": !isCollapsed,
             fixed: isCollapsed,
             "w-full lg:w-[65px] xl:w-[65px]": isCollapsed,
           },
         )}
       >
         <button
           className={classnames(
             "p-3 lg:px-8 lg:py-2 rounded-full lg:rounded-3xl bg-gradient-to-b from-primary-500 to-secondary-500 text-primary-content font-medium text-[15px] grid place-items-center lg:flex lg:items-center lg:gap-x-2 shadow",
             { 
               ".collapsed &": {
                 padding: "8px", 
               },
               ".collapsed & .text-content": {
                 opacity: 0,
                 transition: "opacity 0.2s ease-in-out",
               },
               ".collapsed & .material-symbols-outlined": {
                 fontSize: "18px",
               },
             },
           )}
         >
           <span className="material-symbols-outlined text-[26px] lg:text-inherit">
             draft_orders
           </span>
           <span className={clsx("text-content", "hidden lg:inline")}>
             Drop a Gist
           </span>
         </button>

         {navLinks.map((navLink) => (
           <Link
             key={navLink.href}
             href={navLink.href}
             className={clsx(linkClasses(navLink.href === activeLink))}
             onClick={() => handleLinkClick(navLink.href)}
           >
             <i className="material-symbols-outlined">{navLink.icon}</i>
             <span
               className={clsx("collapsed:hidden lg:inline", {
                 hidden: isCollapsed,
               })}
             >
               {navLink.label}
             </span>
           </Link>
         ))}
       </aside>
       <main
         className={classnames(
           "flex-grow overflow-y-scroll mt-4 ml-4",
           isCollapsed ? "lg:w-3/4 xl:w-2/3" : "lg:w-full xl:w-full",
         )}
       >
         {children}
       </main>
     </div>
   </div>
 )



}

export default Layout
