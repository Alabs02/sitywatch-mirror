import React from "react"
import Image from "next/image"

const HomeIcon = ({ width = 20, height = 20 }) => {
  return (
    <Image
      src="/header-images/sclogo.svg"
      alt="Home Icon"
      width={width}
      height={height}
      priority
    />
  )
}

export default HomeIcon
