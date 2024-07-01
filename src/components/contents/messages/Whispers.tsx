import React from "react"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import messages from "@/../../data.json"

interface Message {
  id: number
  avatarSrc: string
  full_name: string
  handle: string
  first_name: string
  message: string
  iconText: string
  icon: string
}

const Whispers = () => {
  const whispersData = messages.whispers as Message[]

  if (!whispersData || whispersData.length === 0) {
    return (
      <div className="p-4 w-full h-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} height={80} className="mb-4" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-y-4 p-1 md:p-2 w-full h-full">
      {whispersData.map((message) => (
        <div
          className="flex items-center justify-between p-2 bg-neutral-300 rounded-lg shadow-sm"
          key={message.id}
        >
          <div className="flex items-center">
            <div className="mr-2">
              <img
                src={message.avatarSrc}
                alt={message.full_name}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex space-x-1 md:space-x-2">
                <div className="text-[10px] md:text-sm font-bold">
                  {message.full_name}
                </div>
                <span className="text-[10px]  md:text-sm text-secondary cursor-pointer font-bold">
                  {message.handle}
                </span>
              </div>
              <div className="flex space-x-1 md:space-x-2 text-[10px]  md:text-sm">
                <div className="italic font-semibold">{message.first_name}</div>
                <span className="text-[10px]  md:text-sm font-normal">
                  {message.message}
                </span>
              </div>
            </div>
          </div>
          <div className="text-[10px] md:text-sm flex items-center flex-col">
            <div className="text-xs md:text-sm font-medium">
              {message.iconText}
            </div>
            <span className="material-symbols-outlined bg-red-500 h-2 w-2 md:h-4 md:w-4 rounded-full text-center"></span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Whispers
