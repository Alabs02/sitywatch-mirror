import React, { FC, useState } from "react"
import { FormData } from "@/types"
import Image from "next/image"

interface StepProps {
  onNext: (data: Partial<FormData>) => void
  formData: FormData
}

const LookSitizenStep1: FC<StepProps> = ({ onNext, formData }) => {
  const [name, setName] = useState(formData.name || "")
  const [shortName, setShortName] = useState(formData.shortName || "@")
  const [email, setEmail] = useState(formData.email || "")
  const [contact, setContact] = useState(formData.contact || "")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordsMatch, setPasswordsMatch] = useState(true)

  const handleNext = () => {
    if (
      !name ||
      !shortName ||
      !email ||
      !contact ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill out all fields.")
      return
    }

    if (password !== confirmPassword) {
      setPasswordsMatch(false)
      return
    }

    onNext({ name, shortName, email, contact })
    console.log("Passwords match, proceeding to next step.")
  }

  const handleShortNameChange = (value: string) => {
    if (!value.startsWith("@")) {
      setShortName("@" + value.replace(/^@/, ""))
    } else {
      setShortName(value)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  return (
    <div className="h-full overflow-y-auto">
      {/* Name Field */}
      <h2 className="text-sm font-semibold text-center mt-6 mb-1">
        What is your name?
      </h2>
      <p className="text-xs text-center mb-1 italic">
        Tell us your name, preferably your first and last name. You can add a
        middle name if you like.
      </p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Example: John Pharrel"
        className="mb-1 p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
      />

      {/* Short Name Field */}
      <h2 className="text-sm font-semibold text-center mt-2 mb-1">
        How should we refer to you on Sitywatch?
      </h2>
      <p className="text-xs text-center mb-1 italic">
        This will be your alias so that other sitizens can easily cite you. It
        can be your nickname, a combination of letters and numbers, or anything
        you like, just make it unique to you.
      </p>
      <input
        type="text"
        value={shortName}
        onChange={(e) => handleShortNameChange(e.target.value)}
        placeholder="Example: John_Pharrel919"
        className="mb-4 p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
      />

      {/* Email Field */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-1 text-center">
          Email
        </label>
        <p className="text-sm text-black italic mb-2 text-center">
          It will not be made public.
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className="p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
        />
      </div>

      {/* Contact Field */}
      <div className="flex flex-col justify-center">
        <label className="block text-sm font-semibold mb-1 text-center">
          Phone number
        </label>
        <p className="text-sm text-black italic mb-2 text-center">
          It will not be made public.
        </p>
        <div className="flex items-center w-full">
          <div className="mr-2 p-2 border border-gray-300 rounded bg-white shadow-inner shadow-gray-600/50 w-32 text-center">
            <Image
              src="/flags/nigeria.svg"
              alt="Nigeria Flag"
              width={24}
              height={16}
              className="inline-block"
            />
            <span className="ml-2">+234</span>
          </div>
          <input
            type="tel"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Phone Number"
            className="p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            maxLength={15}
            required
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="mb-6 relative">
        <label className="block text-sm font-semibold mb-1 text-center mt-4">
          What should be your password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 pr-10 shadow-inner shadow-gray-600/50 ${
              !passwordsMatch ? "border-red-500" : ""
            }`}
            placeholder="Password"
          />
          <span
            className="material-symbols-outlined absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "visibility_off" : "visibility"}
          </span>
        </div>
      </div>

      {/* Confirm Password Field */}
      <div className="mb-6 relative">
        <label className="block text-sm font-semibold mb-1 text-center">
          Re-enter your password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 pr-10 shadow-inner shadow-gray-600/50 ${
              !passwordsMatch ? "border-red-500" : ""
            }`}
            placeholder="Confirm Password"
          />
          <span
            className="material-symbols-outlined absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? "visibility_off" : "visibility"}
          </span>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-between mt-1">
        <button
          onClick={handleNext}
          className="p-2 bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white rounded-lg"
        >
          Next
        </button>
      </div>

      {!passwordsMatch && (
        <p className="text-red-500 text-xs mt-2 text-center">
          Passwords do not match.
        </p>
      )}
    </div>
  )
}

export default LookSitizenStep1
