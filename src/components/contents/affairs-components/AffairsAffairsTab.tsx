import React from "react"
import Image from "next/image"
import Link from "next/link"
import clsx from "clsx"

interface EventCardProps {
  imageSrc?: string
  isLink?: boolean
  description?: string
  subscript?: string
}

const EventCard: React.FC<EventCardProps> = ({
  imageSrc,
  isLink = false,
  description,
  subscript,
}) => {
  return (
    <Link
      href={isLink ? "/add-affairs" : "#"}
      className="block w-full h-full"
    >
      <div
        className={clsx(
          "relative w-full h-36 flex flex-col items-center justify-center rounded-md shadow-md",
          isLink ? "bg-neutral-600" : "",
        )}
      >
        {isLink ? (
          <>
            <span className="material-symbols-outlined text-neutral-700 text-6xl mb-2">
              add_circle
            </span>
            <p className="text-white text-center text-sm">Add a new affair</p>
          </>
        ) : (
          <Image
            src={imageSrc!}
            alt="Event"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        )}
      </div>
      {!isLink && (
        <p className="text-blue-700  mt-2 text-sm font-semibold md:ml-2">
          <span className="align-text-top text-[6px] md:text-[8px]">{subscript}</span>
          <span className="align-baseline text-[10px] md:text-base">#{description}</span>
        </p>
      )}
    </Link>
  )
}

const AffairsAffairsTab: React.FC = () => {
  const eventCards = [
    {
      isLink: true,
    },
    {
      imageSrc: "/swa-card-1.svg",
      subscript: "PRD",
      description: "Event_2_Description",
    },
    {
      imageSrc: "/swa-card-2.svg",
      subscript: "SRV",
      description: "Event_3_Description",
    },
    {
      imageSrc: "/swa-card-3.svg",
      subscript: "TNY",
      description: "Event_4_Description",
    },
    {
      imageSrc: "/swa-card-4.svg",
      subscript: "PRD",
      description: "Event_5_Description",
    },
    {
      imageSrc: "/swa-card-5.svg",
      subscript: "SRV",
      description: "Event_6_Description",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:gap-4 gap-2 md:p-4 p-2 rounded-md shadow-md">
      {eventCards.map((card, index) => (
        <EventCard
          key={index}
          imageSrc={card.imageSrc}
          isLink={card.isLink}
          subscript={card.subscript}
          description={card.description}
        />
      ))}
    </div>
  )
}

export default AffairsAffairsTab
