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
    <div className="flex flex-col justify-around px-4">
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
            <div className="flex space-x-2">
              <div className="text-sm font-bold">{message.full_name}</div>
              <span className="text-green-600 text-sm">{message.handle}</span>
            </div>
            <div className="flex space-x-2 text-sm">
              <div className="italic font-semibold">{message.first_name}</div>
              <span className="text-sm font-normal">{message.message}</span>
            </div>
          </div>
          <div className="ml-auto flex flex-col text-sm items-center px-4">
            <div className="text-sm font-medium">{message.iconText}</div>
            <span className="material-symbols-outlined bg-[red] my-2 h-3 w-3 rounded-full"></span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Whispers
