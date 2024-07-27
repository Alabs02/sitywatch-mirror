import React from "react"
import Image from "next/image"
import clsx from "clsx"

interface EventCardProps {
  imageSrc: string
  description: string
  isActive: boolean
}

const EventCard: React.FC<EventCardProps> = ({
  imageSrc,
  description,
  isActive,
}) => {
  return (
    <div
      className={clsx(
        "relative flex flex-col items-center p-1 rounded-lg transition-shadow duration-[5s] ease-in-out h-full",
        isActive ? " glow" : "border-none",
      )}
    >
      <div className="relative w-full h-32 mb-1">
        <Image
          src={imageSrc}
          alt={description}
          layout="fill"
          objectFit="contain"
          className="rounded-md"
        />
      </div>
      <p className="text-center">{description}</p>
      <style jsx>{`
        @keyframes glow {
          0% {
            box-shadow: 0 0 20px 10px red;
          }
          14% {
            box-shadow: 0 0 10px 5px pink;
          }
          28% {
            box-shadow: 0 0 10px 5px yellow;
          }
          42% {
            box-shadow: 0 0 10px 5px purple;
          }
          57% {
            box-shadow: 0 0 10px 5px blue;
          }
          71% {
            box-shadow: 0 0 10px 5px brown;
          }
          85% {
            box-shadow: 0 0 10px 5px green;
          }
          100% {
            box-shadow: 0 0 10px 5px violet;
          }
        }
        .glow {
          animation: glow 5s infinite alternate;
        }
      `}</style>
    </div>
  )
}

const AffairsTab: React.FC = () => {
  const eventCards = [
    {
      imageSrc: "/sony.svg",
      description: "Event 1 Description",
      isActive: true,
    },
    {
      imageSrc: "/swa-card-1.svg",
      description: "Event 2 Description",
      isActive: false,
    },
    {
      imageSrc: "/swa-card-2.svg",
      description: "Event 3 Description",
      isActive: false,
    },
    {
      imageSrc: "/swa-card-3.svg",
      description: "Event 4 Description",
      isActive: false,
    },
    {
      imageSrc: "/swa-card-4.svg",
      description: "Event 5 Description",
      isActive: false,
    },
    {
      imageSrc: "/swa-card-5.svg",
      description: "Event 6 Description",
      isActive: false,
    },
  ]

  return (
    <div className="grid grid-cols-2 md:gap-4 gap-2 md:p-4 p-2">
      {eventCards.map((card, index) => (
        <EventCard
          key={index}
          imageSrc={card.imageSrc}
          description={card.description}
          isActive={card.isActive}
        />
      ))}
    </div>
  )
}

export default AffairsTab
