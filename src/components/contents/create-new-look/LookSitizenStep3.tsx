import React, { FC, useEffect } from "react"
import Image from "next/image"
import { useAuthStore } from "@/store"
import { http } from "@/libs"
import { apiRoutes } from "@/constants/apiRoutes"

interface StepProps {
  onNext: () => void
  onBack?: () => void
}

const LookSitizenStep3: FC<StepProps> = ({ onNext }) => {
  const authStore = useAuthStore()

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
        onNext()
      }
    } catch (error) {
      console.error("Email verification failed:", error)
    }
  }

  useEffect(() => {
    if (authStore.form.emailToken) {
      onVerifyEmail()
    }
  }, [authStore.form.emailToken])

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

export default LookSitizenStep3
