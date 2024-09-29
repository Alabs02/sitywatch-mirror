import React, { FC } from "react"
import Image from "next/image"
import { useAuthStore } from "@/store"
import { http } from "@/libs"
import { apiRoutes } from "@/constants/apiRoutes"
import { useRouter } from "next/router"

interface StepProps {
  token: string // Add the token prop here
}

const LookSitizenStep4: FC<StepProps> = ({ token }) => {
  const authStore = useAuthStore()
  const router = useRouter()

  // Function to verify the user's email
  const onVerifyEmail = async () => {
    try {
      const response = await http.get(
        `${apiRoutes.VERIFY_EMAIL}?token=${token}`,
      )

      if (response.status === 200) {
        console.log("Email verification successful")

        // Update user state in the store to reflect successful verification
        authStore.setUserVerification(true)

        // Redirect to the welcome page after verification
        // Assuming you have a 'welcome' page defined in your Next.js app
        router.push("/welcome")
      } else {
        console.error("Email verification failed with status:", response.status)
      }
    } catch (error) {
      console.error("Email verification failed:", error)
    }
  }

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <p className="text-center text-lg mb-4">
        Click the image below to verify your email.
      </p>
      <Image
        src="/verify-look-img.svg"
        alt="Click to verify email"
        width={200}
        height={200}
        className="mt-8 cursor-pointer"
        onClick={onVerifyEmail}
      />
    </div>
  )
}

export default LookSitizenStep4
