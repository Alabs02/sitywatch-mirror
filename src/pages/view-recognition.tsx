import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import CardWithWithImage from "@/components/molecules/CardWithRoundedImage"
import ProfileImage from "@/components/molecules/ProfileImage"
import AffairsSearchTab from "@/components/contents/affairs-components/affairsSearchTab"
import AffairsActivityTab from "@/components/contents/affairs-components/AffairsActivityTab"
import AffairsAboutTab from "@/components/contents/affairs-components/AffairsAboutTab"
import AffairsAffairsTab from "@/components/contents/affairs-components/AffairsAffairsTab"
import Link from "next/link"
import SitizenTab from "@/components/contents/sitizen-component/SitizenTab"
import RecognitionsTab from "@/components/contents/sitizen-component/RecognitionsTab"

const LeftSide: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  const [activeTab, setActiveTab] = useState("Sitizens")

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
  }

  return (
    <div className="lg:overflow-y-auto h-full transition-transform duration-500 lg:mb-12 lg:w-1/2">
      <div className="h-full overflow-y-auto m-2">
        <div className="flex items-center w-full">
          <Link href="/affairs">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <div className="flex flex-col items-center text-center justify-center w-full gap-y-1">
            <p className="flex justify-center text-sm md:text-xl">
              Nasir King Touch Photo...
            </p>
            <span className="text-secondary font-semibold text-xs mb-2">
              @NasirKTP
            </span>
          </div>
        </div>
        <section
          className={`overflow-y-auto ${
            isCollapsed ? "-translate-y-full" : "translate-y-0"
          }`}
        >
          <nav className="flex p-1 md:p-2 items-center justify-around md:justify-between sticky top-0 z-20 bg-inherit text-[10px] md:text-sm font-bold">
            <a
              href="#"
              className={`tab-link ${
                activeTab === "Sitizens" ? "active-tab text-secondary" : ""
              }`}
              onClick={() => handleTabClick("Sitizens")}
            >
              Sitizens
            </a>
            <div className="border-l-2 border-gray-300 h-6"></div>
            <a
              href="#"
              className={`tab-link ${
                activeTab === "Recognizing" ? "active-tab text-secondary" : ""
              }`}
              onClick={() => handleTabClick("Recognizing")}
            >
              Recognizing
            </a>
            <div className="border-l-2 border-gray-300 h-6"></div>
            <a
              href="#"
              className={`tab-link ${
                activeTab === "Recognitions" ? "active-tab text-secondary" : ""
              }`}
              onClick={() => handleTabClick("Recognitions")}
            >
              Recognitions
            </a>
          </nav>

          <div className="w-full h-full tab-content mt-4 px-4 shadow-inner shadow-gray-400/40 border rounded-t-[20px] overflow-hidden">
            <div className="h-[calc(100vh-200px)] overflow-y-auto">
              {activeTab === "Sitizens" && (
                <div>
                  <SitizenTab />
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
              )}
              {activeTab === "Recognizing" && (
                <div>{/* Recognizing Content Goes Here */}</div>
              )}
              {activeTab === "Recognitions" && (
                <RecognitionsTab />
              )}
            </div>
          </div>
        </section>
      </div>
      <div></div>
    </div>
  )
}

const RightSide: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Affairs")

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "Search":
        return <AffairsSearchTab />
      case "Activity":
        return <AffairsActivityTab />
      case "About":
        return <AffairsAboutTab />
      case "Affairs":
        return <AffairsAffairsTab />
      default:
        return <AffairsAffairsTab />
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
              activeTab === "Search" ? "text-secondary" : ""
            }`}
            onClick={() => setActiveTab("Search")}
          >
            manage_search
          </span>
          <span
            className={`cursor-pointer ${
              activeTab === "Activity" ? "text-secondary" : ""
            }`}
            onClick={() => setActiveTab("Activity")}
          >
            Activity
          </span>
          <span
            className={`cursor-pointer ${
              activeTab === "About" ? "text-secondary" : ""
            }`}
            onClick={() => setActiveTab("About")}
          >
            About
          </span>
          <span
            className={`cursor-pointer ${
              activeTab === "Affairs" ? "text-secondary" : ""
            }`}
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

const ViewRecognition: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    const query = { collapsed: true }
    router.push({ pathname: "/view-recognition", query })
  }, [])

  return (
    <div className="h-full shadow-inner shadow-gray-400/75 lg:rounded-t-[10px] overflow-y-auto mb-28 md:mb-36 lg:mb-0">
      <div className="lg:flex lg:h-screen">
        <LeftSide isCollapsed={false} />
        <RightSide />
      </div>
    </div>
  )
}

export default ViewRecognition
