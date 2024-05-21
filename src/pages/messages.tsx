import Dispatches from "@/components/contents/messages/Dispatches"
import Invites from "@/components/contents/messages/Invites"
import Plugs from "@/components/contents/messages/Plugs"
import Whispers from "@/components/contents/messages/Whispers"
import WTS from "@/components/contents/messages/WTS"
import React, { useState } from "react"

const message = () => {
    const [activeTab, setActiveTab] = useState("WHISPERS")

    const handleTabClick = (tabName: string) => {
      setActiveTab(tabName)
    }
  return (
    <div className="h-full w-full shadow-inner shadow-tertiary-400/30 rounded-t-[10px] p-1">
      <div className="grid grid-cols-2 h-full w-ful px-2]">
        <section className="bg-tertiary-100 col-span-1">
          <nav className="flex p-4 items-center space-x-4 flex-col">
            <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-auto border-b border-gray-800 divide-x divide-tertiary-600">
              <button
                
                className={`tab-link w-full md:w-auto text-center md:text-left ${
                  activeTab === "" ? "active-tab text-green-600" : ""
                }`}
                onClick={() => handleTabClick("nothing")}
              >
                SEND A NEW MESSAGE
              </button>
              <button
                
                className={`tab-link w-full md:w-auto text-center md:text-left ${
                  activeTab === "" ? "active-tab text-green-600" : ""
                }`}
                onClick={() => handleTabClick("Nothing")}
              >
                SEARCH MESSAGE
              </button>
            </div>
            <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0">
              <button
                
                className={`tab-link ${
                  activeTab === "WHISPERS" ? "active-tab text-green-600" : ""
                }`}
                onClick={() => handleTabClick("WHISPERS")}
              >
                WHISPERS
              </button>
              <button
                
                className={`tab-link ${
                  activeTab === "INVITES" ? "active-tab text-green-600" : ""
                }`}
                onClick={() => handleTabClick("INVITES")}
              >
                INVITES
              </button>
              <button
                
                className={`tab-link ${
                  activeTab === "DISPATCHES" ? "active-tab text-green-600" : ""
                }`}
                onClick={() => handleTabClick("DISPATCHES")}
              >
                DISPATCHES
              </button>
              <button
                
                className={`tab-link ${
                  activeTab === "PLUGS" ? "active-tab text-green-600" : ""
                }`}
                onClick={() => handleTabClick("PLUGS")}
              >
                PLUGS
              </button>
            </div>
          </nav>
          {/* Content for each tab */}
          <div className="w-full h-full tab-content mt-4 px-4">
            {activeTab === "WHISPERS" && (
              <div>
                <Whispers />
              </div>
            )}
            {activeTab === "INVITES" && (
              <div>
                <Invites />
              </div>
            )}
            {activeTab === "DISPATCHES" && (
              <div>
                <Dispatches />
              </div>
            )}
            {activeTab === "PLUGS" && (
              <div>
                <Plugs />
              </div>
            )}
          </div>
        </section>
        <section className="bg-neutral-300 col-span-1">
          <div className="w-full h-full tab-content mt-4 px-4 place-content-center">
            {activeTab === "WHISPERS" && (
              <div>
                <WTS />
              </div>
            )}
            {activeTab === "INVITES" && (
              <div>
                <Invites />
              </div>
            )}
            {activeTab === "DISPATCHES" && (
              <div>
                <Dispatches />
              </div>
            )}
            {activeTab === "PLUGS" && (
              <div>
                <Plugs />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default message
