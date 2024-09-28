import React, { FC, useState } from "react"
import { useAuthStore } from "@/store"
import { apiRoutes, baseURI } from "@/constants/apiRoutes"
import { http } from "@/libs"

const predefinedNiches = [
  "Info Tech",
  "Entertainment",
  "Finance",
  "Healthcare",
  "Education",
  "Retail",
  "Sports",
  "Gaming",
  "Travel",
  "Food & Beverage",
]

interface StepProps {
  onNext: () => void
  onBack: () => void
}

const LookSitadelStep2: FC<StepProps> = ({ onNext, onBack }) => {
  const [showBars, setShowBars] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [filteredNiches, setFilteredNiches] = useState<string[]>([])
  const [nicheValues, setNicheValues] = useState<string[]>([])
  const maxNiches = 5
  const authStore = useAuthStore()

  const handleNext = async () => {
    if (nicheValues.length === 0) {
      alert("Please add at least one niche.")
      return
    }

    // Preparing payload for API
    const niches = nicheValues.map((niche) => ({
      value: niche,
      verified: true,
    }))
    authStore.setNiches(niches)

    const payload = {
      email: authStore.form.email,
      password: authStore.form.password,
      name: authStore.form.name,
      phone: authStore.form.phone,
      countryCode: authStore.form.countryCode || "defaultCountryCode",
      niches,
    }

    try {
      authStore.setUI("loading", true)
      const response = await http.post(
        `${baseURI}${apiRoutes.SITADELS_SIGN_UP}`,
        payload,
      )

      if ([200, 201].includes(response.status)) {
        const tokenMatch = response.data.message.match(/token=(.*)$/)
        const token = tokenMatch ? tokenMatch[1] : null

        if (token) {
          authStore.setForm("emailToken", token)
          onNext() // Move to next step
        } else {
          alert("Registration successful, but no token received.")
        }
      } else {
        authStore.setUI("error", response.data.message)
        alert(response.data.message || "Registration failed.")
      }
    } catch (error: any) {
      authStore.setUI("error", error.message || "Registration failed.")
      alert(error.message || "Registration failed.")
    } finally {
      authStore.setUI("loading", false)
    }
  }

  // Handlers for search, add, and select niches
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    if (value.trim()) {
      const filtered = predefinedNiches.filter((niche) =>
        niche.toLowerCase().includes(value.toLowerCase()),
      )
      setFilteredNiches(filtered)
    } else {
      setFilteredNiches([])
    }
  }

  const handleAddClick = () => {
    if (nicheValues.length >= maxNiches) {
      alert("You have reached the maximum limit of 5 niches.")
      return
    }
    if (searchValue.trim()) {
      setNicheValues([...nicheValues, searchValue.trim()])
      setSearchValue("")
      setFilteredNiches([])
    }
  }

  const handleNicheClick = (niche: string) => {
    if (nicheValues.length >= maxNiches) {
      alert("You have reached the maximum limit of 5 niches.")
      return
    }
    setNicheValues([...nicheValues, niche])
    setSearchValue("")
    setFilteredNiches([])
  }

  const handleRemoveNiche = (index: number) => {
    const updatedNiches = nicheValues.filter((_, i) => i !== index)
    setNicheValues(updatedNiches)
  }
  return (
    <div className="text-center relative">
      <h2 className="text-lg font-semibold mb-2">
        What category/niche is your business under?
      </h2>
      <p className="text-sm text-black italic mb-4">
        This will be used as a keyword when people search. You can add up to 5
        niches.
      </p>

      <div className="relative mb-6">
        {filteredNiches.length > 0 && searchValue.trim() && (
          <div className="absolute left-0 right-0 bottom-full mb-2 bg-transparent border border-gray-300 shadow-lg rounded-md z-10">
            <div className="flex flex-wrap gap-2 p-2 bg-white border border-gray-300 rounded-md shadow-lg">
              {filteredNiches.slice(0, 5).map((niche, index) => (
                <div
                  key={index}
                  className="p-2 text-white bg-black hover:bg-gray-800 cursor-pointer rounded"
                  onClick={() => handleNicheClick(niche)}
                >
                  {niche}
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
          {nicheValues.map((value, index) => (
            <div
              key={index}
              className="flex items-center bg-black border border-gray-300 shadow-inner shadow-gray-600/50 rounded-lg p-1"
              style={{
                maxWidth: "600px",
                flexBasis: "calc(50% - 8px)",
                marginBottom: "8px",
                position: "relative",
              }}
            >
              <span className="flex-1 text-white">{value}</span>
              <span
                className="material-symbols-outlined text-primary-600 cursor-pointer ml-2"
                onClick={() => handleRemoveNiche(index)}
              >
                close
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

export default LookSitadelStep2
