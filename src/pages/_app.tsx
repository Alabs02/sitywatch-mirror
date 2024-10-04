import { AppProps } from "next/app"
import { Fragment, useEffect } from "react"
import Head from "next/head"
import "@/styles/globals.scss"
import "animate.css"
import Layout from "@/layouts/Layout"
import { useAuthStore } from "@/store"
import { useRouter } from "next/router"
import { http } from "@/libs/https.lib"
import { Toaster } from 'react-hot-toast';
import { apiRoutes } from "@/constants/apiRoutes"

export default function App({ Component, pageProps, router }: AppProps) {
  const isBuildSitadelPage = router.pathname === "/build-sitadel"
  const { tokens, logout, isLoggedIn } = useAuthStore()
  const nextRouter = useRouter()

  useEffect(() => {
    const manageSession = async () => {
      if (tokens.accessToken) {
        try {
          // Attempt to validate and refresh session using the refresh token
          await http.post(apiRoutes.REFRESH_TOKEN, {
            refreshToken: tokens.refreshToken,
          })

          // If user is logged in and on index, redirect to welcome
          if (isLoggedIn && nextRouter.pathname === "/") {
            nextRouter.push("/welcome")
          }
        } catch (error) {
          console.error("Session validation failed:", error)
          logout()
          if (nextRouter.pathname !== "/") {
            nextRouter.push("/")
          }
        }
      } else if (isLoggedIn) {
        // If no token and user is logged in, log out and redirect to index
        logout()
        if (nextRouter.pathname !== "/") {
          nextRouter.push("/")
        }
      }
    }

    manageSession()
  }, [tokens.accessToken, tokens.refreshToken, logout, nextRouter, isLoggedIn])

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
          <Toaster position={"top-center"}  />
          <Component {...pageProps} />
        </Layout>
      )}
    </Fragment>
  )
}
