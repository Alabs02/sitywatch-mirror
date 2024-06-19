import React, { useState } from "react"
import AvatarWithTextsAndIcon from "@/components/molecules/AvatarWithTexts"
import notificationsData from "../../data.json"
import Image from "next/image"
import RightSideComponent from "@/components/contents/RightSideComponent"

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

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
  }

  const notifications = notificationsData.notifications as Notification[]
  return (
    <div
      className="w-full h-full grid grid-cols-12 gap-x-4 px-4"
      // style={{ backgroundImage: "url('/background-image.jfif')" }}
    >
      <section className="col-span-8 w-full h-full flex flex-col overflow-y-auto">
        <nav className="flex p-4 items-center space-x-2 overflow-x-scroll scrollbar-hidden z-10 sticky top-0 backdrop-filter backdrop-blur-lg bg-opacity-50 bg-inherit">
          {/* Styled buttons for tabs */}
          <button
            className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
              activeTab === "All"
                ? "active shadow-md shadow-gray-400 bg-gray-100"
                : ""
            }`}
            onClick={() => handleTabClick("All")}
          >
            All
          </button>
          <button
            className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
              activeTab === "Satisfied"
                ? "active shadow-md shadow-gray-400 bg-gray-100"
                : ""
            }`}
            onClick={() => handleTabClick("Satisfied")}
          >
            Satisfied
          </button>
          <button
            className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
              activeTab === "Invites"
                ? "active shadow-md shadow-gray-400 bg-gray-100"
                : ""
            }`}
            onClick={() => handleTabClick("Invites")}
          >
            Invites
          </button>
          {/* ... Add more buttons here as needed ... */}
          <button
            className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
              activeTab === "Pitches"
                ? "active shadow-md shadow-gray-400 bg-gray-100"
                : ""
            }`}
            onClick={() => handleTabClick("Pitches")}
          >
            Pitches
          </button>
          <button
            className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
              activeTab === "Gists"
                ? "active shadow-md shadow-gray-400 bg-gray-100"
                : ""
            }`}
            onClick={() => handleTabClick("Gists")}
          >
            Gists
          </button>
          <button
            className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
              activeTab === "Hypes"
                ? "active shadow-md shadow-gray-400 bg-gray-100"
                : ""
            }`}
            onClick={() => handleTabClick("Hypes")}
          >
            Hypes
          </button>
          <button
            className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
              activeTab === "Cites"
                ? "active shadow-md shadow-gray-400 bg-gray-100"
                : ""
            }`}
            onClick={() => handleTabClick("Cites")}
          >
            Cites
          </button>
          <button
            className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
              activeTab === "Recites"
                ? "active shadow-md shadow-gray-400 bg-gray-100"
                : ""
            }`}
            onClick={() => handleTabClick("Recites")}
          >
            Recites
          </button>
          <button
            className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
              activeTab === "Flows"
                ? "active shadow-md shadow-gray-400 bg-gray-100"
                : ""
            }`}
            onClick={() => handleTabClick("Flows")}
          >
            Flows
          </button>
        </nav>
        {/* Content for each tab */}
        <div
          className="flex-1 w-full h-full tab-content p-4 shadow-inner shadow-gray-400/40 border rounded-t-[20px] overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {activeTab === "All" && (
            <div className="mt-4 flex flex-col gap-y-4">
              {notifications.map((notification) => (
                <article
                  key={notification.id}
                  className="flex items-center justify-between"
                >
                  {/* left */}
                  <div className="flex items-center space-x-2">
                    <div className="h-14 w-14 rounded-full overflow-hidden">
                      <Image
                        src={notification.avatarSrc}
                        alt="Notification image"
                        width={50}
                        height={50}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <div className="font-semibold">
                        <span className="text-secondary">
                          {notification.textUp}{" "}
                        </span>
                        {notification.textDown}
                      </div>
                      <div className="italic text-sm">
                        {notification.content}
                      </div>
                    </div>
                  </div>
                  {/* right */}
                  <div className="flex items-center space-x-2">
                    <span className="material-symbols-outlined">more_vert</span>
                  </div>
                </article>
              ))}
            </div>
          )}
          {activeTab === "Sertified" && <div>Certified Content</div>}
          {activeTab === "Invites" && <div>Invites Content</div>}
          {/* Add more content components as needed */}
        </div>
      </section>
      <section className="col-span-4 w-full h-full overflow-y-auto">
        <RightSideComponent />
      </section>
    </div>
  )
}

export default Notifications
