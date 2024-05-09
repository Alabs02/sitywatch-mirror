import React, { useState } from "react"

const PandaUs = () => {
  const [activeTab, setActiveTab] = useState("PANDA POLLS")

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
  }

  return (
    <div className="w-full h-full grid grid-cols-12 gap-x-4 px-4">
      <section className="col-span-7 w-full h-full border border-red bg-gray-200">
        <nav className="flex p-4 items-center justify-between">
          <a
            href="#"
            className={`tab-link ${
              activeTab === "PANDA POLLS" ? "active-tab text-green-600" : ""
            }`}
            onClick={() => handleTabClick("PANDA POLLS")}
          >
            PANDA POLLS
          </a>
          <div className="border-l-2 border-gray-300 h-8"></div>
          <a
            href="#"
            className={`tab-link ${
              activeTab === "SOUL PANDA" ? "active-tab text-green-600" : ""
            }`}
            onClick={() => handleTabClick("SOUL PANDA")}
          >
            SOUL PANDA
          </a>
          <div className="border-l-2 border-gray-300 h-8"></div>
          <a
            href="#"
            className={`tab-link ${
              activeTab === "PANDA SCENTS" ? "active-tab text-green-600" : ""
            }`}
            onClick={() => handleTabClick("PANDA SCENTS")}
          >
            PANDA SCENTS
          </a>
        </nav>
        {/* Content for each tab */}
        <div className="w-full h-full tab-content mt-4 px-4 shadow-inner shadow-gray-400/75 border rounded-t-[20px]">
          {activeTab === "PANDA POLLS" && <div>PANDA POLLS Content</div>}
          {activeTab === "SOUL PANDA" && <div>SOUL PANDA Content</div>}
          {activeTab === "PANDA SCENTS" && <div>PANDA SCENTS Content</div>}
        </div>
      </section>
      <section className="col-span-5 w-full h-full border border-red bg-gray-200 place-content-center">
        <h1 className="ml-10">CONTENT</h1>
      </section>
    </div>
  )
}

export default PandaUs
