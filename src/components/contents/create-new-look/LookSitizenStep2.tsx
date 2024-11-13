import React, { FC, useState, useEffect } from "react"
import Image from "next/image"
import { useAuthStore } from "@/store"

interface StepProps {
  onBack: () => void
  onNext: () => void
}

const LookSitizenStep2: FC<StepProps> = ({ onNext, onBack }) => {
  const authStore = useAuthStore()
  const { form } = authStore
  const [confirmPassword, setConfirmPassword] = useState(form.confirmPassword)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [phoneValid, setPhoneValid] = useState(true)
  const [emailChecked, setEmailChecked] = useState(false)
  const [isLoadingEmail, setIsLoadingEmail] = useState(false)



 let timeoutId: NodeJS.Timeout

 const debounce = <T extends (...args: any[]) => void>(
   func: T,
   delay: number,
 ): T => {
   return ((...args: Parameters<T>) => {
     clearTimeout(timeoutId)
     timeoutId = setTimeout(() => func(...args), delay)
   }) as T
 }

 const checkEmail = async () => {
   if (form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
     setIsLoadingEmail(true)
     const isAvailable = await authStore.checkEmail(form.email)
     setIsEmailValid(isAvailable) // Interpret boolean response
     setIsLoadingEmail(false)
   } else {
     setIsEmailValid(false)
   }
 }

 const debouncedCheckEmail = debounce(checkEmail, 500)

 const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   e.preventDefault() 
   const newEmail = e.target.value
   authStore.setForm("email", newEmail)

   // Validate format locally; API call handles availability check
   setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail))
   debouncedCheckEmail()
 }

 const handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {
   event.preventDefault()
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

   if (!isEmailValid) {
     alert("Please enter a valid and available email address.")
     return
   }

   if (!phoneValid) {
     alert("Please enter a valid Nigerian phone number.")
     return
   }

   if (form.password !== confirmPassword) {
     setPasswordsMatch(false)
     return
   }

   authStore.setForm("confirmPassword", confirmPassword)
   onNext()
 }

  // Nigerian phone number validation function
  const validatePhoneNumber = (phone: string) => {
    const nigerianPhoneRegex = /^(0\d{10}|[7-9]\d{9})$/
    setPhoneValid(nigerianPhoneRegex.test(phone))
  }



  const handleShortNameChange = (value: string) => {
    if (!value.startsWith("@")) {
      authStore.setForm("shortName", "@" + value.replace(/^@/, ""))
    } else {
      authStore.setForm("shortName", value)
    }
  }

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev)
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev)

  return (
    <div className="h-full overflow-y-auto">
      {/* First Name Field */}
      <h2 className="text-sm font-semibold text-center mt-6 mb-1">
        First Name
      </h2>
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
        How should we refer to you on Sitywatch?
      </h2>
      <input
        type="text"
        name="shortName"
        value={form.shortName}
        onChange={(e) => handleShortNameChange(e.target.value)}
        placeholder="Example: John_Pharrel919"
        className="mb-4 p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
      />

      {/* Email Field */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-1 text-center">
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleEmailChange}
            placeholder="example@email.com"
            className="p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
            disabled={isLoadingEmail}
          />
          {isLoadingEmail && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <span className="text-gray-500">Loading...</span>
            </div>
          )}
          {!isEmailValid && (
            <p className="text-red-500 text-center mt-1">
              Email is unavailable or invalid.
            </p>
          )}
        </div>
      </div>

      {/* Phone Field */}
      <div className="flex flex-col justify-center">
        <label className="block text-sm font-semibold mb-1 text-center">
          Phone number
        </label>
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
            onChange={(e) => {
              authStore.setForm("phone", e.target.value)
              validatePhoneNumber(e.target.value)
            }}
            placeholder="Phone Number"
            className="p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
            maxLength={10}
            required
          />
        </div>
        {!phoneValid && (
          <p className="text-red-500 text-center mt-1">
            Please enter a valid Nigerian phone number.
          </p>
        )}
      </div>

      {/* Password Fields */}
      <div className="mb-6 relative">
        <label className="block text-sm font-semibold mb-1 text-center mt-4">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={(e) => authStore.setForm("password", e.target.value)}
            placeholder="Password"
            className={`mt-1 block w-full rounded-md border-gray-300 bg-white p-2 pr-10 shadow-inner shadow-gray-600/50 ${
              !passwordsMatch ? "border-red-500" : ""
            }`}
          />
          <span
            className="material-symbols-outlined absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "visibility_off" : "visibility"}
          </span>
        </div>
      </div>

      <div className="mb-6 relative">
        <label className="block text-sm font-semibold mb-1 text-center">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className={`mt-1 block w-full rounded-md border-gray-300 bg-white p-2 pr-10 shadow-inner shadow-gray-600/50 ${
              !passwordsMatch ? "border-red-500" : ""
            }`}
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
      <div className="flex justify-between mt-4">
        <button
          onClick={onBack}
          className="p-2 bg-gradient-to-r from-[#F2406D] to-[#FF6B2C] text-white rounded"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="p-2 bg-gradient-to-r from-[#F2406D] to-[#FF6B2C] text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default LookSitizenStep2
