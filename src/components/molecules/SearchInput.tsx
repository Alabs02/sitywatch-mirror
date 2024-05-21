import React, { useState } from "react"

interface SearchInputProps {
  label?: string 
}

const SearchInput: React.FC<SearchInputProps> = ({ label = "Search term" }) => {
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-3/4 mx-auto"
    >
      {label && (
        <label htmlFor="search" className="mr-2 text-sm text-gray-700">
          {label}
        </label>
      )}
      <div className="relative w-full align-middle">
        <input
          type="text"
          id="search"
          name="search"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full rounded-lg px-3 py-2 bg-gradient-to-r from-tertiary-100 to-neutral-100 shadow-inner shadow-gray-600/50 focus:outline-none focus:ring-1 focus:ring-blue-500 "
          placeholder="Enter what you are looking for"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 px-4 bg-transparent hover:bg-gray-100 focus:outline-none"
        >
          <svg
            className="h-5 w-5 text-gray-500 align-middle"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default SearchInput
