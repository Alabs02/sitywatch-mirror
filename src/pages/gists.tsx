import React, { useState } from "react"
import gistsData from "../../data.json"
import Image from "next/image"
import SearchInputPlain from "@/components/molecules/SearchInputPlain"
import RightSideComponent from "@/components/contents/RightSideComponent"

interface Gist {
  id: number
  avatarSrc: string
  textUp: string
  textDown: string
  content: string
  icons: string[]
  isFocused?: boolean // Define isFocused property as optional
}

const Gists: React.FC = () => {
  const [gists, setGists] = useState<Gist[]>(gistsData.gists || [])

  const handleContentChange = (newContent: string, id: number) => {
    setGists((prevGists) =>
      prevGists.map((gist) =>
        gist.id === id ? { ...gist, content: newContent } : gist,
      ),
    )
    // You can perform any additional actions here if needed
  }

  const handleFocus = (id: number) => {
    setGists((prevGists) =>
      prevGists.map((gist) =>
        gist.id === id
          ? { ...gist, isFocused: true }
          : { ...gist, isFocused: false },
      ),
    )
  }

  const handleBlur = (id: number) => {
    setGists((prevGists) =>
      prevGists.map((gist) =>
        gist.id === id ? { ...gist, isFocused: false } : gist,
      ),
    )
  }

  return (
    <div className="grid grid-cols-12 gap-x-2 lg:gap-x-6 h-screen overflow-hidden">
      {/* Left Section */}
      <section className="col-span-12 lg:col-span-8 h-full overflow-y-auto">
        <div className="">
          {gists.map((gist) => (
            <div key={gist.id} className="h-full mb-8 overflow-y-auto">
              <div className="bg-neutral-300 shadow-md rounded-md p-2">
                <div className="flex items-center space-x-2 my-1 md:my-2">
                  <div className="rounded-full h-14 w-14 lg:h-16 lg:w-16 flex justify-center items-center inset-0 border border-double border-[#F24055] bg-gradient-to-t from-[#F24055] to-[#1E7881]">
                    <img
                      src={gist.avatarSrc}
                      alt="avatar"
                      className="rounded-full object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-green-700 font-semibold text-[12px] lg:text-sm">
                      {gist.textUp}
                    </span>
                    <div className="flex items-center">
                      <span className="text-[12px] lg:text-sm flex-1">
                        {gist.textDown}
                      </span>
                      <span className="material-symbols-outlined">
                        arrow_drop_down
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col bg-neutral-300 shadow-inner shadow-gray-400/75 py-2 px-2 rounded-t-[10px]">
                  <span className="material-symbols-outlined text-tertiary-200 text-lg lg:text-xl">
                    person_pin_circle
                  </span>{" "}
                  <textarea
                    className="p-1 text-tertiary-300 text-[12px] lg:text-sm bg-transparent border-none focus:outline-none resize-none"
                    value={gist.content}
                    onChange={(e) =>
                      handleContentChange(e.target.value, gist.id)
                    }
                    onFocus={() => handleFocus(gist.id)}
                    onBlur={() => handleBlur(gist.id)}
                    placeholder={
                      gist.isFocused
                        ? ""
                        : "Hey Nasir, let people know the latest gist. Add pics, vids, voice-notes, hashtags or cite others if you like"
                    }
                    rows={3}
                  />
                </div>

                <div className="flex items-center justify-around mt-2 lg:mt-4">
                  {gist.icons.map((icon, index) => (
                    <span
                      key={index}
                      className="material-symbols-outlined text-sm lg:text-lg"
                    >
                      {icon}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full h-full bg-neutral-300 mt-4 lg:mt-8 rounded-md border border-slate-200 shadow-sm">
                <div className="flex items-center p-2">
                  <div className="flex h-14 w-14 lg:h-16 lg:w-16 mr-2">
                    <img
                      src="/coreAssets/GistsPage/Gist1/hufl1.jpeg"
                      alt="Hufl"
                      className="object-cover rounded-full w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col my-0 md:my-2 flex-1">
                    <div className="flex space-x-1 lg:space-x-2 items-center">
                      <span className="text-green-800 text-[10px] lg:text-[12px] font-bold m-0 p-0">
                        @HiFL
                      </span>
                      <span className="inline-flex h-[2px] lg:h-[2.5px] w-[2px] lg:w-[2.5px] p-1 rounded-full bg-yellow-500 m-0"></span>
                      <span className="text-blue-800 text-[10px] lg:text-[12px] font-bold m-0 p-0">
                        #HiFL2023
                      </span>
                    </div>
                    <div className="flex space-x-1 lg:space-x-2 items-center">
                      <span className="text-green-800 text-[10px] lg:text-[12px] font-semibold m-0 p-0">
                        Sports
                      </span>
                      <span className="inline-flex h-[2px] lg:h-[3px] w-[2px] lg:w-[3px] p-0 rounded-full bg-black m-0"></span>
                      <span className="text-blue-800 text-[10px] lg:text-[12px] font-semibold m-0 p-0">
                        Football
                      </span>
                    </div>
                    <div className="m-0 p-0">
                      <span className="text-[11px] lg:text-[8px] text-gray-600 m-0 p-0 font-medium">
                        9 mins ago
                      </span>
                    </div>
                  </div>
                </div>
                <div className="">
                  <p className="text-[14px] lg:text-sm px-2 mb-1 lg:mb-2">
                    #HiFL2023 N200,000 up for grabs this season for a lucky
                    winner. All you have to do is make a cov...{" "}
                  </p>
                  <img
                    src="/coreAssets/GistsPage/Gist1/hufl.jpeg"
                    alt="Hufl"
                    className="object-cover w-full h-full"
                  />
                  <div className="border-t border-b border-tertiary-200 flex items-center justify-between p-1">
                    <div className="flex items-center space-x-1 lg:space-x-2">
                      <span className="material-symbols-outlined text-green-700 text-[16px] lg:text-lg">
                        repeat
                      </span>
                      <span className="text-[10px] italic lg:text-sm">
                        2.7k sitizens flowed with this gist
                      </span>
                    </div>
                    <div className="inline-flex items-center space-x-2 lg:space-x-4">
                      <div className="flex items-center p-1 space-x-1 lg:space-x-2">
                        <span className="inline-flex items-center">
                          🙏
                          <sup className="text-[10px] lg:text-[12px]">
                            555
                          </sup>
                        </span>
                        <span className="material-symbols-outlined text-red-500 text-sm lg:text-lg">
                          speaker_notes
                        </span>
                        <sup className="text-[10px] lg:text-[12px]">
                          647
                        </sup>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-b border-tertiary-200 flex items-center justify-between p-1">
                    <div className="inline-flex items-center space-x-3 lg:space-x-4">
                      <span className="text-sm lg:text-lg">🙏</span>
                      <span className="material-symbols-outlined text-red-400  lg:ml-0 text-[16px] lg:text-lg">
                        speaker_notes
                      </span>
                      <span className="material-symbols-outlined text-red-500 text-sm lg:text-lg">
                        repeat
                      </span>
                    </div>
                    <div className="inline-flex items-center">
                      <div className="inline-flex items-center p-1 space-x-1 lg:space-x-2">
                        <span className="material-symbols-outlined text-red-500 text-sm lg:text-lg">
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
        </div>
      </section>

      {/* Right Section (hidden on small screens) */}
      <section className="col-span-4 h-full overflow-y-auto hidden lg:block">
        <RightSideComponent />
      </section>
    </div>
  )
}

export default Gists
