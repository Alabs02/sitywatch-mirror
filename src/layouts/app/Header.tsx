import React, { Fragment, FC, useState, useEffect } from "react"
import clsx from "clsx"
import Link from "next/link"
import HomeIcon from "@/components/atoms/HomeIcon"

interface HeaderProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

const texts = [
  "This is the first sentence.",
  "This is the second sentence.",
  "This is the third sentence.",
  "This is the fourth sentence.",
]

const Header: FC<HeaderProps> = ({ children, className, style }) => {
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
          "h-[137px] w-full px-2 md:px-6 sticky top-0 z-10",
          className,
        )}
        // style={{ backgroundImage: "url('/background-image.jfif')", ...style }}
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
          <div className="flex items-center mx-1 sm:mx-4">
            <div className="h-10 w-10">
              <img
                src="/header-images/search.svg"
                alt="Search"
                className="w-6 h-6 mr-4 cursor-pointer object-cover"
              />
            </div>
            <div className="h-10 w-10">
              <img
                src="/header-images/avatar.jpg"
                alt="Avatar"
                className="w-8 h-8 rounded-full mr-4 cursor-pointer object-cover"
                onClick={handleAvatarClick}
              />
            </div>
            <div className="h-10 w-10">
              <span className="material-symbols-outlined">list</span>
            </div>
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
            className="bg-white w-80 h-[70%] p-4 rounded shadow-lg transition-transform duration-300 transform translate-y-0 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <ul>
              <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200">
                <span className="material-symbols-outlined">
                  account_circle
                </span>
                <span className="ml-2">View my look</span>
              </li>
              <li className="p-2  cursor-pointer border-b border-gray-200">
                <div className="flex items-center mb-2 hover:bg-gray-100">
                  <img
                    src="/coreAssets/RightSection/YourSitadelsSection/OIP.jpeg"
                    alt="Nasir Monopoly Game Club"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-[12px]">
                      Nasir Monopoly Game Club
                    </span>
                    <span className="text-[12px] text-blue-900">@NasirMGC</span>
                  </div>
                </div>
                <div className="flex items-center hover:bg-gray-100">
                  <img
                    src="/coreAssets/RightSection/YourSitadelsSection/OIP.jpeg"
                    alt="Nasir Kingly Touch Photography"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-[12px]">
                      Nasir Kingly Touch Photography
                    </span>
                    <span className="text-[12px] text-blue-900">
                      @NKTPhotography
                    </span>
                  </div>
                </div>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                <span className="material-symbols-outlined">login</span>
                <span className="ml-2 font-bold text-sm">
                  Log into another look
                </span>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer ">
                <span className="material-symbols-outlined">add</span>
                <span className="ml-2 font-bold text-sm">
                  Create a new look
                </span>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200">
                <span className="material-symbols-outlined">add</span>
                <span className="ml-2 font-bold text-sm">
                  Build a new sitadel
                </span>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                <span className="material-symbols-outlined">settings</span>
                <span className="ml-2 font-bold text-sm">Settings</span>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                <span className="material-symbols-outlined">help</span>
                <span className="ml-2 font-bold text-sm">Help</span>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
                <span className="material-symbols-outlined">logout</span>
                <span className="ml-2 font-bold text-sm">Logout</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default Header
