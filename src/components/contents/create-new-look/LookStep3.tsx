import React, { FC, useState, useEffect, useRef } from "react"
import { FormData } from "@/types" // Adjust the path as necessary
import OptionsCard from "./OptionsCard" // Adjust the path as necessary
import { motion, useAnimation } from "framer-motion"

interface StepProps {
  onNext: (data: Partial<FormData>) => void
  onBack: () => void
  formData: FormData
}

const LookStep3: FC<StepProps> = ({ onNext, onBack, formData }) => {
  // State for options
  const [options, setOptions] = useState<string[]>([
    "Geography",
    "Literature",
    "Photography",
    "Movies",
  ])
  const [showOptions, setShowOptions] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [cardHeight, setCardHeight] = useState("0px")
  const controls = useAnimation()

  useEffect(() => {
    if (showOptions) {
      controls.start({ opacity: 1, y: 0, height: cardHeight })
    } else {
      controls.start({ opacity: 0, y: -20, height: 0 })
    }
  }, [showOptions, controls, cardHeight])

  useEffect(() => {
    if (buttonRef.current) {
      setCardHeight(`${buttonRef.current.offsetHeight}px`)
    }
  }, [showOptions])

  const handleUpdateOptions = (updatedOptions: string[]) => {
    setOptions(updatedOptions)
  }

  const handleNext = () => {
    onNext({
      options, // Include options in the form data
    })
  }

  return (
    <div className="relative flex flex-col h-full">
      {/* Description */}
      <div className="text-center mb-4">
        <p className="text-center font-bold mt-14">Add your interests as suggested:</p>
      </div>

      {/* Options Button */}
      <div className="flex-1 flex flex-col justify-around">
        <div className="text-center mt-24">
          <button
            ref={buttonRef}
            onClick={() => setShowOptions(!showOptions)}
            className="p-2 border border-gray-300 rounded-full text-white flex justify-center mx-auto bg-gradient-to-r from-[#F24055] to-[#1E7881] h-12 w-12"
          >
            <span className="material-symbols-outlined text-xl text-white font-bold">
              add_circle
            </span>
          </button>
        </div>

        {/* OptionsCard */}
        <OptionsCard
          isVisible={showOptions}
          onClose={() => setShowOptions(false)}
          buttonRef={buttonRef}
          cardHeight={cardHeight}
          onUpdateOptions={handleUpdateOptions}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mb-2">
        <button
          onClick={onBack}
          className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
        >
          Back
        </button>
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

export default LookStep3
