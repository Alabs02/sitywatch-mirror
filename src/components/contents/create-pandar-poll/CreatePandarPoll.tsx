import React, { useEffect, useState } from "react"
import { usePandarPollStore } from "@/store/pandar.store"
import { http } from "@/libs"
import { apiRoutes } from "@/constants/apiRoutes"
import Dialog from "../pandar-polls/Dialogue"

interface PollOption {
  text: string
  type: "text" | "image"
  imageUrl?: string
  caption?: string
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

  const [formState, setFormState] = useState({
    description: null,
    stations: [
      {
        id: 1,
        questionText: "",
        descriptionText: "",
        options: [{ text: "", type: "text", imageUrl: "", caption: "" }],
        isTextOnly: true,
      },
    ],
  })

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<string | null>(null)
  const [showRemoveDialog, setShowRemoveDialog] = useState(false)
  const [stationToRemove, setStationToRemove] = useState<number | null>(null)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showOptionRemoveDialog, setShowOptionRemoveDialog] = useState(false)
  const [optionToRemove, setOptionToRemove] = useState({
    stationIndex: -1,
    optionIndex: -1,
  })

  useEffect(() => {
    fetchPollData()
  }, [fetchPollData])

  const openOptionRemoveDialog = (
    stationIndex: number,
    optionIndex: number,
  ) => {
    setOptionToRemove({ stationIndex, optionIndex })
    setShowOptionRemoveDialog(true)
  }
  const handleConfirmRemoveOption = () => {
    const { stationIndex, optionIndex } = optionToRemove
    if (stationIndex !== -1 && optionIndex !== -1) {
      const updatedStations = [...stations]
      updatedStations[stationIndex].options.splice(optionIndex, 1)
      setStations(updatedStations)
    }
    setOptionToRemove({ stationIndex: -1, optionIndex: -1 })
    setShowOptionRemoveDialog(false)
  }

  const handleCancelRemoveOption = () => {
    setOptionToRemove({ stationIndex: -1, optionIndex: -1 })
    setShowOptionRemoveDialog(false)
  }

  //  Remove station functions
  const openRemoveDialog = (id: number) => {
    setStationToRemove(id)
    setShowRemoveDialog(true)
  }

  const handleConfirmRemove = () => {
    if (stationToRemove !== null) {
      removeStation(stationToRemove)
      setStationToRemove(null)
    }
    setShowRemoveDialog(false)
  }

  const handleCancelRemove = () => {
    setStationToRemove(null)
    setShowRemoveDialog(false)
  }

  const defaultOption = (): PollOption => ({
    text: "",
    type: "text",
    imageUrl: "",
  })

  const addStation = () => {
    if (stations.length >= 3) {
      alert("You can only create up to 3 stations.")
      return
    }

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

  const removeStation = (id: number) => {
    setStations((prevStations) => {
      const filteredStations = prevStations.filter(
        (station) => station.id !== id,
      )

      // Re-assign indexes after removal
      filteredStations.forEach((station, index) => {
        station.id = index + 1 // Update station ID based on new index
      })

      return filteredStations
    })
  }

  const addOption = (stationIndex: number) => {
    const updatedStations = [...stations]
    if (updatedStations[stationIndex].options.length < 4) {
      updatedStations[stationIndex].options.push(defaultOption())
      setStations(updatedStations)
    }
  }

  const confirmRemoveStation = (id: number) => {
    if (window.confirm(`Are you sure you want to remove Station ${id}?`)) {
      removeStation(id)
    }
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
    const updatedStations = [...stations]
    const station = updatedStations[stationIndex]
    station.options[optionIndex].type = type

    // Reset fields based on type
    if (type === "text") {
      station.options[optionIndex].text = ""
    } else if (type === "image") {
      station.options[optionIndex].imageUrl = ""
      station.options[optionIndex].caption = ""
    }

    setStations(updatedStations)
    setIsButtonActive(true)
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
        updatedStations[stationIndex].options[optionIndex].caption = ""
        setStations(updatedStations)
        setIsButtonActive(true)
      } catch (error) {
        console.error("Error uploading image:", error)
      }
    }
  }

  const handleCaptionChange = (stationId: number, text: string) => {
    setCaptions((prevCaptions) => ({ ...prevCaptions, [stationId]: text }))
  }
  const confirmToggle = () => {
    const { stationIndex, optionIndex, targetType } = toggleDetails
    applyOptionToggle(stationIndex, optionIndex, targetType)
    setShowWarning(false)
  }

  const validateForm = () => {
    for (const station of stations) {
      if (!station.questionText.trim()) {
        setErrors(`Station ${station.id} requires a question.`)
        return false
      }

      if (station.options.length === 0) {
        setErrors(`Station ${station.id} must have at least one option.`)
        return false
      }

      for (const option of station.options) {
        if (option.type === "text" && !option.text.trim()) {
          setErrors(`Option in Station ${station.id} is missing text.`)
          return false
        }

        if (option.type === "image" && !option.imageUrl) {
          setErrors(`Option in Station ${station.id} is missing an image.`)
          return false
        }
      }
    }

    // Clear errors if everything is valid
    setErrors(null)
    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    const formattedStations = stations.map((station) => ({
      questionNumber: station.id,
      questionText: station.questionText,
      descriptionText: station.descriptionText || undefined, // Optional
      answerOptions: station.options.map((option) => ({
        questionNumber: station.id,
        text: option.type === "text" ? option.text : undefined,
        file: option.type === "image" ? option.imageUrl : undefined,
        caption: option.caption,
      })),
    }))

    try {
      await http.service().post(apiRoutes.PANDAR_POLLS, {
        stations: formattedStations,
        description: description.trim() || undefined, // Optional
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
      setDescription("")
      setCaptions({})
      setErrors(null)
      setIsButtonActive(false)
      setShowSuccessDialog(true)
      console.log("Poll created successfully")
    } catch (error) {
      console.error("Error creating poll:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="border rounded-lg p-6 bg-neutral-100 shadow-md mb-32">
      <div className="flex items-center justify-center mb-4">
        <div className="mr-2 rounded-full">
          <img src="/create-poll-img.png" alt="poll top img" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-sm font-bold">Create your pandar poll</h2>
          <span className="text-[10px] text-tertiary-200 font-semibold">
            All pandar polls disappear after 24 hours
          </span>
        </div>
      </div>
      {/* Description Field */}
      <textarea
        className="mb-4 p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
        placeholder="Write a short description for your poll..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
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

      {/* Loop through stations and render their details */}
      {stations.map((station, stationIndex) => (
        <div key={station.id} className="mb-6">
          {/* Station details */}
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-semibold text-secondary">
              Station {station.id}
            </label>
            <span
              className="flex items-center cursor-pointer text-[10px] text-tertiary-200 font-semibold"
              onClick={() => openRemoveDialog(station.id)}
            >
              Remove station
              <span className="material-symbols-outlined ml-1">more_horiz</span>
            </span>
          </div>
          {/* Confirmation Dialog */}
          <Dialog
            title="Remove Station"
            message={`Are you sure you want to remove Station ${stationToRemove}?`}
            isOpen={showRemoveDialog}
            onConfirm={handleConfirmRemove}
            onCancel={handleCancelRemove}
          />
          {/* Description Text comes here if needed */}
          {/* Question Text Field */}

          <textarea
            className="mb-4 p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
            placeholder="Ask your question here..."
            value={station.questionText}
            onChange={(e) => {
              const updatedStations = [...stations]
              updatedStations[stationIndex].questionText = e.target.value
              setStations(updatedStations)
            }}
          />

          {/* Loop through station options and render their details */}
          {station.options.map((option, optionIndex) => (
            <div key={optionIndex} className="mb-6">
              <div className="flex items-center mb-2">
                <label className="block mr-4 text-[12px] text-tertiary-200 font-semibold">
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
                  onChange={(e) => {
                    const updatedStations = [...stations]
                    updatedStations[stationIndex].options[optionIndex].text =
                      e.target.value
                    setStations(updatedStations)
                  }}
                />
              ) : (
                <div className="mb-4">
                  <div className="flex justify-center mb-4">
                    <div className="flex flex-col items-center mx-2">
                      <label className="cursor-pointer">
                        <div className="w-24 h-24 border border-dashed border-gray-300 rounded flex items-center justify-center">
                          {option.imageUrl ? (
                            <img
                              src={option.imageUrl}
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
                        <input
                          type="text"
                          className="mt-2 p-1 border rounded w-full max-w-xs"
                          placeholder="Type caption here..."
                          value={option.caption || ""}
                          onChange={(e) => {
                            const updatedStations = [...stations]
                            updatedStations[stationIndex].options[
                              optionIndex
                            ].caption = e.target.value
                            setStations(updatedStations)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {station.options.length > 1 && (
                <div className="flex justify-between">
                  <div className="flex-1"></div>
                  <span
                    className="flex items-center cursor-pointer text-[10px] text-tertiary-200 font-semibold"
                    onClick={() =>
                      openOptionRemoveDialog(stationIndex, optionIndex)
                    }
                  >
                    Remove option
                    <span className="material-symbols-outlined ml-1">
                      more_horiz
                    </span>
                  </span>
                </div>
              )}
            </div>
          ))}
          <Dialog
            title="Remove Option"
            message={`Are you sure you want to remove Option ${
              optionToRemove.optionIndex + 1
            }?`}
            isOpen={showOptionRemoveDialog}
            onConfirm={handleConfirmRemoveOption}
            onCancel={handleCancelRemoveOption}
          />
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
          disabled={stations.length >= 3}
        >
          <span className="material-symbols-outlined">add_circle</span>
          <span className="ml-2">Add New Station</span>
          <span className="ml-2">
            {stations.length >= 3 ? "Max Stations Reached" : "Add Station"}
          </span>
        </button>
      </div>

      <div className="mt-4">
        {errors && <div className="text-red-500 text-sm mb-4">{errors}</div>}
        <button
          type="submit"
          className={`w-full py-2 px-4 bg-secondary text-white rounded-full ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Create Poll"}
        </button>
      </div>
      <Dialog
        title="Poll Created"
        message="Your poll has been successfully created!"
        isOpen={showSuccessDialog}
        onConfirm={() => setShowSuccessDialog(false)}
        confirmText="Close"
      />
    </div>
  )
}

export default CreatePandarPoll
