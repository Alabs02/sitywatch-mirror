import { create } from "zustand"
import axios  from "axios"
import { baseURI, apiRoutes } from "@constants/apiRoutes"

// Interfaces
export interface Interest {
  value: string
  verified: boolean
}

export interface School {
  id: string
  name: string
  type: number
  country: string
  state: string
  [key: string]: any
}

export interface RawSchoolingListItem {
  school: School
  status: string
  course: string
  confirmedSchool: boolean
}

interface AuthTokens {
  sessionId: string
  accessToken: string
  refreshToken: string
}

export interface FormData {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  otherNames: string
  phone: string
  countryCode: string
  rawSchoolingList: RawSchoolingListItem[]
  interests: Interest[]
  fieldOfStudy: string
  shortName: string
  info: string
  coverPhoto: File | null
  profilePhoto: File | null
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
  bio: string
  website: string
  emailToken?: string
  niches: Interest[]
}

interface UIState {
  loading: boolean
  error?: string
  category: "sitizen" | "sitadel" | ""
  currentStep: number
}

interface AuthStore {
  checkEmail(email: string): Promise<boolean>
  form: FormData
  ui: UIState
  tokens: AuthTokens
  isLoggedIn: boolean
  isVerified: boolean
  setForm: <K extends keyof FormData>(key: K, value: FormData[K]) => void
  setUI: <K extends keyof UIState>(key: K, value: UIState[K]) => void
  setUserVerification: (verified: boolean) => void
  resetForm: () => void
  setNext: () => void
  setPrevious: () => void
  setCurrentStep: (step: number) => void
  addInterest: (interest: Interest) => void
  removeInterest: (value: string) => void
  setNiches: (niches: Interest[]) => void
  setTokens: (tokens: Partial<AuthTokens>) => void
  logout: () => void
}

// Persist tokens in localStorage or browser storage (if available)
const getInitialTokens = (): AuthTokens => {
  const storage = typeof window !== "undefined" ? window.localStorage : null

  const sessionId = storage?.getItem("sessionId") || ""
  const accessToken = storage?.getItem("accessToken") || ""
  const refreshToken = storage?.getItem("refreshToken") || ""

  return { sessionId, accessToken, refreshToken }
}

// Store
export const useAuthStore = create<AuthStore>((set) => ({
  form: {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    otherNames: "",
    phone: "",
    countryCode: "",
    rawSchoolingList: [
      {
        school: {
          id: "",
          name: "",
          type: 0,
          country: "",
          state: "",
        },
        status: "0",
        course: "",
        confirmedSchool: true,
      },
    ],
    interests: [],
    niches: [],
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
    sideHustle: "",
    institutionType: "",
    schoolStatus: "",
    options: [],
    country: "",
    state: "",
    bio: "",
    website: "",
    emailToken: "",
  },
  ui: {
    loading: false,
    error: "",
    category: "",
    currentStep: 0,
  },
  tokens: getInitialTokens(),
  isLoggedIn: Boolean(
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessToken")
      : null,
  ),
  isVerified: false,

  setForm: (key, value) =>
    set((state) => ({
      form: {
        ...state.form,
        [key]: value,
      },
    })),

  setUI: (key, value) =>
    set((state) => ({
      ui: {
        ...state.ui,
        [key]: value,
      },
    })),

  setUserVerification: (verified: boolean) => set({ isVerified: verified }),

  setNiches: (niches: Interest[]) =>
    set((state) => ({
      form: {
        ...state.form,
        niches,
      },
    })),

  setTokens: (tokens) => {
    const storage = typeof window !== "undefined" ? window.localStorage : null

    if (tokens.sessionId) storage?.setItem("sessionId", tokens.sessionId)
    if (tokens.accessToken) storage?.setItem("accessToken", tokens.accessToken)
    if (tokens.refreshToken)
      storage?.setItem("refreshToken", tokens.refreshToken)

    set((state) => ({
      tokens: {
        sessionId: tokens.sessionId || state.tokens.sessionId,
        accessToken: tokens.accessToken || state.tokens.accessToken,
        refreshToken: tokens.refreshToken || state.tokens.refreshToken,
      },
      isLoggedIn: true,
    }))
  },

  logout: () => {
    const storage = typeof window !== "undefined" ? window.localStorage : null

    storage?.removeItem("sessionId")
    storage?.removeItem("accessToken")
    storage?.removeItem("refreshToken")

    set(() => ({
      tokens: {
        sessionId: "",
        accessToken: "",
        refreshToken: "",
      },
      isLoggedIn: false,
      isVerified: false,
    }))
  },

  resetForm: () =>
    set(() => ({
      form: {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        otherNames: "",
        phone: "",
        countryCode: "",
        rawSchoolingList: [
          {
            school: {
              id: "",
              name: "",
              type: 0,
              country: "",
              state: "",
            },
            status: "0",
            course: "",
            confirmedSchool: true,
          },
        ],
        interests: [],
        niches: [],
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
        sideHustle: "",
        institutionType: "",
        schoolStatus: "",
        options: [],
        country: "",
        state: "",
        bio: "",
        website: "",
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
        currentStep: state.ui.currentStep - 1,
      },
    })),

  setCurrentStep: (step: number) =>
    set((state) => ({
      ui: {
        ...state.ui,
        currentStep: step,
      },
    })),

  addInterest: (interest: Interest) =>
    set((state) => ({
      form: {
        ...state.form,
        interests: [...state.form.interests, interest],
      },
    })),

  removeInterest: (value: string) =>
    set((state) => ({
      form: {
        ...state.form,
        interests: state.form.interests.filter((i) => i.value !== value),
      },
    })),
  checkEmail: async (email: string): Promise<boolean> => {
    set((state) => ({
      ui: { ...state.ui, loading: true, error: "" },
    }))
    try {
      const response = await axios.get(
        `${baseURI}${apiRoutes.CHECK_EMAIL(email)}`,
      )
      const isAvailable = response?.data?.success === true

      // If email is unavailable or invalid, set an error
      if (!isAvailable) {
        set((state) => ({
          ui: {
            ...state.ui,
            error: "Email is unavailable or invalid.",
          },
        }))
      } else {
        set((state) => ({
          ui: {
            ...state.ui,
            error: "",
          },
        }))
      }


      return isAvailable
    } catch (error: any) {
      // Only set error if an actual exception occurred
      set((state) => ({
        ui: { ...state.ui, error: "Failed to check email." },
      }))
      return false
    } finally {
      set((state) => ({
        ui: { ...state.ui, loading: false },
      }))
    }
  },
}))
