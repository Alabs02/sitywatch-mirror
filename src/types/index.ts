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
  country?: string
  state?: string
  address?: string
  study?: string
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
