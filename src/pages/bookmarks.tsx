import Gists from "@/components/contents/bookmarks/Gists"
import React, { useState } from "react"


const Bookmarks = () => {
  const [activeTab, setActiveTab] = useState("GISTS")

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
  }

  return (
    <div className="w-full h-full grid grid-cols-12 gap-x-4 px-4">
      <section className="col-span-7 w-full h-full border border-red bg-gray-200">
        <nav className="flex p-4 items-center space-x-4">
          <a
            href="#"
            className={`tab-link ${
              activeTab === "GISTS" ? "active-tab text-green-600" : ""
            }`}
            onClick={() => handleTabClick("GISTS")}
          >
            GISTS
          </a>
          <div className="border-l-2 border-gray-300 h-8"></div>
          <a
            href="#"
            className={`tab-link ${
              activeTab === "AFFAIRS" ? "active-tab text-green-600" : ""
            }`}
            onClick={() => handleTabClick("AFFAIRS")}
          >
            AFFAIRS
          </a>
        </nav>
        {/* Content for each tab */}
        <div className="w-full h-full tab-content mt-4 px-4 shadow-inner shadow-gray-400/40 border rounded-t-[20px]">
          {activeTab === "GISTS" && <div><Gists /></div>}
          {activeTab === "AFFAIRS" && <div>AFFAIRS Content</div>}
        </div>
      </section>
      <section className="col-span-5 w-full h-full border border-red bg-gray-200 place-content-center">
        <h1 className="ml-10">CONTENT</h1>
      </section>
    </div>
  )
}

export default Bookmarks
