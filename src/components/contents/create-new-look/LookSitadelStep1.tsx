import React, { FC, useState } from "react"
import Image from "next/image"

// STORE
import { useAuthStore } from "@/store"

interface StepProps {
  onBack: () => void
  onNext: () => void
}

const LookSitadelStep1: FC<StepProps> = ({ onNext, onBack }) => {
  const authStore = useAuthStore()
  const { form } = useAuthStore()
  const [confirmPassword, setConfirmPassword] = useState(
    authStore.form.confirmPassword,
  )
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordsMatch, setPasswordsMatch] = useState(true)

  const handleNext = () => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.shortName ||
      !form.email ||
      !form.phone ||
      !form.password ||
      !confirmPassword
    ) {
      alert("Please fill out all fields.")
      return
    }

    if (authStore.form.password !== confirmPassword) {
      setPasswordsMatch(false)
      return
    }

    // Store confirmPassword in the store as well
    authStore.setForm("confirmPassword", confirmPassword)
    onNext() // Proceed to the next step
  }

  const handleShortNameChange = (value: string) => {
    if (!value.startsWith("@")) {
      authStore.setForm("shortName", "@" + value.replace(/^@/, ""))
    } else {
      authStore.setForm("shortName", value)
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
        What is the name of your Sitadel?
      </h2>
      <p className="text-xs text-center mb-1 italic">
        This is the full name of the brand, business, organization, company,
        etc. You can always change or modify the name later.
      </p>
      <input
        type="text"
        name="firstName"
        value={form.firstName}
        onChange={(e) => authStore.setForm("firstName", e.target.value)}
        placeholder="Example: John"
        className="mb-1 p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
      />

      {/* Last Name Field */}
      <h2 className="text-sm font-semibold text-center mt-2 mb-1">Last Name</h2>
      <input
        type="text"
        name="lastName"
        value={form.lastName}
        onChange={(e) => authStore.setForm("lastName", e.target.value)}
        placeholder="Example: Doe"
        className="mb-1 p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
      />

      {/* Other Names Field */}
      <h2 className="text-sm font-semibold text-center mt-2 mb-1">
        Other Names (Optional)
      </h2>
      <input
        type="text"
        name="otherNames"
        value={form.otherNames}
        onChange={(e) => authStore.setForm("otherNames", e.target.value)}
        placeholder="Middle name(s)"
        className="mb-4 p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
      />

      {/* Short Name Field */}
      <h2 className="text-sm font-semibold text-center mt-2 mb-1">
        How should we refer to your Sitadel on SityWatch?
      </h2>
      <p className="text-xs text-center mb-1 italic">
        This is the short version of the name of the sitadel which will be used
        to refer to the sitadel on SityWatch. It can be an abbreviation, an
        acronym, etc. Just keep it short and unique.
      </p>
      <input
        type="text"
        name="shortName"
        value={authStore.form.shortName}
        onChange={(e) => handleShortNameChange(e.target.value)}
        placeholder=""
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
          name="email"
          value={form.email}
          onChange={(e) => authStore.setForm("email", e.target.value)}
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
            name="phone"
            value={form.phone}
            onChange={(e) => authStore.setForm("phone", e.target.value)}
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
            name="password"
            value={form.password}
            onChange={(e) => authStore.setForm("password", e.target.value)}
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
          onClick={onBack}
          className="p-2 bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white rounded-lg"
        >
          Back
        </button>

        <button
          onClick={handleNext}
          className="p-2 bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white rounded-lg"
        >
          Next
        </button>
      </div>

      {/* Password Mismatch Warning */}
      {!passwordsMatch && (
        <p className="text-red-500 text-center mt-2">Passwords do not match!</p>
      )}
    </div>
  )
}

export default LookSitadelStep1
