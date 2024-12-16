import Image from "next/image"
import React, { useEffect, useState } from "react"
import { apiRoutes } from "@/constants/apiRoutes"
import { http } from "@/libs"
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

  const fetchThoughts = async () => {
    setIsLoading(true)
    try {
      const accessToken = Cookies.get("ACCESS_TOKEN")
      const url = apiRoutes.PANDAR_POLL_THOUGHTS(pollId)

      console.log("Fetching URL:", url) // Debugging
      const response = await http.service(false).get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const data = response.data
      if (Array.isArray(data)) {
        const validThoughts = data.filter(
          (item) => item.thought && item.PollInteraction?.pandarAlias,
        )
        setThoughts(validThoughts as Thought[])
      } else {
        console.error("Unexpected response format:", data)
      }
    } catch (error: any) {
      console.error("Error fetching thoughts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const submitThought = async () => {
    if (!thought.trim()) return
    setIsLoading(true)
    try {
      const accessToken = Cookies.get("ACCESS_TOKEN")
      const url = apiRoutes.SUBMIT_POLL_THOUGHT(pollId)
      const payload = { thought }
      const response = await http.service(false).post(url, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })
      setThoughts((prev) => [...prev, response.data as Thought])
      setThought("") // Clear the input field
    } catch (error: any) {
      console.error("Error submitting thought:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchThoughts()
  }, [pollId])

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
        {thoughts.length > 0 ? (
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
