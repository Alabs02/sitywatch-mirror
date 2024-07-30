import React from 'react'

interface Sitizen {
  id: number
  name: string
  occupation: string
  location: string
  image: string
}

const sitizens: Sitizen[] = [
  {
    id: 1,
    name: "Anna Fadugba",
    occupation: "Student",
    location: "Porthacourt",
    image: "/coreAssets/Explore/anna.jpg",
  },
  {
    id: 2,
    name: "John Doe",
    occupation: "Engineer",
    location: "Lagos",
    image: "/coreAssets/Explore/justin.jpg",
  },
  {
    id: 3,
    name: "Jane Smith",
    occupation: "Artist",
    location: "Abuja",
    image: "/coreAssets/Explore/spicyq.webp",
  },
  {
    id: 4,
    name: "Mike Johnson",
    occupation: "Doctor",
    location: "Ibadan",
    image: "/coreAssets/Explore/anna.jpg",
  },
  {
    id: 5,
    name: "Emily Davis",
    occupation: "Lawyer",
    location: "Enugu",
    image: "/coreAssets/Explore/micahrichards.jfif",
  },
]

const SitezensToWatch = () => {
  return (
    <div>
      <div className="flex flex-col w-full h-full p-2 md:p-4 mb-8">
        <section className="flex space-x-2">
          <div className="flex h-10 md:h-14 w-10 md:w-14">
            <img
              src="/coreAssets/Explore/micahrichards.jfif"
              alt="explore avatar"
              className="w-full h-full object-cover rounded-full flex"
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col md:text-sm text-xs">
              <span>up</span>
              <span>down</span>
            </div>
            <div>
              <span className="material-symbols-outlined">more_vert</span>
            </div>
          </div>
        </section>
        <section className="shadow-inner shadow-gray-400/75 py-2 px-2 rounded-t-[10px] mt-2 md:mt-4">
          <h1 className="p-1 text-sm font-semibold text-tertiary-300">
            Sitizens you may like to watch
          </h1>
          <div className="flex overflow-x-auto space-x-4 no-scrollbar">
            {sitizens.map((sitizen) => (
              <article className="max-w-max px-2" key={sitizen.id}>
                <div className="flex flex-col items-center">
                  <div className="h-[10rem] w-[10rem] z-10">
                    <img
                      src={sitizen.image}
                      alt={sitizen.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="flex flex-col top-[-14] bg-neutral-200 border py-2 rounded-md items-center px-8">
                    <div className="flex flex-col space-y-1 text-center">
                      <span className="text-xs font-medium">
                        {sitizen.name}
                      </span>
                      <span className="text-xs">{sitizen.name}</span>
                    </div>
                    <div className="flex flex-col text-center">
                      <span className="text-[10px] md:text-[12px] font-semibold m-0 p-0">
                        {sitizen.occupation}
                      </span>
                      <div className="flex flex-col items-center">
                        <span className="inline-flex h-[3px] w-[3px] p-0 rounded-full bg-black m-0"></span>
                        <span className="text-[10px] md:text-[12px] font-semibold m-0 p-0">
                          {sitizen.location}
                        </span>
                      </div>
                    </div>
                    <div className="mt-1">
                      <button className="py-2 px-4  rounded-full bg-gradient-to-b from-primary-500 to-secondary-500 font-medium flex items-center space-x-2">
                        <span className="material-symbols-outlined text-xs text-white">
                          visibility
                        </span>
                        <span className="lg:inline text-xs text-white">
                          Watch
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default SitezensToWatch