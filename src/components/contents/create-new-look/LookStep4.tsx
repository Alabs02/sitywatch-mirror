import React, { FC } from "react"
import { useRouter } from "next/router" // Import useRouter
import { FormData } from "@/types" // Adjust the path as necessary

interface StepProps {
  onBack: () => void
  formData: FormData
}

const LookStep4: FC<StepProps> = ({ onBack, formData }) => {
  const router = useRouter() // Initialize the router

  const handleImageClick = () => {
    router.push("/sitadel-profile") // Redirect to /sitadel-profile
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
      <img
        src="/verify-look-img.svg" // Adjust the path to the image as necessary
        alt="Verify Look"
        className="w-1/2 max-w-xs cursor-pointer"
        onClick={handleImageClick}
      />
      <p className="mt-4 text-sm font-semibold">
        Hey, you’re almost done. To login, verify your look by clicking the link
        that was sent to your email.
      </p>
      <button
        onClick={onBack}
        className="mt-6 p-2 bg-gray-300 text-black rounded-lg"
      >
        Back
      </button>
    </div>
  )
}

export default LookStep4
