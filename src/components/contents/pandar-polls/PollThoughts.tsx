import Image from "next/image"
import React, { useEffect, useState } from "react"
import { apiRoutes, baseURI } from "@/constants/apiRoutes"
import Cookies from "js-cookie"
import { formatDistanceToNow } from "date-fns"
import PandaPollOverlay from "@/components/molecules/PandaPollOverlay"


interface Thought {
  pollId: string
  id: string
  pandar: string
  thought: string
  createdAt: string | Date
}

interface ThoughtsProps {
  pollId: string
  pollOwnerAlias: string
}

const PollThoughts: React.FC<ThoughtsProps> = ({ pollId, pollOwnerAlias }) => {
  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [thought, setThought] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showOverlay, setShowOverlay] = useState(false)
  const [skipFetch, setSkipFetch] = useState(false)

   const toggleOverlay = () => {
     setShowOverlay(!showOverlay)
   }

const fetchThoughts = async () => {
  setIsLoading(true)
  setError(null)

  try {
    const url = `${baseURI}${apiRoutes.PANDAR_POLL_THOUGHTS(pollId)}`
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

    const data: Thought[] = await response.json()

    const validatedThoughts = data.map((t) => ({
      ...t,
      createdAt: t.createdAt
        ? new Date(t.createdAt).toISOString()
        : new Date().toISOString(),
    }))

    setThoughts((prev) => {
      const mergedThoughts = [...validatedThoughts, ...prev]
      // Remove duplicates by ID
      const uniqueThoughts = Array.from(
        new Map(mergedThoughts.map((t) => [t.id, t])).values(),
      )
      return uniqueThoughts
    })
  } catch (error: any) {
    console.error("Error fetching thoughts:", error.message || error)
    setError("Failed to fetch thoughts. Please try again later.")
  } finally {
    setIsLoading(false)
  }
}



 useEffect(() => {
   if (!pollId) {
     console.warn("Poll ID is undefined. Cannot fetch thoughts.")
     return
   }
   fetchThoughts()
 }, [pollId])

const submitThought = async () => {
  if (!thought.trim()) return

  const optimisticThought: Thought = {
    id: Date.now().toString(),
    pollId,
    pandar: pollOwnerAlias,
    thought,
    createdAt: new Date(), // Directly use Date object
  }

  setThoughts((prev) => [optimisticThought, ...prev])
  setThought("")
  setSkipFetch(true) // Prevent immediate fetch

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
      throw new Error(`Failed to submit thought. Status: ${response.status}`)
    }

    const savedThought: Thought = await response.json()

    setThoughts((prev) =>
      prev.map((t) => (t.id === optimisticThought.id ? savedThought : t)),
    )
  } catch (error: any) {
    console.error("Error submitting thought:", error.message || error)
    setError("Failed to submit thought. Please try again later.")
    setThoughts((prev) => prev.filter((t) => t.id !== optimisticThought.id))
  } finally {
    setSkipFetch(false)
  }
}


useEffect(() => {
  if (skipFetch) return
  if (!pollId) {
    console.warn("Poll ID is undefined. Cannot fetch thoughts.")
    return
  }
  fetchThoughts()
}, [pollId, skipFetch])



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

      <div className="mt-6">
        <h3 className="text-sm md:text-base font-semibold">Thoughts:</h3>
        {error ? (
          <p className="text-red-500 mt-4">{error}</p>
        ) : isLoading && thoughts.length === 0 ? (
          <p className="text-gray-500 mt-4">Loading thoughts...</p>
        ) : thoughts.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {thoughts.map((thought) => (
              <li key={thought.id} className="flex items-start space-x-4">
                <Image
                  src="/pandar-img.png"
                  alt="Pandar Avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-bold">{thought.pandar}</p>
                      <p className="text-xs text-gray-500">
                        {thought.createdAt instanceof Date ||
                        !isNaN(Date.parse(thought.createdAt))
                          ? formatDistanceToNow(new Date(thought.createdAt), {
                              addSuffix: true,
                            })
                          : ""}
                      </p>
                    </div>
                    <span
                      className="material-symbols-outlined cursor-pointer"
                      onClick={toggleOverlay}
                    >
                      more_horiz
                    </span>
                  </div>
                  <p className="text-sm mt-2">{thought.thought}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-4">
            No thoughts yet. Be the first to share!
          </p>
        )}
      </div>
      {/* Overlay */}
      {showOverlay && <PandaPollOverlay onClose={toggleOverlay} />}
    </div>
  )
}

export default PollThoughts
