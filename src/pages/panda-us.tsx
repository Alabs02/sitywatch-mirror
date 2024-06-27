import React, { useState } from "react"
import Image from "next/image"
import PandPollContent from "@/components/molecules/PandaPollContent"
import Link from "next/link"
import PandaPollCard1 from "@/components/molecules/PandaPollCard1"
import SoulPanda from "@/components/molecules/SoulPanda"
import PandaScent from "@/components/molecules/PandaScent"
import RightSideComponent from "@/components/contents/RightSideComponent"

const pandaSection = {
  cards: [
    {
      id: 1,
      icon: "add_circle",
      image: "/coreAssets/PandarUs/CreatePollHeader/poll.svg",
      title: "Card Title",
      description: "Card Description",
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

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
  }

  const renderPandaCard = () => {
    return pandaSection.cards.map((card) => (
      <PandPollContent
        key={card.id}
        icon={card.icon}
        image={card.image}
        title={card.title}
        description={card.description}
      />
    ))
  }

  const renderPollCard = () => {
    return pandaSection.polls.map((poll) => (
      <div key={poll.id} className="border rounded-lg p-4 shadow-md my-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Image
              src="/coreAssets/PandarUs/panda.gif"
              alt={poll.author}
              width={70}
              height={70}
              className="rounded-full"
            />
            <div className="ml-4">
              <p className="font-bold font-sm">{poll.author}</p>
              <p className="text-gray-800 text-[14px]">{poll.remainingTime}</p>
            </div>
          </div>
          <span className="material-symbols-outlined">more_horiz</span>
        </div>
        <p className="mb-4 text-lg font-semibold">{poll.question}</p>
        {poll.options.map((option, index) => (
          <div key={index} className="flex items-center mb-2 justify-center">
            <input
              type="radio"
              id={`option-${index}`}
              name={`poll-${poll.id}`}
              className="mr-2"
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </div>
        ))}
      </div>
    ))
  }

  return (
    <div className="w-full h-full grid grid-cols-12 gap-x-4 px-4 md:px-2 sm:px-1">
      <section className="col-span-12 lg:col-span-8 w-full h-full sticky top-0 z-20 overflow-hidden">
        <nav className="flex p-1 md:p-4 items-center justify-around md:justify-between sticky top-0 z-20 bg-inherit text-[10px] md:text-sm lg:text-lg xl:text-xl font-bold">
          <a
            href="#"
            className={`tab-link ${
              activeTab === "PANDA POLLS" ? "active-tab text-secondary" : ""
            }`}
            onClick={() => handleTabClick("PANDA POLLS")}
          >
            PANDA POLLS
          </a>
          <div className="border-l-2 border-gray-300 h-8"></div>
          <a
            href="#"
            className={`tab-link ${
              activeTab === "SOUL PANDA" ? "active-tab text-secondary" : ""
            }`}
            onClick={() => handleTabClick("SOUL PANDA")}
          >
            SOUL PANDA
          </a>
          <div className="border-l-2 border-gray-300 h-8"></div>
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
          <span className="flex items-center justify-center p-1 my-1 md:my-2 rounded-full bg-gradient-to-r from-tertiary-100 to-neutral-100 font-bold sticky top-0 z-10 text-[10px] md:text-sm lg:text-lg xl:text-xl ">
            All polls are taken in anonymous panda mode
          </span>
          <div className="overflow-y-auto h-full">
            {activeTab === "PANDA POLLS" && (
              <div className="overflow-y-auto h-full">
                {renderPandaCard()}
                {/* {renderPollCard()} */}
                <PandaPollCard1 />
              </div>
            )}
            {activeTab === "SOUL PANDA" && (
              <div>
                <SoulPanda />
              </div>
            )}
            {activeTab === "PANDA SCENTS" && (
              <div>
                <PandaScent />
              </div>
            )}
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
