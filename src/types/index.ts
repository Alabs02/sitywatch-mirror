import { ReactNode } from "react"


export interface FormData {
  name: string;
  shortName: string;
  info: string;
  coverPhoto: File | null;
  profilePhoto: File | null;
}


export type TChildrenprops = {
  className?: string
  children: ReactNode
}

export type TMainprops = TChildrenprops & {}
export type THeaderprops = TChildrenprops & {}
export type TFooterprops = TChildrenprops & {}
