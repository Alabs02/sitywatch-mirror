import Image from 'next/image'
import React from 'react'

const Bookmarks = ({width=10, height=10}) => {
  return (
    <div>
      <Image
        src="/sidepane-icons/bookmarks.svg"
        alt="Bookmark"
        width={width}
        height={height}
      />
    </div>
  )
}

export default Bookmarks