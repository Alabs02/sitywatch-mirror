import React, { FC } from "react"
import Image from "next/image"
import { useAuthStore } from "@/store"
import { http } from "@/libs"
import { apiRoutes } from "@/constants/apiRoutes"
import { useRouter } from "next/router"

interface StepProps {
  onNext: () => void
}

const LookSitizenStep4: FC<StepProps> = ({ onNext }) => {
  const authStore = useAuthStore()
  const router = useRouter()

  const onVerifyEmail = async () => {
    const token = authStore.form.emailToken
    if (!token) {
      console.error("No email token available for verification")
      return
    }

    try {
      const response = await http.get(
        `${apiRoutes.VERIFY_EMAIL}?token=${token}`,
      )

      if (response.status === 200) {
        console.log("Email verification successful")
        router.push("/welcome") // Redirect to the welcome page after verification
      }
    } catch (error) {
      console.error("Email verification failed:", error)
    }
  }

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <p className="text-center text-lg">
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
