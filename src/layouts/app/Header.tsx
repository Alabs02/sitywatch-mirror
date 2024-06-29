import React, { Fragment, FC, useState, useEffect } from "react"
import clsx from "clsx"
import Link from "next/link"
import HomeIcon from "@/components/atoms/HomeIcon"
import Image from "next/image"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    // Update text index every 3 seconds
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearInterval(textInterval)
    }
  }, [])

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const currentText = texts[currentTextIndex]

  return (
    <Fragment>
      <header
        className={clsx(
          "h-[70px] lg:h-[100px] w-full px-2 md:px-4 sticky top-0 z-10 shadow-md md:shadow-none",
          className,
        )}
      >
        <div className="flex h-full items-center justify-between">
          <Link href={"/"} className="">
            <HomeIcon width={50} height={50} /> {/* Using HomeIcon component */}
          </Link>

          {/* Center Section: Dynamic Text */}
          <div className="md:flex text-center hidden">
            <div className="text-center">
              {loading ? (
                <Skeleton width={300} height={30} />
              ) : (
                <h1 className="h1-with-border">{currentText}</h1>
              )}
            </div>
          </div>

          {/* Right Section: Search Icon, Avatar, Dropdown */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="h-6 w-6 md:h-10 md:w-10">
              {loading ? (
                <Skeleton circle={true} height={24} width={24} />
              ) : (
                <Image
                  src="/header-images/search.svg"
                  alt="Search"
                  width={40}
                  height={40}
                  className="cursor-pointer object-cover md:w-10 md:h-10 w-6 h-6"
                />
              )}
            </div>
            <div className="h-6 w-6 md:h-10 md:w-10 rounded-full overflow-hidden">
              {loading ? (
                <Skeleton circle={true} height={24} width={24} />
              ) : (
                <Image
                  src="/header-images/avatar.jpg"
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="cursor-pointer object-cover md:w-10 md:h-10 w-6 h-6"
                  onClick={handleAvatarClick}
                />
              )}
            </div>

            <div className="h-6 w-6 md:h-10 md:w-10">
              {loading ? (
                <Skeleton circle={true} height={24} width={24} />
              ) : (
                <span className="material-symbols-outlined md:w-10 md:h-10 w-6 h-6">
                  list
                </span>
              )}
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
            className="bg-white w-80 h-full md:h-[70%] p-4 rounded shadow-lg transition-transform duration-300 transform translate-y-0 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <ul>
              <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200">
                <span className="material-symbols-outlined">
                  account_circle
                </span>
                <span className="ml-2">View my look</span>
              </li>
              <li className="p-2 cursor-pointer border-b border-gray-200">
                <div className="flex items-center mb-2 hover:bg-gray-100">
                  <Image
                    src="/coreAssets/RightSection/YourSitadelsSection/OIP.jpeg"
                    alt="Nasir Monopoly Game Club"
                    width={32}
                    height={32}
                    className="rounded-full mr-2"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-[12px]">
                      Nasir Monopoly Game Club
                    </span>
                    <span className="text-[12px] text-blue-900">@NasirMGC</span>
                  </div>
                </div>
                <div className="flex items-center hover:bg-gray-100">
                  <Image
                    src="/coreAssets/RightSection/YourSitadelsSection/OIP.jpeg"
                    alt="Nasir Kingly Touch Photography"
                    width={32}
                    height={32}
                    className="rounded-full mr-2"
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
              <li className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
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
