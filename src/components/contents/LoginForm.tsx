import React, { FC, useState } from "react"
import Link from "next/link"

const LoginForm: FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
  }

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-no-repeat"
      style={{
        backgroundImage: `url('/sw-login-bg.png')`,
        backgroundSize: "contain",
        backgroundPosition: "bottom",
      }}
    >
      <div className="absolute top-8 left-8 text-white lg:block hidden">
        <h1 className="text-5xl font-bold">Scout City</h1>
        <p className="mt-6 text-lg leading-8">
          Connect with peers and like-minds,
          <br />
          hear the latest gists buzzing,
          <br />
          explore talent-based opportunities,
          <br />
          and gain recognition for your achievements
        </p>
      </div>

      <div className="relative w-full max-w-xl bg-white bg-opacity-80 shadow-lg rounded-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white rounded-md py-2 font-semibold hover:shadow-lg"
            >
              LOGIN
            </button>
          </div>

          <div className="flex justify-between items-center text-sm">
            <Link
              href="/forgot-password"
              className="text-gray-500 hover:text-gray-900"
            >
              Forgot password?
            </Link>
            <Link href="/" className="text-red-500 font-bold">
              CREATE A NEW LOOK
            </Link>
          </div>

          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center border border-gray-300 bg-white text-gray-700 rounded-md py-2 hover:bg-gray-100"
          >
            <img src="/google-icon.svg" alt="Google" className="w-6 h-6 mr-2" />
            Log in with Google
          </button>

          <p className="text-xs text-center text-gray-500 mt-6">
            By signing up, you agree to the Terms of Service and Privacy Policy,
            including Cookie Use.
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
