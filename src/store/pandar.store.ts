import { create } from "zustand"
import Cookies from "js-cookie"
import { apiRoutes, baseURI } from "@/constants/apiRoutes"

// Define interfaces for the data structure
export interface Interaction {
  id: string
  pollInteractionId: string
  answerOptionId: string
  createdAt: string
}

export interface AnswerOption {
  id: string
  text: string
  file?: string
  interactions: Interaction[]
}

export interface Station {
  id: string
  questionNumber: number
  questionText: string
  descriptionText: string
  file?: string
  answerOptions: AnswerOption[]
}

export interface PollInteraction {
  id: string
  pandarAlias: string
  selectedAnswers: { id: string; answerOptionId: string }[]
}

export interface PollData {
  id: string
  pollOwnerAlias: string
   description?: string
  stations: Station[]
  expiresAt: string
  pollInteractions: PollInteraction[]
}

interface PandarPollState {
  pollData: PollData[]
  isFetching: boolean
  error: string | null
  fetchPollData: () => Promise<void>
}

// Create Zustand store
export const usePandarPollStore = create<PandarPollState>((set) => ({
  pollData: [],
  isFetching: false,
  error: null,

  fetchPollData: async () => {
    set({ isFetching: true, error: null })

    try {
      const accessToken = Cookies.get("ACCESS_TOKEN")
      const url = `${baseURI}${apiRoutes.PANDAR_POLLS}`

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })

      // Check if the response is not OK and throw an error
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData?.message || "Failed to fetch polls")
      }

      // Parse the response data
      const pollData: PollData[] = await response.json()

      // Ensure interactions are always an empty array if they are missing
      pollData.forEach((poll) => {
        poll.stations.forEach((station) => {
          station.answerOptions.forEach((option) => {
            if (!option.interactions) {
              option.interactions = [] 
            }
          })
        })
      })

      // Set the state with the fetched poll data
      set({ pollData, isFetching: false })
    } catch (error) {
      // Set error state in case of failure
      set({ error: (error as Error).message, isFetching: false })
    }
  },
}))
