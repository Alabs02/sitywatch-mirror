import React, { FC } from "react"
import { useRouter } from "next/router"
import { useAppDispatch } from "@/app/store"
import { setFormData } from "@/features/auth/authSlice"
import { useVerifyEmailMutation } from "@/features/auth/authApi" // Import the verifyEmail mutation
import { FormData } from "@/types"

interface StepProps {
  onBack: () => void
  formData: FormData
}

const LookSitizenStep4: FC<StepProps> = ({ onBack, formData }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [verifyEmail, { isLoading, error }] = useVerifyEmailMutation()

  // Handle form data submission to Redux
  const handleImageClick = async () => {
    // Save any final form data to Redux before redirecting (if necessary)
    dispatch(setFormData(formData))

    try {
      // Check if emailToken exists before attempting to verify
      if (formData.emailToken) {
        await verifyEmail(formData.emailToken) // Use emailToken from formData
        // Redirect to /sitadel-profile on successful verification
        router.push("/sitadels/sitadel-profile")
      } else {
        console.error("No email token available for verification.")
      }
    } catch (err) {
      console.error("Verification error:", err)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
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
      {error && (
        <p className="text-red-500">Error verifying email. Please try again.</p>
      )}
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

export default LookSitizenStep4
