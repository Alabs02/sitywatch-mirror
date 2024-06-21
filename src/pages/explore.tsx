import React, { FC, ReactNode, useState } from "react"
import SearchInput from "@/components/molecules/SearchInput"
import Image from "next/image"

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
      <div className="w-full h-full grid shadow-inner shadow-gray-400/75 border rounded-t-[32px] px-5 lg:p-6 overflow-y-auto">
        <section className="h-full w-full mb-1 sm:mb-8">
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
              <h2 className="text-[#28303F] font-bold text-center">
                HERE IS WHAT’S VIRAL TODAY
              </h2>
              <div className="flex flex-col p-4  rounded-md bg-slate-50 space-y-4 my-2 shadow-md">
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

                <span className="text-sm text-secondary font-bold cursor-pointer">
                  More...
                </span>
              </div>
              <div className="bg-slate-50 mt-8 rounded-md border border-slate-200 shadow-md">
                <div className="flex items-center p-2">
                  <div className="flex h-16 w-16 mr-2">
                    <img
                      src="/coreAssets/Explore/micahrichards.jfif"
                      alt="Hufl"
                      className="object-cover rounded-full w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col my-2">
                    <div className="flex space-x-2 items-center">
                      <span className="text-secondary text-[12px] font-bold m-0 p-0">
                        @MicahRichards
                      </span>
                      {/* <span className="inline-flex h-2 w-2 p-1 rounded-full bg-yellow-500 m-0"></span>
                      <span className="text-blue-800 text-[12px] font-bold m-0 p-0">
                        #HiFL2023
                      </span> */}
                    </div>
                    <div className="flex space-x-2 items-center">
                      <span className="text-tertiary-400 text-[11px] font-semibold m-0 p-0">
                        Leeds United Youth System
                      </span>
                      <span className="inline-flex h-[3px] w-[3px] p-0 rounded-full bg-black m-0"></span>
                      <span className="text-tertiary-400 text-[11px] font-semibold m-0 p-0">
                        Alumnus
                      </span>
                    </div>
                    <div className="m-0 p-0">
                      <span className="text-[11px] text-gray-600 m-0 p-0 font-medium">
                        9 mins ago
                      </span>
                    </div>
                  </div>
                </div>
                <div className="">
                  <p className="text-sm px-2 mb-2">
                    Christiano Ronaldo has now scored 108 international goals
                    for Portugal. The GOAT!!!
                  </p>
                  {/* <img
                    src="/coreAssets/GistsPage/Gist1/hufl.jpeg"
                    alt="Hufl"
                    className="object-cover w-full h-full"
                  /> */}
                  <div className="border-t border-b border-tertiary-200 flex items-center justify-between p-1">
                    <div className="flex items-center space-x-2">
                      <span className="material-symbols-outlined text-green-700">
                        repeat
                      </span>
                      <span className="text-sm italic">
                        2.7k sitizens flowed with this gist
                      </span>
                    </div>
                    <div className="inline-flex items-center space-x-4">
                      <div className="flex items-center p-1 space-x-2">
                        <span className="inline-flex items-center">
                          🙏
                          <p className="text-[10px] ml-1">555</p>
                        </span>
                        <span className="material-symbols-outlined text-red-500">
                          speaker_notes
                        </span>
                        <p className="text-[10px] ml-1">647</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-b border-tertiary-200 flex items-center justify-between p-1">
                    <div className="inline-flex items-center space-x-4">
                      <span className="">🙏</span>
                      <span className="material-symbols-outlined text-red-400 ml-1">
                        speaker_notes
                      </span>
                      <span className="material-symbols-outlined text-red-500">
                        repeat
                      </span>
                    </div>
                    <div className="inline-flex items-center">
                      <div className="inline-flex items-center p-1 space-x-2">
                        <span className="material-symbols-outlined text-red-500">
                          bookmark
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-2"></div>
                </div>
              </div>
              <div className="bg-slate-50 mt-8 rounded-md border border-slate-200 shadow-md">
                <div className="flex items-center p-2">
                  <div className="flex h-16 w-16 mr-2">
                    <Image
                      src="/coreAssets/Explore/r16.jpg"
                      alt="Hufl"
                      width={50}
                      height={50}
                      className="object-cover rounded-full w-full h-full"
                      // Add blurDataURL and placeholder props for blur effect
                      blurDataURL="data:..." // Replace with base64 encoded blurred image data
                      placeholder="blur"
                    />
                  </div>
                  <div className="flex flex-col my-2">
                    <div className="flex space-x-2 items-center">
                      <span className="text-secondary text-[12px] font-bold m-0 p-0">
                        @jamkol23
                      </span>
                      <span className="inline-flex h-2 w-2 p-1 rounded-full bg-red-700 m-0"></span>
                      {/* <span className="text-blue-800 text-[12px] font-bold m-0 p-0">
                        #HiFL2023
                      </span> */}
                    </div>
                    <div className="flex space-x-2 items-center">
                      <span className="text-green-800 text-[11px] font-semibold m-0 p-0">
                        Nile University, Abuja
                      </span>
                      <span className="inline-flex h-[3px] w-[3px] p-0 rounded-full bg-black m-0"></span>
                      <span className="text-tertiary-400 text-[11px] font-semibold m-0 p-0">
                        Student
                      </span>
                    </div>
                    <div className="m-0 p-0">
                      <span className="text-[11px] text-gray-600 m-0 p-0 font-medium">
                        9 mins ago
                      </span>
                    </div>
                  </div>
                </div>
                <div className="">
                  <p className="text-sm px-2 mb-2">
                    Hey guys, please vote our girl{" "}
                    <span className="text-secondary">@spicy_q</span> for the
                    sitywatch beauty pageant finals. Just follow the link{" "}
                    <span className="text-[#5454ef] cursor-pointer">
                      https://sitywatch.com/beautypageant/ehfrhejkjei/votepanel/
                    </span>
                  </p>
                  <Image
                    src="/coreAssets/Explore/spicyq.webp"
                    alt="Hufl"
                    width={200}
                    height={200}
                    className="object-cover w-full full"
                    // Add blurDataURL and placeholder props for blur effect
                    blurDataURL="data:..." // Replace with base64 encoded blurred image data
                    placeholder="blur"
                  />
                  <div className="border-t border-b border-tertiary-200 flex items-center justify-between p-1">
                    <div className="flex items-center space-x-2">
                      <span className="material-symbols-outlined text-green-700">
                        repeat
                      </span>
                      <span className="text-sm italic">
                        2.7k sitizens flowed with this gist
                      </span>
                    </div>
                    <div className="inline-flex items-center space-x-4">
                      <div className="flex items-center p-1 space-x-2">
                        <span className="inline-flex items-center">
                          🙏
                          <p className="text-[10px] ml-1">555</p>
                        </span>
                        <span className="material-symbols-outlined text-red-500">
                          speaker_notes
                        </span>
                        <p className="text-[10px] ml-1">647</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-b border-tertiary-200 flex items-center justify-between p-1">
                    <div className="inline-flex items-center space-x-4">
                      <span className="">🙏</span>
                      <span className="material-symbols-outlined text-red-400 ml-1">
                        speaker_notes
                      </span>
                      <span className="material-symbols-outlined text-red-500">
                        repeat
                      </span>
                    </div>
                    <div className="inline-flex items-center">
                      <div className="inline-flex items-center p-1 space-x-2">
                        <span className="material-symbols-outlined text-red-500">
                          bookmark
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-2"></div>
                </div>
              </div>
              <div className="bg-slate-50 mt-8 rounded-md border border-slate-200 shadow-md">
                <div className="flex items-center p-2">
                  <div className="flex h-16 w-16 mr-2">
                    <Image
                      src="/coreAssets/MessagesPage/paulajeyi.jpeg"
                      alt="Hufl"
                      width={50}
                      height={50}
                      className="object-cover rounded-full w-full h-full"
                      blurDataURL="data:..."
                      placeholder="blur"
                    />
                  </div>
                  <div className="flex flex-col my-2">
                    <div className="flex space-x-2 items-center">
                      <span className="text-secondary text-[12px] font-bold m-0 p-0">
                        @paulo4real
                      </span>
                      {/* <span className="inline-flex h-2 w-2 p-1 rounded-full bg-yellow-500 m-0"></span> */}
                    </div>
                    <div className="flex space-x-2 items-center">
                      <span className="text-tertiary-400 text-[11px] font-semibold m-0 p-0">
                        Covenant University, Ogun
                      </span>
                      <span className="inline-flex h-[3px] w-[3px] p-0 rounded-full bg-black m-0"></span>
                      <span className="text-tertiary-400 text-[11px] font-semibold m-0 p-0">
                        Student
                      </span>
                    </div>
                    <div className="m-0 p-0">
                      <span className="text-[11px] text-gray-600 m-0 p-0 font-medium">
                        9 mins ago
                      </span>
                    </div>
                  </div>
                </div>
                <div className="">
                  <p className="text-sm px-2 mb-2">
                    Let's settle this once and for all. Covenant boys and
                    Babcock boys, who fresh pass?
                  </p>
                  <Image
                    src="/coreAssets/GistsPage/Gist4/naijagif.gif"
                    alt="Hufl"
                    width={250}
                    height={250}
                    className="object-cover w-full h-full"
                    blurDataURL="data:..."
                    placeholder="blur"
                  />
                  <div className="border-t border-b border-tertiary-200 flex items-center justify-between p-1">
                    <div className="flex items-center space-x-2">
                      <span className="material-symbols-outlined text-green-700">
                        repeat
                      </span>
                      <span className="text-sm italic">
                        2.7k sitizens flowed with this gist
                      </span>
                    </div>
                    <div className="inline-flex items-center space-x-4">
                      <div className="flex items-center p-1 space-x-2">
                        <span className="inline-flex items-center">
                          🙏
                          <p className="text-[10px] ml-1">555</p>
                        </span>
                        <span className="material-symbols-outlined text-red-500">
                          speaker_notes
                        </span>
                        <p className="text-[10px] ml-1">647</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-b border-tertiary-200 flex items-center justify-between p-1">
                    <div className="inline-flex items-center space-x-4">
                      <span className="">🙏</span>
                      <span className="material-symbols-outlined text-red-400 ml-1">
                        speaker_notes
                      </span>
                      <span className="material-symbols-outlined text-red-500">
                        repeat
                      </span>
                    </div>
                    <div className="inline-flex items-center">
                      <div className="inline-flex items-center p-1 space-x-2">
                        <span className="material-symbols-outlined text-red-500">
                          bookmark
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-2"></div>
                </div>
              </div>
            </article>
            <article className="col-span-1 border border-slate-400/70 shadow-inner p-2">
             Right section
            </article>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Explore
