import React, { FC } from "react"
import { useRouter } from "next/router"

interface StepProps {
  onBack: () => void
  onNext: () => void
}

const LookSitadelStep3: FC<StepProps> = ({ onBack }) => {
  const router = useRouter()

  const handleImageClick = () => {
    router.push("/sitadels/sitadel-profile") // Redirect to /sitadel-profile
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

export default LookSitadelStep3
