import React, { useState } from "react"

const SearchInput: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log(`Search term: ${searchTerm}`)
    alert(`You searched for: ${searchTerm}`)

    setSearchTerm("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mx-auto">
      <div className="relative w-full align-middle">
        <input
          type="text"
          id="search"
          name="search"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full rounded-lg px-3 py-2 bg-gradient-to-r from-tertiary-100 to-neutral-100 shadow-inner shadow-gray-600/50 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Flow with the gist. What do you think about it"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 px-4 bg-transparent hover:bg-gray-100 focus:outline-none flex items-center justify-center"
        >
          <span className="material-symbols-outlined">add_reaction</span>
        </button>
      </div>
    </form>
  )
}

export default SearchInput
