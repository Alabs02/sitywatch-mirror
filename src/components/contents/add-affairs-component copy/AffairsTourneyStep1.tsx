import React, { FC, useState } from "react"
import { FormData } from "@/types"

interface StepProps {
  onNext: (data: Partial<FormData>) => void
  formData: FormData
}

const AffairsTourneyStep1: FC<StepProps> = ({ onNext, formData }) => {
  const [type, setType] = useState(formData.type || "TOURNEY")

  const handleNext = () => {
    onNext({ type })
  }

  return (
    <div className="">
      <h2 className="text-sm font-semibold text-center mt-6 mb-1">
        What type of affair do you want to start?
      </h2>

      {/* Tourney */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="radio"
            value="TOURNEY"
            checked={type === "TOURNEY"}
            onChange={(e) => setType(e.target.value)}
            className="mr-2"
          />
          <span className="text-sm font-semibold">TOURNEY</span>
        </label>
        <p className="text-xs italic mt-1">
          A tourney is any game, competition, contest, pageantry, tournament,
          Olympiad, quiz, etc, where two or more people compete with each other
          to win a prize.
        </p>
      </div>

      {/* Event */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="radio"
            value="EVENT"
            checked={type === "EVENT"}
            onChange={(e) => setType(e.target.value)}
            className="mr-2"
          />
          <span className="text-sm font-semibold">EVENT</span>
        </label>
        <p className="text-xs italic mt-1">
          An event is any affair that requires a gathering of people for a
          purpose (entertainment or otherwise). These could be concerts, award
          shows, seminars, workshops, lectures, fashion shows, parties,
          weddings, etc.
        </p>
      </div>

      {/* Province */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="radio"
            value="PROVINCE"
            checked={type === "PROVINCE"}
            onChange={(e) => setType(e.target.value)}
            className="mr-2"
          />
          <span className="text-sm font-semibold">PROVINCE</span>
        </label>
        <p className="text-xs italic mt-1">
          A province is any product or service that you sell or provide for
          people to patronize.
        </p>
      </div>

      <div className="flex justify-between mt-1">
        <button
          onClick={handleNext}
          className="p-2 bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default AffairsTourneyStep1
