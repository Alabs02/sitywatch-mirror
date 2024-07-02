import { useState } from "react"
import Events from "../contents/tourneys-components/Events"
import Group from "../contents/tourneys-components/Group"
import OrganizersAndPartners from "../contents/tourneys-components/OrganizersAndPartners"
import Posts from "../contents/tourneys-components/Posts"
import StudentCompetetion from "../contents/tourneys-components/StudentCompetition"

const SmallScreenNav: React.FC = () => {
  const [activeTab, setActiveTab] = useState("StudentCompetetion")

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "Events":
        return <Events />
      case "Posts":
        return <Posts />
      case "StudentCompetetion":
        return <StudentCompetetion />
      case "OrganizersAndPartners":
        return <OrganizersAndPartners />
      case "Group":
        return <Group />
      default:
        return <StudentCompetetion />
    }
  }

  return (
    <div id="rightSide" className="overflow-auto h-full">
      <nav className="flex space-x-4 items-center justify-around p-2 text-tertiary-300 sticky top-0 z-10">
        <span
          className={`material-symbols-outlined cursor-pointer ${
            activeTab === "Events" ? "text-secondary" : ""
          }`}
          onClick={() => setActiveTab("Events")}
        >
          table_rows
        </span>
        <span
          className={`material-symbols-outlined cursor-pointer ${
            activeTab === "Posts" ? "text-secondary" : ""
          }`}
          onClick={() => setActiveTab("Posts")}
        >
          video_library
        </span>
        <span
          className={`material-symbols-outlined cursor-pointer ${
            activeTab === "OrganizersAndPartners" ? "text-secondary" : ""
          }`}
          onClick={() => setActiveTab("OrganizersAndPartners")}
        >
          military_tech
        </span>
        <span
          className={`material-symbols-outlined cursor-pointer ${
            activeTab === "StudentCompetetion" ? "text-secondary" : ""
          }`}
          onClick={() => setActiveTab("StudentCompetetion")}
        >
          error
        </span>
        <span
          className={`material-symbols-outlined cursor-pointer ${
            activeTab === "Group" ? "text-secondary" : ""
          }`}
          onClick={() => setActiveTab("Group")}
        >
          diversity_3
        </span>
      </nav>
      <article className="shadow-inner shadow-gray-400/75 py-2 px-4 rounded-t-[30px] overflow-y-auto h-full my-1 md:my-2">
        {renderActiveComponent()}
      </article>
    </div>
  )
}

export default SmallScreenNav
