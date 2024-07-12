import React, { useState, FormEvent } from "react"

const SitadelsForm: React.FC = () => {
  const [overlay, setOverlay] = useState<{
    type: string | null
    options: string[]
  }>({ type: null, options: [] })
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string
  }>({
    sitadelCertification: "All",
    location: "(3)",
    interests: "All",
  })

  const handleSelect = (type: string, options: string[]) => {
    setOverlay({ type, options })
  }

  const closeOverlay = () => {
    setOverlay({ type: null, options: [] })
  }

  const handleOptionClick = (option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [overlay.type!]: option }))
    closeOverlay()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("Form submitted with the following data:")
    console.log(selectedOptions)
  }

  return (
    <div className="flex justify-center items-center">
      <form
        className="p-1 w-full lg:w-3/4 xl:w-2/3 relative"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label
              htmlFor="sitadelCertification"
              className="block text-sm font-light text-gray-400"
            >
              Sitadel Certification:
            </label>
            <button
              type="button"
              className="mt-1 flex justify-between items-center w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-1 bg-transparent border border-tertiary-200 text-gray-400 font-semibold"
              onClick={() =>
                handleSelect("sitadelCertification", [
                  "All",
                  "Certification 1",
                  "Certification 2",
                ])
              }
            >
              <span className="truncate">
                {selectedOptions.sitadelCertification}
              </span>
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </button>
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-light text-gray-400"
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

          <div>
            <label
              htmlFor="interests"
              className="block text-sm font-light text-gray-400"
            >
              Interests:
            </label>
            <button
              type="button"
              className="mt-1 flex justify-between items-center w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-1 bg-transparent border border-tertiary-200 text-gray-400 font-semibold"
              onClick={() =>
                handleSelect("interests", ["All", "Interest 1", "Interest 2"])
              }
            >
              <span className="truncate">{selectedOptions.interests}</span>
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
          <div className="bg-white p-6 rounded-md shadow-md w-3/4 md:w-1/2 xl:w-1/3">
            <h2 className="text-lg font-medium mb-4">Select {overlay.type}</h2>
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
            <button
              className="mt-4 px-4 py-2 bg-gray-200 rounded"
              onClick={closeOverlay}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SitadelsForm
