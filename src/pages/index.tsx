import { FC, ReactNode, useEffect, useState } from "react"
import tourneysData from "../../data.json"

const Home: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTourneyIndex, setCurrentTourneyIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTourneyIndex((prevIndex) =>
        prevIndex === tourneysData.tourneys.length - 1 ? 0 : prevIndex + 1,
      )
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid w-full h-full pr-5">
      <div className="w-full h-full grid shadow-inner shadow-gray-400/75 border rounded-t-[32px] px-5 lg:p-6">
        <section className="h-full w-full grid grid-cols-12">
          <div className="grid col-span-8 border border-bg-[red] bg-orange-400 p-16 rounded-lg relative overflow-hidden">
            <div className="w-full h-full absolute top-0 left-0 transition-opacity">
              {tourneysData.tourneys.map((tourney, index) => (
                <div
                  key={tourney.id}
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity ${
                    index === currentTourneyIndex ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ aspectRatio: "16/9" }} 
                >
                  <img
                    src={tourney.image}
                    alt={tourney.title}
                    className="w-full h-full object-cover"
                    style={{ objectFit: "cover" }} // Ensure image covers the container
                  />
                  <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white">
                    <h2 className="text-lg font-semibold">{tourney.title}</h2>
                    <p className="text-sm">{tourney.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-4 border border-bg-[red] bg-orange-700 p-16 rounded-lg">
            right
          </div>
        </section>
        <section className="mt-8">
          <h1 className="font-bold">
            Suggested Tourneys That Might Interest You
          </h1>
          <div className="grid grid-cols-12 w-full gap-x-2 ">
            {tourneysData.tourneys.map((tourney) => (
              <div
                key={tourney.id}
                className="grid col-span-4 border border-[red] p-24"
              >
                <img
                  src={tourney.image}
                  alt={tourney.title}
                  className="object-cover w-full h-40 mb-4"
                />
                <h2 className="font-bold mb-2">{tourney.title}</h2>
                <p className="text-sm text-gray-700">{tourney.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
