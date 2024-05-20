import React from "react"
import messages from "@/../../data.json"
import AvatarWithTextsAndIcon from "@/components/molecules/AvatarWithTexts"

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
  // "id": 1,
  //     "avatarSrc": "/coreAssets/MessagesPage/juliana.jpeg",
  //     "full_name": "Julia James",
  //     "handle": "@juliajames",
  //     "first_name": "Julia",
  //     "message": "something texted here",
  //     "iconText": "See More",
  //     "icon": "add_circle"

const Whispers = () => {
  const whispersData = messages.whispers as Message[]

  return (
    <div className="flex flex-col justify-between">
      {whispersData.map((message) => (
        <div className="flex items-center space-y-4" key={message.id}>
          <div className="mr-4">
            <img
              src={message.avatarSrc}
              alt=""
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex space-x-2 font-semibold">
              <div>{message.full_name}</div>
              <span className="text-green-500">{message.handle}</span>
            </div>
            <div className="flex space-x-2 text-sm">
              <div className="italic">{message.first_name}</div>
              <span>{message.message}</span>
            </div>
          </div>
          <div className="ml-auto flex flex-col items-end text-sm">
            <div>{message.iconText}</div>
            <span className="material-symbols-outlined text-[red]">{message.icon}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Whispers
