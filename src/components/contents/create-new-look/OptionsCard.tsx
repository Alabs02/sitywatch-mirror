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
    onUpdateOptions([...selectedOptions, option])
    setSearchQuery("") // Clear search field after selection
  }

  const handleRemoveOption = (option: string) => {
    onUpdateOptions(selectedOptions.filter((o) => o !== option))
    setSuggestedInterests((prev) => [...prev, option]) // Add removed option back to suggestions
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
    if (
      searchQuery.trim() !== "" &&
      !selectedOptions.includes(searchQuery) &&
      !suggestedInterests.includes(searchQuery)
    ) {
      handleSelectOption(searchQuery)
      setSuggestedInterests((prev) => [...prev, searchQuery])
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
                className="flex items-center justify-between p-2 bg-gradient-to-t from-green-700 to-green-500 text-white rounded-lg flex-1 min-w-[150px] sm:w-[200px] cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => handleRemoveOption(option)}
              >
                <span className="text-center flex-1">{option}</span>
                <AiOutlineClose className="text-white" />
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
          <div className="flex flex-wrap gap-2">
            {filteredInterests.map((interest) => (
              <div
                key={interest}
                className="flex items-center justify-between p-2 bg-secondary text-white rounded-lg flex-1 min-w-[150px] sm:w-[200px] cursor-pointer"
                onClick={() => handleSelectOption(interest)}
              >
                <span className="text-center flex-1">{interest}</span>
                <AiOutlineCheck className="text-white" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleDone}
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
