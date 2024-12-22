// utils/pollUtils.ts
import { baseURI, apiRoutes } from "@/constants/apiRoutes"

export const fetchPollData = async (accessToken: string) => {
  const response = await fetch(`${baseURI}${apiRoutes.PANDAR_POLLS}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData?.message || "Failed to fetch polls")
  }

  return response.json()
}

export const fetchSinglePoll = async (pollId: string, accessToken: string) => {
  const response = await fetch(
    `${baseURI}${apiRoutes.GET_SINGLE_POLL(pollId)}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  )

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData?.message || `Failed to fetch poll ${pollId}`)
  }

  return response.json()
}
