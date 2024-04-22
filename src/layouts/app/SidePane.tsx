import React, { useState } from "react"
import Link from "next/link"

// Assuming Material UI icons are imported elsewhere in your project
import HomeIcon from "@mui/icons-material/Home"
import GistsIcon from "@mui/icons-material/Description" // Using DescriptionIcon as an alternative
import ExploreIcon from "@mui/icons-material/Explore"
import NotificationsIcon from "@mui/icons-material/Notifications"
import ChatIcon from "@mui/icons-material/Chat"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import PandaHeadIcon from "@mui/icons-material/Whatshot"

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
  initialIsOpen = false,
  className,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(initialIsOpen)

  const toggleSideNav = () => setInternalIsOpen(!isOpen)

  const navItems: SideNavItem[] = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/gists", label: "Gists", icon: GistsIcon },
    { href: "/notifications", label: "Notifications", icon: NotificationsIcon },
    { href: "/messages", label: "Messages", icon: ChatIcon },
    { href: "/explore", label: "Explore", icon: ExploreIcon },
    { href: "/bookmarks", label: "Bookmarks", icon: BookmarkBorderIcon },
    { href: "/panda-us", label: "Panda-Us", icon: PandaHeadIcon },
  ]

  return (
    <nav className={`w-[310px] px-2 sm:px-4 ${className} ${internalIsOpen ? "open" : ""}`}>
      <button className="toggleBtn rounded-full bg-primary-500 text-sm p-2" onClick={toggleSideNav}>
        Drop a Gist
      </button>
      <ul className="navList">
        {navItems.map((item) => (
          <li key={item.label} className="navItem py-4">
            <Link href={item.href} legacyBehavior>
              <a className="navLink">
                <item.icon fontSize="small" />{" "}
                {item.label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      {children} 
    </nav>
  )
}

export default SidePane
