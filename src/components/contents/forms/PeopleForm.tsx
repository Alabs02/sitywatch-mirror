import React, { useState, FormEvent } from "react"
import TagSelector from "@/components/molecules/TagSelector"

const PeopleForm: React.FC = () => {
  const [overlay, setOverlay] = useState<{
    type: string | null
    options: string[]
    preselectedOptions: string[]
  }>({ type: null, options: [], preselectedOptions: [] })

  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string | string[]
  }>({
    gender: "All",
    certification: "All",
    location: ["Location 1", "Location 2", "Location 3"],
    school: ["School 1", "School 2"],
    interests: [],
    sideHustle: [],
  })

  const handleSelect = (
    type: string,
    options: string[],
    preselectedOptions: string[],
  ) => {
    setOverlay({ type, options, preselectedOptions })
  }

  const closeOverlay = () => {
    setOverlay({ type: null, options: [], preselectedOptions: [] })
  }

  const handleTagChange = (tags: string[]) => {
    if (overlay.type) {
      setSelectedOptions((prev) => ({ ...prev, [overlay.type!]: tags }))
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("Form submitted with the following data:")
    console.log(selectedOptions)
  }

  return (
    <div className="flex justify-center items-center">
      <form className="p-1 w-full lg:w-1/2 relative" onSubmit={handleSubmit}>
        <div className="flex lg:grid lg:grid-cols-3 lg:gap-6 overflow-x-auto no-scrollbar space-x-6 lg:space-x-0 lg:space-y-0">
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-light text-gray-400"
            >
              Gender:
            </label>
            <button
              type="button"
              className="mt-1 flex justify-between items-center w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-1 bg-transparent border border-tertiary-200 text-gray-400 font-semibold"
              onClick={() =>
                handleSelect("gender", ["All", "Male", "Female"], ["All"])
              }
            >
              <span className="truncate">{selectedOptions.gender}</span>
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </button>
          </div>

          <div>
            <label
              htmlFor="certification"
              className="block text-sm font-light text-gray-400"
            >
              Certification:
            </label>
            <button
              type="button"
              className="mt-1 flex justify-between items-center w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-1 bg-transparent border border-tertiary-200 text-gray-400 font-semibold"
              onClick={() =>
                handleSelect(
                  "certification",
                  ["All", "Certification 1", "Certification 2"],
                  ["All"],
                )
              }
            >
              <span className="truncate">{selectedOptions.certification}</span>
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
                handleSelect(
                  "location",
                  [
                    "Location 1",
                    "Location 2",
                    "Location 3",
                    "Location 4",
                    "Location 5",
                    "Location 6",
                    "Location 7",
                    "Location 8",
                    "Location 9",
                    "Location 10",
                  ],
                  selectedOptions.location as string[],
                )
              }
            >
              <span className="truncate">
                ({(selectedOptions.location as string[]).length})
              </span>
              <span className="material-symbols-outlined text-white">
                arrow_drop_down
              </span>
            </button>
          </div>

          <div>
            <label
              htmlFor="school"
              className="block text-sm font-light text-gray-400"
            >
              School:
            </label>
            <button
              type="button"
              className="mt-1 flex justify-between items-center w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-1 bg-secondary border border-tertiary-200 text-white"
              onClick={() =>
                handleSelect(
                  "school",
                  [
                    "School 1",
                    "School 2",
                    "School 3",
                    "School 4",
                    "School 5",
                    "School 6",
                    "School 7",
                    "School 8",
                    "School 9",
                    "School 10",
                  ],
                  selectedOptions.school as string[],
                )
              }
            >
              <span className="truncate">
                ({(selectedOptions.school as string[]).length})
              </span>
              <span className="material-symbols-outlined text-white">
                arrow_drop_down
              </span>
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
                handleSelect(
                  "interests",
                  [
                    "Interest 1",
                    "Interest 2",
                    "Interest 3",
                    "Interest 4",
                    "Interest 5",
                    "Interest 6",
                    "Interest 7",
                    "Interest 8",
                    "Interest 9",
                    "Interest 10",
                  ],
                  selectedOptions.interests as string[],
                )
              }
            >
              <span className="truncate">
                ({(selectedOptions.interests as string[]).length})
              </span>
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </button>
          </div>

          <div>
            <label
              htmlFor="sideHustle"
              className="block text-sm font-light text-gray-400"
            >
              SideHustle/Profession:
            </label>
            <button
              type="button"
              className="mt-1 flex justify-between items-center w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-1 bg-transparent border border-tertiary-200 text-gray-400 font-semibold"
              onClick={() =>
                handleSelect(
                  "sideHustle",
                  [
                    "Profession 1",
                    "Profession 2",
                    "Profession 3",
                    "Profession 4",
                    "Profession 5",
                    "Profession 6",
                    "Profession 7",
                    "Profession 8",
                    "Profession 9",
                    "Profession 10",
                  ],
                  selectedOptions.sideHustle as string[],
                )
              }
            >
              <span className="truncate">
                ({(selectedOptions.sideHustle as string[]).length})
              </span>
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
          <div className="bg-white p-6 rounded-md shadow-md w-80 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Select {overlay.type}</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeOverlay}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <TagSelector
              options={overlay.options}
              preselectedOptions={overlay.preselectedOptions}
              onChange={handleTagChange}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default PeopleForm
