import { Provider } from "react-redux"
import store from "@/store/store" // Assuming your Redux store is in this location
import { AppProps } from "next/app"
import { Fragment } from "react"

// Import your global styles here
import "@/styles/globals.scss"
import "animate.css"
import { Layout } from "@/layouts"


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Fragment>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Fragment>
    </Provider>
  )
}
