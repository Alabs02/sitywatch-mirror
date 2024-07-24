import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Viral from "./Viral"
import SitezensToWatch from "./SitezensToWatch"
import NewsBottomCards from "./NewsBottomCards"
import ExploreSmallScreenSearch from "./ExploreSmallScreenSearch"

const ExploreMobileScreens: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Viral")

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "Search":
        return <ExploreSmallScreenSearch />
      case "Viral":
        return <Viral />
      case "Sitizens":
        return <SitezensToWatch />
      case "Sitadels":
        return <NewsBottomCards />
      default:
        return <Viral />
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-xs mx-auto">
      <nav className="flex space-x-4 items-center justify-around p-2 text-tertiary-300 sticky top-0 z-10 border-b border-gray-200">
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
            activeTab === "Viral" ? "text-secondary" : ""
          }`}
          onClick={() => setActiveTab("Viral")}
        >
          Viral
        </span>
        <span
          className={`cursor-pointer ${
            activeTab === "Sitizens" ? "text-secondary" : ""
          }`}
          onClick={() => setActiveTab("Sitizens")}
        >
          Sitizens
        </span>
        <span
          className={`cursor-pointer ${
            activeTab === "Sitadels" ? "text-secondary" : ""
          }`}
          onClick={() => setActiveTab("Sitadels")}
        >
          Sitadels
        </span>
      </nav>
      <article className="flex-1 overflow-y-auto shadow-inner shadow-gray-400/75 py-2 px-4 rounded-t-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.6 }}
          >
            {renderActiveComponent()}
          </motion.div>
        </AnimatePresence>
      </article>
    </div>
  )
}

export default ExploreMobileScreens
