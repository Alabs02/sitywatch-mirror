import SearchInputPlain from "@/components/molecules/SearchInputPlain"
import React from "react"

const Events = () => {
  return (
    <div>
      <div className="">
        <div className="h-full mb-8 overflow-y-auto">
          <div className="w-full h-full bg-neutral-300 mt-8 rounded-md border border-slate-200 shadow-sm">
            <div className="flex items-center p-2">
              <div className="flex h-16 w-16 mr-2">
                <img
                  src="/sw-img/sonny-world-avatar.svg"
                  alt="sonny world"
                  className="object-cover rounded-full w-full h-full"
                />
              </div>
              <div className="flex flex-col my-2">
                <div className="flex space-x-2 items-center">
                  <span className="text-secondary text-[12px] font-bold m-0 p-0">
                    @SWPA
                  </span>
                  <span className="inline-flex h-2 w-2 p-1 rounded-full bg-yellow-500 m-0"></span>
                  <span className="text-secondary text-[12px] font-bold m-0 p-0">
                    #SWPA_SC2023
                  </span>
                </div>
                <div className="flex space-x-2 items-center">
                  <span className=" text-[11px] font-normal m-0 p-0">
                    Media
                  </span>
                  <span className="inline-flex h-[3px] w-[3px] p-0 rounded-full bg-black m-0"></span>
                  <span className=" text-[11px] font-normal m-0 p-0">
                    Photography
                  </span>
                </div>
                <div className="m-0 p-0">
                  <span className="text-[11px] text-gray-600 m-0 p-0 font-medium">
                    29 mins ago
                  </span>
                </div>
              </div>
            </div>
            <div className="">
              <img
                src="/sw-img/video.jpg"
                alt="Hufl"
                className="object-cover w-full h-full"
              />
              <p className="text-[10px] md:text-sm px-2 my-2">
                Watch the briefing of the student competition category to know
                all about the eligible criteris...{" "}
                <span className="text-tertiary-300 font-bold">see more</span>
              </p>
              <div className="border-t border-b border-tertiary-200 flex items-center justify-between p-1">
                <div className="flex items-center space-x-2">
                  {/* <span className="material-symbols-outlined">grade</span>
                   */}
                  <span className="h-3  md:h-4   w-3 md:w-4">
                    <img
                      src="/sw-img/star.svg"
                      alt="start"
                      className="object-cover"
                    />
                  </span>
                  <span className="text-[10px] md:text-sm italic">
                    you and 2.4k sitizens support this column
                  </span>
                </div>
                <div className="inline-flex items-center space-x-4">
                  <div className="flex items-center p-1 ">
                    <span className="h-3  md:h-4   w-3 md:w-4">
                      <img
                        src="/sw-img/thought.svg"
                        alt="start"
                        className="object-cover"
                      />
                    </span>

                    <p className="text-[8px] md:text-[10px] align-super ml-1">
                      647
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-b border-tertiary-200 flex items-center justify-between p-1">
                <div className="inline-flex items-center space-x-4">
                  <span className="h-6 w-6">
                    <img
                      src="/sw-img/star.svg"
                      alt="start"
                      className="object-cover"
                    />
                  </span>
                  <span className="h-6 w-6">
                    <img
                      src="/sw-img/thought.svg"
                      alt="start"
                      className="object-cover"
                    />
                  </span>
                  <span className="material-symbols-outlined">open_in_new</span>
                </div>
                <div className="inline-flex items-center">
                  <div className="inline-flex items-center p-1 space-x-2">
                    <span className="material-symbols-outlined">bookmark</span>
                  </div>
                </div>
              </div>
              <span className="flex items-center justify-center py-1 space-x-2">
                <span className="h-4 w-4">
                  <img
                    src="/sw-img/thought.svg"
                    alt="start"
                    className="object-cover"
                  />
                </span>
                <p className="text-[12px] font-bold italic">
                  View all thoughts
                </p>
              </span>
              <div className="p-2">
                <SearchInputPlain />
              </div>
            </div>
          </div>
          <div className="w-full h-full bg-neutral-300 mt-8 rounded-md border border-slate-200 shadow-sm">
            <div className="flex items-center p-2">
              <div className="flex h-16 w-16 mr-2">
                <img
                  src="/sw-img/sonny-world-avatar.svg"
                  alt="sonny world"
                  className="object-cover rounded-full w-full h-full"
                />
              </div>
              <div className="flex flex-col my-2">
                <div className="flex space-x-2 items-center">
                  <span className="text-secondary text-[12px] font-bold m-0 p-0">
                    @SWPA
                  </span>
                  <span className="inline-flex h-2 w-2 p-1 rounded-full bg-yellow-500 m-0"></span>
                  <span className="text-secondary text-[12px] font-bold m-0 p-0">
                    #SWPA_SC2023
                  </span>
                </div>
                <div className="flex space-x-2 items-center">
                  <span className=" text-[11px] font-normal m-0 p-0">
                    Media
                  </span>
                  <span className="inline-flex h-[3px] w-[3px] p-0 rounded-full bg-black m-0"></span>
                  <span className=" text-[11px] font-normal m-0 p-0">
                    Photography
                  </span>
                </div>
                <div className="m-0 p-0">
                  <span className="text-[11px] text-gray-600 m-0 p-0 font-medium">
                    29 mins ago
                  </span>
                </div>
              </div>
            </div>
            <div className="">
              <img
                src="/sw-img/video.jpg"
                alt="Hufl"
                className="object-cover w-full h-full"
              />
              <p className="text-[10px] md:text-sm px-2 my-2">
                Watch the briefing of the student competition category to know
                all about the eligible criteris...{" "}
                <span className="text-tertiary-300 font-bold">see more</span>
              </p>
              <div className="border-t border-b border-tertiary-200 flex items-center justify-between p-1">
                <div className="flex items-center space-x-2">
                  {/* <span className="material-symbols-outlined">grade</span>
                   */}
                  <span className="h-3  md:h-4   w-3 md:w-4">
                    <img
                      src="/sw-img/star.svg"
                      alt="start"
                      className="object-cover"
                    />
                  </span>
                  <span className="text-[10px] md:text-sm italic">
                    you and 2.4k sitizens support this column
                  </span>
                </div>
                <div className="inline-flex items-center space-x-4">
                  <div className="flex items-center p-1 ">
                    <span className="h-3  md:h-4   w-3 md:w-4">
                      <img
                        src="/sw-img/thought.svg"
                        alt="start"
                        className="object-cover"
                      />
                    </span>

                    <p className="text-[8px] md:text-[10px] align-super ml-1">
                      647
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-b border-tertiary-200 flex items-center justify-between p-1">
                <div className="inline-flex items-center space-x-4">
                  <span className="h-6 w-6">
                    <img
                      src="/sw-img/star.svg"
                      alt="start"
                      className="object-cover"
                    />
                  </span>
                  <span className="h-6 w-6">
                    <img
                      src="/sw-img/thought.svg"
                      alt="start"
                      className="object-cover"
                    />
                  </span>
                  <span className="material-symbols-outlined">open_in_new</span>
                </div>
                <div className="inline-flex items-center">
                  <div className="inline-flex items-center p-1 space-x-2">
                    <span className="material-symbols-outlined">bookmark</span>
                  </div>
                </div>
              </div>
              <span className="flex items-center justify-center py-1 space-x-2">
                <span className="h-4 w-4">
                  <img
                    src="/sw-img/thought.svg"
                    alt="start"
                    className="object-cover"
                  />
                </span>
                <p className="text-[12px] font-bold italic">
                  View all thoughts
                </p>
              </span>
              <div className="p-2">
                <SearchInputPlain />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events
