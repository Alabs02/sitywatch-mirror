import React, { FC, useState } from "react"
import { FormData } from "@/types" // Adjust the path as necessary

interface StepProps {
  onNext: (data: Partial<FormData>) => void
  formData: FormData
}

const Step1: FC<StepProps> = ({ onNext, formData }) => {
  const [name, setName] = useState(formData.name)
  const [shortName, setShortName] = useState(formData.shortName)

  const handleNext = () => {
    onNext({ name, shortName })
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Name</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="mb-4 p-2 border border-gray-300 rounded w-full shadow-inner"
      />
      <input
        type="text"
        value={shortName}
        onChange={(e) => setShortName(e.target.value)}
        placeholder="Short Name"
        className="mb-4 p-2 border border-gray-300 rounded w-full shadow-inner"
      />
      <div className="flex justify-between mt-4">
        <button
          onClick={handleNext}
          className="p-2 bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Step1
