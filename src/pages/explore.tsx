import React, { FC, ReactNode, useState } from "react"
import SearchInput from "@/components/molecules/SearchInput"
import Image from "next/image"
import SmallScreenNav from "@/components/content/SmallScreenNav"
import PeopleForm from "@/components/contents/forms/PeopleForm"
import SitadelsForm from "@/components/contents/forms/SitadelsForm"
import TourneysForm from "@/components/contents/forms/TourneysForm"
import EventsForm from "@/components/contents/forms/EventsForm"
import ProductsForm from "@/components/contents/forms/ProductsForm"
import ServiceForm from "@/components/contents/forms/ServicesForm"

interface ExploreProps {
  children: ReactNode
}

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

const Explore: FC<ExploreProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState("All")

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const tabs = [
    "All",
    "People",
    "Sitadels",
    "Tourneys",
    "Events",
    "Products",
    "Services",
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "People":
        return <div className="mx-auto py-8 w-full"><PeopleForm /></div>
      case "Sitadels":
        return (
          <div className="mx-auto py-8 w-full">
            <SitadelsForm />
          </div>
        )
      case "Tourneys":
        return (
          <div className="mx-auto py-8 w-full">
            <TourneysForm />
          </div>
        )
      case "Events":
        return (
          <div className="mx-auto py-8 w-full">
            <EventsForm />
          </div>
        )
      case "Products":
        return (
          <div className="mx-auto py-8 w-full">
            <ProductsForm />
          </div>
        )
      case "Services":
        return (
          <div className="mx-auto py-8 w-full">
            <ServiceForm />
          </div>
        )
      case "All":
      default:
        return null
    }
  }

  return (
    <div className="w-full h-full hidden lg:block">
      <div className="w-full h-full grid shadow-inner shadow-gray-400/75 border rounded-t-[32px] px-5 lg:p-6 overflow-y-auto">
        <section className="h-full w-full mb-1 sm:mb-8">
          <div className="">
            <div className="flex justify-center">
              <SearchInput />
            </div>
            <nav className="flex justify-center mt-4 space-x-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`btn px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-200 ${
                    activeTab === tab
                      ? "active shadow-md shadow-gray-400 bg-gray-100"
                      : ""
                  }`}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="border-b border-gray-300 w-full mt-2  ">
            {renderContent()}
          </div>
          <div className="grid grid-cols-2 gap-x-2 mt-4">
            <article className="col-span-1 ">
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
                  <p className="text-sm px-2 mb-2 ">
                    Hey guys, please vote our girl{" "}
                    <span className="text-secondary">@spicy_q</span> for the
                    sitywatch beauty pageant finals. Just follow the link{" "}
                    <span className="text-[#5454ef] cursor-pointer text-xs lg:text-sm">
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
              <div className="flex flex-col w-full h-full p-2 md:p-4">
                <section className="flex space-x-2">
                  <div className="h-8 md:h-14 w-8 md:w-14">
                    <img
                      src="/coreAssets/Explore/micahrichards.jfif"
                      alt="explore avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col">
                      <span>up</span>
                      <span>down</span>
                    </div>
                    <div>
                      <span className="material-symbols-outlined">
                        more_vert
                      </span>
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
            </article>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Explore
