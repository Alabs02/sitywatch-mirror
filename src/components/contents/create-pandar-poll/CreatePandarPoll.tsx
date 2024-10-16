import React, { useState } from "react"

interface PollOption {
  text: string
  type: "text" | "image"
}

const CreatePandarPoll: React.FC = () => {
  // Function to generate a default option
  const defaultOption = (): PollOption => ({
    text: "",
    type: "text", // Default to text
  })

  // State for stations
  const [stations, setStations] = useState([
    { id: 1, options: [defaultOption()] },
  ])
  const [captions, setCaptions] = useState<{ [key: string]: string }>({}) // State for image captions

  // Function to add a new station
  const addStation = () => {
    setStations([
      ...stations,
      { id: stations.length + 1, options: [defaultOption()] },
    ])
  }

  // Function to remove a station
  const removeStation = (id: number) => {
    setStations(stations.filter((station) => station.id !== id))
  }

  // Toggle option type (text/image) for a specific station and option
  const toggleOptionType = (
    stationIndex: number,
    optionIndex: number,
    type: "text" | "image",
  ) => {
    const updatedStations = [...stations]
    updatedStations[stationIndex].options[optionIndex].type = type
    setStations(updatedStations)
  }

  // Handle caption changes
  const handleCaptionChange = (stationId: number, value: string) => {
    setCaptions({
      ...captions,
      [stationId]: value,
    })
  }

  return (
    <div className="border rounded-lg p-6 bg-neutral-100 shadow-md my-4">
      <h2 className="text-lg font-bold mb-4">Create a New Poll</h2>

      {/* Pandar Poll Description */}
      <div>
        <label className="block text-sm font-bold text-secondary mb-1">
          Pandar poll description (optional)
        </label>
        <p className="text-sm text-black mb-2">
          Here you can give a general description or note about what the poll is
          about or what you want people to know.
        </p>
        <textarea
          className="mb-4 p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
          placeholder="Add a description..."
        />
        <hr className="my-4" />
      </div>

      {/* Stations */}
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

          <p className="text-sm mb-2">
            A station is a question in your Pandar poll.
          </p>
          <textarea
            className="mb-4 p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
            placeholder="Ask your question here..."
          />

          {/* Options */}
          {station.options.map((option, optionIndex) => (
            <div key={optionIndex} className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-tertiary-300">
                  Option {optionIndex + 1}
                </label>
                {/* Capsule-y Toggle Button */}
                <div className="flex space-x-2 items-center">
                  <div className="flex border rounded-full bg-neutral-100">
                    <button
                      className={`px-4 py-1 rounded-full ${
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
                      className={`px-4 py-1 rounded-full ${
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

              {/* Display either text input or image input based on the toggle */}
              {option.type === "text" ? (
                <input
                  type="text"
                  className="mb-4 p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
                  placeholder="Enter your option text..."
                />
              ) : (
                <div className="mb-4">
                  {/* Image picker box */}
                  <div
                    className="w-24 h-24 border border-dashed border-gray-300 rounded mx-auto flex items-center justify-center cursor-pointer mb-4"
                    onClick={() => alert("Image picker clicked")}
                  >
                    <span className="material-symbols-outlined text-3xl text-secondary">
                      library_add
                    </span>
                  </div>

                  {/* Caption Input - Editable line with centered description */}
                  <div className="flex flex-col items-center">
                    <p className="mb-1">
                      Write caption for image here (optional):
                    </p>
                    <div
                      className={`w-full max-w-xs border-b border-gray-300 text-center cursor-text ${
                        captions[station.id] ? "text-black" : "text-gray-400"
                      }`}
                      contentEditable
                      suppressContentEditableWarning={true} // For React contentEditable
                      onInput={(e) =>
                        handleCaptionChange(
                          station.id,
                          (e.target as HTMLDivElement).innerText,
                        )
                      }
                    >
                      {captions[station.id] || ""}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Add Option */}
          <div className="mb-4">
            <button
              type="button"
              className="flex items-center text-secondary"
              onClick={() =>
                setStations(
                  stations.map((st, idx) =>
                    idx === stationIndex
                      ? { ...st, options: [...st.options, defaultOption()] }
                      : st,
                  ),
                )
              }
            >
              <span className="material-symbols-outlined">add_circle</span>
              <span className="ml-1">Add Option</span>
            </button>
          </div>

          <hr className="my-4" />
        </div>
      ))}

      {/* Add New Station */}
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
      <div className="mt-6">
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
