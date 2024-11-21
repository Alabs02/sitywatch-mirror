import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import PandaPollOverlay from "./PandaPollOverlay";
import { usePandarPollStore, AnswerOption } from "@/store/pandar.store";
import { http } from "@/libs";
import { apiRoutes,baseURI } from "@/constants/apiRoutes";
import Cookies from "js-cookie"


// Define option and station types
interface Option {
  text?: string;
  file?: string;
  interactions: {
    id: string;
    pollInteractionId: string;
    answerOptionId: string;
    createdAt: string;
  }[];
}

interface Station {
  id: string;
  questionNumber: number;
  questionText: string;
  descriptionText: string;
  file?: string;
  answerOptions: Option[];
}

interface Poll {
  id: number;
  author: string;
  question: string;
  options: Option[];
  remainingTime: string;
  stations?: Station[];
}

const PandaPollCard1: React.FC = () => {
  const { pollData, fetchPollData, isFetching, error } = usePandarPollStore()
  const [showOverlay, setShowOverlay] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: number | null
  }>({})
  const [showResults, setShowResults] = useState<{ [key: string]: boolean }>({})
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({})

  const [countdowns, setCountdowns] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState<{ [key: string]: boolean }>(
    {},
  )
  const [expiredPolls, setExpiredPolls] = useState<{ [key: string]: boolean }>(
    {},
  )
   const [isPandering, setIsPandering] = useState<{ [key: string]: boolean }>(
     {},
   )

  useEffect(() => {
    const fetchData = async () => {
      await fetchPollData()
    }
    fetchData()
  }, [fetchPollData])

  // Update countdowns for each poll every minute
  useEffect(() => {
    const calculateCountdown = (expiresAt: string) => {
      const now = new Date().getTime()
      const end = new Date(expiresAt).getTime()
      const diff = end - now

      if (diff <= 0) return "Expired"

      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      )
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      return `${hours} hrs ${minutes} mins remaining`
    }

    const updateCountdowns = () => {
      const updatedCountdowns: { [key: string]: string } = {}
      const updatedExpiredPolls: { [key: string]: boolean } = {}
      pollData.forEach((poll) => {
        const countdown = calculateCountdown(poll.expiresAt)
        updatedCountdowns[poll.id] = countdown
        updatedExpiredPolls[poll.id] = countdown === "Expired"
      })

      setCountdowns(updatedCountdowns)
      setExpiredPolls(updatedExpiredPolls)
    }

    updateCountdowns()
    // Update every 1 minute
    const intervalId = setInterval(updateCountdowns, 60000)
    // Cleanup on component unmount
    return () => clearInterval(intervalId)
  }, [pollData])

useEffect(() => {
  console.log("Poll Data:", pollData)
  pollData.forEach((poll) => {
    poll.stations[0].answerOptions.forEach((option) => {
      console.log(
        `Option Text: ${option.text}, Interactions:`,
        option.interactions,
      )
    })
  })
}, [pollData])


  const toggleOverlay = () => {
    setShowOverlay(!showOverlay)
  }

const handleOptionSelect = (
  pollId: string,
  stationId: string,
  optionIndex: number,
) => {
  if (selectedOptions[`${pollId}-${stationId}`] !== undefined) return

  setSelectedOptions((prev) => ({
    ...prev,
    [`${pollId}-${stationId}`]: optionIndex,
  }))
  setShowResults((prev) => ({
    ...prev,
    [`${pollId}-${stationId}`]: true,
  }))

  const updatedPollData = pollData.map((poll) => {
    if (poll.id === pollId) {
      poll.stations = poll.stations.map((station) => {
        if (station.id === stationId) {
          station.answerOptions[optionIndex].interactions.push({
            id: `interaction-${Date.now()}`,
            pollInteractionId: pollId,
            answerOptionId: station.answerOptions[optionIndex].id,
            createdAt: new Date().toISOString(),
          })
        }
        return station
      })
    }
    return poll
  })

  usePandarPollStore.setState({ pollData: updatedPollData })
}




  const toggleExpandedPoll = (pollId: string) => {
    setExpanded((prev) => ({ ...prev, [pollId]: !prev[pollId] }))
  }

  // Calculate the total votes for a set of options, handling undefined interactions
  const getTotalVotes = (options: AnswerOption[]) => {
    return options.reduce((sum, option) => {
      return sum + (option.interactions ? option.interactions.length : 0)
    }, 0)
  }

  // Calculate the percentage of votes for an option
  const getPercentage = (votes: number, total: number) => {
    if (total === 0) return "0"
    return ((votes / total) * 100).toFixed(1)
  }


const onSubmitPoll = async (id: string) => {
  // Persist pandering state
  setIsSubmitting((prev) => ({ ...prev, [id]: true }))

  const accessToken = Cookies.get("ACCESS_TOKEN")

  const selectedAnswers = Object.entries(selectedOptions)
    .map(([key, optionIndex]) => {
      if (optionIndex === null) return null
      const poll = pollData.find((poll) => poll.id === id)
      if (!poll || !poll.stations?.[0]?.answerOptions?.[optionIndex])
        return null
      return {
        answerOptionId: poll.stations[0].answerOptions[optionIndex].id || null,
      }
    })
    .filter((answer) => answer && answer.answerOptionId !== null)

  const payload = { selectedAnswers }

  try {
    const response = await http
      .service(false)
      .post(`${baseURI}${apiRoutes.PANDAR_POLLS_INTERACTIONS(id)}`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })

    console.log({ response })

    // Refresh poll data after successful submission
    await fetchPollData()
  } catch (error: any) {
    console.error({ error })
  } finally {
    // Reset submitting state
    setIsSubmitting((prev) => ({ ...prev, [id]: false }))
  }
}



 // Styles for the ellipsis animation
 const ellipsisStyle = `
    @keyframes ellipsis {
      0% { opacity: 0; }
      33% { opacity: 1; }
      66% { opacity: 0; }
    }
    .dot1 { animation: ellipsis 1s infinite; animation-delay: 0s; }
    .dot2 { animation: ellipsis 1s infinite; animation-delay: 0.33s; }
    .dot3 { animation: ellipsis 1s infinite; animation-delay: 0.66s; }
  `


  if (isFetching) return <div>Loading polls...</div>
  if (error) return <div>Error loading polls: {error}</div>

 return (
  <div className="-mb-32">
    <style>{ellipsisStyle}</style>
    {pollData.map((poll) => {
      const pollTotalVotes = getTotalVotes(poll.stations[0].answerOptions)

      const isPollExpired = expiredPolls[poll.id]
      const isCurrentlyPandering = isSubmitting[poll.id]

      return (
        <div
          key={poll.id}
          className="border rounded-lg p-4 bg-neutral-400 shadow-md mb-4 text-sm md:text-base relative"
        >
          {/* Header Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Image
                src="/pandar-img.png"
                alt={poll.pollOwnerAlias}
                width={70}
                height={70}
                className="rounded-full mr-4"
              />
              <div>
                <p className="font-bold text-sm md:text-base">
                  {poll.pollOwnerAlias}
                </p>
                <p className="text-gray-800 text-xs md:text-sm">
                  {countdowns[poll.id]}
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
          {/* Poll Description */}
          {poll.description && (
            <p className="mb-2 text-sm md:text-base text-gray-700">
              {poll.description}
            </p>
          )}

          {/* Poll Question */}
          <p className="mb-4 text-sm md:text-lg font-semibold">
            {poll.stations[0].questionText}
          </p>

          {/* Answer Options */}
          <div className="flex flex-col space-y-2 items-center">
            {poll.stations[0].answerOptions.map((option, index) => {
              const optionKey = `poll-${poll.id}-option-${index}`
              const optionVotes = option.interactions?.length || 0

              return (
                <div key={index} className="w-full">
                  {/* Radio Option */}
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={optionKey}
                      name={`poll-${poll.id}`}
                      className="mr-2"
                      onChange={() =>
                        handleOptionSelect(poll.id, poll.stations[0].id, index)
                      }
                      disabled={
                        selectedOptions[`${poll.id}-${poll.stations[0].id}`] !==
                        undefined
                      }
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
                  {/* Progress Bar */}
                  {showResults[`${poll.id}-${poll.stations[0].id}`] && (
                    <div className="flex items-center mt-1">
                      <div className="w-4/5 bg-gray-200 rounded-full h-2.5 mr-2">
                        <motion.div
                          className="bg-secondary h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${getPercentage(
                              optionVotes,
                              pollTotalVotes,
                            )}%`,
                          }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <span className="text-xs text-secondary">
                        {getPercentage(optionVotes, pollTotalVotes)}%
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Expand Stations Button */}
          {poll.stations.length > 1 && (
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
          )}

          {/* Additional Stations */}
          <AnimatePresence>
            {expanded[poll.id] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-4"
              >
                {poll.stations.slice(1).map((station) => (
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
                          <div key={idx} className="w-full">
                            {/* Radio Option */}
                            <div className="flex items-center">
                              <input
                                type="radio"
                                id={stationOptionKey}
                                name={`poll-${poll.id}-station-${station.id}`}
                                className="mr-2"
                                onChange={() =>
                                  handleOptionSelect(poll.id, station.id, idx)
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
                            {/* Progress Bar */}
                            {showResults[
                              `poll-${poll.id}-station-${station.id}`
                            ] && (
                              <div className="flex items-center mt-1">
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

          {/* Poll Footer */}
          <div className="flex w-full mx-auto items-center justify-center mt-4">
            <button
              onClick={() => {
                if (!isCurrentlyPandering) {
                  onSubmitPoll(poll.id)
                }
              }}
              className={`rounded-full text-xs md:text-sm px-[42%] py-[2%] font-semibold ${
                isCurrentlyPandering || isPollExpired
                  ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-b from-[#F24055] to-[#1E7881] text-neutral-100"
              }`}
              disabled={isCurrentlyPandering || isPollExpired}
            >
              {isPollExpired ? (
                "Expired"
              ) : isCurrentlyPandering ? (
                <>
                  Pandaring<span className="dot1">.</span>
                  <span className="dot2">.</span>
                  <span className="dot3">.</span>
                </>
              ) : (
                "PANDAR"
              )}
            </button>
          </div>

          {/* Overlay */}
          {showOverlay && <PandaPollOverlay onClose={toggleOverlay} />}
        </div>
      )
    })}
  </div>
);

};

export default PandaPollCard1;
