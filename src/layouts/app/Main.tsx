import React, { Fragment, FC } from "react"
import clsx from "clsx"

interface MainProps {
  children: React.ReactNode
  className?: string
}

const Main: FC<MainProps> = ({ children, className }) => {
  return (
    <Fragment>
      <main className={clsx("flex-1 p-4 overflow-auto", className)}>
        {children}
      </main>
    </Fragment>
  )
}

export default Main
