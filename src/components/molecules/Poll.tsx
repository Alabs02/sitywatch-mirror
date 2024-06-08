import React from "react"

interface PollOption {
  option: string
  percentage: number
}

interface PollProps {
  question: string
  options: PollOption[]
  timeRemaining: string
}

const Poll: React.FC<PollProps> = ({ question, options, timeRemaining }) => {
  return (
    <div className="border rounded-lg shadow p-4 bg-white">
      <div className="flex items-center space-x-2 mb-2">
        <img
          src="/pandar_plf_avatar.png"
          alt="@Pandar_PLF"
          className="h-10 w-10 rounded-full"
        />
        <span className="text-gray-500 text-sm">{timeRemaining} remaining</span>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-bold">{question}</h2>
          {options.map((option, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-700">{option.option}</span>
              <span className="text-blue-600 font-semibold">
                {option.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Poll
