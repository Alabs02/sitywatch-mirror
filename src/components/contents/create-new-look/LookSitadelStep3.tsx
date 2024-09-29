import React, { FC, useState } from "react"
import { useRouter } from "next/router"
import { useAuthStore } from "@/store"
import { baseURI, apiRoutes } from "@/constants/apiRoutes"
import axios from "axios"

interface StepProps {
  onBack: () => void
  onNext?: () => void
}

const LookSitadelStep3: FC<StepProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { form } = useAuthStore()
  const router = useRouter()

  const verifyEmail = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(
        `${baseURI}${apiRoutes.VERIFY_EMAIL}?token=${form.emailToken}`,
      )

      if (response.status === 200) {
        router.push("/sitadels/sitadel-profile") 
      } else {
        throw new Error("Verification failed. Please try again.")
      }
    } catch (err) {
      setError(
        "Email verification failed. Please check your email and try again.",
      )
    } finally {
      setLoading(false)
    }
  }

  const handleImageClick = () => {
    verifyEmail()
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
      <img
        src="/verify-sitadel-img.png"
        alt="Verify Sitadel"
        className="w-1/2 max-w-xs cursor-pointer"
        onClick={handleImageClick}
      />
      <p className="mt-4 text-sm font-semibold">
        You're almost done! To log in, verify your business/organization by
        clicking the verification link sent to your email.
      </p>

      {/* Show loading spinner or error messages */}
      {loading && <p className="mt-4 text-blue-500">Verifying email...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <button
        onClick={onBack}
        className="mt-6 p-2 bg-gray-300 text-black rounded-lg"
      >
        Back
      </button>
    </div>
  )
}

export default LookSitadelStep3
