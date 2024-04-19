import React, { Fragment, FC } from "react"
import clsx from "clsx"

// TYPES
import { TFooterprops } from "@/types"

const Footer: FC<TFooterprops> = ({ children, className }) => {
  return (
    <Fragment>
      <footer className={clsx("", className)}>{children}</footer>
    </Fragment>
  )
}

export default Footer;