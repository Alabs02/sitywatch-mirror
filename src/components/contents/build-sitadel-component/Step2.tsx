import React, { FC, useState } from "react"
import { FormData } from "@/types" // Adjust the path as necessary

interface StepProps {
  onNext: (data: Partial<FormData>) => void
  onBack: () => void
  formData: FormData
}

const Step2: FC<StepProps> = ({ onNext, onBack, formData }) => {
  const [info, setInfo] = useState(formData.info)

  const handleNext = () => {
    onNext({ info })
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Info</h2>
      <textarea
        value={info}
        onChange={(e) => setInfo(e.target.value)}
        placeholder="Information"
        className="mb-4 p-2 border border-gray-300 rounded w-full shadow-inner"
      />
      <div className="flex justify-between mt-4">
        <button onClick={onBack} className="p-2 bg-gray-300 text-black rounded-lg">
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

export default Step2
