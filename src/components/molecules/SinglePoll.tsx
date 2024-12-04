import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { motion } from "framer-motion"
import { usePandarPollStore } from "@/store/pandar.store"
import Image from "next/image"
import { AnswerOption, PollData } from "@/store/pandar.store"
import { apiRoutes } from "@/constants/apiRoutes"

interface SinglePollProps {
  poll: PollData | null
}

const SinglePoll: React.FC<SinglePollProps> = ({ poll }) => {
  const router = useRouter()
  const { pollId } = router.query

  const {
    pollData,
    fetchPollData,
    isFetching,
    error,
    updateProgress,
    progress,
  } = usePandarPollStore()

  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    if (!pollData.length) {
      fetchPollData()
    }
  }, [fetchPollData, pollData])

  useEffect(() => {
    if (poll) {
      // Check if the poll is expired
      const pollEndTime = new Date(poll.expiresAt).getTime()
      setExpired(Date.now() > pollEndTime)
    }
  }, [poll])

  const handleVote = async () => {
    if (expired || !selectedOption) return

    try {
      const response = await fetch(
        `https://sitywatch-backend.onrender.com/api/v1/${apiRoutes.PANDAR_POLLS_INTERACTIONS(
          pollId as string,
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answerOptionId: selectedOption }),
        },
      )

      if (!response.ok) {
        throw new Error("Failed to submit vote.")
      }

      alert("Your vote has been recorded!")
      updateProgress(pollId as string, selectedOption)
      fetchPollData() // Refresh poll data
    } catch (err) {
      console.error("Error submitting vote:", err)
    }
  }

  if (!poll) {
    return <div>No poll data available.</div>
  }

  if (isFetching) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const currentStation = poll.stations[0] // Assuming the poll has stations

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="single-poll-container p-4"
    >
      {/* Poll Header */}
      <div className="poll-header flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={poll.pollOwnerAlias || "/default-avatar.png"}
            alt={poll.pollOwnerAlias}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="ml-3">
            <h2 className="font-bold">{poll.pollOwnerAlias}</h2>
            <p className="text-gray-500">
              {new Date(poll.expiresAt).toLocaleString()}
            </p>
          </div>
        </div>
        <span className="material-symbols-outlined cursor-pointer">
          more_vert
        </span>
      </div>

      {/* Poll Description */}
      <div className="poll-description mt-4">
        <p className="text-sm text-gray-600">{poll.description}</p>
        <h3 className="text-lg font-bold mt-2">
          {currentStation.questionText}
        </h3>
      </div>

      {/* Poll Options */}
      <div className="poll-options mt-4">
        {currentStation.answerOptions.map((option: AnswerOption) => (
          <button
            key={option.id}
            className={`poll-option-btn ${
              selectedOption === option.id ? "active" : ""
            }`}
            onClick={() => setSelectedOption(option.id)}
            disabled={
              expired ||
              (progress[pollId as string] &&
                progress[pollId as string].includes(option.id))
            }
          >
            {option.text}
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleVote}
        disabled={expired || !selectedOption}
        className={`submit-btn mt-4 ${
          expired || !selectedOption ? "disabled" : ""
        }`}
      >
        {expired ? "Poll Expired" : "Pander"}
      </button>
    </motion.div>
  )
}

export default SinglePoll

