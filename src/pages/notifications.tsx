import React, { useState } from "react"
import AvatarWithTextsAndIcon from "@/components/molecules/AvatarWithTexts"
import notificationsData from "../../data.json"

interface Notification {
  id: number
  avatarSrc: string
  textUp: string
  textDown: string
  content: string
  icons: string[]
  action: string[]
  iconText:string
}

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("All")

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
  }

  const notifications = notificationsData.notifications as Notification[]
return (
  <div className="w-full h-full grid grid-cols-12 gap-x-4 px-4">
    <section className="col-span-7 w-full h-full border border-red bg-gray-200">
      <nav className="flex p-4 items-center space-x-2 overflow-x-scroll scrollbar-hidden">
        {/* Styled buttons for tabs */}
        <button
          className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
            activeTab === "All" ? "active shadow-md shadow-gray-400 bg-gray-100" : ""
          }`}
          onClick={() => handleTabClick("All")}
        >
          All
        </button>
        <button
          className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
            activeTab === "Satisfied" ? "active shadow-md shadow-gray-400 bg-gray-100" : ""
          }`}
          onClick={() => handleTabClick("Satisfied")}
        >
          Satisfied
        </button>
        <button
          className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
            activeTab === "Invites" ? "active shadow-md shadow-gray-400 bg-gray-100" : ""
          }`}
          onClick={() => handleTabClick("Invites")}
        >
          Invites
        </button>
        {/* ... Add more buttons here as needed ... */}
        <button
          className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
            activeTab === "Pitches" ? "active shadow-md shadow-gray-400 bg-gray-100" : ""
          }`}
          onClick={() => handleTabClick("Pitches")}
        >
          Pitches
        </button>
        <button
          className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
            activeTab === "Gists" ? "active shadow-md shadow-gray-400 bg-gray-100" : ""
          }`}
          onClick={() => handleTabClick("Gists")}
        >
          Gists
        </button>
        <button
          className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
            activeTab === "Hypes" ? "active shadow-md shadow-gray-400 bg-gray-100" : ""
          }`}
          onClick={() => handleTabClick("Hypes")}
        >
          Hypes
        </button>
        <button
          className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
            activeTab === "Cites" ? "active shadow-md shadow-gray-400 bg-gray-100" : ""
          }`}
          onClick={() => handleTabClick("Cites")}
        >
          Cites
        </button>
        <button
          className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
            activeTab === "Recites" ? "active shadow-md shadow-gray-400 bg-gray-100" : ""
          }`}
          onClick={() => handleTabClick("Recites")}
        >
          Recites
        </button>
        <button
          className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
            activeTab === "Flows" ? "active shadow-md shadow-gray-400 bg-gray-100" : ""
          }`}
          onClick={() => handleTabClick("Flows")}
        >
          Flows
        </button>
      </nav>
      {/* Content for each tab */}
      <div
        className="w-full h-full tab-content p-4 shadow-inner shadow-gray-400/40 border rounded-t-[20px]"
        style={{ scrollbarWidth: "none" }}
      >
        {activeTab === "All" &&
          notifications.map((notification) => (
            <div key={notification.id} className="flex items-center">
              {/* Avatar with texts */}
              <div className="flex items-center w-full justify-between">
                <div className="flex-shrink-0">
                  <AvatarWithTextsAndIcon
                    avatarSrc={notification.avatarSrc}
                    textUp={notification.textUp}
                    textDown={notification.textDown}
                    icon={notification.icons[2]}
                    action={notification.action[0]}
                    iconText={""}
                  />
                </div>
                <div className="flex-shrink">{/* Adjusted here */}</div>
              </div>
            </div>
          ))}
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
