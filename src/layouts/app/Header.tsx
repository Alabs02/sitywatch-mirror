import React, { Fragment, FC, useState, useEffect } from "react"
import clsx from "clsx"
import Link from "next/link"
import Image from "next/image"
import HomeIcon from "@/components/atoms/HomeIcon" // Assuming HomeIcon is a custom component

interface HeaderProps {
  children?: React.ReactNode
  className?: string
}

const texts = [
  "This is the first sentence.",
  "This is the second sentence.",
  "This is the third sentence.",
  "This is the fourth sentence.",
]

const Header: FC<HeaderProps> = ({ children, className }) => {
  const [currentText, setCurrentText] = useState(texts[0])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (texts.indexOf(currentText) + 1) % texts.length
      setCurrentText(texts[nextIndex])
    }, 3000)

    return () => clearInterval(intervalId)
  }, [currentText])

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <Fragment>
      <header
        className={clsx(
          "h-[137px] px-2 md:px-6 border border-[red] sticky",
          className,
        )}
      >
        <div className="flex h-full items-center justify-between">
          <Link href={"/"} className="">
            <HomeIcon width={50} height={50} /> {/* Using HomeIcon component */}
          </Link>

          {/* Center Section: Dynamic Text */}
          <div className="text-center pl-4">
            <h1 className="h1-with-border">{currentText}</h1>
          </div>

          {/* Right Section: Search Icon, Avatar, Dropdown */}
          <div className="relative flex items-center ml-4">
            <img
              src="/header-images/search.svg"
              alt="Search"
              className="w-6 h-6 mr-4 cursor-pointer object-cover"
            />
            <img
              src="/header-images/avatar.jpg"
              alt="Avatar"
              className="w-8 h-8 rounded-full mr-4 cursor-pointer object-cover"
              onClick={handleAvatarClick}
            />
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 rounded-lg bg-white shadow-md transition ease-in-out duration-300">
                {/* Dummy Dropdown Content */}
                <ul className="py-1">
                  <li className="px-4 py-2 hover:bg-gray-100">Menu Item 1</li>
                  <li className="border-t border-b px-4 py-2 hover:bg-gray-100">
                    Menu Item 2
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">Menu Item 3</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    </Fragment>
  )
}

export default Header
