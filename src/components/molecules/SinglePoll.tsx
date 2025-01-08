import React, { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import PandaPollOverlay from "./PandaPollOverlay"
import { usePandarPollStore, AnswerOption, PollData } from "@/store/pandar.store"
import { http } from "@/libs"
import { apiRoutes, baseURI } from "@/constants/apiRoutes"
import Cookies from "js-cookie"
import PollThoughts from "../contents/pandar-polls/PollThoughts"
import {
  getTotalVotes,
  getPercentage,
  calculateCountdown,
  updateCountdowns,
} from "@/utils/pollUtils"


interface SinglePollProps {
  poll: PollData 
  onBack: () => void
}


const SinglePoll: React.FC<SinglePollProps> = ({ poll, onBack }) => {
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
  const [isPandering, setIsPandering] = useState<{ [key: string]: boolean }>({})


  useEffect(() => {
    if (pollData.length === 0) {
      fetchPollData()
    }
  }, [pollData, fetchPollData])
   useEffect(() => {
     updateCountdowns(pollData, setCountdowns, setExpiredPolls)
     const intervalId = setInterval(
       () => updateCountdowns(pollData, setCountdowns, setExpiredPolls),
       60000,
     )
     return () => clearInterval(intervalId)
   }, [pollData])

  // Filter the specific poll based on pollId
  const selectedPoll = pollData.find((pollItem) => pollItem?.id === poll.id)

  if (!poll) {
    return <div>Poll not found.</div>
  }

  useEffect(() => {
    const localStorage = typeof window !== "undefined" && window.localStorage
    if (localStorage) {
      localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions))
    } else {
      // Handle the case where local storage is unavailable (optional)
      console.warn("Local storage is not available")
    }
  }, [selectedOptions])

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

  
  // Debugging log for pollId
  console.log("Selected Poll ID:", poll)
  console.log("Selected Poll:", selectedPoll)

  if (!selectedPoll) {
    return <div>Poll not found.</div>
  }
  
  const pollTotalVotes = getTotalVotes(selectedPoll.stations[0].answerOptions)
  const isPollExpired = expiredPolls[selectedPoll.id]
  const isCurrentlyPandering = isSubmitting[selectedPoll.id]
  const toggleOverlay = () => {
    setShowOverlay(!showOverlay)
  }

  const handleOptionSelect = async (
    pollId: string,
    stationId: string,
    optionIndex: number,
  ) => {
    const stationKey = `${pollId}-${stationId}`
    if (selectedOptions[stationKey] !== undefined) return

    setSelectedOptions((prev) => ({ ...prev, [stationKey]: optionIndex }))

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

    const accessToken = Cookies.get("ACCESS_TOKEN")
    try {
      await http.service(false).post(
        `${baseURI}${apiRoutes.PANDAR_POLLS_INTERACTIONS(pollId)}`,
        {
          selectedAnswers: [
            {
              answerOptionId: updatedPollData
                .find((poll) => poll.id === pollId)!
                .stations.find((station) => station.id === stationId)!
                .answerOptions[optionIndex].id,
            },
          ],
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        },
      )
    } catch (error) {
      console.error("Error saving interaction:", error)
    }
  }

   const toggleExpandedPoll = (pollId: string) => {
     setExpanded((prev) => ({ ...prev, [pollId]: !prev[pollId] }))
   }


 const onSubmitPoll = async (pollId: string, stationId: string) => {
   const stationKey = `${pollId}-${stationId}`

   if (
     selectedOptions[stationKey] === undefined ||
     selectedOptions[stationKey] === null
   )
     return

   setIsSubmitting((prev) => ({ ...prev, [stationKey]: true }))

   const accessToken = Cookies.get("ACCESS_TOKEN")
   const selectedOptionIndex = selectedOptions[stationKey]!
   const poll = pollData.find((p) => p.id === pollId)
   const station = poll?.stations.find((s) => s.id === stationId)

   if (!station) return

   const payload = {
     selectedAnswers: [
       { answerOptionId: station.answerOptions[selectedOptionIndex].id },
     ],
   }

   try {
     await http
       .service(false)
       .post(
         `${baseURI}${apiRoutes.PANDAR_POLLS_INTERACTIONS(pollId)}`,
         payload,
         {
           headers: { Authorization: `Bearer ${accessToken}` },
           withCredentials: true,
         },
       )

     setShowResults((prev) => ({ ...prev, [stationKey]: true }))
   } catch (error) {
     console.error("Error submitting poll:", error)
   } finally {
     setIsSubmitting((prev) => ({ ...prev, [stationKey]: false }))
   }
 }

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

return (
  <div className="mb-32">
    <div
      className="text-secondary text-sm mb-4 inline-flex p-1 items-center border border-secondary rounded-full cursor-pointer"
      onClick={onBack}
    >
      <span className="material-symbols-outlined">arrow_back</span>
      <span> Back to polls</span>
    </div>

    {/* Iterate through stations */}
    {selectedPoll.stations.map((station, stationIndex) => {
      const isPollExpired = expiredPolls[selectedPoll.id]
      const isCurrentlyPandering = isSubmitting[selectedPoll.id]
      const stationKey = `${selectedPoll.id}-${station.id}`
      const stationTotalVotes = getTotalVotes(station.answerOptions)

      return (
        <div
          key={station.id}
          className="border rounded-lg p-4 bg-neutral-400 shadow-md mb-4 text-sm md:text-base relative"
        >
          {/* Header Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Image
                src="/pandar-img.png"
                alt={selectedPoll.pollOwnerAlias}
                width={70}
                height={70}
                className="rounded-full mr-4 mt-4"
              />
              <div>
                <p className="font-bold text-sm md:text-base">
                  {selectedPoll.pollOwnerAlias}
                </p>
                <p className="text-gray-800 text-xs md:text-sm">
                  {countdowns[selectedPoll.id]}
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
            {station.questionText}
          </p>

          {/* Answer Options */}
          <div className="flex flex-col space-y-2 items-center">
            {station.answerOptions.map((option, optionIndex) => {
              const optionKey = `poll-${station.id}-option-${optionIndex}`
              const optionVotes = option.interactions?.length || 0

              return (
                <div key={optionIndex} className="w-full">
                  {/* Radio Option */}
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={optionKey}
                      name={`poll-${station.id}`}
                      className="mr-2"
                      onChange={() =>
                        handleOptionSelect(
                          selectedPoll.id,
                          station.id,
                          optionIndex,
                        )
                      }
                      disabled={selectedOptions[stationKey] !== undefined}
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
                  {showResults[stationKey] && (
                    <div className="flex items-center mt-1">
                      <div className="w-4/5 bg-gray-200 rounded-full h-2.5 mr-2">
                        <motion.div
                          className="bg-secondary h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${getPercentage(
                              optionVotes,
                              stationTotalVotes,
                            )}%`,
                          }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <span className="text-xs text-secondary">
                        {getPercentage(optionVotes, stationTotalVotes)}%
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          {/* Interactions section */}
          <div className="flex items-center justify-center space-x-4 mt-4">
            <span className="material-symbols-outlined">cognition</span>
            <span className="material-symbols-outlined">repeat</span>
            <span className="material-symbols-outlined">bookmark</span>
            <span className="material-symbols-outlined">send</span>
          </div>
          <div className="flex border border-t-gray-400 border-b-gray-400 p-1 mx-4 items-center justify-between my-6">
            <div className="flex">
              <Image
                src="/coreAssets/PandarUs/Poll1/panda.png"
                alt="alt img"
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
          {/* Poll Footer */}
          <div className="flex w-full mx-auto items-center justify-center mt-4">
            <button
              onClick={() => {
                if (!isCurrentlyPandering) {
                  onSubmitPoll(poll.id, station.id)
                }
              }}
              className={`rounded-full text-xs md:text-sm px-[42%] py-[2%] font-semibold ${
                isCurrentlyPandering || isPollExpired
                  ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-b from-[#F24055] to-[#1E7881] text-neutral-100"
              }`}
              disabled={
                isCurrentlyPandering ||
                isPollExpired ||
                selectedOptions[stationKey] === undefined
              }
            >
              {isPollExpired
                ? "Expired"
                : isCurrentlyPandering
                ? "Pandaring..."
                : "PANDAR"}
            </button>
          </div>
        </div>
      )
    })}

    {/* Overlay */}
    {showOverlay && <PandaPollOverlay onClose={toggleOverlay} />}

    {/* Thoughts Submission Section */}
    <h1>{poll.pollOwnerAlias}'s Poll</h1>
    {/* Render PollThoughts */}
    <PollThoughts
      pollId={poll.id}
      pollOwnerAlias={poll.pollOwnerAlias}
      
    />
  </div>
)


}

export default SinglePoll
