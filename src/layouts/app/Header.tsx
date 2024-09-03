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
  "#HIFL Registration is still ongoing for higher institutions. Registration ends 20th April",
  "Henry Oandoka has been announced as Best player of #NUGAFootbal 2024",
  "#SitwatchBeautyPageant2023 has released the list of finalists",
  "This would be the last in the array. #Extra.",
]

const Header: FC<HeaderProps> = ({ children, className, style }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [fadeState, setFadeState] = useState("fade-enter")

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    // Update text index every 3 seconds with fade transition
    const textInterval = setInterval(() => {
      setFadeState("fade-exit")
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
        setFadeState("fade-enter")
      }, 700) // Duration of fade-out
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearInterval(textInterval)
    }
  }, [])

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const currentText = texts[currentTextIndex].split(" ").map((word, index) =>
    word.startsWith("#") ? (
      <span key={index} className="text-secondary">
        {word}{" "}
      </span>
    ) : (
      word + " "
    ),
  )

  return (
    <Fragment>
      <header
        className={clsx(
          "h-[70px] lg:h-[100px] w-full px-2 md:px-4 sticky top-0 z-10 shadow-md md:shadow-none",
          className,
        )}
        style={style}
      >
        <div className="flex h-full items-center justify-between">
          <Link href={"/welcome"} className="">
            <HomeIcon width={50} height={50} /> {/* Using HomeIcon component */}
          </Link>

          {/* Center Section: Dynamic Text */}
          <div className="md:flex hidden justify-center w-full">
            <div className="flex items-center text-container">
              <span className="font-bold text-lg md:text-xl">411</span>
              <div className="border-l-2 border-black mx-2 h-8"></div>
              {loading ? (
                <Skeleton width={300} height={30} />
              ) : (
                <h1
                  className={`text-sm max-w-full md:max-w-md leading-tight ${fadeState}`}
                >
                  {currentText}
                </h1>
              )}
            </div>
          </div>

          {/* Right Section: Search Icon, Avatar, Dropdown */}
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 flex items-center justify-center">
              {loading ? (
                <Skeleton circle={true} height={40} width={40} />
              ) : (
                <Image
                  src="/header-images/search.svg"
                  alt="Search"
                  width={40}
                  height={40}
                  className="cursor-pointer object-cover"
                />
              )}
            </div>
            <div className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center">
              {loading ? (
                <Skeleton circle={true} height={40} width={40} />
              ) : (
                <Image
                  src="/header-images/avatar.jpg"
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="cursor-pointer object-cover"
                  onClick={handleAvatarClick}
                />
              )}
            </div>
            <div className="h-10 w-10 flex items-center justify-center">
              {loading ? (
                <Skeleton circle={true} height={40} width={40} />
              ) : (
                <span className="material-symbols-outlined text-2xl md:text-4xl">list</span>
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
            className="bg-white p-4 rounded shadow-lg transition-transform duration-300 transform translate-y-0 opacity-100 md:w-80 w-[70%] sm:w-[60%] sm:h-auto md:h-auto h-auto sm:top-0 top-2 sm:right-2 right-0"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: "65vh", overflowY: "auto" }}
          >
            <ul className="text-xs sm:text-sm md:text-base">
              <li className="flex items-center p-1 sm:p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200">
                <span className="material-symbols-outlined text-xs sm:text-sm md:text-lg">
                  account_circle
                </span>
                <span className="ml-1 sm:ml-2">View my look</span>
              </li>
              <li className="cursor-pointer border-b border-gray-200">
                <div className="flex items-center hover:bg-gray-100">
                  <div className="flex items-center">
                    <img
                      src="/coreAssets/RightSection/YourSitadelsSection/OIP.jpeg"
                      alt="Nasir Monopoly Game Club"
                      className="object-cover rounded-full mr-1 h-6 md:h-8 w-6 md:w-8"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-[10px] sm:text-[12px]">
                      Nasir Monopoly Game Club
                    </span>
                    <span className="text-[10px] sm:text-[12px] text-blue-900">
                      @NasirMGC
                    </span>
                  </div>
                </div>
                <div className="flex items-center hover:bg-gray-100">
                  <div className="flex items-center">
                    <img
                      src="/coreAssets/RightSection/YourSitadelsSection/OIP.jpeg"
                      alt="Nasir Monopoly Game Club"
                      className="object-cover rounded-full mr-1 h-6 md:h-8 w-6 md:w-8"
                    />
                  </div>
                  <Link href="/affairs" className="flex flex-col">
                    <span className="font-semibold text-[10px] sm:text-[12px]">
                      Nasir Kingly Touch Photography
                    </span>
                    <span className="text-[10px] sm:text-[12px] text-blue-900">
                      @NKTPhotography
                    </span>
                  </Link>
                </div>
              </li>
              <li className="flex items-center p-1 hover:bg-gray-100 cursor-pointer">
                <span className="material-symbols-outlined text-xs sm:text-sm md:text-lg">
                  login
                </span>
                <span className="ml-1 sm:ml-2 font-bold text-xs sm:text-sm">
                  Log into another look
                </span>
              </li>
              <li className="flex items-center p-1 hover:bg-gray-100 cursor-pointer">
                <span className="material-symbols-outlined text-xs sm:text-sm md:text-lg">
                  add
                </span>
                <Link href="/create-account">
                  <span className="ml-1 sm:ml-2 font-bold text-xs sm:text-sm">
                    Create a new look
                  </span>
                </Link>
              </li>
              <li className="flex items-center p-1 sm:p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200">
                <span className="material-symbols-outlined text-xs sm:text-sm md:text-lg">
                  add
                </span>
                <Link href="/build-sitadel">
                  <span className="ml-1 sm:ml-2 font-bold text-xs sm:text-sm">
                    Build a new sitadel
                  </span>
                </Link>
              </li>
              <li className="flex items-center p-1 hover:bg-gray-100 cursor-pointer">
                <span className="material-symbols-outlined text-xs sm:text-sm md:text-lg">
                  settings
                </span>
                <span className="ml-1 sm:ml-2 font-bold text-xs sm:text-sm">
                  Settings
                </span>
              </li>
              <li className="flex items-center p-1 hover:bg-gray-100 cursor-pointer">
                <span className="material-symbols-outlined text-xs sm:text-sm md:text-lg">
                  help
                </span>
                <span className="ml-1 sm:ml-2 font-bold text-xs sm:text-sm">
                  Help
                </span>
              </li>
              <Link href="/">
                <li className="flex items-center p-1 hover:bg-gray-100 cursor-pointer">
                  <span className="material-symbols-outlined text-xs sm:text-sm md:text-lg">
                    logout
                  </span>
                  <span className="ml-1 sm:ml-2 font-bold text-xs sm:text-sm pb-1">
                    Logout
                  </span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default Header
