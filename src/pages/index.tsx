import React, { FC, ReactNode, useEffect, useState } from "react"
import tourneysData from "../../data.json"
import { useRouter } from "next/router"

const Home: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()
  const [currentTourneyIndex, setCurrentTourneyIndex] = useState(0)

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

  return (
    <div className="grid w-full h-full shadow-inner shadow-gray-400/75 border rounded-t-[16px] p-2 overflow-y-auto">
      <div className="w-full h-full grid">
        <section className="w-full grid grid-cols-12 gap-2">
          <div className="h-[12rem] grid col-span-12 lg:col-span-8 border bg-orange-400 p-4 rounded-lg relative overflow-hidden">
            <div className="w-full h-full absolute top-0 left-0 transition-opacity">
              {tourneysData.leftSection.tourneys.map((tourney, index) => (
                <div
                  key={tourney.id}
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity ${
                    index === currentTourneyIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={tourney.image}
                    alt={tourney.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 p-2 text-white">
                    <h2 className="text-sm font-semibold">{tourney.title}</h2>
                    <p className="text-xs tracking-tight w-0 md:w-[60%]">
                      {tourney.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="inline-flex flex-col h-[12rem] col-span-12 lg:col-span-4 border border-tertiary-400 rounded-lg gap-y-2 m-1 p-2">
            <div className="flex items-center">
              <span className="material-symbols-outlined text-xl mr-1 bg-gradient-to-b from-[#F24055] to-[#1E7881] bg-clip-text text-transparent cursor-pointer">
                add_circle
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-y-1 overflow-hidden w-full">
              <div className="rounded-full shadow-md overflow-hidden w-[40px] h-[40px]">
                <img
                  src={tourneysData.rightSection.cards[0].image}
                  alt={tourneysData.rightSection.cards[0].title}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col place-content-center text-center">
                <h3 className="text-xs font-bold">
                  {tourneysData.rightSection.cards[0].title}
                </h3>
                <p className="text-xs">
                  {tourneysData.rightSection.cards[0].description}
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Bottom Cards */}
        <section className="mt-4">
          <h1 className="font-bold my-2 text-base">
            Suggested Tourneys That Might Interest You
          </h1>
          <div className="grid grid-cols-12 w-full gap-2">
            {tourneysData.rightSection.bottomCards.map((bottomCard) => (
              <div
                key={bottomCard.id}
                className="grid col-span-12 sm:col-span-6 md:col-span-4 shadow-sm cursor-pointer"
                onClick={() => handleBottomCardClick(bottomCard.id)}
              >
                <div className="relative">
                  <div className="shadow-lg border border-b border-tertiary-100">
                    <img
                      src={bottomCard.image}
                      alt={bottomCard.title}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="">
                    <span className="material-symbols-outlined text-base absolute top-2 right-2 text-black bg-white p-1 rounded-full h-6 w-6 flex justify-center items-center">
                      {bottomCard.icon}
                    </span>
                  </div>
                </div>
                <div className="text-center space-y-1 py-1">
                  <h2 className="font-bold mb-1 text-sm">
                    {bottomCard.header}
                  </h2>
                  <p className="text-xs text-blue-800 font-bold">
                    {bottomCard.hashtag}
                  </p>
                  <p className="text-xs text-gray-900 font-medium">
                    {bottomCard.description}
                  </p>
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
