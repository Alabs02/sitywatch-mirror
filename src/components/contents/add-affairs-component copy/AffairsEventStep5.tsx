import React, { FC } from "react"
import { FormData } from "@/types" // Adjust the path as necessary
import Link from "next/link"

interface StepProps {
  onBack: () => void
  onConfirm: () => void
  formData: FormData
}

const AffairsEventStep5: FC<StepProps> = ({ onBack, onConfirm, formData }) => {
  const highlightImageUrl = formData.highlightImage
    ? URL.createObjectURL(formData.highlightImage)
    : undefined

  // Extract categories (first two)
  const categories = formData.options.slice(0, 2).join(" · ")

  // Extract and format the event time
  const formattedTime = formData.time
    ? `${formData.time.hour}:${formData.time.minute} ${formData.time.period}`
    : ""

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Confirm Your Details
      </h2>

      {/* Image Container */}
      <div className="relative w-full h-64 bg-dark-gray rounded-lg border border-gray-300 overflow-hidden">
        {highlightImageUrl && (
          <img
            src={highlightImageUrl}
            alt="Highlight"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>

      {/* Handle */}
      {formData.handle && (
        <p className="text-secondary text-center font-bold mt-4">
          #{formData.handle}
        </p>
      )}

      {/* Categories */}
      {categories && (
        <p className="text-center text-gray-600 mt-2">{categories}</p>
      )}

      {/* Brief Description */}
      <p className="text-center text-gray-500 italic mt-1">
        A brief description about the event.
      </p>

      {/* Information List */}
      <ul className="mt-6 space-y-2">
        {/* Entry Date */}
        <li className="flex items-center">
          <span className="material-symbols-outlined mr-2">calendar_month</span>
          <strong>Entry date:</strong>&nbsp;{formData.endDate || "N/A"}
        </li>

        {/* Website Link */}
        {formData.link && (
          <li className="flex items-center">
            <span className="material-symbols-outlined mr-2">link</span>
            <strong>Website link:</strong>&nbsp;
            <a href={formData.link} className="text-blue-600">
              {formData.link}
            </a>
          </li>
        )}

        {/* Date of Event */}
        <li className="flex items-center">
          <span className="material-symbols-outlined mr-2">calendar_month</span>
          <strong>Date of event:</strong>&nbsp;{formData.startDate || "N/A"}
        </li>

        {/* Venue of Event */}
        {formData.address && (
          <li className="flex items-center">
            <span className="material-symbols-outlined mr-2">pin_drop</span>
            <strong>Venue of event:</strong>&nbsp;{formData.address}
          </li>
        )}

        {/* Time of Event */}
        {formattedTime && (
          <li className="flex items-center">
            <span className="material-symbols-outlined mr-2">aod_watch</span>
            <strong>Time of event:</strong>&nbsp;{formattedTime}
          </li>
        )}
      </ul>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="p-2 bg-gray-300 text-black rounded-lg"
        >
          Back
        </button>
        <Link href="/affairs">
        
        <button
          onClick={onConfirm}
          className="p-2 bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white rounded-lg"
        >
          Create event
        </button>
        </Link>
      </div>
    </div>
  )
}

export default AffairsEventStep5
