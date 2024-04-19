import React, { Fragment, FC } from "react"
import clsx from "clsx"

// TYPES
import { THeaderprops } from "@/types"


const Header: FC<THeaderprops> = ({ children, className }) => {
  return (
    <Fragment>
      <header className={clsx("", className)}>{children}</header>
    </Fragment>
  )
}

export default Header;
