import Image from "next/image"
import React from "react"

const HomeAppLogo = ({ width = 25, height = 20 }) => {
  return (
    <div>
      <Image
        src="/sidepane-icons/home_app_logo.svg"
        alt="Bookmark"
        width={width}
        height={height}
      />
    </div>
  )
}

export default HomeAppLogo
