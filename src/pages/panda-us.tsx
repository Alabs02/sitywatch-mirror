import React, { useState } from "react"
import pandaData from "../../data.json"
import PandPollContent from "@/components/molecules/PandaPollContent"

const PandaUs = () => {
  const [activeTab, setActiveTab] = useState("PANDA POLLS")

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
  }

  const pandaSection = pandaData.rightSection.panda

  const renderPandaCard = () => {
    return (
      <PandPollContent
        icon={pandaSection.cards[0].icon}
        image={pandaSection.cards[0].image}
        title={pandaSection.cards[0].title}
        description={pandaSection.cards[0].description}
      />
    )
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
        <div className="w-full h-full tab-content mt-4 px-4 shadow-inner shadow-gray-400/40 border rounded-t-[20px]">
          <span className="flex items-center justify-center p-1 mt-2 rounded-full bg-gradient-to-r from-tertiary-100 to-neutral-100 font-bold">
            All polls are taken in anonymous panda mode
          </span>
          {activeTab === "PANDA POLLS" && renderPandaCard()}
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
