import React, { FC, useState } from "react"
import { FormData } from "@/types"
import OptionsCard from "./OptionsCard"

interface StepProps {
  onNext: (data: Partial<FormData>) => void
  onBack: () => void
  formData: FormData
}

const LookStep3: FC<StepProps> = ({ onNext, onBack, formData }) => {
  const [showOptions, setShowOptions] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    formData.options || [],
  )

  const handleUpdateOptions = (updatedOptions: string[]) => {
    setSelectedOptions(updatedOptions)
  }

  const handleNext = () => {
    onNext({
      options: selectedOptions, // Pass selected options to the next step
    })
  }

  return (
    <div className=" flex flex-col h-full">
      <div className="text-center mb-4">
        <p className="text-center font-bold mt-14">
          Click the button to add your interests:
        </p>
      </div>

      <div className="flex flex-col ">
        <div className="text-center ">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="p-2 border border-gray-300 rounded-full text-white flex justify-center mx-auto bg-gradient-to-r from-[#F24055] to-[#1E7881] h-12 w-12"
          >
            <span className="material-symbols-outlined text-xl text-white font-bold">
              add_circle
            </span>
          </button>
        </div>

        <OptionsCard
          isVisible={showOptions}
          onClose={() => setShowOptions(false)}
          onUpdateOptions={handleUpdateOptions}
        />
      </div>

      <div className="flex justify-between mb-2 mt-[30%]">
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
