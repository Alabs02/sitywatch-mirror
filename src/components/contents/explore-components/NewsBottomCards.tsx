import Image from 'next/image'
import React from 'react'

const NewsBottomCards = () => {
  return (
    <div className="mb-8 md:mb-0 mx-auto overflow-hidden">
      <div className="bg-slate-50 mt-8 rounded-md border border-slate-200 shadow-md">
        <div className="flex items-center p-2">
          <div className="flex w-12 md:h-16 h-12 md:w-16 mr-2">
            <img
              src="/coreAssets/Explore/micahrichards.jfif"
              alt="Hufl"
              className="object-cover rounded-full w-full h-full"
            />
          </div>
          <div className="flex flex-col my-2">
            <div className="flex space-x-2 items-center">
              <span className="text-secondary text-[10px] md:text-[12px] font-bold m-0 p-0">
                @MicahRichards
              </span>
              {/* <span className="inline-flex h-2 w-2 p-1 rounded-full bg-yellow-500 m-0"></span>
                      <span className="text-blue-800 text-[12px] font-bold m-0 p-0">
                        #HiFL2023
                      </span> */}
            </div>
            <div className="flex space-x-2 items-center">
              <span className="text-tertiary-400 md:text-[11px] text-[9px] font-semibold m-0 p-0">
                Leeds United Youth System
              </span>
              <span className="inline-flex h-[2px] w-[2px] p-0 rounded-full bg-black m-0"></span>
              <span className="text-tertiary-400 md:text-[11px] text-[9px] font-semibold m-0 p-0">
                Alumnus
              </span>
            </div>
            <div className="m-0 p-0">
              <span className="md:text-[11px] text-[9px] text-gray-600 m-0 p-0 font-medium">
                9 mins ago
              </span>
            </div>
          </div>
        </div>
        <div className="">
          <p className="md:text-sm text-xs px-2 mb-2">
            Christiano Ronaldo has now scored 108 international goals for
            Portugal. The GOAT!!!
          </p>
          {/* <img
                    src="/coreAssets/GistsPage/Gist1/hufl.jpeg"
                    alt="Hufl"
                    className="object-cover w-full h-full"
                  /> */}
          <div className="border-t border-b border-tertiary-200 flex items-center justify-between p-1">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-green-700 md:text-lg text-sm">
                repeat
              </span>
              <span className="md:text-sm text-[9px] italic">
                2.7k sitizens flowed with this gist
              </span>
            </div>
            <div className="inline-flex items-center space-x-4">
              <div className="flex items-center p-1 space-x-1 md:space-x-2">
                <span className="inline-flex items-center">🙏</span>
                <p className="text-[10px] ml-1">555</p>
                <span className="material-symbols-outlined text-red-500 md:text-lg text-sm">
                  speaker_notes
                </span>
                <p className="text-[10px] ml-1">647</p>
              </div>
            </div>
          </div>

          <div className="border-t border-b border-tertiary-200 flex items-center justify-between p-1">
            <div className="inline-flex items-center space-x-4">
              <span className="">🙏</span>
              <span className="material-symbols-outlined text-red-400 ml-1 md:text-lg text-sm">
                speaker_notes
              </span>
              <span className="material-symbols-outlined text-red-500 md:text-lg text-sm">
                repeat
              </span>
            </div>
            <div className="inline-flex items-center">
              <div className="inline-flex items-center p-1 space-x-2">
                <span className="material-symbols-outlined text-red-500 md:text-lg text-sm">
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
          <div className="flex w-14 md:h-16 h-14 md:w-16 mr-2">
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
              <span className="text-secondary text-[10px] md:text-[12px] font-bold m-0 p-0">
                @jamkol23
              </span>
              <span className="inline-flex w-1 md:h-2 h-1 md:w-2 p-1 rounded-full bg-red-700 m-0"></span>
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
              <span className="md:text-[11px] text-[9px] text-gray-600 m-0 p-0 font-medium">
                9 mins ago
              </span>
            </div>
          </div>
        </div>
        <div className="">
          <p className="md:text-sm text-xs px-2 mb-2 ">
            Hey guys, please vote our girl{" "}
            <span className="text-secondary">@spicy_q</span> for the sitywatch
            beauty pageant finals. Just follow the link{" "}
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
              <span className="material-symbols-outlined text-green-700 md:text-lg text-sm">
                repeat
              </span>
              <span className="md:text-sm text-[10px] italic">
                2.7k sitizens flowed with this gist
              </span>
            </div>
            <div className="inline-flex items-center space-x-4">
              <div className="flex items-center p-1 space-x-2">
                <span className="inline-flex items-center">
                  🙏
                  <p className="text-[10px] ml-1">555</p>
                </span>
                <span className="material-symbols-outlined text-red-500 md:text-lg text-sm">
                  speaker_notes
                </span>
                <p className="text-[10px] ml-1">647</p>
              </div>
            </div>
          </div>

          <div className="border-t border-b border-tertiary-200 flex items-center justify-between p-1">
            <div className="inline-flex items-center space-x-4">
              <span className="">🙏</span>
              <span className="material-symbols-outlined text-red-400 ml-1 md:text-lg text-sm">
                speaker_notes
              </span>
              <span className="material-symbols-outlined text-red-500 md:text-lg text-sm">
                repeat
              </span>
            </div>
            <div className="inline-flex items-center">
              <div className="inline-flex items-center p-1 space-x-2">
                <span className="material-symbols-outlined text-red-500 md:text-lg text-sm">
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
          <div className="flex-shrink-0 w-12 md:h-16 h-12 md:w-16 mr-2">
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
          <div className="flex flex-col my-2 h-full flex-grow">
            <div className="flex space-x-2 items-center">
              <span className="text-secondary md:text-[12px] text-[10px] font-bold m-0 p-0">
                @paulo4real
              </span>
            </div>
            <div className="flex space-x-2 items-center">
              <span className="text-tertiary-400 md:text-[11px] text-[9px] font-semibold m-0 p-0">
                Covenant University, Ogun
              </span>
              <span className="inline-flex h-[3px] w-[3px] p-0 rounded-full bg-black m-0"></span>
              <span className="text-tertiary-400 md:text-[11px] text-[9px] font-semibold m-0 p-0">
                Student
              </span>
            </div>
            <div className="m-0 p-0">
              <span className="md:text-[11px] text-[9px] text-gray-600 m-0 p-0 font-medium">
                9 mins ago
              </span>
            </div>
          </div>
        </div>
        <div className="p-2">
          <p className="md:text-sm text-xs mb-2">
            Let's settle this once and for all. Covenant boys and Babcock boys,
            who fresh pass?
          </p>
          <Image
            src="/coreAssets/GistsPage/Gist4/naijagif.gif"
            alt="Hufl"
            width={250}
            height={250}
            className="object-cover w-full max-w-full h-auto"
            blurDataURL="data:..."
            placeholder="blur"
          />
          <div className="border-t border-b border-tertiary-200 flex items-center justify-between p-1">
            <div className="flex items-center space-x-1 md:space-x-2">
              <span className="material-symbols-outlined text-green-700 md:text-lg text-sm">
                repeat
              </span>
              <span className="md:text-sm text-[10px] italic">
                2.7k sitizens flowed with this gist
              </span>
            </div>
            <div className="inline-flex items-center space-x-4">
              <div className="flex items-center p-1 space-x-2">
                <span className="inline-flex items-center">
                  🙏
                  <p className="text-[10px] ml-1">555</p>
                </span>
                <span className="material-symbols-outlined text-red-500 md:text-lg text-sm">
                  speaker_notes
                </span>
                <p className="text-[10px] ml-1">647</p>
              </div>
            </div>
          </div>
          <div className="border-t border-b border-tertiary-200 flex items-center justify-between p-1">
            <div className="inline-flex items-center space-x-4">
              <span className="">🙏</span>
              <span className="material-symbols-outlined text-red-400 ml-1 md:text-lg text-sm">
                speaker_notes
              </span>
              <span className="material-symbols-outlined text-red-500 md:text-lg text-sm">
                repeat
              </span>
            </div>
            <div className="inline-flex items-center">
              <div className="inline-flex items-center p-1 space-x-2">
                <span className="material-symbols-outlined text-red-500 md:text-lg text-sm">
                  bookmark
                </span>
              </div>
            </div>
          </div>
          <div className="p-2"></div>
        </div>
      </div>
    </div>
  )
}

export default NewsBottomCards