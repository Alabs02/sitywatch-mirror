import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Btn from "@/components/molecules/Btn"
import CardWithWithImage from "@/components/molecules/CardWithRoundedImage"
import Events from "@/components/contents/tourneys-components/Events"
import Posts from "@/components/contents/tourneys-components/Posts"
import StudentCompetetion from "@/components/contents/tourneys-components/StudentCompetition"
import OrganizersAndPartners from "@/components/contents/tourneys-components/OrganizersAndPartners"

const LeftSide: React.FC = () => {
  return (
    <section className="overflow-y-auto h-full p-2">
      <div>
        <img src="/tourneys-banner.png" alt="tourneys-banner" />
      </div>
      <h1 className="flex justify-center mt-2 text-green-700 text-sm font-semibold">
        #SWPA_SC2023
      </h1>
      <div className="flex space-x-4 items-center justify-center">
        <span>Media</span>
        <span className="inline-block h-[1px] w-[1px] bg-black rounded-full p-[2px] mt-2"></span>
        <span>Photography</span>
      </div>
      <h3 className="flex justify-center mt-2 text-center text-sm tracking-tight">
        Providing a platform for photography students worldwide - first prize is
        top Sony digital imaging equipment.
      </h3>
      <div className="flex justify-between items-center mt-2 px-4">
        <div>
          <Btn isCollapsed={false} />
        </div>
        <div className="flex space-x-4">
          <span className="material-symbols-outlined">preview</span>
          <span className="material-symbols-outlined">
            notifications_active
          </span>
          <span className="material-symbols-outlined">more_vert</span>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-12 mt-2">
        <div className="flex flex-col space-y-1 items-center">
          <h2 className="font-bold text-sm">199</h2>
          <p className="text-sm text-slate-500">Affiliate</p>
        </div>
        <span className="inline-block h-[1px] w-[1px] bg-black rounded-full p-[3px]"></span>
        <div className="flex flex-col space-y-1 items-center">
          <h2 className="font-bold text-sm">199</h2>
          <p className="text-sm text-slate-500">Affiliate</p>
        </div>
        <span className="inline-block h-[1px] w-[1px] bg-black rounded-full p-[3px]"></span>
        <div className="flex flex-col space-y-1 items-center">
          <h2 className="font-bold text-sm">199</h2>
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
      <span className="flex justify-end mt-2 text-green-700 text-sm font-semibold">
        #SWPA_SC2023
      </span>
    </section>
  )
}

const RightSide: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Events")

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
      default:
        return <Events />
    }
  }

  return (
    <div className="overflow-hidden h-full">
      <nav className="flex space-x-4 items-center justify-around p-2 text-tertiary-300  sticky top-0 z-10">
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
            activeTab === "StudentCompetetion" ? "text-secondary" : ""
          }`}
          onClick={() => setActiveTab("StudentCompetetion")}
        >
          error
        </span>
        <span
          className={`material-symbols-outlined cursor-pointer ${
            activeTab === "OrganizersAndPartners" ? "text-secondary" : ""
          }`}
          onClick={() => setActiveTab("OrganizersAndPartners")}
        >
          military_tech
        </span>
      </nav>
      <article className="shadow-inner shadow-gray-400/75 py-2 px-4 rounded-t-[30px] overflow-y-auto h-full">
        {renderActiveComponent()}
      </article>
    </div>
  )
}

const Tourneys: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    const query = { collapsed: true }
    router.push({ pathname: "/tourneys", query })
  }, [])

  return (
    <div className="grid grid-cols-2 gap-2 shadow-inner shadow-gray-400/75 py-2 px-2 rounded-t-[10px] h-full">
      <LeftSide />
      <RightSide />
    </div>
  )
}

export default Tourneys
