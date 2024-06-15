import React, { FC, ReactNode, useState } from "react"
import SearchInput from "@/components/molecules/SearchInput"

interface ExploreProps {
  children: ReactNode
}

const Explore: FC<ExploreProps> = ({ children }) => {
  const [activeButton, setActiveButton] = useState("All") // Initial active button

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName) // Update active button state
  }
  return (
    <div className="grid w-full h-full pr-5 ">
      <div className="w-full h-full grid shadow-inner shadow-gray-400/75 border rounded-t-[32px] px-5 lg:p-6">
        <section className="h-full w-full">
          <div className="flex justify-center">
            <SearchInput />
          </div>
          <div className="flex justify-center mt-4 space-x-4">
            <button
              className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
                activeButton === "All"
                  ? "active shadow-md shadow-gray-400 bg-gray-100"
                  : ""
              }`}
              onClick={() => handleButtonClick("All")}
            >
              All
            </button>
            <button
              className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
                activeButton === "People"
                  ? "active shadow-md shadow-gray-400 bg-gray-100"
                  : ""
              }`}
              onClick={() => handleButtonClick("People")}
            >
              People
            </button>
            <button
              className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
                activeButton === "Sitadels"
                  ? "active shadow-md shadow-gray-400 bg-gray-100"
                  : ""
              }`}
              onClick={() => handleButtonClick("Sitadels")}
            >
              Sitadels
            </button>
            <button
              className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
                activeButton === "Tourneys"
                  ? "active shadow-md shadow-gray-400 bg-gray-100"
                  : ""
              }`}
              onClick={() => handleButtonClick("Tourneys")}
            >
              Tourneys
            </button>
            <button
              className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
                activeButton === "Events"
                  ? "active shadow-md shadow-gray-400 bg-gray-100"
                  : ""
              }`}
              onClick={() => handleButtonClick("Events")}
            >
              Events
            </button>
            <button
              className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
                activeButton === "Products"
                  ? "active shadow-md shadow-gray-400 bg-gray-100"
                  : ""
              }`}
              onClick={() => handleButtonClick("Products")}
            >
              Products
            </button>
            <button
              className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
                activeButton === "Services"
                  ? "active shadow-md shadow-gray-400 bg-gray-100"
                  : ""
              }`}
              onClick={() => handleButtonClick("Services")}
            >
              Services
            </button>
          </div>
        </section>
        {/* <section className="mt-8"></section> */}
        <section className="">
          {/* <h1 className="font-bold">Bottom of the top</h1> */}
          <div className="grid grid-cols-2 gap-x-2 ">
            <article className="col-span-1">
              {/* <h2 className="">HERE IS WHAT’S VIRAL TODAY</h2> */}
              <h2 className="text-[#28303F] font-bold">
                HERE IS WHAT’S VIRAL TODAY
              </h2>
              <div className="flex flex-col p-4  rounded-md bg-slate-50 space-y-4 my-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-normal text-[#979797]">
                      Viral in Nigeria
                    </span>
                    <span className="text-sm font-bold text-black">
                      #ASUUstrike
                    </span>
                    <span className="text-sm font-normal text-[#979797]">
                      6.67k gists about it
                    </span>
                  </div>
                  <div>
                    <span className="material-symbols-outlined">
                      more_horiz
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-normal text-[#979797]">
                      Viral in Bingham University
                    </span>
                    <span className="text-sm font-bold text-black">
                      #New VC
                    </span>
                    <span className="text-sm font-normal text-[#979797]">
                      6.67k gists about it
                    </span>
                  </div>
                  <div>
                    <span className="material-symbols-outlined">
                      more_horiz
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-normal text-[#979797]">
                      Viral
                    </span>
                    <span className="text-sm font-bold text-black">
                      #Travis Scott
                    </span>
                    <span className="text-sm font-normal text-[#979797]">
                      6.67k gists about it
                    </span>
                  </div>
                  <div>
                    <span className="material-symbols-outlined">
                      more_horiz
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm font-normal text-[#979797]">
                      Viral in Abuja
                    </span>
                    <span className="text-sm font-bold text-black">
                      #Mr President
                    </span>
                    <span className="text-sm font-normal text-[#979797]">
                      6.67k gists about it
                    </span>
                  </div>
                  <div>
                    <span className="material-symbols-outlined">
                      more_horiz
                    </span>
                  </div>
                </div>

                <span className="text-sm text-secondary font-bold cursor-pointer">More...</span>
              </div>
            </article>
            <article className="col-span-1 border border-[red]">2</article>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Explore
