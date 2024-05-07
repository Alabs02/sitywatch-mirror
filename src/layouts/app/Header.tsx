import React, { Fragment, FC, useState, useEffect } from "react"
import clsx from "clsx"
import Image from "next/image"
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
];



const Header: FC<HeaderProps> = ({ children, className }) => {
const [currentText, setCurrentText] = useState(texts[0]); 
useEffect(() => {
  const intervalId = setInterval(() => {
    const nextIndex = (texts.indexOf(currentText) + 1) % texts.length
    if (nextIndex === texts.length) {
      setCurrentText(texts[0])
    } else {
      setCurrentText(texts[nextIndex])
    }
    console.log("Current Text:", currentText)
  }, 3000)

  return () => clearInterval(intervalId)
}, [currentText])




  return (
    <Fragment>
      <header className={clsx("h-[137px] px-2 md:px-6 sticky top-0", className)}>
        <div className="flex h-full items-center justify-between">
          <div className="">
            <HomeIcon width={50} height={50} />
          </div>

          {/* Center Section: Dynamic Text */}
          <div className="text-center pl-4 ">
            {/* Logig for changing texts after secs */}
            <h1 className="h1-with-border">{currentText}</h1>
          </div>

          {/* Right Section: Search Icon, Avatar, Hamburger Menu */}
          <div className="flex items-center ml-4">
            <img
              src="./header-images/search.svg"
              alt="Search"
              className="w-6 h-6 mr-4 cursor-pointer"
            />
            <img
              src="./header-images/avatar.jpg"
              alt="Avatar"
              className="w-8 h-8 rounded-full mr-4 cursor-pointer"
            />
            <img
              src="./header-images/list.svg"
              alt="Menu"
              className="w-6 h-6 cursor-pointer"
            />
          </div>
        </div>
      </header>
    </Fragment>
  )
}

export default Header
