import React, { useState } from "react"
import Link from "next/link"
import HomeIcon from "@mui/icons-material/Home"
import GistsIcon from "@mui/icons-material/Description"
import ExploreIcon from "@mui/icons-material/Explore"
import NotificationsIcon from "@mui/icons-material/Notifications"
import ChatIcon from "@mui/icons-material/Chat"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import PandaHeadIcon from "@mui/icons-material/Whatshot"
import { EditNotificationsSharp } from "@mui/icons-material"
import { useRouter } from "next/router"

// ICONS
// import HomeIcon from "@/components/atoms/HomeIcon"

interface SidePaneProps {
  children?: React.ReactNode
  isOpen?: boolean
  initialIsOpen?: boolean
  className?: string
}

interface SideNavItem {
  href: string
  label: string
  icon: React.ComponentType<any> // Type for Material UI icon component
}

const SidePane: React.FC<SidePaneProps> = ({
  children,
  isOpen = false,
  initialIsOpen = true,
  className,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(initialIsOpen)

  const toggleSideNav = () => setInternalIsOpen(!isOpen)

  const navItems: SideNavItem[] = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/gists", label: "Gists", icon: GistsIcon },
    { href: "/notifications", label: "Notifications", icon: NotificationsIcon },
    { href: "/panda-us", label: "Panda-Us", icon: PandaHeadIcon },
    { href: "/messages", label: "Messages", icon: ChatIcon },
    { href: "/explore", label: "Explore", icon: ExploreIcon },
    { href: "/bookmarks", label: "Bookmarks", icon: BookmarkBorderIcon },
  ]

  return (
    <nav
      className={`w-[310px] mx-2 sm:mx-6 ${className} ${
        internalIsOpen ? "open" : ""
      }`}
    >
      <button
        className={`toggleBtn rounded-full text-sm px-4 py-1 bg-gradient-to-b from-[#F24055] to-[#1E7881] flex items-center`}
        onClick={toggleSideNav}
      >
        <EditNotificationsSharp
          fontSize="small"
          style={{ marginRight: "4px" }}
        />
        Drop a Gist
      </button>

      <ul className="navList">
        {navItems.map((item) => (
          <li key={item.label} className="navItem py-2 md:py-4 group">
            {/* Use Link with legacyBehavior and passHref */}
            <Link href={item.href} passHref legacyBehavior>
              <span
                className={`
        navLink inline-flex rounded-md
        text-gray-700
        group-hover:text-white
        ${
          // Apply gradient on hover and active states
          item.href === useRouter().pathname
            ? "active gradient-text"
            : "group-hover:gradient-text"
        }
      `}
              >
                <item.icon fontSize="small" className="mr-2" />
                <span>{item.label}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {children}
      <style jsx global>{`
        .gradient-text {
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          transition: background-image 0.3s ease-in-out;
          background-image: linear-gradient(to bottom, #f24055, #1e7881);
        }
      `}</style>
    </nav>
  )
}

export default SidePane
