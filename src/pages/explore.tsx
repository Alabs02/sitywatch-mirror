import React, { FC, ReactNode } from "react"
import TourneysUnder from "@/components/contents/tourneys-components/TourneysUnder"
import News from "@/components/contents/explore-components/Viral"
import NewsBottomCards from "@/components/contents/explore-components/NewsBottomCards"
import Search from "@/components/contents/explore-components/ExploreBigScreenSearch"
import ExploreMobileScreens from "@/components/contents/explore-components/ExploreMobileScreens"
import SitezensToWatch from "@/components/contents/explore-components/SitezensToWatch"
import SearchInput from "@/components/molecules/SearchInput"
import ExploreSearch from "@/components/contents/explore-components/ExploreBigScreenSearch"
import ExploreBigScreenSearch from "@/components/contents/explore-components/ExploreBigScreenSearch"

interface ExploreProps {
  children: ReactNode
}

const Explore: FC<ExploreProps> = ({ children }) => {
  return (
    <div className="w-full">
      <div className="grid md:shadow-inner md:shadow-gray-400/75 md:border md:rounded-t-[32px] px-4 lg:px-6 overflow-y-auto relative">
        <section className="w-full mb-1 sm:mb-8">
          <div className="hidden lg:block">
            <ExploreBigScreenSearch />
          </div>

          <div className="lg:grid grid-cols-2 gap-x-2 mt-4 hidden">
            <article className="col-span-1">
              <h2 className="text-[#28303F] font-bold text-center">
                HERE IS WHAT’S VIRAL TODAY
              </h2>
              <News />
              <NewsBottomCards />
            </article>
            <article className="col-span-1 border border-slate-400/70 p-2">
              <SitezensToWatch />
            </article>
          </div>
          <div className="lg:hidden">
            <ExploreMobileScreens />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Explore
