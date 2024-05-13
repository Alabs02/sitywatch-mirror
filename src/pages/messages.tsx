import React from "react"

const message = () => {
  return (
    <div className="grid grid-cols-2 h-full w-full bg-gray-100 shadow-inner shadow-gray-400/75 rounded-t-[10px]">
      <div className="bg-tertiary-100 col-span-1">Left</div>
      <div className="bg-neutral-300 col-span-1">Right</div>
    </div>
  )
}

export default message
