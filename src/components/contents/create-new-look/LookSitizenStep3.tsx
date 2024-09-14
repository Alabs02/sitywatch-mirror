import React, { FC, useState } from "react"
import { FormData } from "@/types"
import { useAppDispatch } from "@/app/store"
import { setFormData } from "@/features/auth/authSlice"
import Link from "next/link"
import OptionsCard from "./OptionsCard"

interface StepProps {
  onNext: (data: Partial<FormData>) => void
  onBack: () => void
  formData: FormData
}

const LookSitizenStep3: FC<StepProps> = ({ onNext, onBack, formData }) => {
  const dispatch = useAppDispatch()
  const [showOptions, setShowOptions] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    formData.options || [],
  )

  const capitalizeWords = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const handleUpdateOptions = (updatedOptions: string[]) => {
    const normalizedOptions = updatedOptions.map(capitalizeWords)
    const uniqueOptions = Array.from(new Set(normalizedOptions))
    setSelectedOptions(uniqueOptions)
  }

  const handleSelectOption = (option: string) => {
    const normalizedOption = capitalizeWords(option)
    if (!selectedOptions.includes(normalizedOption)) {
      handleUpdateOptions([...selectedOptions, normalizedOption])
    }
  }

  const handleUnselectOption = (option: string) => {
    const normalizedOption = capitalizeWords(option)
    handleUpdateOptions(selectedOptions.filter((o) => o !== normalizedOption))
  }

  const handleNext = () => {
    const updatedFormData: Partial<FormData> = {
      ...formData,
      options: selectedOptions, // Pass selected options to the next step
    }

    // Dispatch the form data to the Redux store
    dispatch(setFormData(updatedFormData))

    onNext(updatedFormData) // Proceed to the next step
  }

  return (
    <div className="flex flex-col h-full">
      <div className="text-center mb-4">
        <p className="text-center font-bold mt-14">
          Click the button to add your interests:
        </p>
      </div>

      <div className="flex flex-col">
        <div className="text-center">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="p-2 border border-gray-300 rounded-full text-white flex justify-center mx-auto bg-gradient-to-r from-[#F24055] to-[#1E7881] h-12 w-12"
          >
            <span className="material-symbols-outlined text-xl text-white font-bold">
              add_circle
            </span>
          </button>
        </div>

        {/* Display Selected Interests in a Responsive Row Layout */}
        <div className="mt-6 flex flex-wrap gap-1 justify-center">
          {selectedOptions.map((option) => (
            <div
              key={option}
              className="flex items-center justify-between p-1 bg-gradient-to-b from-green-900 to-green-700 bg-opacity-60 text-gray-50 rounded-full min-w-[120px] sm:w-[160px] backdrop-blur-md shadow-lg transform transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer"
              onClick={() => handleUnselectOption(option)}
            >
              <span
                className="text-center flex-1"
                style={{ minWidth: "max-content" }}
              >
                {option}
              </span>
              <span className="material-symbols-outlined text-primary-500 ml-2">
                close
              </span>
            </div>
          ))}
        </div>

        <OptionsCard
          isVisible={showOptions}
          onClose={() => setShowOptions(false)}
          onUpdateOptions={handleUpdateOptions} // Pass array-based handler to OptionsCard
          selectedOptions={selectedOptions} // Pass selectedOptions to OptionsCard
        />
      </div>

      <div className="flex justify-between my-4">
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

export default LookSitizenStep3
