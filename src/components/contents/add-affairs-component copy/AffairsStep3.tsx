import React, { useState, FC, useEffect } from "react"
import { FormData } from "@/types" // Adjust the path as necessary

interface StepProps {
  onNext: (data: Partial<FormData>) => void
  onBack: () => void
  formData: FormData
}

const AffairsStep3: FC<StepProps> = ({ onNext, onBack, formData }) => {
  const [handle, setHandle] = useState(formData.handle || "")
  const [description, setDescription] = useState(formData.description || "")
  const [websiteLink, setWebsiteLink] = useState(formData.link || "")
  const [venue, setVenue] = useState(formData.address || "")
  const [state, setState] = useState(formData.state || "")
  const [country] = useState("Nigeria") // Default country is Nigeria

  const [startDate, setStartDate] = useState(formData.startDate || "")
  const [endDate, setEndDate] = useState(formData.endDate || "")

  const [hour, setHour] = useState(formData.time?.hour || "1")
  const [minute, setMinute] = useState(formData.time?.minute || "30")
  const [period, setPeriod] = useState(formData.time?.period || "AM")

  const handleNext = () => {
    onNext({
      handle,
      description,
      link: websiteLink,
      address: venue,
      state,
      country,
      startDate,
      endDate,
      time: { hour, minute, period },
    })
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-center">
        How should we refer to your event?
      </h2>
      <p className="text-sm text-center mb-4 italic">
        This is the handle of the name of the event which will be used to refer
        to the event on SityWatch. It can be an abbreviation, an acronym, etc.
        Keep it short and unique.
      </p>
      <div className="relative mb-4">
        <input
          type="text"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="Enter event handle"
          className="p-2 border border-gray-300 rounded w-full bg-white shadow-inner shadow-gray-600/50"
        />
      </div>

      <h2 className="text-lg font-semibold mb-2 text-center">
        What’s interesting about your event?
      </h2>
      <p className="text-sm text-center mb-4 italic">
        In a sentence or two, say something that will entice potential
        participants to attend your event. Don’t worry about the intricate
        details of the event, you will do that later in a different section.
      </p>
      <div className="relative mb-4">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your event"
          className="p-2 border border-gray-300 rounded w-full bg-white shadow-inner shadow-gray-600/50"
          maxLength={200}
        />
        <p className="text-xs text-gray-500 absolute bottom-2 right-2">
          200 characters max
        </p>
      </div>

      <h2 className="text-lg font-semibold mb-2 text-center">
        Event website link
      </h2>
      <div className="relative mb-4">
        <input
          type="text"
          value={websiteLink}
          onChange={(e) => setWebsiteLink(e.target.value)}
          placeholder="Enter website link"
          className="p-2 border border-gray-300 rounded w-full bg-white shadow-inner shadow-gray-600/50"
        />
      </div>

      <h2 className="text-lg font-semibold mb-2 text-center">
        Venue of your event
      </h2>
      <div className="relative mb-4">
        <input
          type="text"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          placeholder="Enter venue"
          className="p-2 border border-gray-300 rounded w-full bg-white shadow-inner shadow-gray-600/50"
        />
      </div>

      <h2 className="text-lg font-semibold mb-2 text-center">Location</h2>
      <div className="flex mb-4">
        <div className="w-1/2 pr-2">
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full bg-white shadow-inner shadow-gray-600/50"
          >
            {/* Replace with dynamic state options */}
            <option value="">Select state</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
            {/* Add other states */}
          </select>
        </div>
        <div className="w-1/2 pl-2">
          <input
            type="text"
            value={country}
            readOnly
            className="p-2 border border-gray-300 rounded w-full bg-white shadow-inner shadow-gray-600/50"
          />
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-2 text-center">
        What is the date of your event?
      </h2>
      <div className="flex mb-4">
        <div className="w-1/2 pr-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full bg-white shadow-inner shadow-gray-600/50"
          />
          <p className="text-xs text-gray-500 mt-1">Start date</p>
        </div>
        <div className="w-1/2 pl-2">
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full bg-white shadow-inner shadow-gray-600/50"
          />
          <p className="text-xs text-gray-500 mt-1">End date</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-2 text-center">
        What time does your event begin?
      </h2>
      <div className="flex mb-4">
        <div className="w-1/3 pr-2">
          <select
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full bg-white shadow-inner shadow-gray-600/50"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/3 px-2">
          <select
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full bg-white shadow-inner shadow-gray-600/50"
          >
            {[0, 15, 30, 45].map((min) => (
              <option key={min} value={min}>
                {min < 10 ? `0${min}` : min}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/3 pl-2">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full bg-white shadow-inner shadow-gray-600/50"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={onBack}
          className="p-2 bg-gray-300 text-black rounded-lg"
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
    </div>
  )
}

export default AffairsStep3
