import React from "react"
import Image from "next/image"
import Link from "next/link"

interface EventCardProps {
  imageSrc?: string
  link: string
  description?: string
  subscript?: string
}

const EventCard: React.FC<EventCardProps> = ({
  imageSrc,
  link,
  description,
  subscript,
}) => {
  return (
    <Link href={link} className="block w-full h-full">
      <div className="relative w-full h-36 flex flex-col items-center justify-center rounded-md shadow-md">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="Event"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        ) : (
          <>
            <span className="material-symbols-outlined text-neutral-700 text-6xl mb-2">
              add_circle
            </span>
            <p className="text-white text-center text-sm">Add a new affair</p>
          </>
        )}
      </div>
      {description && (
        <p className="text-blue-700 mt-2 text-sm font-semibold md:ml-2">
          <span className="align-text-top text-[6px] md:text-[8px]">
            {subscript}
          </span>
          <span className="align-baseline text-[10px] md:text-base">
            #{description}
          </span>
        </p>
      )}
    </Link>
  )
}

export default EventCard
