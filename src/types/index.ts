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
  type?: string
  handle?: string
  description?: string
  startDate?: string
  endDate?: string
  time?: {
    hour: string
    minute: string
    period: string
  } // Event start time
  highlightImage?: File | null
  category: string
  bio: string
  phone: string
  website: string
  password: string 
  confirmPassword: string
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
