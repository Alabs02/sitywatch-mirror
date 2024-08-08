import React, { FC } from "react"
import { FormData } from "@/types" // Adjust the path as necessary

interface StepProps {
  onBack: () => void
  formData: FormData
}

const Step4: FC<StepProps> = ({ onBack, formData }) => {
  const handleConfirm = () => {
    // Submit form data to the server or perform any final actions here
    console.log("Form Data:", formData)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Confirm</h2>
      <div className="relative mb-4 w-full h-40 border border-gray-300 rounded-lg overflow-hidden">
        {formData.coverPhoto ? (
          <img
            src={URL.createObjectURL(formData.coverPhoto)}
            alt="Cover Photo"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <span className="text-gray-500">No cover photo uploaded</span>
          </div>
        )}
      </div>
      <div className="relative mb-4 w-32 h-32 rounded-full border-4 border-gradient-to-r from-[#F24055] to-[#1E7881] overflow-hidden mx-4 -mt-20">
        {formData.profilePhoto ? (
          <img
            src={URL.createObjectURL(formData.profilePhoto)}
            alt="Profile Photo"
            className="absolute inset-0 w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-gray-500">
            No profile photo uploaded
          </span>
        )}
      </div>
      <div className="mb-4 text-gray-700">
        <p>
          <strong>Name:</strong> {formData.name}
        </p>
        <p>
          <strong>Short Name:</strong> {formData.shortName}
        </p>
        <p>
          <strong>Info:</strong> {formData.info}
        </p>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={onBack} className="p-2 bg-gray-300 text-black rounded">
          Back
        </button>
        <button
          onClick={handleConfirm}
          className="p-2 bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white rounded"
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

export default Step4
