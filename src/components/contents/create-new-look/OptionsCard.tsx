import React, { FC, useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai"

export interface OptionsCardProps {
  onUpdateOptions: (updatedOptions: string[]) => void
  isVisible: boolean
  onClose: () => void
  selectedOptions: string[]
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
  selectedOptions,
}) => {
  const controls = useAnimation()
  const [suggestedInterests, setSuggestedInterests] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [filteredInterests, setFilteredInterests] = useState<string[]>([])

  useEffect(() => {
    const availableInterests = [
      ...initialSuggestedInterests,
      ...suggestedInterests.filter(
        (interest) => !initialSuggestedInterests.includes(interest),
      ),
    ].filter((interest) => !selectedOptions.includes(interest))

    setSuggestedInterests(availableInterests)
    setFilteredInterests(availableInterests)
  }, [selectedOptions])

  useEffect(() => {
    if (isVisible) {
      controls.start({ opacity: 1, y: 0 })
    } else {
      controls.start({ opacity: 0, y: -20 })
    }
  }, [isVisible, controls])
const handleSelectOption = (option: string) => {
  const normalizedOption = capitalizeWords(option)

  // Move the selected option to the selectedOptions list
  onUpdateOptions([...selectedOptions, normalizedOption])

  onUpdateOptions([...selectedOptions, normalizedOption])
  setSuggestedInterests(
    suggestedInterests.filter((o) => o !== normalizedOption),
  )

  // Clear search query after selection
  setSearchQuery("")
}

const handleRemoveOption = (option: string) => {
  const normalizedOption = capitalizeWords(option)

  // Remove the option from the selectedOptions
  onUpdateOptions(selectedOptions.filter((o) => o !== normalizedOption))

  // Add the removed option back to the suggestedInterests if it's not already there
  setSuggestedInterests((prev) => {
    if (!prev.includes(normalizedOption)) {
      return [...prev, normalizedOption]
    }
    return prev
  })
}


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.trim() === "") {
      setFilteredInterests(suggestedInterests)
    } else {
      const filtered = suggestedInterests.filter((interest) =>
        interest.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredInterests(filtered)
    }
  }

  const handleAddNewInterest = () => {
    const normalizedSearchQuery = capitalizeWords(searchQuery)
    if (
      searchQuery.trim() !== "" &&
      !selectedOptions.includes(normalizedSearchQuery) &&
      !suggestedInterests.includes(normalizedSearchQuery)
    ) {
      handleSelectOption(normalizedSearchQuery)
      setSuggestedInterests((prev) => [...prev, normalizedSearchQuery])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddNewInterest()
    }
  }

  const handleDone = () => {
    onClose()
  }

  const capitalizeWords = (str: string) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")

  return (
    <motion.div
      className={`fixed inset-0 z-50 flex items-center justify-center`}
      style={{ display: isVisible ? "flex" : "none" }}
      animate={controls}
    >
      <div className="bg-[rgb(var(--background-start-rgb))] text-[rgb(var(--foreground-rgb))] p-6 rounded-lg shadow-lg w-full max-w-4xl relative overflow-y-auto h-screen md:max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500"
        >
          <AiOutlineClose className="text-2xl" />
        </button>

        {/* Selected Options */}
        <div className="mb-4">
          <h4 className="font-bold text-md mb-2">Selected Interests:</h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {selectedOptions.map((option) => (
              <div
                key={option}
                className="flex items-center justify-between p-2 bg-gradient-to-b from-green-800 to-green-600 text-white rounded-lg min-w-[120px] sm:min-w-[160px] cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => handleRemoveOption(option)}
                style={{ minWidth: "max-content" }}
              >
                <span className="text-center flex-1">{option}</span>
                <AiOutlineClose className="text-primary-500" />
              </div>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="mb-4 relative flex items-center">
          <input
            type="text"
            placeholder="Search or add new interest..."
            value={searchQuery}
            onChange={handleSearch}
            onKeyDown={handleKeyPress}
            className="w-full rounded-lg px-3 py-2 bg-gradient-to-r from-tertiary-100 to-neutral-100 shadow-inner shadow-gray-600/50 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base"
          />
          {searchQuery && (
            <AiOutlineCheck
              onClick={handleAddNewInterest}
              className="absolute right-3 text-green-500 cursor-pointer"
            />
          )}
        </div>

        {/* Suggestions */}
        <div>
          <h4 className="font-bold text-md mb-2">Suggested Interests:</h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {filteredInterests.map((interest) => (
              <div
                key={interest}
                className="flex items-center justify-between p-2 bg-secondary text-white rounded-lg min-w-[120px] sm:min-w-[160px] cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => handleSelectOption(interest)}
                style={{ minWidth: "max-content" }}
              >
                <span className="text-center flex-1">{interest}</span>
                <AiOutlineCheck className="text-white" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleDone}
            className="py-2 px-6 bg-gradient-to-t from-[#F24055] to-[#1E7881] text-white rounded-full"
          >
            Done
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default OptionsCard
