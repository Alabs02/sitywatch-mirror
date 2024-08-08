import React, { useState, FC } from "react"
import { FormData } from "@/types" // Adjust the path as necessary

interface StepProps {
  onNext: (data: Partial<FormData>) => void
  onBack: () => void
  formData: FormData
}

const Step3: FC<StepProps> = ({ onNext, onBack, formData }) => {
  const [coverPhoto, setCoverPhoto] = useState<File | null>(formData.coverPhoto || null)
  const [profilePhoto, setProfilePhoto] = useState<File | null>(formData.profilePhoto || null)

  const handleNext = () => {
    onNext({ coverPhoto, profilePhoto })
  }

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setCoverPhoto(file)
  }

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setProfilePhoto(file)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Images</h2>
      <div className="relative mb-4 w-full h-40 border border-gray-300 rounded-lg overflow-hidden">
        <input
          type="file"
          id="coverPhotoInput"
          className="hidden"
          onChange={handleCoverPhotoChange}
        />
        <label
          htmlFor="coverPhotoInput"
          className="absolute inset-0 bg-gray-100 flex items-center justify-center cursor-pointer"
        >
          {coverPhoto ? (
            <img
              src={URL.createObjectURL(coverPhoto)}
              alt="Cover Photo"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500">Click to upload cover photo</span>
          )}
        </label>
      </div>
      <div className="relative mb-4 w-32 h-32 rounded-full border-4 border-gradient-to-r from-[#F24055] to-[#1E7881] overflow-hidden mx-4 -mt-20">
        <input
          type="file"
          id="profilePhotoInput"
          className="hidden"
          onChange={handleProfilePhotoChange}
        />
        <label
          htmlFor="profilePhotoInput"
          className="absolute inset-0 bg-gray-100 flex items-center justify-center cursor-pointer"
        >
          {profilePhoto ? (
            <img
              src={URL.createObjectURL(profilePhoto)}
              alt="Profile Photo"
              className="absolute inset-0 w-full h-full object-cover rounded-full"
            />
          ) : (
            <span className="text-gray-500">Click to upload profile photo</span>
          )}
        </label>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={onBack}
          className="p-2 bg-gray-300 text-black rounded"
        >
          Back
        </button>
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

export default Step3
