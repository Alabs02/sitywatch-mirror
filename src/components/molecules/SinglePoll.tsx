import React, { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import PandaPollOverlay from "./PandaPollOverlay"
import { usePandarPollStore, AnswerOption, PollData } from "@/store/pandar.store"
import { http } from "@/libs"
import { apiRoutes, baseURI } from "@/constants/apiRoutes"
import Cookies from "js-cookie"


interface SinglePollProps {
  poll: PollData // Update this to expect the whole poll object
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
  const [thoughts, setThoughts] = useState<any[]>([]) // To store submitted thoughts
  const [thought, setThought] = useState<string>("") // For the input field

  useEffect(() => {
    if (pollData.length === 0) {
      fetchPollData()
    }
  }, [pollData, fetchPollData])
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
    const intervalId = setInterval(updateCountdowns, 60000)
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

  // Filter the specific poll based on pollId
  // const selectedPoll = pollData.find((poll) => poll.id === pollId)

  // Debugging log for pollId
  console.log("Selected Poll ID:", poll)
  console.log("Selected Poll:", selectedPoll)

  if (!selectedPoll) {
    return <div>Poll not found.</div>
  }

  const getTotalVotes = (options: AnswerOption[]) => {
    return options.reduce((sum, option) => {
      return sum + (option.interactions ? option.interactions.length : 0)
    }, 0)
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
    if (selectedOptions[`${pollId}-${stationId}`] !== undefined) return

    setSelectedOptions((prev) => ({
      ...prev,
      [`${pollId}-${stationId}`]: optionIndex,
    }))
    setShowResults((prev) => ({
      ...prev,
      [`${pollId}-${stationId}`]: true,
    }))

    // Update the poll data in the store
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

    // Save interaction to backend
    const accessToken = Cookies.get("ACCESS_TOKEN")
    try {
      await http.service(false).post(
        `${baseURI}${apiRoutes.PANDAR_POLLS_INTERACTIONS(pollId)}`,
        {
          selectedAnswers: [
            {
              answerOptionId: updatedPollData.find(
                (poll) => poll.id === pollId,
              )!.stations[0].answerOptions[optionIndex].id,
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

  // Calculate the total votes for a set of options, handling undefined interactions

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
          answerOptionId:
            poll.stations[0].answerOptions[optionIndex].id || null,
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
    } catch (error: any) {
      console.error({ error })
    }
  }
  const submitThought = async () => {
    if (!thought.trim()) return // Prevent empty submissions

    const accessToken = Cookies.get("ACCESS_TOKEN")
    try {
      const response = await http.service(false).post(
        `/api/v1/pandar-polls/${poll.id}/thought`,
        { thought },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        },
      )

      const newThought = response.data // Assuming the API returns the created thought
      setThoughts((prev) => [newThought, ...prev]) // Add to the top of the list
      setThought("") // Clear input field
    } catch (error) {
      console.error("Error submitting thought:", error)
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
      className="text-secondary text-sm  mb-4 inline-flex p-1 items-center border border-secondary rounded-full cursor-pointer"
      onClick={onBack}
    >
      <span className="material-symbols-outlined">arrow_back</span>
      <span> Back to polls</span>
    </div>

    {/* Iterate through stations */}
    {selectedPoll.stations.map((station, stationIndex) => {
      const isPollExpired = expiredPolls[selectedPoll.id];
      const isCurrentlyPandering = isSubmitting[selectedPoll.id];
      const stationKey = `${selectedPoll.id}-${station.id}`;
      const stationTotalVotes = getTotalVotes(station.answerOptions);

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
                className="rounded-full mr-4"
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
              const optionKey = `poll-${station.id}-option-${optionIndex}`;
              const optionVotes = option.interactions?.length || 0;

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
                          optionIndex
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
                              stationTotalVotes
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
              );
            })}
          </div>

          {/* Poll Footer */}
          <div className="flex w-full mx-auto items-center justify-center mt-4">
            <button
              onClick={() => {
                if (!isCurrentlyPandering) {
                  onSubmitPoll(selectedPoll.id);
                }
              }}
              className={`rounded-full text-xs md:text-sm px-[42%] py-[2%] font-semibold ${
                isCurrentlyPandering || isPollExpired
                  ? "bg-gray-700 text-gray-300 cursor-not-allowed"
                  : "bg-gradient-to-b from-[#F24055] to-[#1E7881] text-neutral-100"
              }`}
              disabled={isCurrentlyPandering || isPollExpired}
            >
              {isPollExpired
                ? "Expired"
                : isCurrentlyPandering
                ? "Pandaring..."
                : "PANDAR"}
            </button>
          </div>
        </div>
      );
    })}

    {/* Overlay */}
    {showOverlay && <PandaPollOverlay onClose={toggleOverlay} />}

    {/* Thoughts Submission Section */}
    <div className="mt-6">
      <textarea
        value={thought}
        onChange={(e) => setThought(e.target.value)}
        placeholder="Share your thoughts..."
        className="p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
      />
      <div className="flex justify-end mt-2">
        <button
          onClick={submitThought}
          className="bg-gradient-to-b bg-secondary text-white rounded-full px-2 py-1 text-xs font-semibold"
          disabled={!thought.trim()}
        >
          Submit Thought
        </button>
      </div>

      {/* Display Submitted Thoughts */}
      {thoughts.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm md:text-base font-semibold">Thoughts:</h3>
          <ul className="mt-2 space-y-2">
            {thoughts.map((thought, index) => (
              <li key={index} className="border-b border-gray-300 pb-2">
                <p className="text-sm md:text-base">{thought.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);

}

export default SinglePoll
