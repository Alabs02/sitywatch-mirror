import { Provider } from "react-redux"
import store from "@/store/store" 
import { AppProps } from "next/app"
import { Fragment } from "react"
import Head from "next/head"
import "@/styles/globals.scss"
import "animate.css"
import Layout from "@/layouts/Layout"

export default function App({ Component, pageProps, router }: AppProps) {
  const isBuildSitadelPage = router.pathname === "/build-sitadel"

  return (
    <Provider store={store}>
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
    </Provider>
  )
}
