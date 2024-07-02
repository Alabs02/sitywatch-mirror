import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import PandaPollOverlay from "./PandaPollOverlay"

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

const PandaPollCard1: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState(false)

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay)
  }

  return (
    <>
      {pandaSection.polls.map((poll) => (
        <div
          key={poll.id}
          className="border rounded-lg p-4 bg-neutral-400 shadow-md mb-28 md:mb-36 text-sm md:text-base"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Image
                src="/coreAssets/PandarUs/panda.gif"
                alt={poll.author}
                width={70}
                height={70}
                className="rounded-full mr-4"
              />
              <div className="flex-grow">
                <p className="font-bold text-sm md:text-base">{poll.author}</p>
                <p className="text-gray-800 text-xs md:text-sm">
                  {poll.remainingTime}
                </p>
              </div>
            </div>
            <span
              className="material-symbols-outlined cursor-pointer"
              onClick={toggleOverlay}
            >
              more_horiz
            </span>
          </div>
          <p className="mb-4 text-sm md:text-lg font-semibold">
            {poll.question}
          </p>
          <div className="flex flex-col space-y-2 items-center">
            {poll.options.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`option-${index}`}
                  name={`poll-${poll.id}`}
                  className="mr-2"
                />
                <label
                  htmlFor={`option-${index}`}
                  className="text-xs md:text-sm"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-center my-6">
            <div className="p-1 inline-flex bg-neutral-300 rounded-lg shadow-md items-center justify-center w-full">
              <Link
                href="#"
                className="text-xs md:text-sm text-secondary flex items-center justify-center"
              >
                This pandar poll has three stations, see all stations{" "}
                <span className="material-symbols-outlined ml-2">
                  arrow_circle_down
                </span>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <span className="material-symbols-outlined">cognition</span>
            <span className="material-symbols-outlined">repeat</span>
            <span className="material-symbols-outlined">bookmark</span>
            <span className="material-symbols-outlined">send</span>
          </div>
          <div className="flex border border-t-gray-400 border-b-gray-400 p-1 mx-4 items-center justify-between my-6">
            <div className="flex">
              <Image
                src="/coreAssets/PandarUs/Poll1/panda.png"
                alt={poll.author}
                width={20}
                height={20}
                className="rounded-full mr-4"
              />
              <p className="text-xs md:text-sm">34 pandas</p>
            </div>
            <div className="flex gap-x-2">
              <div className="flex items-center">
                <span className="material-symbols-outlined">cognition</span>
                <p className="text-xs md:text-sm">5</p>
              </div>
              <div className="flex items-center">
                <span className="material-symbols-outlined">repeat</span>
                <p className="text-xs md:text-sm">5</p>
              </div>
            </div>
          </div>
          <div className="flex w-full mx-auto items-center place-content-center">
            <button className="rounded-full text-xs md:text-sm px-[42%] py-[2%] bg-gradient-to-b from-[#F24055] to-[#1E7881] flex items-center mb-4 text-neutral-100 font-semibold">
              PANDAR
            </button>
          </div>
        </div>
      ))}
      {showOverlay && <PandaPollOverlay onClose={toggleOverlay} />}
    </>
  )
}

export default PandaPollCard1
