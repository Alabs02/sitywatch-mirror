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

const ExploreBigScreenSearch: FC<SearchProps> = ({
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
        return null // No content for "All" tab
    }
  }

  return (
    <div className="w-full">
      {/* Desktop view */}
      <div className="hidden lg:block">
        <div className="flex justify-center my-4">
          <SearchInput />
        </div>
        <nav className="flex justify-center mb-4 space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`btn px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
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
        <div className="border-b border-gray-300 w-full mt-2">
          <AnimatePresence mode="wait">
            {activeTab !== "All" && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.6 }} // Slower transition duration
              >
                {renderContent()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {children}
      </div>

      {/* Mobile view */}
      <div className="block lg:hidden">
        <div className="flex justify-center mb-4">
          <SearchInput />
        </div>
        <nav className="flex justify-center mb-4 space-x-1 md:space-x-4 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`btn px-2 py-1 text-xs md:px-3 md:py-2 md:text-base rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
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
        <div className="border-b border-gray-300 w-full mt-2">
          <AnimatePresence mode="wait">
            {activeTab !== "All" && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.6 }} // Slower transition duration
              >
                {renderContent()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {children}
      </div>
    </div>
  )
}

export default ExploreBigScreenSearch
