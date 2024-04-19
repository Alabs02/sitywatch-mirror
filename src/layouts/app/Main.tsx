import React, { Fragment, FC } from "react"
import clsx from "clsx";

// TYPES
import { TMainprops } from "@/types"

const Main: FC<TMainprops> = ({ children, className }) => {
  return (
    <Fragment>
      <main className={clsx("", className)}>{children}</main>
    </Fragment>
  )
}

export default Main;
