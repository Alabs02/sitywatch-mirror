import React from "react"
import { motion } from "framer-motion"

interface PollOptionProps {
  optionText: string
  votes: number
  totalVotes: number
  isSelected: boolean
  onSelect: () => void
}

const PollOption: React.FC<PollOptionProps> = ({
  optionText,
  votes,
  totalVotes,
  isSelected,
  onSelect,
}) => {
  const getPercentage = (votes: number, total: number) => {
    if (total === 0) return "0"
    return ((votes / total) * 100).toFixed(1)
  }

  const percentage = getPercentage(votes, totalVotes)

  return (
    <div className="w-full">
      <div className="flex items-center">
        <input
          type="radio"
          checked={isSelected}
          className="mr-2"
          onChange={onSelect}
        />
        <label className="text-xs md:text-sm w-full">{optionText}</label>
      </div>
      <div className="flex items-center mt-1">
        <div className="w-4/5 bg-gray-200 rounded-full h-2.5 mr-2">
          <motion.div
            className="bg-secondary h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span className="text-xs text-secondary">{percentage}%</span>
      </div>
    </div>
  )
}

export default PollOption
