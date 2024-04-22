import React, { Fragment, FC } from "react"
import clsx from "clsx"

// TYPES
import { THeaderprops } from "@/types"


const Header: FC<THeaderprops> = ({ children, className }) => {
  return (
    <Fragment >
      <header className={clsx("h-[137px]", className)}>{children}</header>
    </Fragment>
  )
}

export default Header;
