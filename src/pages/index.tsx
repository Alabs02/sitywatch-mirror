import { FC, ReactNode, useEffect, useState } from "react";
import tourneysData from "../../data.json";

const Home: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTourneyIndex, setCurrentTourneyIndex] = useState(0);

  useEffect(() => {
    const tourneyInterval = setInterval(() => {
      setCurrentTourneyIndex((prevIndex) =>
        prevIndex === tourneysData.leftSection.tourneys.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); 

    return () => {
      clearInterval(tourneyInterval);
    };
  }, []);

  return (
    <div className="grid w-full h-full pr-5">
      <div className="w-full h-full grid shadow-inner shadow-gray-400/75 border rounded-t-[32px] px-5 lg:p-6">
        <section className="h-full w-full grid grid-cols-12">
          <div className="grid col-span-8 border border-bg-[red] bg-orange-400 p-16 rounded-lg relative overflow-hidden">
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
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h2 className="text-lg font-semibold">{tourney.title}</h2>
                    <p className="text-sm tracking-tight w-0 md:w-[60%]">
                      {tourney.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-4 border border-tertiary-400 bg-neutral-200 p-6 rounded-lg gap-y-4">
            <div className="flex items-center">
              <span className="material-symbols-outlined text-3xl mr-2 bg-gradient-to-b from-[#F24055] to-[#1E7881] bg-clip-text text-transparent cursor-pointer">
                add_circle
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-y-2">
              <div className=" rounded-full shadow-md overflow-hidden w-[70px] h-[70px] p-4">
                <img
                  src={tourneysData.rightSection.cards[0].image}
                  alt={tourneysData.rightSection.cards[0].title}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div className="flex flex-col place-content-center text-center">
                <h3 className="text-sm font-bold">
                  {tourneysData.rightSection.cards[0].title}
                </h3>
                {tourneysData.rightSection.cards[0].description}
                <p className="text-sm"></p>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-8">
          <h1 className="font-bold my-4">
            Suggested Tourneys That Might Interest You
          </h1>
          <div className="grid grid-cols-12 w-full gap-4 bg-white">
            {tourneysData.rightSection.bottomCards.map((bottomCard) => (
              <div key={bottomCard.id} className="grid col-span-4 shadow-sm">
                <div className="relative">
                  <div className="shadow-lg border border-b border-tertiary-100">
                    <img
                      src={bottomCard.image}
                      alt={bottomCard.title}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div className="">
                    <span className="material-symbols-outlined text-lg absolute top-2 right-2 text-black bg-white p-2 rounded-full h-10 w-10 flex justify-center items-center">
                      {bottomCard.icon}
                    </span>
                  </div>
                </div>
                <div className="text-center space-y-2 py-2">
                  <h2 className="font-bold mb-2">{bottomCard.header}</h2>
                  <p className="text-sm text-blue-800 font-bold">
                    {bottomCard.hashtag}
                  </p>
                  <p className="text-sm text-gray-900 font-medium">
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
};

export default Home;
