import React from "react"
import Image from "next/image"

interface PollCardProps {
  pollOwnerAlias: string
  pollCountdown: string
  pollDescription: string | null
  questionText: string
  onMoreClick: () => void
}

const PollCard: React.FC<PollCardProps> = ({
  pollOwnerAlias,
  pollCountdown,
  pollDescription,
  questionText,
  onMoreClick,
}) => {
  return (
    <div className="border rounded-lg p-4 bg-neutral-400 shadow-md mb-4 text-sm md:text-base relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Image
            src="/pandar-img.png"
            alt={pollOwnerAlias}
            width={70}
            height={70}
            className="rounded-full mr-4"
          />
          <div>
            <p className="font-bold text-sm md:text-base">{pollOwnerAlias}</p>
            <p className="text-gray-800 text-xs md:text-sm">{pollCountdown}</p>
          </div>
        </div>
        <span
          className="material-symbols-outlined cursor-pointer"
          onClick={onMoreClick}
        >
          more_horiz
        </span>
      </div>

      {pollDescription && (
        <p className="mb-2 text-sm md:text-base text-gray-700">
          {pollDescription}
        </p>
      )}
      <p className="mb-4 text-sm md:text-lg font-semibold">{questionText}</p>
    </div>
  )
}

export default PollCard
