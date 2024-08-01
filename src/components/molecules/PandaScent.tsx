import Image from "next/image"
import React from "react"

const scentsData = [
  {
    src: "/coreAssets/PandarUs/SoulPandar/prett.jpeg",
    alt: "soul image",
    username: "@blizwizliz",
    left: "left",
    description: "a scent",
    time: "14 mins ago",
    isUnread: true,
  },
  {
    src: "/coreAssets/PandarUs/PandarScents/prett4.jpeg",
    alt: "soul image",
    username: "@bgiamthril",
    left: "left",
    description: "a scent",
    time: "4 days ago",
    isUnread: false,
  },
  {
    src: "/coreAssets/PandarUs/PandarScents/prett3.jpeg",
    alt: "soul image",
    username: "@casualmissy",
    left: "left",
    description: "a scent",
    time: "5 days ago",
    isUnread: true,
  },
  {
    src: "/coreAssets/PandarUs/PandarScents/prett5.jpeg",
    alt: "soul image",
    username: "@freebarbie",
    left: "left",
    description: "a scent",
    time: "14 mins ago",
    isUnread: false,
  },
  {
    src: "/coreAssets/PandarUs/PandarScents/prett6.jpeg",
    alt: "soul image",
    username: "@bsoftlifebestie",
    left: "left a scent for",
    description: "",
    time: "14 mins ago",
    you: true,
    isUnread: true,
  },
  {
    src: "/coreAssets/PandarUs/SoulPandar/prett.jpeg",
    alt: "soul image",
    username: "@fashionqueen",
    left: "left",
    description: "a scent",
    time: "2 days ago",
    isUnread: false,
  },
  {
    src: "/coreAssets/PandarUs/PandarScents/prett5.jpeg",
    alt: "soul image",
    username: "@theperksoftpearly",
    left: "left a scent for",
    description: "",
    time: "14 mins ago",
    you: true,
    isUnread: true,
  },
]

const PandaScent = () => {
  return (
    <div className="mt-4 flex flex-col gap-y-3 mb-32 md:mb-36">
      {scentsData.map((scent, index) => (
        <article key={index} className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 md:h-14 md:w-14 rounded-full overflow-hidden">
              <Image
                src={scent.src}
                alt={scent.alt}
                width={50}
                height={50}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="text-xs md:text-sm flex flex-col">
              <div className="flex flex-wrap space-x-1">
                {scent.you ? (
                  <>
                    <span>you</span>
                    <span className="font-semibold">{scent.left}</span>
                    <span className="text-secondary">{scent.username}</span>
                  </>
                ) : (
                  <>
                    <span className="text-secondary font-bold">
                      {scent.username}
                    </span>
                    <span className="font-semibold">{scent.left}</span>
                    <span>{scent.description}</span>
                  </>
                )}
              </div>
              <div className="text-xs md:text-sm italic text-tertiary-300">
                {scent.time}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {scent.isUnread && (
              <span className="inline-flex h-1 md:h-3 w-1 md:w-3 p-1 rounded-full bg-[red] m-0"></span>
            )}
            <span className="material-symbols-outlined">more_vert</span>
          </div>
        </article>
      ))}
    </div>
  )
}

export default PandaScent
