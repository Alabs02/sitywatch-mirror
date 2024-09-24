import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import CardWithWithImage from "@/components/molecules/CardWithRoundedImage"
import ProfileImage from "@/components/molecules/ProfileImage"
import EditSitadelOverlay from "@/components/contents/sitadel-profile-components/EditSitadelProfile"
import Link from "next/link"
import AffairsTab from "@/components/contents/sitadel-profile-components/AffairsTab"
import ActivityTab from "@/components/contents/sitadel-profile-components/ActivityTab"
import PropsTab from "@/components/contents/sitadel-profile-components/PropsTab"
import SearchTab from "@/components/contents/sitadel-profile-components/SearchTab"
import IdentityTab from "@/components/contents/sitadel-profile-components/IdentityTab" // Add this import for IdentityTab

const LeftSide: React.FC<{ isCollapsed: boolean; onEditClick: () => void }> = ({
  isCollapsed,
  onEditClick,
}) => {
  return (
    <div className="lg:overflow-y-auto h-full transition-transform duration-500 lg:mb-12 lg:w-1/2">
      <div className="h-full overflow-y-auto m-2">
        <section
          className={`overflow-y-auto ${
            isCollapsed ? "-translate-y-full" : "translate-y-0"
          }`}
        >
          <div className="relative w-full">
            <img
              src="/sitadel-backdrop.png"
              alt="Placeholder"
              className="w-full h-auto"
            />
            <div className="absolute bottom-0 left-[15%] -translate-x-1/2 translate-y-1/2">
              <ProfileImage
                src="/sitadel-ppix.png"
                ringColor="from-[#F24055] to-[#1E7881]"
                ringThickness="ring-6"
                size="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
              />
            </div>
          </div>

          <div className="flex items-center flex-col space-x-2 md:space-y-4">
            <div className="flex space-x-4 items-center justify-between my-2">
              <div className="flex flex-col lg:flex-row space-x-2 lg:space-x-4">
                <div className="flex flex-col text-xs md:text-sm justify-center ml-6 md:ml-0">
                  <div className="flex ">
                    <span>Sony World Photography Awards</span>
                  </div>
                  <h1 className="text-secondary font-semibold">#SWPA_SC2023</h1>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between w-full px-2">
              <div className="flex">
                <button
                  className="py-[2px] px-1 md:px-4 lg:px-8 lg:py-1 rounded-full lg:rounded-3xl bg-gradient-to-b from-primary-500 to-secondary-500 text-primary-content font-medium text-[12px] lg:text-base flex items-center gap-x-2 shadow text-white"
                  onClick={onEditClick}
                >
                  <span className="lg:inline text-xs md:text-sm p-1">
                    Edit Sitadel
                  </span>
                </button>
              </div>
              <div className="flex justify-between items-center px-4">
                <div className="flex space-x-4">
                  <span className="material-symbols-outlined">more_vert</span>
                </div>
              </div>
            </div>
            <Link
              href="/view-recognition"
              className="flex items-center justify-around space-x-6 mt-4 w-full"
            >
              <div className="flex flex-col space-y-1 items-center">
                <h2 className="font-bold text-sm lg:text-base">135</h2>
                <p className="text-sm text-slate-500">Sitizens</p>
              </div>
              <span className="flex h-1 w-1 bg-black rounded-full p-[0.5px]"></span>
              <div className="flex flex-col space-y-1 items-center">
                <h2 className="font-bold text-sm lg:text-base">45</h2>
                <p className="text-sm text-slate-500">Recognizing</p>
              </div>
              <span className="flex h-1 w-1 bg-black rounded-full p-[0.5px]"></span>
              <div className="flex flex-col space-y-1 items-center">
                <h2 className="font-bold text-sm lg:text-base">8</h2>
                <p className="text-sm text-slate-500">Recognitions</p>
              </div>
            </Link>
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
      </div>
      <div></div>
    </div>
  )
}

const RightSide: React.FC<{ onEditClick: () => void }> = ({ onEditClick }) => {
  // Set "Activity" as the default active tab
  const [activeTab, setActiveTab] = useState("Activity")

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "Search":
        return <SearchTab />
      case "Activity":
        return <ActivityTab />
      case "Props":
        return <PropsTab />
      case "Affairs":
        return <AffairsTab />
      case "Identity": // Handle rendering the IdentityTab
        return <IdentityTab />
      default:
        return <ActivityTab /> // ActivityTab as the fallback
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
              activeTab === "Props" ? "text-secondary" : ""
            }`}
            onClick={() => setActiveTab("Props")}
          >
            Props
          </span>
          <span
            className={`cursor-pointer ${
              activeTab === "Affairs" ? "text-secondary" : ""
            }`}
            onClick={() => setActiveTab("Affairs")}
          >
            Affairs
          </span>
          <span
            className={`cursor-pointer ${
              activeTab === "Identity" ? "text-secondary" : ""
            }`}
            onClick={() => setActiveTab("Identity")}
          >
            Identity
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

const SitadelProfile: React.FC = () => {
  const [isOverlayOpen, setOverlayOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const query = { collapsed: true }
    router.push({ pathname: "/sitadels/sitadel-profile", query })
  }, [])

  return (
    <div className="h-full shadow-inner shadow-gray-400/75 lg:rounded-t-[10px] overflow-y-auto mb-28 md:mb-36 lg:mb-0">
      <div className="lg:flex lg:h-screen">
        <LeftSide
          isCollapsed={false}
          onEditClick={() => setOverlayOpen(true)}
        />
        <RightSide onEditClick={() => setOverlayOpen(true)} />
      </div>

      {isOverlayOpen && (
        <EditSitadelOverlay onClose={() => setOverlayOpen(false)} />
      )}
    </div>
  )
}

export default SitadelProfile
