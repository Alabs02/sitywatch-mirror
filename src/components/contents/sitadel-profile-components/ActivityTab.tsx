import SearchInputPlain from "@/components/molecules/SearchInputPlain"
import React from "react"

// Define the type for the card data
interface CardProps {
  avatar: string
  username: string
  tag: string
  categories: string[]
  timeAgo: string
  imageSrc: string
  text: string
  supports: string
  thoughts: number
  showSearchInput?: boolean // Add this flag
}

// Card Component
const Card: React.FC<CardProps> = ({
  avatar,
  username,
  tag,
  categories,
  timeAgo,
  imageSrc,
  text,
  supports,
  thoughts,
  showSearchInput, // Use this flag
}) => {
  return (
    <div className="w-full h-full bg-neutral-300 mt-8 rounded-md border border-slate-200 shadow-sm">
      <div className="flex items-center p-2">
        <div className="flex h-16 w-16 mr-2">
          <img
            src={avatar}
            alt={username}
            className="object-cover rounded-full w-full h-full"
          />
        </div>
        <div className="flex flex-col my-2">
          <div className="flex space-x-2 items-center">
            <span className="text-secondary text-[12px] font-bold m-0 p-0">
              {username}
            </span>
            <span className="inline-flex h-2 w-2 p-1 rounded-full bg-yellow-500 m-0"></span>
            <span className="text-secondary text-[12px] font-bold m-0 p-0">
              {tag}
            </span>
          </div>
          <div className="flex space-x-2 items-center">
            {categories.map((category, index) => (
              <React.Fragment key={index}>
                <span className="text-[11px] font-normal m-0 p-0">
                  {category}
                </span>
                {index < categories.length - 1 && (
                  <span className="inline-flex h-[3px] w-[3px] p-0 rounded-full bg-black m-0"></span>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="m-0 p-0">
            <span className="text-[11px] text-gray-600 m-0 p-0 font-medium">
              {timeAgo}
            </span>
          </div>
        </div>
      </div>
      <div className="">
        <img src={imageSrc} alt="Hufl" className="object-cover w-full h-full" />
        <p className="text-[10px] md:text-sm px-2 my-2">
          {text} <span className="text-tertiary-300 font-bold">see more</span>
        </p>
        <div className="border-t border-b border-tertiary-200 flex items-center justify-between p-1">
          <div className="flex items-center space-x-2">
            <span className="h-3  md:h-4   w-3 md:w-4">
              <img
                src="/sw-img/star.svg"
                alt="start"
                className="object-cover"
              />
            </span>
            <span className="text-[10px] md:text-sm italic">{supports}</span>
          </div>
          <div className="inline-flex items-center space-x-4">
            <div className="flex items-center p-1">
              <span className="h-3  md:h-4   w-3 md:w-4">
                <img
                  src="/sw-img/thought.svg"
                  alt="thought"
                  className="object-cover"
                />
              </span>
              <p className="text-[8px] md:text-[10px] align-super ml-1">
                {thoughts}
              </p>
            </div>
          </div>
        </div>
        <span className="flex items-center justify-center py-1 space-x-2">
          <span className="h-4 w-4">
            <img
              src="/sw-img/thought.svg"
              alt="thought"
              className="object-cover"
            />
          </span>
          <p className="text-[12px] font-bold italic">View all thoughts</p>
        </span>
        {/* Conditionally render the search input */}
        {showSearchInput && (
          <div className="p-2">
            <SearchInputPlain />
          </div>
        )}
      </div>
    </div>
  )
}

const ActivityTab: React.FC = () => {
  const cardsData: CardProps[] = [
    {
      avatar: "/sw-img/sonny-world-avatar.svg",
      username: "@SWPA",
      tag: "#SWPA_SC2023",
      categories: ["Media", "Photography"],
      timeAgo: "29 mins ago",
      imageSrc: "/video-pic.svg",
      text: "Watch the briefing of the student competition category to know all about the eligible criteris...",
      supports: "you and 2.4k sitizens support this column",
      thoughts: 647,
      showSearchInput: true, // Search input will be shown
    },
    {
      avatar: "/sw-img/sonny-world-avatar.svg",
      username: "@Nasir",
      tag: "#NASIR_Event2023",
      categories: ["Tech", "Innovation"],
      timeAgo: "1 hour ago",
      imageSrc: "/video-pic.svg",
      text: "Get the latest on groundbreaking technology developments happening around the globe.",
      supports: "you and 5k sitizens support this column",
      thoughts: 800,
      showSearchInput: false, // No search input for this card
    },
    {
      avatar: "/sw-img/sonny-world-avatar.svg",
      username: "@FutureMaker",
      tag: "#FM_Summit",
      categories: ["Education", "Leadership"],
      timeAgo: "3 hours ago",
      imageSrc: "/video-pic.svg",
      text: "Join the conversation on education and leadership at the FutureMaker Summit.",
      supports: "you and 1.2k sitizens support this column",
      thoughts: 340,
      showSearchInput: true, // Search input will be shown
    },
    {
      avatar: "/sw-img/sonny-world-avatar.svg",
      username: "@ArtExpo",
      tag: "#ArtExpo2023",
      categories: ["Art", "Exhibition"],
      timeAgo: "5 hours ago",
      imageSrc: "/video-pic.svg",
      text: "Discover the world of art in the most anticipated art expo of the year.",
      supports: "you and 700 sitizens support this column",
      thoughts: 150,
      showSearchInput: false, // No search input for this card
    },
  ]

  return (
    <div className="">
      <div className="h-full mb-8 overflow-y-auto">
        {cardsData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  )
}

export default ActivityTab
