import React, { useState } from "react"

const message = () => {
    const [activeTab, setActiveTab] = useState("PANDA POLLS")

    const handleTabClick = (tabName: string) => {
      setActiveTab(tabName)
    }
  return (
    <div className="h-full w-full shadow-inner shadow-tertiary-400/30 rounded-t-[10px] p-1">
      <div className="grid grid-cols-2 h-full w-ful px-2]">
        <section className="bg-tertiary-100 col-span-1">
          <nav className="flex p-4 items-center space-x-4 flex-col">
            <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-auto border-b border-gray-800 divide-x divide-tertiary-600">
              <a
                href="#"
                className={`tab-link w-full md:w-auto text-center md:text-left ${
                  activeTab === "GISTS" ? "active-tab text-green-600" : ""
                }`}
                onClick={() => handleTabClick("GISTS")}
              >
                SEND A NEW MESSAGE
              </a>
              <a
                href="#"
                className={`tab-link w-full md:w-auto text-center md:text-left ${
                  activeTab === "AFFAIRS" ? "active-tab text-green-600" : ""
                }`}
                onClick={() => handleTabClick("AFFAIRS")}
              >
                SEARCH MESSAGE
              </a>
            </div>
            <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0">
              <a
                href="#"
                className={`tab-link ${
                  activeTab === "NEWS" ? "active-tab text-green-600" : ""
                }`}
                onClick={() => handleTabClick("NEWS")}
              >
                WHISPERS
              </a>
              <a
                href="#"
                className={`tab-link ${
                  activeTab === "EVENTS" ? "active-tab text-green-600" : ""
                }`}
                onClick={() => handleTabClick("EVENTS")}
              >
                INVITES
              </a>
              <a
                href="#"
                className={`tab-link ${
                  activeTab === "BLOG" ? "active-tab text-green-600" : ""
                }`}
                onClick={() => handleTabClick("BLOG")}
              >
                DISPATCHES
              </a>
              <a
                href="#"
                className={`tab-link ${
                  activeTab === "BLOG" ? "active-tab text-green-600" : ""
                }`}
                onClick={() => handleTabClick("BLOG")}
              >
                PLUGS
              </a>
            </div>
          </nav>
        </section>
        <section className="bg-neutral-300 col-span-1">Right</section>
      </div>
    </div>
  )
}

export default message
