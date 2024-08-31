import React, { FC, useState } from "react"
import { FormData } from "@/types" // Adjust the path as necessary

const predefinedGames = [
  "Chess", "Monopoly", "Scrabble", "Risk", "Clue", "Codenames", "Pandemic", 
  "Ticket to Ride", "Carcassonne", "Catan", "Dixit", "Azul", "7 Wonders", 
  "Splendor", "Dominion", "Jenga", "Twilight Struggle", "7 Wonders Duel", 
  "Gloomhaven", "Terraforming Mars"
]

interface StepProps {
  onNext: (data: Partial<FormData>) => void
  onBack: () => void
  formData: FormData
}

const AffairsStep2: FC<StepProps> = ({ onNext, onBack, formData }) => {
  const [showBars, setShowBars] = useState(false)
  const [info, setInfo] = useState(formData.info)
  const [link, setLink] = useState(formData.link || "")
  const [email, setEmail] = useState(formData.email || "")
  const [contact, setContact] = useState(formData.contact || "")
  const [country, setCountry] = useState(formData.country || "Nigeria")
  const [state, setState] = useState(formData.state || "")
  const [address, setAddress] = useState(formData.address || "")
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [barValues, setBarValues] = useState([
    "Board Games",
    "Monopoly",
    "Games",
  ])
  const [searchValue, setSearchValue] = useState("")
  const [filteredGames, setFilteredGames] = useState<string[]>([])
  const maxBars = 5

  const handleNext = () => {
    onNext({ info, link, email, contact, country, state, address })
  }

  const handleEditClick = (index: number) => {
    setEditIndex(index)
  }

  const handleSaveClick = () => {
    setEditIndex(null)
  }

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...barValues]
    newValues[index] = value
    setBarValues(newValues)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    if (value.trim()) {
      const filtered = predefinedGames.filter(game =>
        game.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredGames(filtered)
    } else {
      setFilteredGames([])
    }
  }

  const handleAddClick = () => {
    if (barValues.length >= maxBars) {
      alert("You have reached the maximum limit of 5 items. You can edit your existing options.")
      return
    }
    if (searchValue.trim()) {
      setBarValues([...barValues, searchValue.trim()])
      setSearchValue("")
      setFilteredGames([])
    }
  }

  const handleGameClick = (game: string) => {
    if (barValues.length >= maxBars) {
      alert("You have reached the maximum limit of 5 items. You can edit your existing options.")
      return
    }
    setBarValues([...barValues, game])
    setSearchValue("")
    setFilteredGames([])
  }

  return (
    <div className="text-center relative">
      <h2 className="text-lg font-semibold mb-2">
        What category/niche is your event under?
      </h2>
      <p className="text-sm text-black italic mb-4">
        This will be used as a keyword when people search. You can have a
        maximum of five.
      </p>

      <div className="relative mb-6">
        {/* Filtering dropdown */}
        {filteredGames.length > 0 && searchValue.trim() && (
          <div className="absolute left-0 right-0 bottom-full mb-2 bg-transparent border border-gray-300 shadow-lg rounded-md z-10">
            <div className="flex flex-wrap gap-2 p-2 bg-white border border-gray-300 rounded-md shadow-lg">
              {filteredGames.slice(0, 5).map((game, index) => (
                <div
                  key={index}
                  className="p-2 text-white bg-black hover:bg-gray-800 cursor-pointer rounded"
                  onClick={() => handleGameClick(game)}
                >
                  {game}
                </div>
              ))}
            </div>
          </div>
        )}
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search or add new..."
          className="p-2 border border-gray-300 rounded w-full bg-white shadow-inner shadow-gray-600/50"
        />
        {searchValue.trim() && (
          <button
            onClick={handleAddClick}
            className="absolute right-3 top-2 bg-primary-600 text-white rounded px-2 py-1 text-sm"
            style={{ right: "60px" }}
          >
            Add
          </button>
        )}
      </div>

      <button
        onClick={() => setShowBars(!showBars)}
        className="p-2 bg-primary-600 text-white rounded-xl mb-4"
      >
        {showBars ? "Hide Options" : "Show Options"}
      </button>

      {showBars && (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {barValues.map((value, index) => (
            <div
              key={index}
              className="flex items-center bg-black border border-gray-300 shadow-inner shadow-gray-600/50 rounded-lg"
              style={{
                maxWidth: "600px",
                flexBasis: "calc(50% - 8px)",
                marginBottom: "8px",
                position: "relative",
              }}
            >
              {editIndex === index ? (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="flex-1 bg-transparent border-none text-white p-1 focus:outline-none"
                  autoFocus
                  style={{ minWidth: 0, width: "calc(100% - 40px)" }}
                />
              ) : (
                <span className="flex-1 text-white">{value}</span>
              )}
              <span
                className="material-symbols-outlined text-primary-600 cursor-pointer ml-2"
                onClick={() => {
                  editIndex === index
                    ? handleSaveClick()
                    : handleEditClick(index)
                }}
              >
                {editIndex === index ? "save" : "edit"}
              </span>
            </div>
          ))}
          <div className="w-full mt-4 flex justify-center">
            <button
              onClick={() => setShowBars(false)}
              className="p-2 bg-gray-300 text-black rounded-xl"
            >
              X
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={onBack}
          className="p-2 bg-gray-300 text-black rounded-xl"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="p-2 bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white rounded-xl"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default AffairsStep2
