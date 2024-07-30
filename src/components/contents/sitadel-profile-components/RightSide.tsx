import React, { useState } from "react"
import SearchTab from "@/components/contents/sitadel-profile-components/SearchTab"
import ActivityTab from "@/components/contents/sitadel-profile-components/ActivityTab"
import AboutTab from "@/components/contents/sitadel-profile-components/AboutTab"
import AffairsTab from "@/components/contents/sitadel-profile-components/AffairsTab"

const RightSide: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Affairs")

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "Search":
        return <SearchTab />
      case "Activity":
        return <ActivityTab />
      case "About":
        return <AboutTab />
      case "Affairs":
        return <AffairsTab />
      default:
        return <AffairsTab />
    }
  }

  return (
    <div className="h-full lg:mb-0 lg:w-1/2 mx-2">
      <div
        id="rightSide"
        className="lg:overflow-hidden h-full mb-14 mt-4 lg:mt-6 lg:mb-6"
      >
        <nav className="flex space-x-4 items-center justify-around p-2 text-tertiary-300 sticky top-0 z-10">
          <span
            className={`material-symbols-outlined cursor-pointer ${
              activeTab === "Search" ? "bg-secondary text-white" : ""
            } rounded-full p-2`}
            onClick={() => setActiveTab("Search")}
          >
            manage_search
          </span>
          <span
            className={`cursor-pointer ${
              activeTab === "Activity" ? "bg-secondary text-white" : ""
            } rounded-full p-2`}
            onClick={() => setActiveTab("Activity")}
          >
            Activity
          </span>
          <span
            className={`cursor-pointer ${
              activeTab === "About" ? "bg-secondary text-white" : ""
            } rounded-full p-2`}
            onClick={() => setActiveTab("About")}
          >
            About
          </span>
          <span
            className={`cursor-pointer ${
              activeTab === "Affairs" ? "bg-secondary text-white" : ""
            } rounded-full p-2`}
            onClick={() => setActiveTab("Affairs")}
          >
            Affairs
          </span>
        </nav>
        <article className="h-[calc(100vh-56px)] overflow-y-auto shadow-inner shadow-gray-400/75 rounded-t-[30px] p-4">
          <div className="h-full overflow-y-auto">
            {renderActiveComponent()}
          </div>
        </article>
      </div>
    </div>
  )
}

export default RightSide
