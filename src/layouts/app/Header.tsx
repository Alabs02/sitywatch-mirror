import React, { Fragment, FC, useState, useEffect } from "react"
import clsx from "clsx"
import Link from "next/link"
import HomeIcon from "@/components/atoms/HomeIcon"

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
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
    console.log("Dropdown Open State:", isDropdownOpen)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, 3000)

    return () => clearInterval(intervalId)
  }, [])

  const currentText = texts[currentTextIndex]

  return (
    <Fragment>
      <header
        className={clsx(
          "h-[137px] w-full px-2 md:px-6 sticky",
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
            <span className="material-symbols-outlined">list</span>
          </div>
        </div>
      </header>

      {/* Overlay and Dropdown Menu */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end"
          onClick={handleAvatarClick}
        >
          <div
            className="bg-white w-64 p-4 rounded shadow-lg transition-transform duration-1000 transform translate-y-0 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <ul>
              <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                <span className="material-symbols-outlined">link</span>
                <Link href="/" className="ml-2">
                  Home
                </Link>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                <span className="material-symbols-outlined">link</span>
                <Link href="/profile" className="ml-2">
                  Profile
                </Link>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                <span className="material-symbols-outlined">link</span>
                <Link href="/settings" className="ml-2">
                  Settings
                </Link>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                <span className="material-symbols-outlined">link</span>
                <Link href="/logout" className="ml-2">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default Header
