import React, { Fragment, FC } from "react"
import clsx from "clsx"
import Image from "next/image"


interface HeaderProps {
  children?: React.ReactNode 
  className?: string 
}

const Header: FC<HeaderProps> = ({ children, className }) => {
  return (
    <Fragment>
      <header className={clsx("h-[137px] px-2 md:px-6", className)}>
        <div className="flex h-full items-center justify-between">
          <div className="">
            <Image
              src="/sclogo.svg" 
              alt="Organization Logo"
              width={50}
              height={50}
              className="rounded-full object-cover" 
              priority 
            />
          </div>

          {/* Center Section: Dynamic Text */}
          <div className="text-center border-l-2 border-gray-500 pl-4">
          {/* Logig for changing texts after secs */}
            <h1>Some text to be replaced</h1>
          </div>

          {/* Right Section: Search Icon, Avatar, Hamburger Menu */}
          <div className="flex items-center ml-4">
            <img
              src="./search.svg"
              alt="Search"
              className="w-6 h-6 mr-4 cursor-pointer" 
            />
            <img
              src="./avatar.jpg"
              alt="Avatar"
              className="w-8 h-8 rounded-full mr-4 cursor-pointer" 
            />
            <img
              src="./list.svg"
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
