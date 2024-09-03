import { ReactNode } from "react"


export interface FormData {
  fieldOfStudy: string
  name: string
  shortName: string
  info: string
  coverPhoto: File | null
  profilePhoto: File | null
  link?: string
  email?: string
  contact?: string
  address?: string
  study?: string
  dob: {
    month: string
    day: string
    year: string
  }
  showDob: string
  gender: string
  sexuality: string
  relationshipStatus: string
  nightLife: string
  sideHustle?: string
  institutionType: string
  schoolStatus: string
  options: string[]
  country: string
  state: string
  type?: string // New field for the affair type (TOURNEY, EVENT, PROVINCE)
  handle?: string // New field for event handle
  description?: string // New field for event description
  startDate?: string // New field for event start date
  endDate?: string // New field for event end date
  time?: {
    hour: string
    minute: string
    period: string
  } // New field for event start time
  highlightImage?: File | null
  category: string
}







export interface CLookFormDate {
  name: string
  shortName: string
  info: string
  coverPhoto: File | null
  profilePhoto: File | null
  link?: string
  email?: string
  contact?: string
  country?: string
  state?: string
  address?: string
  password: string
  Study?: string
}




export type TChildrenprops = {
  className?: string
  children: ReactNode
}

export type TMainprops = TChildrenprops & {}
export type THeaderprops = TChildrenprops & {}
export type TFooterprops = TChildrenprops & {}
