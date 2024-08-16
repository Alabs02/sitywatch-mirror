import React, { FC, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

const LoginForm: FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login logic
    if (email === "user@example.com" && password === "password") {
      setIsLoggedIn(true)
      // Redirect to the welcome page (index page)
      router.push("/welcome")
    } else {
      alert("Invalid email or password")
    }
  }

  const handleGoogleLogin = () => {
    // Mock Google login logic
    setIsLoggedIn(true)
    router.push("/welcome")
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">
          You are logged in! Redirecting to the welcome page...
        </h2>
      </div>
    )
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

      <div className="relative w-full max-w-md bg-white bg-opacity-80 shadow-lg rounded-lg  p-8 md:w-2/3 lg:max-w-xl lg:right-4 ">
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="Email"
            />
          </div>

          <div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              placeholder="Password"
            />
          </div>

          {/* Added margin here */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white rounded-full py-2 px-8 font-semibold hover:shadow-lg"
            >
              LOGIN
            </button>
          </div>

          <div className="flex justify-center">
            <Link
              href="/forgot-password"
              className="text-secondary font-bold hover:text-gray-900"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2 text-xs md:text-sm md:px-16">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center border border-gray-300 text-gray-700 rounded-full py-2 hover:bg-gray-100"
            >
              <img
                src="/google-logo.svg"
                alt="Google"
                className="w-6 h-6 mr-2"
              />
              Log in with Google
            </button>
            <Link
              href="/build-sitadel"
              className="w-full flex items-center justify-center border border-gray-300 text-gray-700 rounded-full py-2 hover:bg-gray-100 "
            >
              <button type="button" className="">
                <span className="mr-2">New to SityWatch? </span>
                <span className="text-primary-500 font-bold">
                  CREATE A NEW LOOK
                </span>
              </button>
            </Link>
          </div>

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
