import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FormData } from "@/types"

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  formData: Partial<FormData> // Add formData to state
}

const initialState: AuthState = {
  token: null, // Start with no token by default
  isAuthenticated: false,
  formData: {}, // Initialize formData as an empty object
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    clearCredentials: (state) => {
      state.token = null
      state.isAuthenticated = false
    },
    setFormData: (state, action: PayloadAction<Partial<FormData>>) => {
      state.formData = { ...state.formData, ...action.payload } // Merge formData with new data
    },
  },
})

export const { setCredentials, clearCredentials, setFormData } =
  authSlice.actions
export default authSlice.reducer
