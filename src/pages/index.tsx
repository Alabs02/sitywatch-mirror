import React, { FC, ReactNode, useEffect, useState } from "react"
import Image from "next/image"
import tourneysData from "../../data.json"
import { useRouter } from "next/router"
import SkeletonLoader from "@/components/molecules/SkeletonLoader"

interface Tourney {
  id: number
  title: string
  image: string
  description: string
}

interface BottomCard {
  id: number
  title: string
  image: string
  description: string
  icon: string // Assuming 'icon' is a property of your bottom cards
}

const Home: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()
  const [currentTourneyIndex, setCurrentTourneyIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  const handleBottomCardClick = (cardId: number) => {
    router.push(`/tourneys?cardId=${cardId}`)
  }

  useEffect(() => {
    const tourneyInterval = setInterval(() => {
      setCurrentTourneyIndex((prevIndex) =>
        prevIndex === tourneysData.leftSection.tourneys.length - 1
          ? 0
          : prevIndex + 1,
      )
    }, 5000)

    return () => {
      clearInterval(tourneyInterval)
    }
  }, [])

  const handleImageLoad = () => {
    setLoading(false)
  }

  return (
    <div className="grid w-full h-full shadow-inner shadow-gray-400/75 border rounded-t-[16px] p-2 md:p-4 overflow-y-auto">
      <div className="w-full h-full grid">
        <section className="w-full grid grid-cols-12 gap-2">
          <div className="h-[90%] md:h-[100%] grid col-span-8 md:col-span-9 p-2 md:p-4 rounded-lg relative overflow-hidden">
            <div className="w-full h-full absolute top-0 left-0 transition-opacity">
              {tourneysData.leftSection.tourneys.map((tourney, index) => (
                <div
                  key={tourney.id}
                  className={`absolute top-0 left-0 h-full w-full transition-opacity ${
                    index === currentTourneyIndex ? "opacity-90" : "opacity-0"
                  }`}
                >
                  {loading && (
                    <div className="absolute inset-0">
                      <SkeletonLoader />
                    </div>
                  )}
                  <Image
                    src={tourney.image}
                    alt={tourney.title}
                    layout="fill"
                    objectFit="cover" // Ensures the image covers the container
                    onLoadingComplete={handleImageLoad}
                    placeholder="blur"
                    blurDataURL="/path/to/placeholder.png"
                    className="rounded-lg" // Add any additional styling needed
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-2 text-white">
                    <h2 className="text-sm font-semibold">{tourney.title}</h2>
                    <p className="text-[10px] md:text-sm tracking-tight w-full md:w-[60%]">
                      {tourney.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="inline-flex flex-col h-[90%] md:h-full col-span-4 md:col-span-3 border border-tertiary-400 rounded-lg gap-y-1 p-1">
            <div className="flex items-center">
              <span className="material-symbols-outlined text-xl  bg-gradient-to-b from-[#F24055] to-[#1E7881] bg-clip-text text-transparent cursor-pointer">
                add_circle
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-y-1 overflow-hidden w-full">
              <div className="rounded-full shadow-lg overflow-hidden w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] relative bg-white p-2">
                {loading && (
                  <SkeletonLoader className="absolute inset-0 rounded-full" />
                )}
                <Image
                  src={tourneysData.rightSection.cards[0].image}
                  alt={tourneysData.rightSection.cards[0].title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                  onLoadingComplete={handleImageLoad}
                  placeholder="blur"
                  blurDataURL="/path/to/placeholder.png"
                />
              </div>

              <div className="flex flex-col text-center">
                <h3 className="text-xs font-bold">
                  {tourneysData.rightSection.cards[0].title}
                </h3>
                <p className="text-[10px] hidden md:flex">
                  {tourneysData.rightSection.cards[0].description}
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Bottom Cards */}
        <section className="mb-4">
          <h1 className="font-bold text-sm mt-2 md:mt-4 mb-2">
            Suggested Tourneys That Might Interest You
          </h1>
          <div className="grid grid-cols-12 w-full gap-x-2 md:gap-x-8 gap-y-4">
            {tourneysData.rightSection.bottomCards.map((bottomCard) => (
              <div
                key={bottomCard.id}
                className="grid col-span-6 sm:col-span-6 md:col-span-4 shadow-sm cursor-pointer bg-white rounded-md card-container"
                onClick={() => handleBottomCardClick(bottomCard.id)}
              >
                <div className="relative">
                  <div className="shadow-lg border border-b border-tertiary-100 image-wrapper">
                    {loading && <SkeletonLoader className="absolute inset-0" />}
                    <Image
                      src={bottomCard.image}
                      alt={bottomCard.title}
                      layout="fill"
                      objectFit="cover"
                      onLoadingComplete={handleImageLoad}
                      placeholder="blur"
                      blurDataURL="/path/to/placeholder.png"
                    />
                  </div>
                  <div className="text-content">
                    <div>
                      <span className="material-symbols-outlined text-base absolute top-2 right-2 text-black bg-white p-1 rounded-full h-6 w-6 flex justify-center items-center">
                        {bottomCard.icon}
                      </span>
                    </div>
                    <div className="text-center space-y-1 py-1 px-1 md:px-3">
                      <h2 className="font-bold mb-1 text-sm">
                        {bottomCard.header}
                      </h2>
                      {/* Adjust this part according to your data structure */}
                      {/* Example if 'hashtag' is not present */}
                      {/* <p className="text-xs text-gray-900 font-medium">
                        {bottomCard.description}
                      </p> */}
                      <p className="text-xs text-blue-800 font-bold">
                        {bottomCard.hashtag}
                      </p>
                      <p className="text-xs text-gray-900 font-medium">
                        {bottomCard.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
