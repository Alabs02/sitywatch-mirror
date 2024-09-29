// pages/change-password.tsx
import React, { useState } from "react"
import { useAuthStore } from "../store" // Adjust the import based on your store's file location
import axios from "axios"

const ChangePassword = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const { setUI } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUI("loading", true)
    try {
      const response = await axios.post("/api/v1/auth/changePassword", {
        email,
        password,
        newPassword,
      })
      alert(response.data.message)
    } catch (error) {
      alert("Failed to change password. Please try again.")
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
        <h2 className="text-2xl font-bold text-center mb-6">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
              placeholder="Current password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              required
            />
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white rounded-full py-2 px-8 font-semibold hover:shadow-lg"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
