import React, { useState, FC, useEffect } from "react"
import { FormData } from "@/types" // Adjust the path as necessary

interface StepProps {
  onNext: (data: Partial<FormData>) => void
  onBack: () => void
  formData: FormData
}

const LookStep4: FC<StepProps> = ({ onNext, onBack, formData }) => {
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null)
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [coverPhotoUrl, setCoverPhotoUrl] = useState<string | undefined>()
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | undefined>()

  useEffect(() => {
    setCoverPhoto(formData.coverPhoto || null)
    setProfilePhoto(formData.profilePhoto || null)
  }, [formData])

  useEffect(() => {
    if (coverPhoto) {
      try {
        const url = URL.createObjectURL(coverPhoto)
        setCoverPhotoUrl(url)

        return () => {
          URL.revokeObjectURL(url)
        }
      } catch (error) {
        console.error("Failed to create object URL for cover photo:", error)
        setCoverPhotoUrl(undefined)
      }
    } else {
      setCoverPhotoUrl(undefined)
    }
  }, [coverPhoto])

  useEffect(() => {
    if (profilePhoto) {
      try {
        const url = URL.createObjectURL(profilePhoto)
        setProfilePhotoUrl(url)

        return () => {
          URL.revokeObjectURL(url)
        }
      } catch (error) {
        console.error("Failed to create object URL for profile photo:", error)
        setProfilePhotoUrl(undefined)
      }
    } else {
      setProfilePhotoUrl(undefined)
    }
  }, [profilePhoto])

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
      <h2 className="text-sm font-semibold mt-4 mb-1 text-center">
        Upload a backdrop for your sitadel
      </h2>
      <p className="text-xs text-center mb-1 italic">
        Upload a backdrop and profile picture for your sitadel.
      </p>
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
          {coverPhotoUrl ? (
            <img
              src={coverPhotoUrl}
              alt="Cover Photo"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="text-center flex flex-col justify-center mb-4">
              <span className="material-symbols-outlined text-gray-500 text-2xl">
                image
              </span>
              <span className="text-gray-500">Click to upload cover photo</span>
            </div>
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
          {profilePhotoUrl ? (
            <img
              src={profilePhotoUrl}
              alt="Profile Photo"
              className="absolute inset-0 w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="text-center flex flex-col justify-center">
              <span className="material-symbols-outlined text-gray-500 text-2xl">
                image
              </span>
              <span className="text-gray-500 text-xs">
                Click to upload profile photo
              </span>
            </div>
          )}
        </label>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={onBack}
          className="p-2 bg-gray-300 text-black rounded-lg"
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

export default LookStep4
