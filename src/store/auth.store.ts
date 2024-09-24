import { create } from "zustand"

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

interface FormData {
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
        [key]: value, // key is typed as keyof FormData
      },
    })),
  setUI: (key, value) =>
    set((state) => ({
      ui: {
        ...state.ui,
        [key]: value, // key is typed as keyof UIState
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
        currentStep: 0, // Reset to first step
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
}))
