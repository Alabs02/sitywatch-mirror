// GLOBAL STYLES
import "@/styles/globals.scss"
// import "/public/font-icons/icons.css"
import "animate.css"

// FONTS
// import "@fontsource/squada-one"

// import "@fontsource/nunito-sans/300.css"
// import "@fontsource/nunito-sans/400.css"
// import "@fontsource/nunito-sans/500.css"
// import "@fontsource/nunito-sans/600.css"
// import "@fontsource/nunito-sans/700.css"
// import "@fontsource/nunito-sans/800.css"
// import "@fontsource/nunito-sans/400-italic.css"

// import "@fontsource/open-sans/300.css"
// import "@fontsource/open-sans/400.css"
// import "@fontsource/open-sans/500.css"
// import "@fontsource/open-sans/600.css"
// import "@fontsource/open-sans/700.css"
// import "@fontsource/open-sans/800.css"
// import "@fontsource/open-sans/400-italic.css"


import type { AppProps } from "next/app"
import { Fragment } from "react"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
        <Component {...pageProps} />
    </Fragment>
  )
}
