import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

const navlinksSlice = createSlice({
  name: "navlinks",
  initialState,
  reducers: {
    increment(state) {
      state.value += 1
    },
    decrement(state) {
      state.value -= 1
    },
    // Additional actions can be defined here
  },
})

export const { increment, decrement } = navlinksSlice.actions
export default navlinksSlice.reducer
