import { Provider } from "react-redux"
import store from "@/store/store" // Assuming your Redux store is in this location
import { AppProps } from "next/app"
import { Fragment } from "react"
import Head from "next/head"

// Import your global styles here
import "@/styles/globals.scss"
import "animate.css"
import { Layout } from "@/layouts"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Fragment>
        <Head>
          <title>Scout City</title>
          <link rel="icon" href="/sclogo-light.png" type="image/svg+xml" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Fragment>
    </Provider>
  )
}
