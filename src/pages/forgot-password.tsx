import Link from "next/link"
import React, { useState } from "react"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
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
      <div className="relative w-full max-w-md bg-white bg-opacity-80 shadow-lg rounded-lg p-8 md:w-2/3 lg:max-w-xl lg:right-4">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
          </div>
          <Link href="/welcome">
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white rounded-full py-2 px-8 font-semibold hover:shadow-lg"
              >
                Reset Password
              </button>
            </div>
          </Link>

          <div className="flex justify-center">
            <a
              href="/login"
              className="text-secondary font-bold hover:text-gray-900"
            >
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
