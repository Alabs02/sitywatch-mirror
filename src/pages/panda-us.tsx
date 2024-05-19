import React, { useState } from "react"
import pandaData from "../../data.json"

const PandaUs = () => {
  const [activeTab, setActiveTab] = useState("PANDA POLLS")

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
  }

  const pandaSection = pandaData.rightSection.panda // Accessing the "panda" section from the imported JSON data

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
        <div className="w-full h-full tab-content mt-4 px-4 shadow-inner shadow-gray-400/40 border rounded-t-[20px]">
          <span className="flex items-center justify-center p-1 mt-2 rounded-full bg-gradient-to-r from-tertiary-100 to-neutral-100">
            Lorem ipsum dolor, sit amet consectetur
          </span>
          <div className="border border-tertiary-400 bg-neutral-200 p-3 rounded-lg gap-y-4 mx-12 my-4">
            <div className="flex items-center">
              <span className="material-symbols-outlined text-3xl mr-2 bg-gradient-to-b from-[#F24055] to-[#1E7881] bg-clip-text text-transparent cursor-pointer">
                {pandaSection.cards[0].icon}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-y-2">
              <div className=" rounded-full shadow-md overflow-hidden w-[60px] h-[60px] p-3 bg-white">
                <img
                  src={pandaSection.cards[0].image}
                  alt={pandaSection.cards[0].title}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>

              <div className="flex flex-col place-content-center text-center gap-y-2">
                <h3 className="text-lg font-bold">
                  {pandaSection.cards[0].title}
                </h3>

                <p className="text-sm">{pandaSection.cards[0].description}</p>
              </div>
            </div>
          </div>
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
