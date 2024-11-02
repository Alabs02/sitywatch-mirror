import React, { useState } from "react"
import { motion } from "framer-motion" 
import Image from "next/image"
import PandPollContent from "@/components/molecules/PandaPollContent"
import PandaPollCard1 from "@/components/molecules/PandaPollCard1"
import SoulPanda from "@/components/molecules/SoulPanda"
import PandaScent from "@/components/molecules/PandaScent"
import RightSideComponent from "@/components/contents/RightSideComponent"
import CreatePandarPoll from "@/components/contents/create-pandar-poll/CreatePandarPoll"

const pandaSection = {
  cards: [
    {
      id: 1,
      icon: "add_circle",
      image: "/coreAssets/PandarUs/CreatePollHeader/poll.svg",
      title: "Create Pandar Poll",
      description: "Set up your own pandar poll to help others find their soul_pandars.You can ask those questions you don’t wanna ask in person andno one will know its you ... not even us."
    },
  ],
  polls: [
    {
      id: 1,
      author: "Pandar_PLF",
      question:
        "(1) This guy has been hyping every gist I drop for the past 2 weeks. What should I do?",
      options: ["Ignore him", "Whisper to him", "Blind him", "Watch him"],
      remainingTime: "22 hrs 55 mins remaining",
    },
  ],
}

const PandaUs = () => {
  const [activeTab, setActiveTab] = useState("PANDA POLLS")
  const [showCreatePoll, setShowCreatePoll] = useState(false)

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
  }

  const toggleCreatePoll = () => {
    setShowCreatePoll(!showCreatePoll)
  }

  const renderPandaCard = () => {
    return pandaSection.cards.map((card) => (
      <div key={card.id} onClick={toggleCreatePoll}>
        {" "}
        {/* On click, toggle the poll */}
        <PandPollContent
          icon={card.icon}
          image={card.image}
          title={card.title}
          description={card.description}
        />
      </div>
    ))
  }

  return (
    <div className="w-full h-full grid grid-cols-12 gap-x-4 px-4 md:px-2 sm:px-1">
      <section className="col-span-12 lg:col-span-8 w-full h-full sticky top-0 z-20 overflow-hidden">
        <nav className="flex p-1 md:p-2 items-center justify-around md:justify-between sticky top-0 z-20 bg-inherit text-[10px] md:text-sm font-bold">
          <a
            href="#"
            className={`tab-link ${
              activeTab === "PANDA POLLS" ? "active-tab text-secondary" : ""
            }`}
            onClick={() => handleTabClick("PANDA POLLS")}
          >
            PANDA POLLS
          </a>
          <div className="border-l-2 border-gray-300 h-6"></div>
          <a
            href="#"
            className={`tab-link ${
              activeTab === "SOUL PANDA" ? "active-tab text-secondary" : ""
            }`}
            onClick={() => handleTabClick("SOUL PANDA")}
          >
            SOUL PANDA
          </a>
          <div className="border-l-2 border-gray-300 h-6"></div>
          <a
            href="#"
            className={`tab-link ${
              activeTab === "PANDA SCENTS" ? "active-tab text-secondary" : ""
            }`}
            onClick={() => handleTabClick("PANDA SCENTS")}
          >
            PANDA SCENTS
          </a>
        </nav>

        <div className="w-full h-full tab-content mt-4 px-4 shadow-inner shadow-gray-400/40 border rounded-t-[20px] overflow-hidden">
          <span
            onClick={toggleCreatePoll} 
            className="cursor-pointer flex items-center justify-center p-1 my-1 md:my-2 rounded-full bg-gradient-to-r from-tertiary-100 to-neutral-100 font-bold sticky top-0 z-10 text-[10px] md:text-sm"
          >
            All polls are taken in anonymous panda mode
          </span>

          <div className="overflow-y-auto h-full">
            {activeTab === "PANDA POLLS" && (
              <div className="overflow-y-auto h-full">
                {!showCreatePoll ? ( 
                  <>
                    {renderPandaCard()}
                    <PandaPollCard1 />
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }} 
                    transition={{ duration: 0.5 }} 
                  >
                    <CreatePandarPoll />
                  </motion.div>
                )}
              </div>
            )}

            {activeTab === "SOUL PANDA" && <SoulPanda />}
            {activeTab === "PANDA SCENTS" && <PandaScent />}
          </div>
        </div>
      </section>

      <section className="hidden lg:block col-span-4 h-full overflow-y-auto">
        <RightSideComponent />
      </section>
    </div>
  )
}

export default PandaUs
