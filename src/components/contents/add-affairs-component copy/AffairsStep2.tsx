import React, { FC, useState } from "react"
import { FormData } from "@/types" // Adjust the path as necessary
import Image from "next/image"

interface StepProps {
  onNext: (data: Partial<FormData>) => void
  onBack: () => void
  formData: FormData
}

const AffairsStep2: FC<StepProps> = ({ onNext, onBack, formData }) => {
  const [info, setInfo] = useState(formData.info)
  const [link, setLink] = useState(formData.link || "")
  const [email, setEmail] = useState(formData.email || "")
  const [contact, setContact] = useState(formData.contact || "")
  const [country, setCountry] = useState(formData.country || "Nigeria")
  const [state, setState] = useState(formData.state || "")
  const [address, setAddress] = useState(formData.address || "")

  const handleNext = () => {
    onNext({ info, link, email, contact, country, state, address })
  }

  return (
    <div className="text-center">
      {/* Info Field */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-1">
          What is your Sitadel about?
        </label>
        <p className="text-sm text-black italic mb-2">
          Provide general information about your Sitadel.
        </p>
        <textarea
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          placeholder="Information"
          className="p-2 border border-gray-300 rounded w-full bg-white shadow-inner shadow-gray-600/50"
        />
      </div>

      {/* Link Field */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-1">
          Does your Sitadel have a website?
        </label>
        <p className="text-sm text-black italic mb-2">
          If your Sitadel has a website or any sort of presence on the internet
          that you would like people to visit, you can put the link below.
        </p>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://example.com"
          className="p-2 border border-gray-300 rounded w-full bg-white shadow-inner shadow-gray-600/50"
        />
      </div>

      {/* Email Field */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-1">Email</label>
        <p className="text-sm text-black italic mb-2">
          Enter the contact email for your Sitadel.
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className="p-2 border border-gray-300 rounded w-full bg-white shadow-inner shadow-gray-600/50"
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
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Phone Number"
            className="p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
          />
        </div>
      </div>

      {/* Location Field */}
      <div className="mb-6 ">
        <label className="block text-sm font-semibold mb-1">Location</label>
        <div className="flex justify-center space-x-2">
          <div className="w-1/2 bg-white shadow-inner shadow-gray-600/50 border border-gray-300">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="p-2  rounded w-full bg-white shadow-inner shadow-gray-600/50 border border-gray-300"
            >
              <option value="Nigeria">Nigeria</option>
              {/* Add more countries if needed */}
            </select>
          </div>
          <div className="w-1/2">
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full  bg-white shadow-inner shadow-gray-600/50 "
            >
              <option value="">Select State</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Kano">Kano</option>
              {/* Add more states as needed */}
            </select>
          </div>
        </div>
      </div>

      {/* Address Field */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-1">Address</label>
        <p className="text-sm text-black italic mb-2">
          Enter the address where your Sitadel is located.
        </p>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Street address, City, etc."
          className="p-2 border border-gray-300 rounded w-full bg-white shadow-inner shadow-gray-600/50"
        />
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={onBack}
          className="p-2 bg-gray-300 text-black rounded-xl"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="p-2 bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white rounded-xl"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default AffairsStep2
