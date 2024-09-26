import { create } from "zustand"

export interface Interest {
  value: string
  verified: boolean
}

export interface School {
  id: string
  name: string
  type: string
  country: string
  state: string
  [key: string]: any // Allows accessing properties by any string key
}

export interface RawSchoolingListItem {
  school: School
  status: string // "0" (Student), "1" (Alumnus/Alumna), "2" (Dropout)
  course: string
  confirmedSchool: boolean
}

export interface FormData {
  email: string
  password: string
  name: string
  phone: string
  countryCode: string
  rawSchoolingList: RawSchoolingListItem[]
  fieldOfStudy: string
  shortName: string
  info: string
  coverPhoto: File | null
  profilePhoto: File | null
  link?: string
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
  }
  highlightImage?: File | null
  category: string
  bio: string
  website: string
  confirmPassword: string
  emailToken?: string

  // Interests field added here
  interests: Interest[] // Array of Interest objects
}

interface UIState {
  loading: boolean
  error?: string
  category: "sitizen" | "sitadel" | ""
  currentStep: number
}

interface AuthStore {
  form: FormData
  ui: UIState
  setForm: <K extends keyof FormData>(key: K, value: FormData[K]) => void
  setUI: <K extends keyof UIState>(key: K, value: UIState[K]) => void
  resetForm: () => void
  setNext: () => void
  setPrevious: () => void

  // Add functions to handle interests
  addInterest: (interest: Interest) => void
  removeInterest: (value: string) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  form: {
    email: "",
    password: "",
    name: "",
    phone: "",
    countryCode: "",
    rawSchoolingList: [
      {
        school: {
          id: "",
          name: "",
          type: "0",
          country: "",
          state: "",
        },
        status: "0",
        course: "",
        confirmedSchool: true,
      },
    ],
    interests: [], // Initialize as an empty array
    fieldOfStudy: "",
    shortName: "",
    info: "",
    coverPhoto: null,
    profilePhoto: null,
    dob: {
      month: "",
      day: "",
      year: "",
    },
    showDob: "",
    gender: "",
    sexuality: "",
    relationshipStatus: "",
    nightLife: "",
    institutionType: "",
    schoolStatus: "",
    options: [],
    country: "",
    state: "",
    category: "",
    bio: "",
    website: "",
    confirmPassword: "",
    emailToken: "",
  },
  ui: {
    loading: false,
    error: "",
    category: "",
    currentStep: 0, // Starting at step 0
  },
  setForm: (key, value) =>
    set((state) => ({
      form: {
        ...state.form,
        [key]: value, // Update any form field dynamically
      },
    })),
  setUI: (key, value) =>
    set((state) => ({
      ui: {
        ...state.ui,
        [key]: value, // Update UI state dynamically
      },
    })),
  resetForm: () =>
    set(() => ({
      form: {
        email: "",
        password: "",
        name: "",
        phone: "",
        countryCode: "",
        rawSchoolingList: [
          {
            school: {
              id: "",
              name: "",
              type: "0",
              country: "",
              state: "",
            },
            status: "0",
            course: "",
            confirmedSchool: true,
          },
        ],
        interests: [], // Reset interests to empty array
        fieldOfStudy: "",
        shortName: "",
        info: "",
        coverPhoto: null,
        profilePhoto: null,
        dob: {
          month: "",
          day: "",
          year: "",
        },
        showDob: "",
        gender: "",
        sexuality: "",
        relationshipStatus: "",
        nightLife: "",
        institutionType: "",
        schoolStatus: "",
        options: [],
        country: "",
        state: "",
        category: "",
        bio: "",
        website: "",
        confirmPassword: "",
        emailToken: "",
      },
      ui: {
        loading: false,
        error: "",
        category: "",
        currentStep: 0,
      },
    })),
  setNext: () =>
    set((state) => ({
      ui: {
        ...state.ui,
        currentStep: state.ui.currentStep + 1,
      },
    })),
  setPrevious: () =>
    set((state) => ({
      ui: {
        ...state.ui,
        currentStep: Math.max(0, state.ui.currentStep - 1),
      },
    })),

  // Function to add an interest
  addInterest: (interest: Interest) =>
    set((state) => ({
      form: {
        ...state.form,
        interests: [...state.form.interests, interest], // Add new interest
      },
    })),

  // Function to remove an interest by its value
  removeInterest: (value: string) =>
    set((state) => ({
      form: {
        ...state.form,
        interests: state.form.interests.filter((i) => i.value !== value), // Filter out the interest
      },
    })),
}))
