import React, { FC, useState, useEffect, useRef } from "react"
import { FormData } from "@/types" // Adjust the path as necessary
import OptionsCard from "./OptionsCard" // Adjust the path as necessary
import { motion, useAnimation } from "framer-motion"

interface StepProps {
  onNext: (data: Partial<FormData>) => void
  onBack: () => void
  formData: FormData
}

const LookStep3: FC<StepProps> = ({ onNext, onBack, formData }) => {
  const [info, setInfo] = useState(formData.info || "")
  const [link, setLink] = useState(formData.link || "")
  const [email, setEmail] = useState(formData.email || "")
  const [contact, setContact] = useState(formData.contact || "")
  const [country, setCountry] = useState(formData.country || "Nigeria")
  const [state, setState] = useState(formData.state || "")
  const [address, setAddress] = useState(formData.address || "")
  const [dob, setDob] = useState({
    month: formData.dob?.month || "",
    day: formData.dob?.day || "",
    year: formData.dob?.year || "",
  })
  const [showDob, setShowDob] = useState(formData.showDob || "No")
  const [gender, setGender] = useState(formData.gender || "")
  const [sexuality, setSexuality] = useState(formData.sexuality || "")
  const [relationshipStatus, setRelationshipStatus] = useState(
    formData.relationshipStatus || "",
  )
  const [nightLife, setNightLife] = useState(formData.nightLife || "")
  const [sideHustle, setSideHustle] = useState(formData.sideHustle || "")

  const [showOptions, setShowOptions] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [cardHeight, setCardHeight] = useState("0px")
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showOptions) {
      controls.start({ opacity: 1, y: 0, height: cardHeight })
    } else {
      controls.start({ opacity: 0, y: -20, height: 0 })
    }
  }, [showOptions, controls, cardHeight])

  useEffect(() => {
    if (buttonRef.current) {
      setCardHeight(`${buttonRef.current.offsetHeight}px`)
    }
  }, [showOptions])

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = e.target.value
    const newDaysInMonth = getDaysInMonth(newMonth, dob.year || "2024") // Default year
    setDob((prevDob) => ({
      ...prevDob,
      month: newMonth,
      day: Math.min(parseInt(prevDob.day) || 1, newDaysInMonth).toString(),
    }))
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = e.target.value
    const newDaysInMonth = getDaysInMonth(dob.month || "1", newYear) // Default month
    setDob((prevDob) => ({
      ...prevDob,
      year: newYear,
      day: Math.min(parseInt(prevDob.day) || 1, newDaysInMonth).toString(),
    }))
  }

  const getDaysInMonth = (month: string, year: string) => {
    const monthIndex = parseInt(month) - 1
    const parsedYear = parseInt(year)
    if (isNaN(monthIndex) || isNaN(parsedYear)) return 31 // Fallback in case of an invalid month/year
    return new Date(parsedYear, monthIndex + 1, 0).getDate()
  }

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDob((prevDob) => ({
      ...prevDob,
      day: e.target.value,
    }))
  }

  const handleNext = () => {
    onNext({
      info,
      link,
      email,
      contact,
      country,
      state,
      address,
      dob,
      showDob,
      gender,
      sexuality,
      relationshipStatus,
      nightLife,
      sideHustle,
    })
  }

  return (
    <div className="relative">
      {/* Step Content Container */}
      <div
        ref={containerRef}
        className="transition-all duration-300"
        style={{ paddingBottom: showOptions ? cardHeight : "0px" }}
      >
        {/* Step Content */}
        <div className="text-center">
          {/* Info Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">Bio</label>
            <p className="text-sm text-black italic mb-2">
              In a sentence or two, say something interesting you want people to
              know about you when they view your profile.
            </p>
            <textarea
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              placeholder="Information"
              className="p-2 border border-gray-300 rounded w-full bg-white shadow-inner shadow-gray-600/50"
            />
          </div>

          {/* Date of Birth Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <div className="flex justify-center gap-2">
              <select
                value={dob.month}
                onChange={handleMonthChange}
                className="p-2 border border-gray-300 rounded bg-white shadow-inner shadow-gray-600/50 w-full sm:w-1/3"
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
              <select
                value={dob.day}
                onChange={handleDayChange}
                className="p-2 border border-gray-300 rounded bg-white shadow-inner shadow-gray-600/50 w-full sm:w-1/3"
              >
                <option value="">Day</option>
                {Array.from(
                  { length: getDaysInMonth(dob.month, dob.year) },
                  (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ),
                )}
              </select>
              <select
                value={dob.year}
                onChange={handleYearChange}
                className="p-2 border border-gray-300 rounded bg-white shadow-inner shadow-gray-600/50 w-full sm:w-1/3"
              >
                <option value="">Year</option>
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={i} value={new Date().getFullYear() - i}>
                    {new Date().getFullYear() - i}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Show DOB Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">
              Do you want people to see your DOB?{" "}
              <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-black italic mb-2">
              Only the month and day will be visible on your profile.
            </p>
            <div className="flex justify-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Yes"
                  checked={showDob === "Yes"}
                  onChange={() => setShowDob("Yes")}
                  className="form-radio"
                />
                <span className="text-sm">Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="No"
                  checked={showDob === "No"}
                  onChange={() => setShowDob("No")}
                  className="form-radio"
                />
                <span className="text-sm">No</span>
              </label>
            </div>
          </div>

          {/* Gender Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">
              Gender <span className="text-red-500">*</span>
            </label>
            <div className="flex justify-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={() => setGender("Male")}
                  className="form-radio"
                />
                <span className="text-sm">Male</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={() => setGender("Female")}
                  className="form-radio"
                />
                <span className="text-sm">Female</span>
              </label>
            </div>
          </div>

          {/* Sexuality Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">
              Sexuality <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Straight",
                "Gay",
                "Lesbian",
                "Bisexual",
                "Come and find out",
                "Rather not say",
              ].map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={option}
                    checked={sexuality === option}
                    onChange={() => setSexuality(option)}
                    className="form-radio"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Relationship Status Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">
              Relationship Status <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Married",
                "Single",
                "Divorced",
                "Separated",
                "In a relationship",
                "Who cares",
                "It's complicated",
                "Rather not say",
              ].map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={option}
                    checked={relationshipStatus === option}
                    onChange={() => setRelationshipStatus(option)}
                    className="form-radio"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Night Life Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">
              Night Life <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Often",
                "Sometimes",
                "On occasion",
                "I don't fancy it",
                "I'd rather not say",
              ].map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={option}
                    checked={nightLife === option}
                    onChange={() => setNightLife(option)}
                    className="form-radio"
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Side Hustle Field */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">
              Side Hustle <span className="text-red-500">(optional)</span>
            </label>
            <p className="text-sm text-black italic mb-2">
              What do you do on the side to make extra cash?
            </p>
            <textarea
              value={sideHustle}
              onChange={(e) => setSideHustle(e.target.value)}
              placeholder="What is your side hustle?"
              className="p-2 border border-gray-300 rounded w-full bg-white shadow-inner shadow-gray-600/50"
            />
          </div>
          {/* Options Button */}
          <div className="relative ">
            <button
              ref={buttonRef}
              onClick={() => setShowOptions(!showOptions)}
              className="p-2 border border-gray-300 rounded-full text-white flex justify-center mx-auto bg-gradient-to-r from-[#F24055] to-[#1E7881] h-12 w-12"
            >
              <span className="material-symbols-outlined text-xl md:text-xl text-white font-bold ">
                add_circle
              </span>
            </button>

            {/* OptionsCard */}
            <OptionsCard
              isVisible={showOptions}
              onClose={() => setShowOptions(false)}
              buttonRef={buttonRef}
            />
          </div>
          {/* Location Field */}
          <div className="mb-6 mt-4">
            <label className="block text-sm font-semibold mb-1 text-center">
              Where do you reside?
            </label>
            <div className="flex justify-center space-x-2">
              <div className="w-1/2 bg-white shadow-inner shadow-gray-600/50 border border-gray-300">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="p-2 rounded w-full bg-white shadow-inner shadow-gray-600/50 border border-gray-300"
                >
                  <option value="Nigeria">Nigeria</option>
                  {/* Add more countries if needed */}
                </select>
              </div>
              <div className="w-1/2">
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="p-2 border border-gray-300 rounded w-full bg-white shadow-inner shadow-gray-600/50"
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

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-2">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Back
            </button>
            {/* Next Button */}
            <button
              onClick={handleNext}
              className="p-2 bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LookStep3
