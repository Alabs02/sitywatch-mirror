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
      <nav className="flex p-4 items-center space-x-2">
        {/* Styled buttons for tabs */}
        <button
          className={`btn px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200 active:bg-gray-100 shadow-sm shadow-gray-400/20 ${
            activeTab === "All" ? "active font-bold text-white" : ""
          }`}
          onClick={() => handleTabClick("All")}
        >
          All
        </button>
        <button
          className={`btn px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200 active:bg-gray-100 shadow-sm shadow-gray-400/20 ${
            activeTab === "Satisfied" ? "active font-bold text-white" : ""
          }`}
          onClick={() => handleTabClick("Satisfied")}
        >
          Satisfied
        </button>
        <button
          className={`btn px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200 active:bg-gray-100 shadow-sm shadow-gray-400/20 ${
            activeTab === "Invites" ? "active font-bold text-white" : ""
          }`}
          onClick={() => handleTabClick("Invites")}
        >
          Invites
        </button>
        {/* ... Add more buttons here as needed ... */}
        <button
          className={`btn px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200 active:bg-gray-100 shadow-sm shadow-gray-400/20 ${
            activeTab === "Flowers" ? "active font-bold text-white" : ""
          }`}
          onClick={() => handleTabClick("Flowers")}
        >
          Pitches
        </button>
        <button
          className={`btn px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200 active:bg-gray-100 shadow-sm shadow-gray-400/20 ${
            activeTab === "Flowers" ? "active font-bold text-white" : ""
          }`}
          onClick={() => handleTabClick("Flowers")}
        >
          Gists
        </button>
        <button
          className={`btn px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200 active:bg-gray-100 shadow-sm shadow-gray-400/20 ${
            activeTab === "Flowers" ? "active font-bold text-white" : ""
          }`}
          onClick={() => handleTabClick("Flowers")}
        >
          Hypes
        </button>
        <button
          className={`btn px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200 active:bg-gray-100 shadow-sm shadow-gray-400/20 ${
            activeTab === "Flowers" ? "active font-bold text-white" : ""
          }`}
          onClick={() => handleTabClick("Flowers")}
        >
          Cites
        </button>
        <button
          className={`btn px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200 active:bg-gray-100 shadow-sm shadow-gray-400/20 ${
            activeTab === "Flowers" ? "active font-bold text-white" : ""
          }`}
          onClick={() => handleTabClick("Flowers")}
        >
          Recites
        </button>
        <button
          className={`btn px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-200 active:bg-gray-100 shadow-sm shadow-gray-400/20 ${
            activeTab === "More" ? "active font-bold text-white" : ""
          }`}
          onClick={() => handleTabClick("More")}
        >
          Flows
        </button>
      </nav>
      {/* Content for each tab */}
      <div className="w-full h-full tab-content p-4 shadow-inner shadow-gray-400/40 border rounded-t-[20px]">
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
