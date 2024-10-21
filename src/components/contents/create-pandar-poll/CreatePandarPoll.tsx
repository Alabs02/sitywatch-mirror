import React, { useState } from "react"

interface PollOption {
  text: string
  type: "text" | "image"
  image?: string // Only one image allowed
}

const CreatePandarPoll: React.FC = () => {
  const defaultOption = (): PollOption => ({
    text: "",
    type: "text", // Default to text
    image: "", // Default to an empty string for image
  })

  const [stations, setStations] = useState([
    { id: 1, options: [defaultOption()] },
  ])
  const [captions, setCaptions] = useState<{ [key: string]: string }>({})
  const [showWarning, setShowWarning] = useState(false)
  const [toggleDetails, setToggleDetails] = useState({
    stationIndex: -1,
    optionIndex: -1,
    targetType: "text" as "text" | "image",
  })

  const addStation = () => {
    setStations([
      ...stations,
      { id: stations.length + 1, options: [defaultOption()] },
    ])
  }

  const removeStation = (id: number) => {
    setStations(stations.filter((station) => station.id !== id))
  }

  const addOption = (stationIndex: number) => {
    const updatedStations = [...stations]
    updatedStations[stationIndex].options.push(defaultOption())
    setStations(updatedStations)
  }

  const removeOption = (stationIndex: number, optionIndex: number) => {
    const updatedStations = [...stations]
    updatedStations[stationIndex].options.splice(optionIndex, 1)
    setStations(updatedStations)
  }

  const toggleOptionType = (
    stationIndex: number,
    optionIndex: number,
    type: "text" | "image",
  ) => {
    const currentOption = stations[stationIndex].options[optionIndex]
    const hasContent =
      currentOption.type === "text"
        ? !!currentOption.text
        : !!currentOption.image

    if (hasContent) {
      setShowWarning(true)
      setToggleDetails({ stationIndex, optionIndex, targetType: type })
    } else {
      applyOptionToggle(stationIndex, optionIndex, type)
    }
  }

  const applyOptionToggle = (
    stationIndex: number,
    optionIndex: number,
    type: "text" | "image",
  ) => {
    const updatedStations = [...stations]
    updatedStations[stationIndex].options[optionIndex].type = type

    if (type === "image") {
      updatedStations[stationIndex].options[optionIndex].image = ""
    }

    setStations(updatedStations)
  }

  const handleImageChange = (
    stationIndex: number,
    optionIndex: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const updatedStations = [...stations]
      const reader = new FileReader()

      reader.onloadend = () => {
        updatedStations[stationIndex].options[optionIndex].image =
          reader.result as string
        setStations(updatedStations)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleCaptionChange = (stationId: number, value: string) => {
    setCaptions({
      ...captions,
      [stationId]: value,
    })
  }

  const confirmToggle = () => {
    const { stationIndex, optionIndex, targetType } = toggleDetails
    applyOptionToggle(stationIndex, optionIndex, targetType)
    setShowWarning(false)
  }

  return (
    <div className="border rounded-lg p-6 bg-neutral-100 shadow-md my-4">
      <h2 className="text-lg font-bold mb-4">Create a New Poll</h2>

      {showWarning && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md text-center">
            <p className="mb-4">
              You will lose your current input if you switch. Proceed?
            </p>
            <button
              className="bg-red-500 text-white px-4 py-2 mr-4 rounded"
              onClick={confirmToggle}
            >
              Yes, Proceed
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={() => setShowWarning(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-secondary mb-1">
          Pandar poll description (optional)
        </label>
        <p className="text-xs text-black mb-2">
          Here you can give a general description or note about what the poll is
          about.
        </p>
        <textarea
          className="mb-4 p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
          placeholder="Add a description..."
        />
        <hr className="my-4" />
      </div>

      {stations.map((station, stationIndex) => (
        <div key={station.id} className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-lg font-medium">
              Station {station.id}
            </label>
            <span
              className="text-sm flex items-center cursor-pointer text-secondary"
              onClick={() => removeStation(station.id)}
            >
              Remove station
              <span className="material-symbols-outlined ml-1">more_horiz</span>
            </span>
          </div>

          <textarea
            className="mb-4 p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
            placeholder="Ask your question here..."
          />

          {/* Options */}
          {station.options.map((option, optionIndex) => (
            <div key={optionIndex} className="mb-6">
              <div className="flex items-center mb-2">
                <label className="block text-tertiary-300 mr-4">
                  Option {optionIndex + 1}
                </label>
                <div className="flex space-x-2 items-center">
                  <div className="flex border rounded-full bg-neutral-100">
                    <button
                      className={`px-2 rounded-full ${
                        option.type === "text"
                          ? "bg-secondary text-white"
                          : "text-secondary"
                      }`}
                      onClick={() =>
                        toggleOptionType(stationIndex, optionIndex, "text")
                      }
                    >
                      Text
                    </button>
                    <button
                      className={`px-2 rounded-full ${
                        option.type === "image"
                          ? "bg-secondary text-white"
                          : "text-secondary"
                      }`}
                      onClick={() =>
                        toggleOptionType(stationIndex, optionIndex, "image")
                      }
                    >
                      Image
                    </button>
                  </div>
                </div>
              </div>

              {option.type === "text" ? (
                <input
                  type="text"
                  className="mb-4 p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
                  placeholder="Enter your option text..."
                />
              ) : (
                <div className="mb-4">
                  <div className="flex justify-center mb-4">
                    <div className="flex flex-col items-center mx-2">
                      <label className="cursor-pointer">
                        <div className="w-24 h-24 border border-dashed border-gray-300 rounded flex items-center justify-center">
                          {option.image ? (
                            <img
                              src={option.image}
                              alt={`Option ${optionIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="material-symbols-outlined text-3xl text-secondary">
                              library_add
                            </span>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(event) =>
                            handleImageChange(stationIndex, optionIndex, event)
                          }
                        />
                      </label>

                      <div className="flex flex-col items-center mt-2">
                        <p className="mb-1 text-xs">
                          Write caption for image here (optional):
                        </p>
                        <div
                          className={`w-full max-w-xs border-b border-gray-300 text-center cursor-text ${
                            captions[station.id]
                              ? "text-black"
                              : "text-gray-400"
                          }`}
                          contentEditable
                          suppressContentEditableWarning={true}
                          onInput={(e) =>
                            handleCaptionChange(
                              station.id,
                              (e.target as HTMLDivElement).innerText,
                            )
                          }
                        >
                          {captions[station.id] || "Type here..."}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Remove Option Button on the far right */}
              {station.options.length > 1 && (
                <div className="flex justify-between">
                  <div className="flex-1"></div> {/* Empty div for spacing */}
                  <button
                    type="button"
                    className="flex items-center text-secondary font-bold"
                    onClick={() => removeOption(stationIndex, optionIndex)}
                  >
                    <span className="material-symbols-outlined text-sm">
                      do_not_disturb_on
                    </span>
                    <span className="ml-2 text-sm">Remove Option</span>
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Add Option Button always on the left under the last option */}
          <div className="flex justify-start">
            <button
              type="button"
              className="flex items-center font-bold text-sm text-secondary"
              onClick={() => addOption(stationIndex)}
            >
              <span className="material-symbols-outlined">add_circle</span>
              <span className="ml-2">Add Option</span>
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <button
          type="button"
          className="border border-primary rounded-full px-4 py-2 text-secondary flex items-center"
          onClick={addStation}
        >
          <span className="material-symbols-outlined">add_circle</span>
          <span className="ml-2">Add New Station</span>
        </button>
      </div>

      {/* Submit Button */}
      <div className="mt-2 mb-16">
        <button
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r from-secondary-100 to-tertiary-100 text-white rounded-md"
        >
          Create Poll
        </button>
      </div>
    </div>
  )
}

export default CreatePandarPoll
