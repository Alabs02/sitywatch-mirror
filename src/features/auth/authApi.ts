import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "@/app/apiBase"
import { FormData } from "@/types"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    registerSitizen: builder.mutation<{ token: string }, Partial<FormData>>({
      query: (formData) => ({
        url: "/api/v1/sitizens",
        method: "POST",
        body: formData,
      }),
    }),
    signIn: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/api/v1/auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyEmail: builder.mutation<void, string>({
      query: (token) => ({
        url: `/api/v1/auth/verifyEmail?token=${token}`,
        method: "GET",
      }),
    }),
  }),
})

export const {
  useRegisterSitizenMutation,
  useSignInMutation,
  useVerifyEmailMutation,
} = authApi
