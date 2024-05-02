import React, { ReactNode, FC } from "react"
import Link from "next/link"

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen overflow-hidden">
      <nav className="bg-inherit shadow-md h-[80px] flex items-center px-8">
        <p className="font-semibold text-xl uppercase">Scout City</p>
      </nav>

      <div className="flex min-h-[calc(100vh-80px)]">
        <aside className="w-full lg:w-[80px] xl:w-[280px] shadow-md p-8 flex flex-col items-center xl:items-start gap-y-4 overflow-hidden transition-all duration-500">
          <Link
            href={"/"}
            className="active:text-blue-500 text-lg font-medium hover:text-blue-500 transition-colors duration-300 flex items-center xl:gap-x-2"
          >
            <div className="h-10 w-10 overflow-hidden grid place-items-center">
              <span className="material-symbols-outlined">home_work</span>
            </div>

            <span className="hidden xl:inline-block transition-all duration-[450ms]">
              Home
            </span>
          </Link>
          <Link
            href={"/about"}
            className="active:text-blue-500 text-lg font-medium hover:text-blue-500 transition-colors duration-300 flex items-center xl:gap-x-2"
          >
            <div className="h-10 w-10 overflow-hidden grid place-items-center">
              <span className="material-symbols-outlined">diversity_3</span>
            </div>

            <span className="hidden xl:inline-block transition-all duration-[450ms]">
              About
            </span>
          </Link>
          <Link
            href={"/messages"}
            className="active:text-blue-500 text-lg font-medium hover:text-blue-500 transition-colors duration-300 flex items-center xl:gap-x-2"
          >
            <div className="h-10 w-10 overflow-hidden grid place-items-center">
              <span className="material-symbols-outlined">forum</span>
            </div>

            <span className="hidden xl:inline-block transition-all duration-[450ms]">
              Messages
            </span>
          </Link>
          <Link
            href={"/notifications"}
            className="active:text-blue-500 text-lg font-medium hover:text-blue-500 transition-colors duration-300 flex items-center xl:gap-x-2"
          >
            <div className="h-10 w-10 overflow-hidden grid place-items-center">
              <span className="material-symbols-outlined">notifications</span>
            </div>
            <span className="hidden xl:inline-block transition-all duration-[450ms]">
              Notifications
            </span>
          </Link>
        </aside>

        <main className="w-[100%] lg:w-[calc(100%-80px)] xl:w-[calc(100%-280px)] col-span-10 border">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
