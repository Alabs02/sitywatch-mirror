import React, { FC, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAuthStore } from "@/store"
import { apiRoutes } from "@/constants/apiRoutes"
import { http } from "@/libs/https.lib"

const LoginForm: FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

 const { setTokens, setUI, isLoggedIn, ui } = useAuthStore()
  const router = useRouter()

  // Redirect authenticated users to /welcome
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/welcome")
    }
  }, [isLoggedIn, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!email || !password) {
      setUI("error", "Please enter both email and password.")
      return
    }

    setUI("loading", true)
    setUI("error", "")

    try {
      const response = await http.post(apiRoutes.SIGN_IN, { email, password })

      // Check response structure
      if (response.data.statusCode === 200) {
        const { sessionId, accessToken, refreshToken } = response.data.success
        setTokens({ sessionId, accessToken, refreshToken })
        router.push("/welcome")
      } else {
        setUI("error", response.data.message || "Login failed.")
      }
    } catch (error: any) {
      console.error("Login failed:", error)
      setUI("error", error.response?.data?.message || "Login failed.")
    } finally {
      setUI("loading", false)
    }
  }

  const handleGoogleLogin = () => {
    // Handle Google login here
    alert("Google login not yet implemented.")
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div
      className="relative min-h-screen w-full bg-no-repeat flex items-center justify-end"
      style={{
        backgroundImage: `url('/sw-login-bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Left Side Content */}
      <div className="absolute top-8 left-8 text-white lg:block hidden">
        <h1 className="relative text-5xl font-bold text-black">
          <span
            className="block text-6xl italic tracking-wide leading-none"
            style={{ fontFamily: "YourCustomFont" }}
          >
            Scout
          </span>
          <span
            className="absolute text-6xl italic font-semibold tracking-wider leading-none left-16"
            style={{
              fontFamily: "YourCustomFont",
              transform: "translateY(-35%) translateX(10%) rotate(-5deg)",
            }}
          >
            Sity
          </span>
        </h1>
        <p className="mt-8 text-lg font-semibold leading-8 text-transparent bg-clip-text bg-gradient-to-r from-[#F24055] to-[#1E7881]">
          Connect with peers and like-minds,
          <br />
          hear the latest gists buzzing,
          <br />
          explore talent-based opportunities,
          <br />
          and gain recognition for your achievements
        </p>
      </div>

      {/* Login Form Container */}
      <div className="relative w-full max-w-md bg-white bg-opacity-80 shadow-lg rounded-lg p-8 md:p-12 md:w-2/3 lg:max-w-xl lg:right-4 h-screen md:max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-4 pt-4 lg:pt-8">
          {/* Email Input */}
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 shadow-inner shadow-gray-600/50"
              placeholder="Email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 shadow-inner shadow-gray-600/50"
              placeholder="Password"
              required
            />
            <span
              className="material-symbols-outlined absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className={`bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white rounded-full py-2 px-8 font-semibold hover:shadow-lg ${
                ui.loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={ui.loading}
            >
              {ui.loading ? "Logging in..." : "LOGIN"}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-center">
            <Link
              href="/forgot-password"
              className="text-secondary font-bold hover:text-gray-900"
            >
              Forgot password?
            </Link>
          </div>

          {/* OR Separator */}
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex flex-col items-center justify-center space-y-2 text-xs md:text-sm md:px-16">
            <div className="w-full flex items-center justify-center rounded-full p-[1.5px] bg-gradient-to-r from-[#F24055] to-[#1E7881]">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center bg-white text-gray-700 rounded-full py-2 hover:bg-gray-100 border-transparent"
              >
                <img
                  src="/google-logo.svg"
                  alt="Google"
                  className="w-6 h-6 mr-2"
                />
                Log in with Google
              </button>
            </div>

            <Link href="/create-account" className="w-full">
              <div className="flex items-center justify-center rounded-full p-[1.5px] bg-gradient-to-r from-[#F24055] to-[#1E7881]">
                <button
                  type="button"
                  className="w-full bg-white flex items-center justify-center text-gray-700 rounded-full py-2 hover:bg-gray-100 border-transparent"
                >
                  <span className="mr-2">New to SityWatch? </span>
                  <span className="text-primary-500 font-bold">
                    CREATE A NEW LOOK
                  </span>
                </button>
              </div>
            </Link>
          </div>

          {/* Terms and Conditions */}
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
