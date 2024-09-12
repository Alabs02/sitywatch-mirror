import React, { FC, ChangeEvent } from "react"
import { FormData } from "@/types"

interface AffairsStepTypeProps {
  formData: FormData
  onNext: () => void
  updateFormData: (newData: Partial<FormData>) => void
  icon: string
  label: string
}

const AffairsStepType: FC<AffairsStepTypeProps> = ({
  formData,
  onNext,
  updateFormData,
  icon, // Note: icon and label are not used in this component. Remove if not needed.
  label, // Note: icon and label are not used in this component. Remove if not needed.
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateFormData({ type: e.target.value })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        What type of affair are you creating?
      </h2>

      {/* Tourney */}
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="type"
            value="tourney"
            checked={formData.type === "tourney"}
            onChange={handleChange}
            className="form-radio"
          />
          <span className="ml-2 font-semibold text-xl">Tourney</span>
        </label>
        <p className="italic text-gray-500">
          Create or manage a tournament or competition.
        </p>
      </div>

      {/* Product */}
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="type"
            value="product"
            checked={formData.type === "product"}
            onChange={handleChange}
            className="form-radio"
          />
          <span className="ml-2 font-semibold text-xl">Product</span>
        </label>
        <p className="italic text-gray-500">
          Manage a product for your business or store.
        </p>
      </div>

      {/* Event */}
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="type"
            value="event"
            checked={formData.type === "event"}
            onChange={handleChange}
            className="form-radio"
          />
          <span className="ml-2 font-semibold text-xl">Event</span>
        </label>
        <p className="italic text-gray-500">Organize an event or gathering.</p>
      </div>

      {/* Service */}
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="type"
            value="service"
            checked={formData.type === "service"}
            onChange={handleChange}
            className="form-radio"
          />
          <span className="ml-2 font-semibold text-xl">Service</span>
        </label>
        <p className="italic text-gray-500">
          Manage or offer a service to clients.
        </p>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-end mt-6">
        <button
          onClick={onNext}
          className={`bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white px-4 py-2 rounded ${
            !formData.type ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!formData.type}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default AffairsStepType
