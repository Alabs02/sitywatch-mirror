import React, { FC, useState } from "react"
import { useRouter } from "next/router"
import { useAuthStore } from "@/store"

interface StepProps {
  onNext?: () => void
  onBack: () => void
}

const LookSitadelStep4: FC<StepProps> = ({ onBack }) => {
  const authStore = useAuthStore() 
  const userEmail = authStore.form.email
  const router = useRouter()

  const [showOverlay, setShowOverlay] = useState(false)

  const handleImageClick = () => {
    const emailDomain = userEmail.split("@")[1].toLowerCase()

    // Show the overlay when the image is clicked
    setShowOverlay(true)

    if (emailDomain.includes("gmail.com")) {
      window.open("https://mail.google.com", "_blank")
    } else if (emailDomain.includes("yahoo.com")) {
      window.open("https://mail.yahoo.com", "_blank")
    } else if (
      emailDomain.includes("outlook.com") ||
      emailDomain.includes("hotmail.com")
    ) {
      window.open("https://outlook.live.com", "_blank")
    } else {
      // Fallback for unknown providers
      window.open("mailto:" + userEmail, "_blank")
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-full p-4 text-center">
      <img
        src="/verify-look-img.svg"
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

      {/* Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
            <p className="text-sm">
              You are now a Sitizen of ScoutCity. Please check your email for
              verification.
            </p>
            <button
              onClick={() => setShowOverlay(false)}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default LookSitadelStep4
