import Image from "next/image"
import React from "react"

const SoulPanda = () => {
  return (
    <div className="mb-32 md:mb-36">
      <div className="w-full flex flex-col items-center justify-center bg-neutral-100 p-1 md:p-2 my-4 rounded-lg text-xs md:text-sm">
        <div className="w-full flex justify-center bg-neutral-100 mt-4 rounded-lg">
          <div className="inline-flex">
            <h3 className="text-center">13th April, 2023, at 15:36pm</h3>
          </div>
        </div>
        <div className="w-52 md:w-64 h-52 md:h-64 rounded-full overflow-hidden mt-2">
          <Image
            src="/coreAssets/PandarUs/SoulPandar/prett.jpeg"
            alt="soul image"
            width={250}
            height={250}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <div className="flex space-x-2 items-center my-2">
            <span className="text-[10px] md:text-[12px] font-bold m-0 p-0">
              Binta Nwagwan
            </span>
            <span className="text-green-800 text-[10px] md:text-[12px] font-bold m-0 p-0">
              @bingeBinta
            </span>
            <span className="inline-flex h-3 w-3 p-1 rounded-full bg-blue-500 m-0"></span>
          </div>
          <div className="flex space-x-2 items-center">
            <span className="text-[10px] md:text-[12px] font-semibold m-0 p-0">
              University of Porthacourt
            </span>
            <span className="inline-flex h-[3px] w-[3px] p-0 rounded-full bg-black m-0"></span>
            <span className="text-[10px] md:text-[12px] font-semibold m-0 p-0">
              Alumna
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full mx-auto items-center place-content-center my-2">
          <button className="rounded-full text-[10px] md:text-[12px] px-[35%] md:px-[42%] py-[1.3%] md:py-[2%] flex items-center mb-4 text-neutral-100 font-semibold bg-gradient-to-b from-[#F24055] to-[#1E7881] hover:bg-transparent border border-[#F24055]">
            <span className="material-symbols-outlined text-lg mr-1">
              send_money
            </span>{" "}
            PANDAR
          </button>
          <button className="rounded-full text-[10px] md:text-[12px] px-[35%] md:px-[42%] py-[2%] md:py-[2%] inline-flex items-center mb-4 text-[#F24055] font-semibold border border-[#F24055] hover:bg-gradient-to-b hover:from-[#F24055] hover:to-[#1E7881] hover:text-white">
            VIEW POLL
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center bg-neutral-100 p-2 my-4 rounded-lg mt-4 text-xs md:text-sm">
        <div className="w-full flex justify-center bg-neutral-100 mt-4 rounded-lg">
          <div className="inline-flex">
            <h3 className="text-center">13th April, 2023, at 15:36pm</h3>
          </div>
        </div>
        <div className="w-52 md:w-64 h-52 md:h-64 rounded-full overflow-hidden mt-2">
          <Image
            src="/coreAssets/PandarUs/SoulPandar/prett2.jpeg"
            alt="soul image"
            width={250}
            height={250}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <div className="flex space-x-2 items-center my-2">
            <span className="text-[10px] md:text-[12px] font-bold m-0 p-0">
              Binta Nwagwan
            </span>
            <span className="text-green-800 text-[10px] md:text-[12px] font-bold m-0 p-0">
              @bingeBinta
            </span>
            <span className="inline-flex h-3 w-3 p-1 rounded-full bg-blue-500 m-0"></span>
          </div>
          <div className="flex space-x-2 items-center">
            <span className="text-[10px] md:text-[12px] font-semibold m-0 p-0">
              University of Porthacourt
            </span>
            <span className="inline-flex h-[3px] w-[3px] p-0 rounded-full bg-black m-0"></span>
            <span className="text-[10px] md:text-[12px] font-semibold m-0 p-0">
              Alumna
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full mx-auto items-center place-content-center my-2">
          <button className="rounded-full text-[10px] md:text-[12px] px-[35%] md:px-[42%] py-[2%] md:py-[2%] flex items-center mb-4 text-neutral-100 font-semibold bg-gradient-to-b from-[#F24055] to-[#1E7881] hover:bg-transparent border border-[#F24055]">
            <span className="material-symbols-outlined text-lg mr-1">
              send_money
            </span>{" "}
            PANDAR
          </button>
          <button className="rounded-full text-[10px] md:text-[12px] px-[35%] md:px-[42%] py-[2%] md:py-[2%] inline-flex items-center mb-4 text-[#F24055] font-semibold border border-[#F24055] hover:bg-gradient-to-b hover:from-[#F24055] hover:to-[#1E7881] hover:text-white">
            VIEW POLL
          </button>
        </div>
      </div>
    </div>
  )
}

export default SoulPanda
