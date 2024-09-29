// pages/reset-password.tsx
import React, { useState } from "react"
import { useRouter } from "next/router"
import { useAuthStore } from "../store" // Adjust the import based on your store's file location
import axios from "axios"

const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")
  const { setUI } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUI("loading", true)
    try {
      const response = await axios.post("/api/v1/auth/resetPassword", {
        password,
        token,
      })
      alert(response.data.message)
      router.push("/login")
    } catch (error) {
      alert("Failed to reset password. Please try again.")
    } finally {
      setUI("loading", false)
    }
  }

  return (
    <div
      className="relative min-h-screen w-full bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url('/sw-login-bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative w-full max-w-md bg-white bg-opacity-80 shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter your reset token"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              required
            />
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white rounded-full py-2 px-8 font-semibold hover:shadow-lg"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
