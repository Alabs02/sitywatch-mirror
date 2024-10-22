import React, { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import PandaPollOverlay from "./PandaPollOverlay"

interface Option {
  text?: string
  imageSrc?: string
  votes: number
}

interface Station {
  id: number
  question: string
  options: Option[]
}

interface Poll {
  id: number
  author: string
  question: string
  options: Option[]
  remainingTime: string
  stations?: Station[]
}

// Text-based poll section
const pandaSection = {
  polls: [
    {
      id: 1,
      author: "Pandar_PLF",
      question:
        "This guy has been hyping every gist I drop for the past 2 weeks. What should I do?",
      options: [
        { text: "Ignore him", votes: 30 },
        { text: "Whisper to him", votes: 20 },
        { text: "Blind him", votes: 40 },
        { text: "Watch him", votes: 10 },
      ],
      remainingTime: "22 hrs 55 mins remaining",
      stations: [
        {
          id: 1,
          question: "What's your next move after this?",
          options: [
            { text: "Reply calmly", votes: 15 },
            { text: "Ignore him", votes: 25 },
            { text: "Respond with sarcasm", votes: 10 },
          ],
        },
        {
          id: 2,
          question: "How do you want to proceed?",
          options: [
            { text: "Confront directly", votes: 20 },
            { text: "Let it go", votes: 30 },
            { text: "Seek advice", votes: 5 },
          ],
        },
      ],
    },
  ],
}

// Image-based poll section
const pandaImagePoll = {
  polls: [
    {
      id: 2,
      author: "Panda_Image",
      question: "Which panda looks cooler?",
      options: [
        { imageSrc: "/dummyImages/panda1.jpg", votes: 50 },
        { imageSrc: "/dummyImages/panda2.jpg", votes: 70 },
      ],
      remainingTime: "12 hrs 30 mins remaining",
    },
  ],
}

const PandaPollCard1: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: number | null
  }>({})
  const [showResults, setShowResults] = useState<{ [key: string]: boolean }>({})
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({})

  // Toggle the overlay visibility
  const toggleOverlay = () => {
    setShowOverlay(!showOverlay)
  }

  // Handle option selection for both main polls and stations
  const handleOptionSelect = (key: string, optionIndex: number) => {
    setSelectedOptions((prev) => ({ ...prev, [key]: optionIndex }))
    setShowResults((prev) => ({ ...prev, [key]: true }))
  }

  // Toggle the expansion of additional stations
  const toggleExpandedPoll = (pollId: number) => {
    setExpanded((prev) => ({ ...prev, [pollId]: !prev[pollId] }))
  }

  // Calculate the total votes for a set of options
  const getTotalVotes = (options: Option[]) =>
    options.reduce((sum, option) => sum + option.votes, 0)

  // Calculate the percentage of votes for a given option
  const getPercentage = (votes: number, total: number) =>
    total > 0 ? ((votes / total) * 100).toFixed(1) : "0"

  return (
    <>
      {pandaSection.polls.map((poll) => {
        const pollTotalVotes = getTotalVotes(poll.options)
        return (
          <div
            key={poll.id}
            className="border rounded-lg p-4 bg-neutral-400 shadow-md mb-32 md:mb-36 text-sm md:text-base relative"
          >
            {/* Author Information and Overlay Toggle */}
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
                  <p className="font-bold text-sm md:text-base">
                    {poll.author}
                  </p>
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

            {/* Poll Question */}
            <p className="mb-4 text-sm md:text-lg font-semibold">
              {poll.question}
            </p>

            {/* Poll Options */}
            <div className="flex flex-col space-y-2 items-center">
              {poll.options.map((option, index) => {
                const optionKey = `poll-${poll.id}-option-${index}`
                return (
                  <div key={index} className="flex flex-col w-full">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id={optionKey}
                        name={`poll-${poll.id}`}
                        className="mr-2"
                        onChange={() =>
                          handleOptionSelect(`poll-${poll.id}`, index)
                        }
                        disabled={!!selectedOptions[`poll-${poll.id}`]}
                      />
                      <label
                        htmlFor={optionKey}
                        className="text-xs md:text-sm w-full"
                      >
                        {option.text}
                      </label>
                    </div>

                    {/* Show percentage and progress bar if an option has been selected */}
                    {showResults[`poll-${poll.id}`] && (
                      <div className="w-full flex items-center mt-1">
                        <div className="w-4/5 bg-gray-200 rounded-full h-2.5 mr-2">
                          <motion.div
                            className="bg-secondary h-2.5 rounded-full"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${getPercentage(
                                option.votes,
                                pollTotalVotes,
                              )}%`,
                            }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                        <span className="text-xs text-secondary">
                          {getPercentage(option.votes, pollTotalVotes)}%
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Toggle Button for Additional Stations */}
            <div className="flex justify-center mt-6">
              <div
                className="p-1 inline-flex bg-neutral-300 rounded-lg shadow-md items-center justify-center w-full cursor-pointer"
                onClick={() => toggleExpandedPoll(poll.id)}
              >
                <span className="text-xs md:text-sm text-secondary flex items-center justify-center">
                  {expanded[poll.id]
                    ? "Hide additional stations"
                    : "This pandar poll has three stations, see all stations "}
                  <span className="material-symbols-outlined ml-2">
                    {expanded[poll.id]
                      ? "arrow_circle_up"
                      : "arrow_circle_down"}
                  </span>
                </span>
              </div>
            </div>

            {/* Additional Stations */}
            <AnimatePresence>
              {expanded[poll.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-4"
                >
                  {poll.stations?.map((station) => {
                    const stationTotalVotes = getTotalVotes(station.options)
                    return (
                      <div
                        key={station.id}
                        className="border-t border-gray-500 pt-4 mt-4"
                      >
                        <p className="mb-2 text-sm md:text-lg font-semibold">
                          {station.question}
                        </p>
                        <div className="flex flex-col space-y-2 items-center">
                          {station.options.map((option, idx) => {
                            const stationOptionKey = `poll-${poll.id}-station-${station.id}-option-${idx}`
                            return (
                              <div key={idx} className="flex flex-col w-full">
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id={stationOptionKey}
                                    name={`poll-${poll.id}-station-${station.id}`}
                                    className="mr-2"
                                    onChange={() =>
                                      handleOptionSelect(
                                        `poll-${poll.id}-station-${station.id}`,
                                        idx,
                                      )
                                    }
                                    disabled={
                                      !!selectedOptions[
                                        `poll-${poll.id}-station-${station.id}`
                                      ]
                                    }
                                  />
                                  <label
                                    htmlFor={stationOptionKey}
                                    className="text-xs md:text-sm w-full"
                                  >
                                    {option.text}
                                  </label>
                                </div>

                                {/* Show percentage and progress bar if an option has been selected */}
                                {showResults[
                                  `poll-${poll.id}-station-${station.id}`
                                ] && (
                                  <div className="w-full flex items-center mt-1">
                                    <div className="w-4/5 bg-gray-200 rounded-full h-2.5 mr-2">
                                      <motion.div
                                        className="bg-secondary h-2.5 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{
                                          width: `${getPercentage(
                                            option.votes,
                                            stationTotalVotes,
                                          )}%`,
                                        }}
                                        transition={{ duration: 0.5 }}
                                      />
                                    </div>
                                    <span className="text-xs text-secondary">
                                      {getPercentage(
                                        option.votes,
                                        stationTotalVotes,
                                      )}
                                      %
                                    </span>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Poll Interaction Icons */}
            <div className="flex items-center justify-center space-x-4 mt-4">
              <span className="material-symbols-outlined">cognition</span>
              <span className="material-symbols-outlined">repeat</span>
              <span className="material-symbols-outlined">bookmark</span>
              <span className="material-symbols-outlined">send</span>
            </div>

            {/* Poll Activity Summary */}
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

            {/* Poll Action Button */}
            <div className="flex w-full mx-auto items-center place-content-center">
              <button className="rounded-full text-xs md:text-sm px-[42%] py-[2%] bg-gradient-to-b from-[#F24055] to-[#1E7881] flex items-center mb-4 text-neutral-100 font-semibold">
                PANDAR
              </button>
            </div>
          </div>
        )
      })}

      {/* Image-based poll section */}
      {pandaImagePoll.polls.map((poll) => {
        const pollTotalVotes = getTotalVotes(poll.options)
        return (
          <div
            key={poll.id}
            className="border rounded-lg p-4 bg-neutral-400 shadow-md mb-32 md:mb-36 text-sm md:text-base relative"
          >
            {/* Author Information and Overlay Toggle */}
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
                  <p className="font-bold text-sm md:text-base">
                    {poll.author}
                  </p>
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

            {/* Poll Question */}
            <p className="mb-4 text-sm md:text-lg font-semibold">
              {poll.question}
            </p>

            {/* Poll Image Options */}
            <div className="flex justify-around items-center mb-4">
              {poll.options.map((option, index) => {
                const optionKey = `poll-${poll.id}-option-${index}`
                return (
                  <div key={index} className="flex flex-col items-center">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id={optionKey}
                        name={`poll-${poll.id}`}
                        className="mr-2"
                        onChange={() =>
                          handleOptionSelect(`poll-${poll.id}`, index)
                        }
                        disabled={!!selectedOptions[`poll-${poll.id}`]}
                      />
                      <Image
                        src={option.imageSrc}
                        alt={`Option ${index + 1}`}
                        width={100}
                        height={100}
                        className="rounded-lg"
                      />
                    </div>

                    {/* Show percentage and progress bar if an option has been selected */}
                    {showResults[`poll-${poll.id}`] && (
                      <div className="w-full flex items-center mt-2">
                        <div className="w-4/5 bg-gray-200 rounded-full h-2.5 mr-2">
                          <motion.div
                            className="bg-secondary h-2.5 rounded-full"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${getPercentage(
                                option.votes,
                                pollTotalVotes,
                              )}%`,
                            }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                        <span className="text-xs text-secondary">
                          {getPercentage(option.votes, pollTotalVotes)}%
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Poll Interaction Icons */}
            <div className="flex items-center justify-center space-x-4 mt-4">
              <span className="material-symbols-outlined">cognition</span>
              <span className="material-symbols-outlined">repeat</span>
              <span className="material-symbols-outlined">bookmark</span>
              <span className="material-symbols-outlined">send</span>
            </div>

            {/* Poll Activity Summary */}
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

            {/* Poll Action Button */}
            <div className="flex w-full mx-auto items-center place-content-center">
              <button className="rounded-full text-xs md:text-sm px-[42%] py-[2%] bg-gradient-to-b from-[#F24055] to-[#1E7881] flex items-center mb-4 text-neutral-100 font-semibold">
                PANDAR
              </button>
            </div>
          </div>
        )
      })}

      {showOverlay && <PandaPollOverlay onClose={toggleOverlay} />}
    </>
  )
}

export default PandaPollCard1
