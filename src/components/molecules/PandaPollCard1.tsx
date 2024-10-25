import React, { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import PandaPollOverlay from "./PandaPollOverlay"
import { usePandarPollStore } from "@/store/pandar.store"

// Define option and station types
interface Option {
  text?: string
  file?: string
  interactions: {
    id: string
    pollInteractionId: string
    answerOptionId: string
    createdAt: string
  }[]
}

interface Station {
  id: string
  questionNumber: number
  questionText: string
  descriptionText: string
  file?: string
  answerOptions: Option[]
}

const PandaPollCard1: React.FC = () => {
  const { pollData, fetchPollData, isFetching, error } = usePandarPollStore()
  const [showOverlay, setShowOverlay] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: number | null
  }>({})
  const [showResults, setShowResults] = useState<{ [key: string]: boolean }>({})
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    const fetchData = async () => {
      await fetchPollData()
    }
    fetchData()
  }, [fetchPollData])

  useEffect(() => {
    console.log("Fetched Poll Data:", pollData)
  }, [pollData])

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay)
  }

  const handleOptionSelect = (key: string, optionIndex: number) => {
    setSelectedOptions((prev) => ({ ...prev, [key]: optionIndex }))
    setShowResults((prev) => ({ ...prev, [key]: true }))
  }

  const toggleExpandedPoll = (pollId: string) => {
    setExpanded((prev) => ({ ...prev, [pollId]: !prev[pollId] }))
  }

  // Calculate the total votes for a set of options, handling undefined interactions
  const getTotalVotes = (options: Option[]) =>
    options.reduce((sum, option) => sum + (option.interactions?.length || 0), 0)

  const getPercentage = (votes: number, total: number) =>
    total > 0 ? ((votes / total) * 100).toFixed(1) : "0"

  if (isFetching) return <div>Loading polls...</div>
  if (error) return <div>Error loading polls: {error}</div>

  return (
    <>
      {pollData.map((poll) => {
        const pollTotalVotes = getTotalVotes(poll.stations[0].answerOptions)

        return (
          <div
            key={poll.id}
            className="border rounded-lg p-4 bg-neutral-400 shadow-md mb-4 text-sm md:text-base relative"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Image
                  src="/coreAssets/PandarUs/panda.gif"
                  alt={poll.pollOwnerAlias}
                  width={70}
                  height={70}
                  className="rounded-full mr-4"
                />
                <div className="flex-grow">
                  <p className="font-bold text-sm md:text-base">
                    {poll.pollOwnerAlias}
                  </p>
                  <p className="text-gray-800 text-xs md:text-sm">
                    {poll.expiresAt}
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
              {poll.stations[0].questionText}
            </p>

            <div className="flex flex-col space-y-2 items-center">
              {poll.stations[0].answerOptions.map((option, index) => {
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
                        {option.text || (
                          <Image
                            src={option.file || ""}
                            alt="Option image"
                            width={50}
                            height={50}
                          />
                        )}
                      </label>
                    </div>

                    {showResults[`poll-${poll.id}`] && (
                      <div className="w-full flex items-center mt-1">
                        <div className="w-4/5 bg-gray-200 rounded-full h-2.5 mr-2">
                          <motion.div
                            className="bg-secondary h-2.5 rounded-full"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${getPercentage(
                                option.interactions?.length || 0,
                                pollTotalVotes,
                              )}%`,
                            }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                        <span className="text-xs text-secondary">
                          {getPercentage(
                            option.interactions?.length || 0,
                            pollTotalVotes,
                          )}
                          %
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="flex justify-center mt-6">
              <div
                className="p-1 inline-flex bg-neutral-300 rounded-lg shadow-md items-center justify-center w-full cursor-pointer"
                onClick={() => toggleExpandedPoll(poll.id)}
              >
                <span className="text-xs md:text-sm text-secondary flex items-center justify-center">
                  {expanded[poll.id]
                    ? "Hide additional stations"
                    : "This pandar poll has multiple stations, see all stations "}
                  <span className="material-symbols-outlined ml-2">
                    {expanded[poll.id]
                      ? "arrow_circle_up"
                      : "arrow_circle_down"}
                  </span>
                </span>
              </div>
            </div>

            <AnimatePresence>
              {expanded[poll.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-4"
                >
                  {poll.stations.map((station) => (
                    <div
                      key={station.id}
                      className="border-t border-gray-500 pt-4 mt-4"
                    >
                      <p className="mb-2 text-sm md:text-lg font-semibold">
                        {station.questionText}
                      </p>
                      <div className="flex flex-col space-y-2 items-center">
                        {station.answerOptions.map((option, idx) => {
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
                                  {option.text || (
                                    <Image
                                      src={option.file || ""}
                                      alt="Option image"
                                      width={50}
                                      height={50}
                                    />
                                  )}
                                </label>
                              </div>

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
                                          option.interactions?.length || 0,
                                          pollTotalVotes,
                                        )}%`,
                                      }}
                                      transition={{ duration: 0.5 }}
                                    />
                                  </div>
                                  <span className="text-xs text-secondary">
                                    {getPercentage(
                                      option.interactions?.length || 0,
                                      pollTotalVotes,
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
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {showOverlay && <PandaPollOverlay onClose={toggleOverlay} />}
          </div>
        )
      })}
    </>
  )
}

export default PandaPollCard1
