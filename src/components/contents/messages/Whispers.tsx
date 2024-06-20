import React from "react"
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
    <div className="grid gap-y-4 p-4 w-full h-full">
      {whispersData.map((message) => (
        <div
          className="flex items-center justify-between "
          key={message.id}
        >
          <div className="flex items-center">
            <div className="mr-2">
              <img
                src={message.avatarSrc}
                alt=""
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex space-x-2">
                <div className="text-sm font-bold">{message.full_name}</div>
                <span className="text-secondary text-sm cursor-pointer font-bold">{message.handle}</span>
              </div>
              <div className="flex space-x-2 text-sm">
                <div className="italic font-semibold">{message.first_name}</div>
                <span className="text-sm font-normal">{message.message}</span>
              </div>
            </div>
          </div>
          <div className="text-sm flex items-center flex-col">
            <div className="text-sm font-medium">{message.iconText}</div>
            <span className="material-symbols-outlined bg-[red] h-3 w-3 rounded-full text-center"></span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Whispers
