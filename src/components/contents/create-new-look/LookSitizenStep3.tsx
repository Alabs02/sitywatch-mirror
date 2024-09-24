import React, { FC, useState } from "react"
import { useRouter } from "next/router"
import { http } from "@/libs"

// STORE
import { useAuthStore } from "@/store"
import { apiRoutes } from "@/constants/apiRoutes"

interface StepProps {
  onBack: () => void
  onNext?: () => void
}

const LookSitizenStep3: FC<StepProps> = ({ onBack }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formData = useAuthStore((state) => state.form) // Access form data from Zustand store

  // Handle form data submission to verify email
  const handleImageClick = async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (formData.emailToken) {
        await verifyEmail(formData.emailToken) // Function to call the API to verify email
        // Redirect to next step or profile page after successful verification
        router.push("/sitadels/sitadel-profile")
      } else {
        console.error("No email token available for verification.")
        setError("No email token available for verification.")
      }
    } catch (err) {
      console.error("Verification error:", err)
      setError("Error verifying email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center overflow-y-auto">
      <img
        src="/verify-look-img.svg"
        alt="Verify Look"
        className={`w-1/2 max-w-xs cursor-pointer ${
          isLoading ? "opacity-50" : ""
        }`}
        onClick={!isLoading ? handleImageClick : undefined} // Disable onClick when loading
      />
      <p className="mt-4 text-sm font-semibold">
        Hey, you’re almost done. To login, verify your look by clicking the link
        that was sent to your email.
      </p>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={onBack}
        className="mt-6 p-2 bg-gray-300 text-black rounded-lg"
        disabled={isLoading}
      >
        Back
      </button>
    </div>
  )
}

export default LookSitizenStep3

// Function to verify email
const verifyEmail = async (token: string) => {
  const response = await fetch(
    `https://sitywatch-backend.onrender.com/api/v1/auth/verifyEmail?token=${token}`,
    {
      method: "GET",
    },
  )

  if (!response.ok) {
    throw new Error("Email verification failed")
  }

  return await response.json()
}
