import React from "react"
import CardWithWithImage from "@/components/molecules/CardWithRoundedImage"
import ProfileImage from "@/components/molecules/ProfileImage"

interface LeftSideProps {
  isCollapsed: boolean
}

const LeftSide: React.FC<LeftSideProps> = ({ isCollapsed }) => {
  return (
    <div className="lg:overflow-y-auto h-full transition-transform duration-500 lg:mb-12 lg:w-1/2">
      <section
        className={`overflow-y-auto ${
          isCollapsed ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="relative w-full">
          <img
            src="/sp-banner.svg"
            alt="Placeholder"
            className="w-full h-auto"
          />
          <div className="absolute bottom-0 left-[15%] -translate-x-1/2 translate-y-1/2">
            <ProfileImage
              src="/sonny-rounded.svg"
              ringColor="from-[#F24055] to-[#1E7881]"
              ringThickness="ring-6"
              size="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
            />
          </div>
        </div>

        <div className="flex items-center flex-col space-x-2 md:space-y-4">
          <div className="flex space-x-4 items-center justify-between my-2">
            <div className="flex flex-col lg:flex-row space-x-2 lg:space-x-4">
              <div className="flex flex-col text-xs md:text-sm justify-center">
                <div className="flex">
                  <span>Sony World Photography Awards</span>
                </div>
                <h1 className="text-secondary font-semibold">#SWPA_SC2023</h1>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-full">
            <div className="flex space-x-2 md:space-x-4">
              <button className="relative py-[2px] px-1 md:px-4 lg:px-8 lg:py-1 rounded-full lg:rounded-3xl bg-transparent text-primary-content font-medium text-[12px] lg:text-base flex items-center gap-x-2 shadow text-white border-2 before:rounded-full">
                <span className="lg:inline text-xs md:text-lg">Sitizen</span>
              </button>

              <button className="py-[2px] px-1 md:px-4 lg:px-8 lg:py-1 rounded-full lg:rounded-3xl bg-gradient-to-b from-primary-500 to-secondary-500 text-primary-content font-medium text-[12px] lg:text-base flex items-center gap-x-2 shadow text-white">
                <span className="material-symbols-outlined text-lg md:text-2xl lg:text-inherit">
                  mail
                </span>
                <span className="lg:inline text-xs md:text-sm uppercase">
                  dispatch
                </span>
              </button>
            </div>
            <div className="flex justify-between items-center px-4">
              <div className="flex space-x-4">
                <span className="material-symbols-outlined">preview</span>
                <span className="material-symbols-outlined">
                  notifications_active
                </span>
                <span className="material-symbols-outlined">more_vert</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-around space-x-6 mt-4 w-full">
            <div className="flex flex-col space-y-1 items-center">
              <h2 className="font-bold text-sm lg:text-base">199</h2>
              <p className="text-sm text-slate-500">Affiliate</p>
            </div>
            <span className="flex h-1 w-1 bg-black rounded-full p-[0.5px]"></span>
            <div className="flex flex-col space-y-1 items-center">
              <h2 className="font-bold text-sm lg:text-base">199</h2>
              <p className="text-sm text-slate-500">Affiliate</p>
            </div>
            <span className="flex h-1 w-1 bg-black rounded-full p-[0.5px]"></span>
            <div className="flex flex-col space-y-1 items-center">
              <h2 className="font-bold text-sm lg:text-base">199</h2>
              <p className="text-sm text-slate-500">Affiliate</p>
            </div>
          </div>
        </div>

        <div className="mb-20">
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
  )
}

export default LeftSide
