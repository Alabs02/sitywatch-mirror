import React, { useState, useEffect } from "react"
import Image from "next/image"
import RightSideComponent from "@/components/contents/RightSideComponent"
import notificationsData from "../../data.json"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

interface Notification {
  id: number
  avatarSrc: string
  textUp: string
  textDown: string
  content: string
  icons: string[]
  action: string[]
  iconText: string
}

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("All")
  const [loading, setLoading] = useState(true)

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
  }

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const notifications = notificationsData.notifications as Notification[]

  // Define all navigation links
  const navLinks = [
    { name: "All", label: "All" },
    { name: "Satisfied", label: "Satisfied" },
    { name: "Invites", label: "Invites" },
    { name: "Pitches", label: "Pitches" },
    { name: "Gists", label: "Gists" },
    { name: "Hypes", label: "Hypes" },
    { name: "Cites", label: "Cites" },
    { name: "Recites", label: "Recites" },
    { name: "Flows", label: "Flows" },
    // Add more links as needed
  ]

  return (
    <div className="w-full h-full grid grid-cols-12 gap-x-4 px-4">
      {/* Left Section */}
      <section className="col-span-12 lg:col-span-8 w-full h-full flex flex-col overflow-y-auto">
        {/* Tabs Navigation */}
        <nav className="flex p-2 items-center space-x-2 overflow-x-auto scrollbar-hidden z-10 sticky top-0 backdrop-filter backdrop-blur-lg bg-opacity-50 bg-inherit">
          {/* Render all navigation links */}
          {navLinks.map((link) => (
            <button
              key={link.name}
              className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
                activeTab === link.name
                  ? "active shadow-md shadow-gray-400"
                  : ""
              }`}
              onClick={() => handleTabClick(link.name)}
            >
              {link.label}
            </button>
          ))}
        </nav>
        {/* Content for each tab */}
        <div className="flex-1 w-full h-full tab-content p-4 shadow-inner shadow-gray-400/40 border rounded-t-[20px] overflow-y-auto space-y-4 mb-4">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-tertiary-200 p-1 lg:border-none"
                >
                  {/* Skeleton for left section */}
                  <div className="flex items-center space-x-2">
                    <Skeleton circle={true} height={56} width={56} />
                    <div className="flex flex-col ml-2">
                      <Skeleton width={100} />
                      <Skeleton width={150} />
                    </div>
                  </div>
                  {/* Skeleton for right section */}
                  <Skeleton width={20} height={20} />
                </div>
              ))}
            </div>
          ) : (
            notifications.map((notification) => (
              <article
                key={notification.id}
                className="flex items-center justify-between border-b border-tertiary-200 p-1 lg:border-none"
              >
                {/* Left */}
                <div className="flex items-center space-x-2">
                  <div className="h-10 md:h-14 w-10 md:w-14 rounded-full overflow-hidden">
                    <Image
                      src={notification.avatarSrc}
                      alt="Notification image"
                      width={50}
                      height={50}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col ml-2">
                    <span className="text-secondary text-sm ">
                      {notification.textUp}
                    </span>
                    <span className="text-xs md:text-sm">
                      {notification.textDown}
                    </span>
                  </div>
                  <div className="italic text-sm">{notification.content}</div>
                </div>
                {/* Right */}
                <div className="flex items-center">
                  <span className="material-symbols-outlined">more_vert</span>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
      {/* Right Section (Visible on LG screens and above) */}
      <section className="col-span-12 lg:col-span-4 w-full h-full overflow-y-auto hidden lg:block">
        <RightSideComponent />
      </section>
    </div>
  )
}

export default Notifications
