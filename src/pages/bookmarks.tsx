import Affairs from "@/components/Affairs"
import Gists from "@/components/contents/bookmarks/Gists"
import RightSideComponent from "@/components/contents/RightSideComponent"
import React, { useState } from "react"

const Bookmarks = () => {
  const [activeTab, setActiveTab] = useState("GISTS")

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
  }

  return (
    <div className="w-full h-full grid grid-cols-12 gap-x-4 px-4">
      <section className="col-span-12 lg:col-span-8 w-full h-full flex flex-col overflow-y-auto">
        <nav className="flex px-10 items-center space-x-10 font-bold py-1 z-10 sticky top-0 backdrop-filter backdrop-blur-lg bg-opacity-50 bg-inherit justify-center md:justify-start">
          <a
            href="#"
            className={`tab-link ${
              activeTab === "GISTS" ? "active-tab text-secondary" : ""
            }`}
            onClick={() => handleTabClick("GISTS")}
          >
            GISTS
          </a>
          <div className="border-l-2 border-gray-300 h-10"></div>
          <a
            href="#"
            className={`tab-link ${
              activeTab === "AFFAIRS" ? "active-tab text-secondary" : ""
            }`}
            onClick={() => handleTabClick("AFFAIRS")}
          >
            AFFAIRS
          </a>
        </nav>
        {/* Content for each tab */}
        <div className="flex-1 w-full h-full tab-content mt-4 px-4 shadow-inner shadow-gray-400/40 border rounded-t-[20px] overflow-y-auto">
          {activeTab === "GISTS" && (
            <div>
              <Gists />
            </div>
          )}
          {activeTab === "AFFAIRS" && (
            <div className="">
              <div className="mt-4">
                <Affairs />
              </div>
              <div className="mt-4">
                <Affairs />
              </div>
              <div className="mt-4">
                <Affairs />
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="col-span-4 h-full overflow-y-auto hidden sm:block">
        <RightSideComponent />
      </section>
    </div>
  )
}

export default Bookmarks
