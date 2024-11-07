import React, { useEffect, useState } from "react"
import { usePandarPollStore } from "@/store/pandar.store"
import { http } from "@/libs"
import { apiRoutes } from "@/constants/apiRoutes"

interface PollOption {
  text: string
  type: "text" | "image"
  imageUrl?: string
}

interface Station {
  id: number
  questionText: string
  descriptionText?: string
  options: PollOption[]
  isTextOnly: boolean
}

const CreatePandarPoll: React.FC = () => {
  const { fetchPollData } = usePandarPollStore()

  const [stations, setStations] = useState<Station[]>([
    {
      id: 1,
      questionText: "",
      descriptionText: "",
      options: [{ text: "", type: "text" }],
      isTextOnly: true,
    },
  ])
  const [showWarning, setShowWarning] = useState(false)
  const [toggleDetails, setToggleDetails] = useState({
    stationIndex: -1,
    optionIndex: -1,
    targetType: "text" as "text" | "image",
  })
  const [captions, setCaptions] = useState<{ [key: number]: string }>({})
  const [description, setDescription] = useState<string>("")
  const [isButtonActive, setIsButtonActive] = useState(false)

  useEffect(() => {
    fetchPollData()
  }, [fetchPollData])

  const defaultOption = (): PollOption => ({
    text: "",
    type: "text",
    imageUrl: "",
  })

  const addStation = () => {
    // Fix #2: Ensures that each new station is unique to prevent duplication
    setStations([
      ...stations,
      {
        id: stations.length + 1,
        questionText: "",
        descriptionText: "",
        options: [defaultOption()],
        isTextOnly: true,
      },
    ])
  }

  const removeStation = (id: number) =>
    setStations(stations.filter((station) => station.id !== id))

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
        : !!currentOption.imageUrl

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
    const station = updatedStations[stationIndex]

    if (optionIndex === 0) station.isTextOnly = type === "text"
    if (
      (station.isTextOnly && type === "image") ||
      (!station.isTextOnly && type === "text")
    )
      return

    station.options[optionIndex].type = type
    if (type === "image") station.options[optionIndex].imageUrl = ""

    setStations(updatedStations)
    setIsButtonActive(true)
  }

  const handleImageChange = async (
    stationIndex: number,
    optionIndex: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append("file", file)

      try {
        const { data } = await http
          .service(true)
          .post<{ url: string }>(apiRoutes.UPLOAD_IMAGE, formData)
        const updatedStations = [...stations]
        updatedStations[stationIndex].options[optionIndex].imageUrl = data.url
        setStations(updatedStations)
        setIsButtonActive(true)
      } catch (error) {
        console.error("Error uploading image:", error)
      }
    }
  }

  const handleCaptionChange = (stationId: number, text: string) => {
    // Fix #3: Update the `captions` state directly, preventing gibberish by handling actual text input
    setCaptions((prevCaptions) => ({ ...prevCaptions, [stationId]: text }))
  }

  const confirmToggle = () => {
    const { stationIndex, optionIndex, targetType } = toggleDetails
    applyOptionToggle(stationIndex, optionIndex, targetType)
    setShowWarning(false)
  }

  const handleSubmit = async () => {
    // Fix #1: Populate questionText and descriptionText correctly when submitting
    const formattedStations = stations.map((station) => ({
      questionNumber: station.id,
      questionText: station.questionText,
      descriptionText: station.descriptionText,
      answerOptions: station.options.map((option) => ({
        questionNumber: station.id,
        text: option.text,
        file: option.type === "image" ? option.imageUrl : undefined,
      })),
    }))

    try {
      await http
        .service()
        .post(apiRoutes.PANDAR_POLLS, {
          stations: formattedStations,
          description,
        })
      setStations([
        {
          id: 1,
          questionText: "",
          descriptionText: "",
          options: [defaultOption()],
          isTextOnly: true,
        },
      ])
      setIsButtonActive(false)
      console.log("Poll created successfully")
    } catch (error) {
      console.error("Error creating poll:", error)
    }
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
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
            </span>
          </div>

          <textarea
            value={station.questionText} // Fix #1: Bind `questionText` to the textarea's value
            onChange={(e) => {
              const updatedStations = [...stations]
              updatedStations[stationIndex].questionText = e.target.value
              setStations(updatedStations)
            }}
            className="mb-4 p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
            placeholder="Ask your question here..."
          />

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
                  <span
                    className="text-sm cursor-pointer text-secondary"
                    onClick={() => removeOption(stationIndex, optionIndex)}
                  >
                    Remove option
                  </span>
                </div>
              </div>

              {option.type === "text" ? (
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => {
                    const updatedStations = [...stations]
                    updatedStations[stationIndex].options[optionIndex].text =
                      e.target.value
                    setStations(updatedStations)
                  }}
                  className="p-2 border rounded-md shadow-inner shadow-gray-500/50 w-full"
                  placeholder="Type your answer option here..."
                />
              ) : (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageChange(stationIndex, optionIndex, e)
                    }
                    className="p-2 border border-gray-300 rounded-md w-full"
                  />
                  {option.imageUrl && (
                    <div>
                      <img
                        src={option.imageUrl}
                        alt="Uploaded option"
                        className="mt-2 max-h-40 object-contain shadow-md rounded-md"
                      />
                      <textarea
                        value={captions[station.id] || ""}
                        onChange={(e) =>
                          handleCaptionChange(station.id, e.target.value)
                        }
                        className="mt-2 p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
                        placeholder="Type an image description..."
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          <button
            className="bg-secondary text-white py-1 px-2 rounded-md mb-4"
            onClick={() => addOption(stationIndex)}
          >
            Add option
          </button>
        </div>
      ))}

      <button
        className={`bg-primary text-white py-2 px-4 rounded-md ${
          isButtonActive ? "" : "bg-opacity-50"
        }`}
        onClick={handleSubmit}
        disabled={!isButtonActive}
      >
        Create Poll
      </button>

      <button
        className="bg-primary text-white py-1 px-2 rounded-md"
        onClick={addStation}
      >
        Add station
      </button>
    </div>
  )
}

export default CreatePandarPoll
