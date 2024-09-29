// src/pages/_app.tsx
import { AppProps } from "next/app"
import { Fragment, useEffect } from "react"
import Head from "next/head"
import "@/styles/globals.scss"
import "animate.css"
import Layout from "@/layouts/Layout"
import { useAuthStore } from "@/store"
import { useRouter } from "next/router"
import { http } from "@/libs/https.lib"
import { apiRoutes } from "@/constants/apiRoutes"

export default function App({ Component, pageProps, router }: AppProps) {
  const isBuildSitadelPage = router.pathname === "/build-sitadel"

  const { tokens, logout, isLoggedIn, isVerified } = useAuthStore()
  const nextRouter = useRouter()

  useEffect(() => {
    const verifyToken = async () => {
      if (tokens.accessToken) {
        try {
          // Replace with your actual verification endpoint
          await http.get(apiRoutes.VERIFY_EMAIL)

          // If verification is successful and user is not already on /welcome, redirect to /welcome
          if (!isVerified && nextRouter.pathname !== "/welcome") {
            nextRouter.push("/welcome")
          }
        } catch (error) {
          console.error("Token verification failed:", error)
          logout()
          // Redirect to the index page if token is invalid
          if (nextRouter.pathname !== "/") {
            nextRouter.push("/")
          }
        }
      } else {
        // If no token and user is logged in, log out and redirect to index
        if (isLoggedIn) {
          logout()
          if (nextRouter.pathname !== "/") {
            nextRouter.push("/")
          }
        }
      }
    }

    verifyToken()
  }, [tokens.accessToken, logout, nextRouter, isLoggedIn, isVerified])

  return (
    <Fragment>
      <Head>
        <title>Scout City</title>
        <link rel="icon" href="/sclogo-light.png" type="image/svg+xml" />
      </Head>
      {isBuildSitadelPage ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </Fragment>
  )
}
