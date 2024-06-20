import React from "react"
import gistsData from "../../data.json"
import Image from "next/image"
import SearchInput from "@/components/molecules/SearchInput"
import SearchInputPlain from "@/components/molecules/SearchInputPlain"
import RightSideComponent from "@/components/contents/RightSideComponent"

interface Gist {
  id: number
  avatarSrc: string
  textUp: string
  textDown: string
  content: string
  icons: string[]
}

const Gists: React.FC = () => {
  const gists = gistsData.gists as Gist[]

  return (
    <div className="px-6 grid grid-cols-12 gap-x-6 h-screen overflow-hidden">
      <section className="col-span-8 h-full overflow-y-auto">
        {gists.map((gist: Gist) => (
          <div key={gist.id} className="h-full mb-8">
            <div className="bg-neutral-300 shadow-md rounded-md p-2">
              <div className="flex items-center space-x-2 my-2">
                <div className="rounded-full h-16 w-16 flex justify-center items-center inset-0 border border-double border-[#F24055] bg-gradient-to-t from-[#F24055] to-[#1E7881]">
                  <img
                    src={gist.avatarSrc}
                    alt="avatar"
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-green-700 font-semibold text-sm">
                    {gist.textUp}
                  </span>
                  <div className="flex">
                    <span className="text-sm">{gist.textDown}</span>
                    <span className="material-symbols-outlined">
                      arrow_drop_down
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col bg-neutral-300 shadow-inner shadow-gray-400/75 py-2 px-2 rounded-t-[10px]">
                <span className="material-symbols-outlined text-tertiary-200 text-lg">
                  person_pin_circle
                </span>{" "}
                <h4 className="p-1 text-tertiary-300 text-sm">
                  {gist.content}
                </h4>
              </div>
              <div className="flex items-center justify-around mt-4">
                {gist.icons.map((icon, index) => (
                  <span key={index} className="material-symbols-outlined">
                    {icon}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-full h-full bg-neutral-300 mt-8 rounded-md border border-slate-200 shadow-sm">
              <div className="flex items-center p-2">
                <div className="flex h-16 w-16 mr-2">
                  <img
                    src="/coreAssets/GistsPage/Gist1/hufl1.jpeg"
                    alt="Hufl"
                    className="object-cover rounded-full w-full h-full"
                  />
                </div>
                <div className="flex flex-col my-2">
                  <div className="flex space-x-2 items-center">
                    <span className="text-green-800 text-[12px] font-bold m-0 p-0">
                      @HiFL
                    </span>
                    <span className="inline-flex h-2 w-2 p-1 rounded-full bg-yellow-500 m-0"></span>
                    <span className="text-blue-800 text-[12px] font-bold m-0 p-0">
                      #HiFL2023
                    </span>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <span className="text-green-800 text-[11px] font-semibold m-0 p-0">
                      Sports
                    </span>
                    <span className="inline-flex h-[3px] w-[3px] p-0 rounded-full bg-black m-0"></span>
                    <span className="text-blue-800 text-[11px] font-semibold m-0 p-0">
                      Football
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
                <p className="text-sm px-2">
                  #HiFL2023 N200,000 up for grabs this season for a lucky
                  winner. All you have to do is make a cov...{" "}
                </p>
                <img
                  src="/coreAssets/GistsPage/Gist1/hufl.jpeg"
                  alt="Hufl"
                  className="object-cover w-full h-full"
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
                <div className="p-2">
                  <SearchInputPlain />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className="col-span-4 h-full overflow-y-auto">
        <RightSideComponent />
      </section>
    </div>
  )
}

export default Gists
