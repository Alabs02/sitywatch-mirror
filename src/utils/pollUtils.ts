// utils/pollUtils.ts
import { AnswerOption } from "@/store/pandar.store"

// Calculate total votes for a poll's options
export const getTotalVotes = (options: AnswerOption[]): number => {
  return options.reduce((sum, option) => {
    return sum + (option.interactions ? option.interactions.length : 0)
  }, 0)
}

// Calculate the percentage of votes for an option
export const getPercentage = (votes: number, total: number): string => {
  if (total === 0) return "0"
  return ((votes / total) * 100).toFixed(1)
}

// Calculate countdown for poll expiration
export const calculateCountdown = (expiresAt: string): string => {
  const now = new Date().getTime()
  const end = new Date(expiresAt).getTime()
  const diff = end - now

  if (diff <= 0) return "Expired"

  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  return `${hours} hrs ${minutes} mins remaining`
}

// Update countdowns and determine expired polls
export const updateCountdowns = (
  pollData: any[],
  setCountdowns: Function,
  setExpiredPolls: Function,
) => {
  const updatedCountdowns: { [key: string]: string } = {}
  const updatedExpiredPolls: { [key: string]: boolean } = {}

  pollData.forEach((poll) => {
    const countdown = calculateCountdown(poll.expiresAt)
    updatedCountdowns[poll.id] = countdown
    updatedExpiredPolls[poll.id] = countdown === "Expired"
  })

  setCountdowns(updatedCountdowns)
  setExpiredPolls(updatedExpiredPolls)
}
