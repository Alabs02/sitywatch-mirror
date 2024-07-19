import React, { FC, ReactNode, useState } from "react"
import SearchInput from "@/components/molecules/SearchInput"
import Image from "next/image"
import SmallScreenNav from "@/components/content/SmallScreenNav"
import PeopleForm from "@/components/contents/forms/PeopleForm"
import SitadelsForm from "@/components/contents/forms/SitadelsForm"
import TourneysForm from "@/components/contents/forms/TourneysForm"
import EventsForm from "@/components/contents/forms/EventsForm"
import ProductsForm from "@/components/contents/forms/ProductsForm"
import ServiceForm from "@/components/contents/forms/ServicesForm"
import TourneysUnder from "@/components/contents/tourneys-components/TourneysUnder"
import News from "@/components/contents/explore-components/News"
import NewsBottomCards from "@/components/contents/explore-components/NewsBottomCards"
import SitezensToWatch from "@/components/contents/explore-components/SitezensToWatch"

interface ExploreProps {
  children: ReactNode
}



const Explore: FC<ExploreProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState("All")

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const tabs = [
    "All",
    "People",
    "Sitadels",
    "Tourneys",
    "Events",
    "Products",
    "Services",
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "People":
        return <div className="mx-auto py-8 w-full"><PeopleForm /></div>
      case "Sitadels":
        return (
          <div className="mx-auto py-8 w-full">
            <SitadelsForm />
          </div>
        )
      case "Tourneys":
        return (
          <div className="mx-auto py-8 w-full">
            <TourneysForm />
          </div>
        )
      case "Events":
        return (
          <div className="mx-auto py-8 w-full">
            <EventsForm />
          </div>
        )
      case "Products":
        return (
          <div className="mx-auto py-8 w-full">
            <ProductsForm />
          </div>
        )
      case "Services":
        return (
          <div className="mx-auto py-8 w-full">
            <ServiceForm />
          </div>
        )
      case "All":
      default:
        return null
    }
  }

  return (
    <div className="w-full ">
      <div className="w-full grid shadow-inner shadow-gray-400/75 border rounded-t-[32px] px-5 lg:p-6 overflow-y-auto">
        <section className=" w-full mb-1 sm:mb-8">
          <div className="">
            <div className="flex justify-center">
              <SearchInput />
            </div>
            <nav className="flex justify-center mt-4 space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
                    activeTab === tab
                      ? "active shadow-md shadow-gray-400 bg-gray-100"
                      : ""
                  }`}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="border-b border-gray-300 w-full mt-2">
            {renderContent()}
          </div>
          <div className="grid-cols-2 gap-x-2 mt-4 hidden lg:grid">
            <article className="col-span-1">
              {/* <h2 className="">HERE IS WHAT’S VIRAL TODAY</h2> */}
              <h2 className="text-[#28303F] font-bold text-center">
                HERE IS WHAT’S VIRAL TODAY
              </h2>
             <News />
              <NewsBottomCards />
            </article>
            <article className="col-span-1 border border-slate-400/70 shadow-inner p-2">
             <SitezensToWatch />
            </article>
          </div>
          <div className="lg:hidden">
            <TourneysUnder />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Explore
