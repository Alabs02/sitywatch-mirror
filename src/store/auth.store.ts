import { create } from "zustand";

// Interfaces
export interface Interest {
  value: string;
  verified: boolean;
}

export interface School {
  id: string;
  name: string;
  type: string;
  country: string;
  state: string;
  [key: string]: any;
}

export interface RawSchoolingListItem {
  school: School;
  status: string;
  course: string;
  confirmedSchool: boolean;
}

interface AuthTokens {
  sessionId: string;
  accessToken: string;
  refreshToken: string;
}

export interface FormData {
  email: string;
  password: string;
  name: string;
  phone: string;
  countryCode: string;
  rawSchoolingList: RawSchoolingListItem[];
  fieldOfStudy: string;
  shortName: string;
  info: string;
  coverPhoto: File | null;
  profilePhoto: File | null;
  link?: string;
  contact?: string;
  address?: string;
  study?: string;
  dob: {
    month: string;
    day: string;
    year: string;
  };
  showDob: string;
  gender: string;
  sexuality: string;
  relationshipStatus: string;
  nightLife: string;
  sideHustle?: string;
  institutionType: string;
  schoolStatus: string;
  options: string[];
  country: string;
  state: string;
  type?: string;
  handle?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  time?: {
    hour: string;
    minute: string;
    period: string;
  };
  highlightImage?: File | null;
  category: string;
  bio: string;
  website: string;
  confirmPassword: string;
  emailToken?: string;
  interests: Interest[];
  niches: Interest[];
}

interface UIState {
  loading: boolean;
  error?: string;
  category: "sitizen" | "sitadel" | "";
  currentStep: number;
}

interface AuthStore {
  form: FormData;
  ui: UIState;
  tokens: AuthTokens;
  isLoggedIn: boolean;
  isVerified: boolean; // User verification status
  setForm: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
  setUI: <K extends keyof UIState>(key: K, value: UIState[K]) => void;
  setUserVerification: (verified: boolean) => void;
  resetForm: () => void;
  setNext: () => void;
  setPrevious: () => void;
  setCurrentStep: (step: number) => void;
  addInterest: (interest: Interest) => void;
  removeInterest: (value: string) => void;
  setNiches: (niches: Interest[]) => void;
  setTokens: (tokens: Partial<AuthTokens>) => void;
  logout: () => void;
}

// Persist tokens in localStorage or browser storage (if available)
const getInitialTokens = (): AuthTokens => {
  const storage = typeof window !== "undefined" ? window.localStorage : null;

  const sessionId = storage?.getItem("sessionId") || "";
  const accessToken = storage?.getItem("accessToken") || "";
  const refreshToken = storage?.getItem("refreshToken") || "";

  return { sessionId, accessToken, refreshToken };
};

// Store
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
  tokens: getInitialTokens(),
  isLoggedIn: Boolean(
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessToken")
      : null
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
    const storage = typeof window !== "undefined" ? window.localStorage : null;

    if (tokens.sessionId) storage?.setItem("sessionId", tokens.sessionId);
    if (tokens.accessToken) storage?.setItem("accessToken", tokens.accessToken);
    if (tokens.refreshToken)
      storage?.setItem("refreshToken", tokens.refreshToken);

    set((state) => ({
      tokens: {
        sessionId: tokens.sessionId || state.tokens.sessionId,
        accessToken: tokens.accessToken || state.tokens.accessToken,
        refreshToken: tokens.refreshToken || state.tokens.refreshToken,
      },
      isLoggedIn: true,
    }));
  },

  logout: () => {
    const storage = typeof window !== "undefined" ? window.localStorage : null;

    storage?.removeItem("sessionId");
    storage?.removeItem("accessToken");
    storage?.removeItem("refreshToken");

    set(() => ({
      tokens: {
        sessionId: "",
        accessToken: "",
        refreshToken: "",
      },
      isLoggedIn: false,
      isVerified: false,
    }));
  },

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
    set((state) => {
      console.log({ inline_current_step: state.ui.currentStep });
      return {
        ui: {
          ...state.ui,
          currentStep: state.ui.currentStep + 1,
        },
      };
    }),

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
}));
