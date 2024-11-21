import { create } from "zustand"
import Cookies from "js-cookie"
import { apiRoutes, baseURI } from "@/constants/apiRoutes"

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
  progress: Record<string, string[]>
  fetchPollData: () => Promise<void>
  updateProgress: (pollId: string, answerOptionId: string) => void
  loadProgress: () => void
}

export const usePandarPollStore = create<PandarPollState>((set) => ({
  pollData: [],
  isFetching: false,
  error: null,
  progress:
    typeof window !== "undefined" && window.localStorage
      ? JSON.parse(localStorage.getItem("pollProgress") || "{}")
      : {},

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

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData?.message || "Failed to fetch polls")
      }

      const pollData: PollData[] = await response.json()

      pollData.forEach((poll) => {
        poll.stations.forEach((station) => {
          station.answerOptions.forEach((option) => {
            if (!option.interactions) {
              option.interactions = []
            }
          })
        })
      })

      set({ pollData, isFetching: false })
    } catch (error) {
      set({ error: (error as Error).message, isFetching: false })
    }
  },

  updateProgress: (pollId, answerOptionId) => {
    if (typeof window !== "undefined" && window.localStorage) {
      set((state) => {
        const updatedProgress = {
          ...state.progress,
          [pollId]: [...(state.progress[pollId] || []), answerOptionId],
        }
        localStorage.setItem("pollProgress", JSON.stringify(updatedProgress))
        return { progress: updatedProgress }
      })
    }
  },

  loadProgress: () => {
    if (typeof window !== "undefined" && window.localStorage) {
      set({
        progress: JSON.parse(
          window.localStorage.getItem("pollProgress") || "{}",
        ),
      })
    }
  },
}))
