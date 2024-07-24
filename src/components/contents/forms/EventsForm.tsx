import React, { useState, FormEvent } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

type SelectedOptions = {
  sitadelSertification: string
  location: string
  category: string
  entryFeeStatus: string
  happeningFrom: string
  to: string
}

const EventsForm: React.FC = () => {
  const [overlay, setOverlay] = useState<{
    type: keyof SelectedOptions | null
    options: string[]
  }>({ type: null, options: [] })

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    sitadelSertification: "All",
    location: "(3)",
    category: "(3)",
    entryFeeStatus: "All",
    happeningFrom: "18/August/2024",
    to: "Farthest date ahead",
  })

  const [startDate, setStartDate] = useState<Date | null>(new Date())

  const handleSelect = (type: keyof SelectedOptions, options: string[]) => {
    setOverlay({ type, options })
  }

  const closeOverlay = () => {
    setOverlay({ type: null, options: [] })
  }

  const handleOptionClick = (option: string) => {
    if (overlay.type) {
      setSelectedOptions((prev) => ({ ...prev, [overlay.type!]: option }))
      closeOverlay()
    }
  }

  const handleDateChange = (date: Date | null) => {
    setStartDate(date)
    if (overlay.type && date) {
      setSelectedOptions((prev) => ({
        ...prev,
        [overlay.type!]: date.toDateString(),
      }))
      closeOverlay()
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("Form submitted with the following data:")
    console.log(selectedOptions)
  }

  return (
    <div className="flex justify-center items-center">
      <form className="p-1 w-full lg:w-3/4 relative" onSubmit={handleSubmit}>
        <div className="flex lg:grid lg:grid-cols-3 lg:gap-6 overflow-x-auto no-scrollbar space-x-6 lg:space-x-0 lg:space-y-0">
          <div className="flex flex-col">
            <label
              htmlFor="sitadelSertification"
              className="block md:text-sm text-xs font-light text-gray-400 h-8"
            >
              Sitadel Sertification:
            </label>
            <button
              type="button"
              className="mt-1 flex justify-between items-center w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-1 bg-transparent border border-tertiary-200 text-gray-400 font-semibold"
              onClick={() =>
                handleSelect("sitadelSertification", [
                  "All",
                  "Certification 1",
                  "Certification 2",
                ])
              }
            >
              <span className="truncate">
                {selectedOptions.sitadelSertification}
              </span>
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </button>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="location"
              className="block md:text-sm text-xs font-light text-gray-400 h-8"
            >
              Location:
            </label>
            <button
              type="button"
              className="mt-1 flex justify-between items-center w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-1 bg-secondary border border-tertiary-200 text-white"
              onClick={() =>
                handleSelect("location", ["All", "Location 1", "Location 2"])
              }
            >
              <span className="truncate">{selectedOptions.location}</span>
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </button>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="block md:text-sm text-xs font-light text-gray-400 h-8"
            >
              Category/Niche:
            </label>
            <button
              type="button"
              className="mt-1 flex justify-between items-center w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-1 bg-transparent border border-tertiary-200 text-gray-400 font-semibold"
              onClick={() =>
                handleSelect("category", ["All", "Category 1", "Category 2"])
              }
            >
              <span className="truncate">{selectedOptions.category}</span>
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </button>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="entryFeeStatus"
              className="block md:text-sm text-xs font-light text-gray-400 h-8"
            >
              Entry fee status:
            </label>
            <button
              type="button"
              className="mt-1 flex justify-between items-center w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-1 bg-transparent border border-tertiary-200 text-gray-400 font-semibold"
              onClick={() =>
                handleSelect("entryFeeStatus", ["All", "Free", "Capped at"])
              }
            >
              <span className="truncate">{selectedOptions.entryFeeStatus}</span>
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </button>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="happeningFrom"
              className="block md:text-sm text-xs font-light text-gray-400 h-8"
            >
              Happening from:
            </label>
            <button
              type="button"
              className="mt-1 flex justify-between items-center w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-1 bg-transparent border border-tertiary-200 text-gray-400 font-semibold"
              onClick={() => handleSelect("happeningFrom", [])}
            >
              <span className="truncate">{selectedOptions.happeningFrom}</span>
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </button>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="to"
              className="block md:text-sm text-xs font-light text-gray-400 h-8"
            >
              To:
            </label>
            <button
              type="button"
              className="mt-1 flex justify-between items-center w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-1 bg-transparent border border-tertiary-200 text-gray-400 font-semibold"
              onClick={() => handleSelect("to", [])}
            >
              <span className="truncate">{selectedOptions.to}</span>
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button type="submit" className="text-secondary font-bold text-base">
            Advanced search
          </button>
        </div>
      </form>

      {overlay.type && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md relative">
            <button
              onClick={closeOverlay}
              className="absolute top-2 right-2 text-gray-400"
            >
              X
            </button>
            {overlay.type === "happeningFrom" || overlay.type === "to" ? (
              <div className="w-full">
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  inline
                />
              </div>
            ) : (
              <ul>
                {overlay.options.map((option) => (
                  <li
                    key={option}
                    className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default EventsForm
