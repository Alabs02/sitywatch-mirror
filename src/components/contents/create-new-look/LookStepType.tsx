import React, { FC, ChangeEvent } from "react"
import { FormData } from "@/types" 

interface LookStepTypeProps {
  formData: FormData
  onNext: () => void 
  updateFormData: (newData: Partial<FormData>) => void 
}

const LookStepType: FC<LookStepTypeProps> = ({
  formData,
  onNext,
  updateFormData,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateFormData({ category: e.target.value }) 
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        What type of look do you want to create?
      </h2>

      {/* SITIZEN */}
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="category"
            value="sitizen"
            checked={formData.category === "sitizen"}
            onChange={handleChange}
            className="form-radio"
          />
          <span className="ml-2 font-semibold text-xl">SITIZEN</span>
        </label>
        <p className="italic text-gray-500">
          A Sitizen is a personal account on ScoutSity.
        </p>
      </div>

      {/* SITADEL */}
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="category"
            value="sitadel"
            checked={formData.category === "sitadel"}
            onChange={handleChange}
            className="form-radio"
          />
          <span className="ml-2 font-semibold text-xl">SITADEL</span>
        </label>
        <p className="italic text-gray-500">
          A Sitadel is an account on ScoutSity for brands, businesses,
          companies, organizations, etc.
        </p>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-end mt-6">
        <button
          onClick={onNext} 
          className={`bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white px-4 py-2 rounded ${
            !formData.category ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!formData.category} 
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default LookStepType
