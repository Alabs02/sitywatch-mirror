import React, { useState } from "react";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import GistsIcon from "@mui/icons-material/Description";
import ExploreIcon from "@mui/icons-material/Explore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PandaHeadIcon from "@mui/icons-material/Whatshot";
import { EditNotificationsSharp } from "@mui/icons-material";
import { useRouter } from "next/router";

interface SidePaneProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  initialIsOpen?: boolean;
  className?: string;
}

interface SideNavItem {
  href: string;
  label: string;
  icon: React.ComponentType<any>;
}

const SidePane: React.FC<SidePaneProps> = ({
  children,
  isOpen = true,
  initialIsOpen = true,
  className,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(initialIsOpen);
  const router = useRouter();

  const toggleSideNav = () => setInternalIsOpen(!internalIsOpen);

  const navItems: SideNavItem[] = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/gists", label: "Gists", icon: GistsIcon },
    { href: "/notifications", label: "Notifications", icon: NotificationsIcon },
    { href: "/panda-us", label: "Panda-Us", icon: PandaHeadIcon },
    { href: "/messages", label: "Messages", icon: ChatIcon },
    { href: "/explore", label: "Explore", icon: ExploreIcon },
    { href: "/bookmarks", label: "Bookmarks", icon: BookmarkBorderIcon },
  ];

  return (
    <nav
      className={`fixed lg:relative w-[310px] mx-2 sm:mx-6 ${className} ${
        internalIsOpen ? "open" : ""
      }`}
    >
      <button
        className={`toggleBtn rounded-full text-sm px-4 py-1 bg-gradient-to-b from-[#F24055] to-[#1E7881] flex items-center mb-4`}
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
            <Link href={item.href}>
              <a
                className={`
                  navLink inline-flex rounded-md
                  text-gray-700
                  group-hover:text-white
                  ${
                    item.href === router.pathname
                      ? "active gradient-text"
                      : "group-hover:gradient-text"
                  }
                `}
              >
                <item.icon fontSize="small" className="mr-2" />
                <span>{item.label}</span>
              </a>
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
          transition: background-image 0.7s ease-in-out;
          background-image: linear-gradient(to bottom, #f24055, #1e7881);
        }
      `}</style>
    </nav>
  );
};

export default SidePane;
