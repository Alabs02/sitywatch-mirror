import NotificationsContent from "@/components/content/notifications/NotificationsContent"
import React, { useState } from "react"
// import NotificationsContent from "@/components/content/Notifications"

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("All")

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
  }

  return (
    <div className="w-full h-full grid grid-cols-12 gap-x-4 px-4">
      <section className="col-span-7 w-full h-full border border-red bg-gray-200">
        <nav className="flex p-4 items-center space-x-2 overflow-x-auto">
          <a
            href="#"
            className={`tab-link items-center justify-center p-1 w-[30px] inline-flex text-sm bg-slate-100 border border-gray-400 rounded-2 ${
              activeTab === "All" ? "active-tab text-green-600" : ""
            }`}
            onClick={() => handleTabClick("All")}
          >
            All
          </a>
          <a
            href="#"
            className={`tab-link items-center justify-center p-1  inline-flex text-sm bg-slate-100 border border-gray-400 rounded-2 ${
              activeTab === "Sertified" ? "active-tab text-green-600" : ""
            }`}
            onClick={() => handleTabClick("Sertified")}
          >
            Sertified
          </a>
          <a
            href="#"
            className={`tab-link items-center justify-center p-1 inline-flex text-sm bg-slate-100 border border-gray-400 rounded-2 ${
              activeTab === "Invites" ? "active-tab text-green-600" : ""
            }`}
            onClick={() => handleTabClick("Invites")}
          >
            Invites
          </a>
        </nav>
        {/* Content for each tab */}
        <div className="w-full h-full tab-content mt-4 px-4 shadow-inner shadow-gray-400/40 border rounded-t-[20px]">
          {activeTab === "All" && (
            <div>
              {" "}
              <NotificationsContent />{" "}
            </div>
          )}
          {activeTab === "Sertified" && <div>Certified Content</div>}
          {activeTab === "Invites" && <div>Invites Content</div>}
          {/* Add more content components as needed */}
        </div>
      </section>
      <section className="col-span-5 w-full h-full border border-red bg-gray-200 place-content-center">
        <h1 className="ml-10">CONTENT</h1>
      </section>
    </div>
  )
}

export default Notifications
