import { create } from "zustand"
import { apiRoutes } from "@/constants/apiRoutes"
import Cookies from "js-cookie"

// Types for Poll and Answer Options
interface AnswerOption {
  questionNumber: number
  text: string
  file: string
}

interface Station {
  questionNumber: number
  questionText: string
  descriptionText: string
  file: string
  answerOptions: AnswerOption[]
}

interface PollData {
  stations: Station[]
}

interface PandarPollState {
  pollData: PollData
  isSubmitting: boolean
  error: string | null
  success: boolean
  setPollData: (pollData: PollData) => void
  submitPoll: () => Promise<void>
}

// Create Zustand store for managing poll state
export const usePandarPollStore = create<PandarPollState>((set, get) => ({
  pollData: {
    stations: [
      {
        questionNumber: 0,
        questionText: "",
        descriptionText: "",
        file: "",
        answerOptions: [
          {
            questionNumber: 0,
            text: "",
            file: "",
          },
        ],
      },
    ],
  },
  isSubmitting: false,
  error: null,
  success: false,

  // Function to set poll data
  setPollData: (pollData: PollData) => set({ pollData }),

  // Function to submit poll data
  submitPoll: async () => {
    set({ isSubmitting: true, error: null, success: false })

    const { pollData } = get()

    // Get tokens from cookies
    const accessToken = Cookies.get("ACCESS_TOKEN")

    try {
      const response = await fetch(`${apiRoutes.PANDAR_POLLS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Send the token in Authorization header
        },
        body: JSON.stringify(pollData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData?.message || "Submission failed")
      }

      set({ isSubmitting: false, success: true })
    } catch (error) {
      set({ isSubmitting: false, error: (error as Error).message })
    }
  },
}))
