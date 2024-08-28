import React, { FC, useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai"

export interface OptionsCardProps {
  onUpdateOptions: (updatedOptions: string[]) => void
  isVisible: boolean
  onClose: () => void
}

const initialSuggestedInterests = [
  "Geography",
  "Literature",
  "Photography",
  "Movies",
  "Football",
  "Games",
  "Technology",
  "Music",
  "Art",
  "Travel",
  "Fitness",
  "Cooking",
  "Science",
  "History",
  "Fashion",
  "Politics",
  "Nature",
  "Space",
  "Education",
  "Programming",
  "Gaming",
  "Blogging",
  "Writing",
  "Cycling",
  "Swimming",
  "Hiking",
  "Reading",
  "Dancing",
  "Yoga",
  "Meditation",
]

const OptionsCard: FC<OptionsCardProps> = ({
  isVisible,
  onClose,
  onUpdateOptions,
}) => {
  const controls = useAnimation()
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [suggestedInterests, setSuggestedInterests] = useState<string[]>(
    initialSuggestedInterests,
  )
  const [searchTerm, setSearchTerm] = useState<string>("")

  useEffect(() => {
    if (isVisible) {
      controls.start({ opacity: 1, y: 0 })
    } else {
      controls.start({ opacity: 0, y: -20 })
    }
  }, [isVisible, controls])

  useEffect(() => {
    onUpdateOptions(selectedOptions)
  }, [selectedOptions, onUpdateOptions])

  const handleSelectOption = (option: string) => {
    setSelectedOptions((prev) => [...prev, option])
    setSuggestedInterests((prev) => prev.filter((o) => o !== option))
    setSearchTerm("") // Clear the input after adding the interest
  }

  const handleRemoveOption = (option: string) => {
    setSuggestedInterests((prev) => [...prev, option])
    setSelectedOptions((prev) => prev.filter((o) => o !== option))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      if (
        !suggestedInterests.includes(searchTerm) &&
        !selectedOptions.includes(searchTerm)
      ) {
        handleSelectOption(searchTerm)
      }
    }
  }

  const filteredInterests = suggestedInterests.filter((interest) =>
    interest.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleClose = () => {
    onUpdateOptions(selectedOptions)
    onClose()
  }

  return (
    <motion.div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center`}
      style={{ display: isVisible ? "flex" : "none" }}
      animate={controls}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500"
        >
          <AiOutlineClose className="text-2xl" />
        </button>

        {/* Selected Options */}
        <div className="mb-4">
          <h4 className="font-bold text-md mb-2">Selected Interests:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedOptions.map((option) => (
              <div
                key={option}
                className="flex items-center justify-between p-2 border border-gray-300 bg-gray-200 text-black rounded-lg flex-1 min-w-[150px] sm:w-[200px]"
              >
                <span className="text-center">{option}</span>
                <button
                  onClick={() => handleRemoveOption(option)}
                  className="text-red-500"
                >
                  <AiOutlineClose className="text-lg" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyPress}
              placeholder="Search for/add an interest..."
              className="w-full p-2 rounded-lg"
            />
            {searchTerm && !suggestedInterests.includes(searchTerm) && (
              <button
                onClick={() => handleSelectOption(searchTerm)}
                className="text-green-500 p-2"
              >
                <AiOutlineCheck className="text-lg" />
              </button>
            )}
          </div>
        </div>

        {/* Suggested Interests */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-md mb-2">Suggested Interests:</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {filteredInterests.map((option) => (
              <div
                key={option}
                className="flex items-center justify-between p-2 border border-gray-300 bg-gray-100 text-black rounded-lg flex-1 min-w-[150px] sm:w-[200px]"
              >
                <span className="text-center">{option}</span>
                <button
                  onClick={() => handleSelectOption(option)}
                  className="text-green-500"
                >
                  <AiOutlineCheck className="text-lg" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="text-right mt-4">
          <button
            onClick={handleClose}
            className="p-2 bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white rounded-lg"
          >
            Done
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default OptionsCard
