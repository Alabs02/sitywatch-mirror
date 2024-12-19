import Image from "next/image"
import React, { useEffect, useState } from "react"
import { apiRoutes, baseURI } from "@/constants/apiRoutes"
import Cookies from "js-cookie"

interface Thought {
  thought: string
  PollInteraction?: {
    pandarAlias?: string
  }
}

interface ThoughtsProps {
  pollId: string
  pollOwnerAlias: string
  expiresAt: string
}

const PollThoughts: React.FC<ThoughtsProps> = ({
  pollId,
  pollOwnerAlias,
  expiresAt,
}) => {
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [thought, setThought] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

 const fetchThoughts = async () => {
   setIsLoading(true)
   setError(null)

   try {
     const url = `${baseURI}${apiRoutes.PANDAR_POLL_THOUGHTS(pollId)}`
     console.log("Fetching Thoughts from URL:", url)

     const response = await fetch(url, {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
       },
     })

     if (!response.ok) {
       const errorData = await response.json()
       throw new Error(
         errorData?.message ||
           `Failed to fetch thoughts. Status: ${response.status}`,
       )
     }

     const data = await response.json()
     console.log("Fetched Thoughts Data:", data)

     if (Array.isArray(data)) {
       setThoughts(data)
     } else {
       throw new Error("Invalid data format received from API.")
     }
   } catch (error: any) {
     console.error("Error fetching thoughts:", error.message || error)
     setError("Failed to fetch thoughts. Please try again later.")
   } finally {
     setIsLoading(false)
   }
 }

  useEffect(() => {
    if (pollId) fetchThoughts()
  }, [pollId])

  const submitThought = async () => {
    if (!thought.trim()) return
    setIsLoading(true)

    try {
      const url = `${baseURI}${apiRoutes.SUBMIT_POLL_THOUGHT(pollId)}`
      const accessToken = Cookies.get("ACCESS_TOKEN")
      const payload = { thought }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData?.message ||
            `Failed to submit thought. Status: ${response.status}`,
        )
      }

      const newThought = await response.json()
      setThoughts((prev) => [...prev, newThought])
      setThought("")
    } catch (error: any) {
      console.error("Error submitting thought:", error.message || error)
      setError("Failed to submit thought. Please try again later.") // Set error state
    } finally {
      setIsLoading(false)
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
          onClick={submitThought}
          className="bg-gradient-to-b bg-secondary text-white rounded-full px-2 py-1 text-xs font-semibold"
          disabled={!thought.trim() || isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Thought"}
        </button>
      </div>

      <div className="flex items-center justify-between mb-4 mt-6">
        <div className="flex items-center">
          <Image
            src="/pandar-img.png"
            alt={pollOwnerAlias}
            width={70}
            height={70}
            className="rounded-full mr-4"
          />
          <div>
            <p className="font-bold text-sm md:text-base">{pollOwnerAlias}</p>
            <p className="text-gray-800 text-xs md:text-sm">
              Poll expires at: {new Date(expiresAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-sm md:text-base font-semibold">Thoughts:</h3>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : isLoading && thoughts.length === 0 ? ( // Check isLoading and no thoughts
          <p className="text-gray-500 mt-4">Loading thoughts...</p>
        ) : thoughts.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {thoughts.map((thought, index) => (
              <li key={index} className="border-b border-gray-300 pb-2">
                <p className="text-sm md:text-base">{thought.thought}</p>
                <p className="text-xs text-gray-500">
                  By: {thought.PollInteraction?.pandarAlias || "Anonymous"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-4">
            No thoughts yet. Be the first to share!
          </p>
        )}
      </div>
    </div>
  )
}

export default PollThoughts
