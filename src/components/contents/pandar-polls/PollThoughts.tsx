import React, { useState } from "react"

interface ThoughtsSectionProps {
  thoughts: any[]
  onSubmit: (thought: string) => void
}

const PollThoughts: React.FC<ThoughtsSectionProps> = ({
  thoughts,
  onSubmit,
}) => {
  const [thought, setThought] = useState("")

  const handleSubmit = () => {
    if (thought.trim()) {
      onSubmit(thought)
      setThought("")
    }
  }

  return (
    <div className="mt-6">
      <textarea
        value={thought}
        onChange={(e) => setThought(e.target.value)}
        placeholder="Share your thoughts..."
        className="p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
      />
      <div className="flex justify-end mt-2">
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-b from-[#F24055] to-[#1E7881] text-white rounded-full px-2 py-1 text-xs font-semibold"
          disabled={!thought.trim()}
        >
          Submit Thought
        </button>
      </div>

      {thoughts.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm md:text-base font-semibold">Thoughts:</h3>
          <ul className="mt-2 space-y-2">
            {thoughts.map((thought, index) => (
              <li key={index} className="border-b border-gray-300 pb-2">
                <p className="text-sm md:text-base">{thought.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default PollThoughts
