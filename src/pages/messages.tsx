import Dispatches from "@/components/contents/messages/Dispatches"
import Invites from "@/components/contents/messages/Invites"
import Plugs from "@/components/contents/messages/Plugs"
import Whispers from "@/components/contents/messages/Whispers"
import WTS from "@/components/contents/messages/WTS"
import React, { useState } from "react"

const Message = () => {
  const [activeTab, setActiveTab] = useState("WHISPERS")

  const handleTabClick = (tabName: React.SetStateAction<string>) => {
    setActiveTab(tabName)
  }

  return (
    <div className="h-full w-full shadow-inner shadow-tertiary-400/30 rounded-t-[10px] p-1">
      <div className="grid grid-cols-2 h-full w-full px-1 md:px-2">
        <section className="col-span-2 lg:col-span-1 overflow-y-auto h-full">
          <nav className="flex flex-col p-[5%] items-center space-x-4 sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-50 bg-inherit">
            <div className="lg:flex flex-col md:flex-row items-center border-b-2 border-gray-400 w-full hidden text-sm xl:text-lg">
              <div className="flex items-center">
                <span className="material-symbols-outlined">edit_square</span>
                <button
                  className={`tab-link mr-2 border-r-2 border-gray-400 py-2 px-3 w-full md:w-auto text-center md:text-left ${
                    activeTab === "" ? "active-tab text-secondary" : ""
                  }`}
                  onClick={() => handleTabClick("SEND_MESSAGE")}
                >
                  SEND A NEW MESSAGE
                </button>
              </div>
              <div className="flex items-center">
                <span className="material-symbols-outlined">manage_search</span>
                <button
                  className={`tab-link px-3 w-full md:w-auto text-center md:text-left ${
                    activeTab === "" ? "active-tab text-secondary" : ""
                  }`}
                  onClick={() => handleTabClick("SEARCH_MESSAGE")}
                >
                  SEARCH MESSAGE
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 md:mt-0">
              <button
                className={`tab-link flex-grow px-1 md:px-3 py-1 md:py-2 mr-2 border-r-2 border-gray-400 text-xs md:text-sm xl:text-xl ${
                  activeTab === "WHISPERS" ? "active-tab text-secondary" : ""
                }`}
                onClick={() => handleTabClick("WHISPERS")}
              >
                WHISPERS
              </button>
              <button
                className={`tab-link flex-grow px-1 md:px-3 py-1 md:py-2 mr-2 border-r-2 border-gray-400 text-xs md:text-sm xl:text-xl ${
                  activeTab === "INVITES" ? "active-tab text-secondary" : ""
                }`}
                onClick={() => handleTabClick("INVITES")}
              >
                INVITES
              </button>
              <button
                className={`tab-link flex-grow px-1 md:px-3 py-1 md:py-2 mr-2 border-r-2 border-gray-400 text-xs md:text-sm xl:text-xl ${
                  activeTab === "DISPATCHES" ? "active-tab text-secondary" : ""
                }`}
                onClick={() => handleTabClick("DISPATCHES")}
              >
                DISPATCHES
              </button>
              <button
                className={`tab-link flex-grow px-1 md:px-3 py-1 md:py-2 text-xs md:text-sm xl:text-xl mr-2 ${
                  activeTab === "PLUGS" ? "active-tab text-secondary" : ""
                }`}
                onClick={() => handleTabClick("PLUGS")}
              >
                PLUGS
              </button>
            </div>
          </nav>
          <div className="w-full h-full tab-content mt-2 px-1 md:px-1 overflow-y-auto">
            {activeTab === "WHISPERS" && <Whispers />}
            {activeTab === "INVITES" && <Invites />}
            {activeTab === "DISPATCHES" && <Dispatches />}
            {activeTab === "PLUGS" && <Plugs />}
          </div>
        </section>
        <section className="bg-neutral-300 col-span-1 overflow-y-auto h-full hidden lg:flex">
          <div className="w-full h-full tab-content mt-4 px-4 place-content-center">
            {activeTab === "WHISPERS" && <WTS />}
            {activeTab === "INVITES" && <Invites />}
            {activeTab === "DISPATCHES" && <Dispatches />}
            {activeTab === "PLUGS" && <Plugs />}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Message
