import React, { ReactNode, FC, useState, useEffect } from "react"
import Link from "next/link"
import classnames from "classnames"
import Header from "./app/Header"
import clsx from "clsx"
import CustomButton from "@/components/molecules/Btn"

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
  const [isHovered, setIsHovered] = useState(false)


  const handleLinkClick = (href: string) => {
    setActiveLink(href)
  }

  // useEffect to handle isCollapsed state based on activeLink
  useEffect(() => {
    setIsCollapsed(["/messages", "/explore"].includes(activeLink))
    setIsHovered(false)
  }, [activeLink])

  const linkClasses = (isActive: boolean, isHovered: boolean) =>
    classnames("text-lg", "font-medium", "flex", "items-center", "xl:gap-x-2", {
      "bg-gradient-to-b from-[#F24055] to-[#1E7881] bg-clip-text":
        isActive && !isHovered,
      "bg-clip-text text-transparent bg-gradient-to-b from-black to-black hover:from-primary-500 hover:to-secondary-500 font-medium transition-colors duration-[400ms]":
        !isActive || isHovered,
    })


 return (
   <div className="min-h-screen overflow-hidden">
     <Header />
     <div className="flex min-h-[calc(100vh-137px)] sticky">
       <aside
         className={classnames(
           "p-8 flex flex-col items-center xl:items-start gap-y-4 overflow-hidden transition-all duration-200 border border-[red] z-10",
           {
             "flex-shrink": 0,
             "w-full lg:w-80 xl:w-280": !isCollapsed,
             fixed: isCollapsed,
             "h-full w-full lg:w-[85px]": isCollapsed,
           },
         )}
       >
         <CustomButton isCollapsed={isCollapsed} />

         {navLinks.map((navLink) => (
           <Link
             key={navLink.href}
             href={navLink.href}
             className={clsx(
               "transition-all duration-[450ms]",
               linkClasses(
                 navLink.href === activeLink,
                 navLink.href === activeLink && isHovered,
               ),
             )}
             onClick={() => handleLinkClick(navLink.href)}
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}
           >
             <i className="material-symbols-outlined">{navLink.icon}</i>
             <span
               className={clsx("collapsed:hidden", {
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
           isCollapsed
             ? "lg:w-3/4 xl:w-2/3 lg:ml-[120px]"
             : "lg:w-full xl:w-full",
           { overflow: "hidden" },
         )}
       >
         {children}
       </main>
     </div>
   </div>
 )



}

export default Layout
