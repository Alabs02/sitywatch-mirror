import React, { FC, useState } from "react"
import { FormData } from "@/types"

interface StepProps {
  onNext: (data: Partial<FormData>) => void
  formData: FormData
}

const Step1: FC<StepProps> = ({ onNext, formData }) => {
  const [name, setName] = useState(formData.name)
  const [shortName, setShortName] = useState(formData.shortName || "@")

  const handleNext = () => {
    onNext({ name, shortName })
  }

  const handleShortNameChange = (value: string) => {
    if (!value.startsWith("@")) {
      setShortName("@" + value.replace(/^@/, ""))
    } else {
      setShortName(value)
    }
  }

  return (
    <div className="">
      <h2 className="text-sm font-semibold text-center mt-6 mb-1">
        What is the name of your Sitadel?
      </h2>
      <p className="text-xs text-center mb-1 italic">
        This is the full name of the brand, business, organization, company,
        etc.
        {/* <br /> */}
        You can always change or modify the name later.
      </p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="mb-1 p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
      />
      <h2 className="text-sm font-semibold text-center mt-2 mb-1">
        How should we refer to your Sitadel on Sitywatch?
      </h2>
      <p className="text-xs text-center mb-1 italic">
        This is the short version of the name of the Sitadel which will be used
        to refer to the Sitadel on SityWatch. It can be an abbrevation or an
        accronym, etc.
        {/* <br /> */}
        Just keep it short and unique.
      </p>
      <input
        type="text"
        value={shortName}
        onChange={(e) => handleShortNameChange(e.target.value)}
        placeholder="Short Name"
        className="mb-4 p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
      />
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

export default Step1
