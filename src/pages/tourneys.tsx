import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import useScrollCollapse from "../../hooks/useScrollCollapse"
import Btn from "@/components/molecules/Btn"
import CardWithWithImage from "@/components/molecules/CardWithRoundedImage"
import Events from "@/components/contents/tourneys-components/Events"
import Posts from "@/components/contents/tourneys-components/Posts"
import StudentCompetetion from "@/components/contents/tourneys-components/StudentCompetition"
import OrganizersAndPartners from "@/components/contents/tourneys-components/OrganizersAndPartners"
import Group from "@/components/contents/tourneys-components/Group"

const LeftSide: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  return (
    <section
      className={`overflow-y-auto h-full p-2 lg:p-4 transition-transform duration-500 mb-28 md:mb-36 ${
        isCollapsed ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div>
        <img
          src="/tourneys-banner.png"
          alt="tourneys-banner"
          className="w-full"
        />
      </div>
      <h1 className="flex justify-center mt-2 text-secondary text-sm lg:text-base font-semibold">
        #SWPA_SC2023
      </h1>
      <div className="flex space-x-4 items-center justify-center mt-2">
        <span>Media</span>
        <span className="inline-block h-1 w-1 bg-black rounded-full p-[0.5px] "></span>
        <span>Photography</span>
      </div>
      <h3 className="flex justify-center mt-2 text-center text-[14px] lg:text-base tracking-tight italic">
        Providing a platform for photography students worldwide - first prize is
        top Sony digital imaging equipment.
      </h3>
      <div className="flex justify-between items-center mt-4 px-4">
        <div>
          <button className="py-1 px-3 md:px-4 lg:px-8 lg:py-2 rounded-full lg:rounded-3xl bg-gradient-to-b from-primary-500 to-secondary-500 text-primary-content font-medium text-[12px] lg:text-base flex items-center gap-x-2 shadow text-white">
            <span className="material-symbols-outlined text-2xl lg:text-inherit">
              export_notes
            </span>
            <span className="lg:inline">Register</span>
          </button>
        </div>
        <div className="flex space-x-4">
          <span className="material-symbols-outlined">preview</span>
          <span className="material-symbols-outlined">
            notifications_active
          </span>
          <span className="material-symbols-outlined">more_vert</span>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-6 md:space-x-12 mt-4">
        <div className="flex flex-col space-y-1 items-center">
          <h2 className="font-bold text-sm lg:text-base">199</h2>
          <p className="text-sm text-slate-500">Affiliate</p>
        </div>
        <span className="flex h-1 w-1 bg-black rounded-full p-[0.5px] "></span>
        <div className="flex flex-col space-y-1 items-center">
          <h2 className="font-bold text-sm lg:text-base">199</h2>
          <p className="text-sm text-slate-500">Affiliate</p>
        </div>
        <span className="flex h-1 w-1 bg-black rounded-full p-[0.5px] "></span>
        <div className="flex flex-col space-y-1 items-center">
          <h2 className="font-bold text-sm lg:text-base">199</h2>
          <p className="text-sm text-slate-500">Affiliate</p>
        </div>
      </div>
      <div className="mt-4">
        <CardWithWithImage
          title="Upcoming Tournaments"
          description="Join the competition and win big!"
          details={[
            "Compete with other players",
            "Multiple game modes available",
            "Earn rewards and prizes",
          ]}
        />
      </div>
      <span className="flex justify-end mt-2 text-secondary text-sm font-semibold">
        #SWPA_SC2023
      </span>
    </section>
  )
}

const RightSide: React.FC = () => {
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
    <div id="rightSide" className="overflow-auto h-full mb-28 md:mb-36">
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

const Tourneys: React.FC = () => {
  const router = useRouter()
  const isCollapsed = useScrollCollapse()

  useEffect(() => {
    const query = { collapsed: true }
    router.push({ pathname: "/tourneys", query })
  }, [])

  return (
    <div className="grid lg:grid-cols-2 gap-2 shadow-inner shadow-gray-400/75 py-2 px-2 rounded-t-[10px] h-full">
      <LeftSide isCollapsed={isCollapsed} />
      <RightSide />
    </div>
  )
}

export default Tourneys
