import React, { FC, useState, useEffect } from "react"
import { useRouter } from "next/router" // Import the useRouter hook
import { FormData } from "@/types" // Adjust the path as necessary
import Image from "next/image"

interface StepProps {
  onBack: () => void
  formData: FormData
}

const Step4: FC<StepProps> = ({ onBack, formData }) => {
  const [coverPhotoUrl, setCoverPhotoUrl] = useState<string | undefined>()
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter() // Initialize the router

  useEffect(() => {
    if (formData.coverPhoto) {
      try {
        const url = URL.createObjectURL(formData.coverPhoto)
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
  }, [formData.coverPhoto])

  useEffect(() => {
    if (formData.profilePhoto) {
      try {
        const url = URL.createObjectURL(formData.profilePhoto)
        setProfilePhotoUrl(url)

        return () => {
          URL.revokeObjectURL(url)
        }
      } catch (error) {
        console.error("Failed to create object URL for profile photo:", error)
        setProfilePhotoUrl(undefined)
      }
    } else {
      setProfilePhotoUrl("/dummy-user-img.jpg")
    }
  }, [formData.profilePhoto])

  const handleConfirm = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/sitadel-profile") // Route to the profile page after loading
    }, 2000) // 2-second loader
  }

  return (
    <div>
      {/* <h2 className="text-xl font-semibold mb-4">Confirm</h2> */}

      {/* Cover Photo Container */}
      <div className="relative mb-4 w-full h-40 border border-gray-300 rounded-lg overflow-hidden mt-4">
        {coverPhotoUrl ? (
          <img
            src={coverPhotoUrl}
            alt="Cover Photo"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-sm">
            <span className="text-gray-500">No cover photo</span>
          </div>
        )}
      </div>
      <div className="relative mb-4 w-32 h-32 rounded-full border-4 border-gradient-to-r from-[#F24055] to-[#1E7881] overflow-hidden mx-4 -mt-20">
        <Image
          src={profilePhotoUrl || "/dummy-user-img.jpg"}
          alt="Profile Photo"
          className="absolute inset-0 w-full h-full object-cover rounded-full"
          width={128}
          height={128}
        />
      </div>

      {/* Display Form Data */}
      <div className="mb-4">
        <p className="font-bold">Sitadel Name:</p>
        <p>{formData.name}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Sitadel Info:</p>
        <p>{formData.info}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Link:</p>
        <p>{formData.link}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Email:</p>
        <p>{formData.email}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Contact:</p>
        <p>{formData.contact}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Country:</p>
        <p>{formData.country}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">State:</p>
        <p>{formData.state}</p>
      </div>
      <div className="mb-4">
        <p className="font-bold">Address:</p>
        <p>{formData.address}</p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={onBack}
          className="p-2 bg-gray-300 text-black rounded-lg"
        >
          Back
        </button>
        <button
          onClick={handleConfirm}
          className="p-2 bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="loader mr-2" />
              Loading...
            </div>
          ) : (
            "Build Sitadel"
          )}
        </button>
      </div>
    </div>
  )
}

export default Step4
