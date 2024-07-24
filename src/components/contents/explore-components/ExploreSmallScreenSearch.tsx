import React, { FC, ReactNode, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SearchInput from "@/components/molecules/SearchInput"
import PeopleForm from "@/components/contents/forms/PeopleForm"
import SitadelsForm from "@/components/contents/forms/SitadelsForm"
import TourneysForm from "@/components/contents/forms/TourneysForm"
import EventsForm from "@/components/contents/forms/EventsForm"
import ProductsForm from "@/components/contents/forms/ProductsForm"
import ServiceForm from "@/components/contents/forms/ServicesForm"

interface SearchProps {
  children?: ReactNode
  initialTab?: string
}

const ExploreSmallScreenSearch: FC<SearchProps> = ({
  children,
  initialTab = "All",
}) => {
  const [activeTab, setActiveTab] = useState(initialTab)

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
        return <PeopleForm />
      case "Sitadels":
        return <SitadelsForm />
      case "Tourneys":
        return <TourneysForm />
      case "Events":
        return <EventsForm />
      case "Products":
        return <ProductsForm />
      case "Services":
        return <ServiceForm />
      case "All":
      default:
        return null 
    }
  }

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="flex justify-center">
        <SearchInput />
      </div>

      {/* Tabs Navigation */}
      <div className="my-4 w-full">
        <nav className="flex justify-center space-x-1 overflow-x-auto no-scrollbar w-full mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`btn px-[2px] py-1 text-xs md:py-2 md:text-base rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
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

      {/* Render Content Based on Active Tab */}
      <div className="border-b border-gray-300 w-full mt-2">
        <AnimatePresence mode="wait">
          {activeTab !== "All" && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.6 }}
            >
              {renderContent()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {children}
    </div>
  )
}

export default ExploreSmallScreenSearch
