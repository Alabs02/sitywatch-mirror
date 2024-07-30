import Image from 'next/image'
import React from 'react'

const PandaScent = () => {
  return (
    <div className="mt-4 flex flex-col gap-y-3 mb-32 md:mb-36">
      <article className="flex items-center justify-between">
        {/* left */}
        <div className="flex items-center space-x-2">
          <div className="h-14 w-14 rounded-full overflow-hidden">
            <Image
              src="/coreAssets/PandarUs/SoulPandar/prett.jpeg"
              alt="soul image"
              width={50}
              height={50}
              className="object-cover w-full h-full"
            />
          </div>
          <div className=" flex flex-col text-xs md:text-sm">
            <div className="flex space-x-1">
              <span className="text-secondary font-bold">@blizwizliz</span>
              <span className="font-semibold">left</span>
              <p>a scent</p>
            </div>
            <div className=" italic text-tertiary-300">14 mins ago</div>
          </div>
        </div>
        {/* right */}
        <div className="flex items-center space-x-2 text-xs md:text-sm">
          <span className="inline-flex h-1 md:h-3 w-1 md:w-3 p-1 rounded-full bg-[red] m-0"></span>
          <span className="material-symbols-outlined">more_vert</span>
        </div>
      </article>
      <article className="flex items-center justify-between">
        {/* left */}
        <div className="flex items-center space-x-2">
          <div className="h-14 w-14 rounded-full overflow-hidden">
            <Image
              src="/coreAssets/PandarUs/PandarScents/prett4.jpeg"
              alt="soul image"
              width={50}
              height={50}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-xs md:text-sm flex flex-col">
            <div className="flex space-x-1">
              <span className="text-secondary font-bold">@bgiamthril</span>
              <span className="font-semibold">left</span>
              <p>a scent</p>
            </div>
            <div className="text-xs md:text-sm italic text-tertiary-300">
              4 days ago
            </div>
          </div>
        </div>
        {/* right */}
        <div className="flex items-center space-x-2">
          {/* <span className="inline-flex h-3 w-3 p-1 rounded-full bg-[red] m-0"></span> */}
          <span className="material-symbols-outlined">more_vert</span>
        </div>
      </article>
      <article className="flex items-center justify-between">
        {/* left */}
        <div className="flex items-center space-x-2">
          <div className="h-14 w-14 rounded-full overflow-hidden">
            <Image
              src="/coreAssets/PandarUs/PandarScents/prett3.jpeg"
              alt="soul image"
              width={50}
              height={50}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-xs md:text-sm flex flex-col">
            <div className="flex space-x-1">
              <span className="text-secondary font-bold">@casualmissy</span>
              <span className="font-semibold">left</span>
              <p>a scent</p>
            </div>
            <div className="text-xs md:text-sm italic text-tertiary-300">
              5 days ago
            </div>
          </div>
        </div>
        {/* right */}
        <div className="flex items-center space-x-2">
          {/* <span className="inline-flex h-3 w-3 p-1 rounded-full bg-[red] m-0"></span> */}
          <span className="material-symbols-outlined">more_vert</span>
        </div>
      </article>
      <article className="flex items-center justify-between">
        {/* left */}
        <div className="flex items-center space-x-2">
          <div className="h-14 w-14 rounded-full overflow-hidden">
            <Image
              src="/coreAssets/PandarUs/PandarScents/prett5.jpeg"
              alt="soul image"
              width={50}
              height={50}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-xs md:text-sm flex flex-col">
            <div className="flex space-x-1">
              <span className="text-secondary">@freebarbie</span>
              <span className="font-semibold">left</span>
              <p>5 mins ago</p>
            </div>
            <div className="text-xs md:text-sm italic text-tertiary-300">
              14 mins ago
            </div>
          </div>
        </div>
        {/* right */}
        <div className="flex items-center md:space-x-2">
          <span className="inline-flex h-1 md:h-3 w-1 md:w-3 p-1 rounded-full bg-[red] m-0"></span>
          <span className="material-symbols-outlined">more_vert</span>
        </div>
      </article>
      <article className="flex items-center justify-between">
        {/* left */}
        <div className="flex items-center space-x-2">
          <div className="h-14 w-14 rounded-full overflow-hidden">
            <Image
              src="/coreAssets/PandarUs/PandarScents/prett6.jpeg"
              alt="soul image"
              width={50}
              height={50}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-xs md:text-sm flex flex-col">
            <div className="flex space-x-1">
              <span>you</span>{" "}
              <span className="font-semibold space-x-1">left</span>
              <span>a scent for</span>
              <span className="text-secondary">@bsoftlifebestie</span>
            </div>
            <div className="text-xs md:text-sm italic text-tertiary-300">
              14 mins ago
            </div>
          </div>
        </div>
        {/* right */}
        <div className="flex items-center space-x-2">
          {/* <span className="inline-flex h-3 w-3 p-1 rounded-full bg-[red] m-0"></span> */}
          <span className="material-symbols-outlined">more_vert</span>
        </div>
      </article>
      <article className="flex items-center justify-between">
        {/* left */}
        <div className="flex items-center space-x-2">
          <div className="h-14 w-14 rounded-full overflow-hidden">
            <Image
              src="/coreAssets/PandarUs/SoulPandar/prett.jpeg"
              alt="soul image"
              width={50}
              height={50}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-xs md:text-sm flex flex-col">
            <div className="flex space-x-1">
              <span className="text-secondary">@fashionqueen</span>
              <span className="font-semibold">left</span>
              <p>a scent</p>
            </div>
            <div className="text-xs md:text-sm italic text-tertiary-300">
              2 days ago
            </div>
          </div>
        </div>
        {/* right */}
        <div className="flex items-center md:space-x-2">
          <span className="inline-flex h-1 md:h-3 w-1 md:w-3 p-1 rounded-full bg-[red] m-0"></span>
          <span className="material-symbols-outlined">more_vert</span>
        </div>
      </article>
      <article className="flex items-center justify-between">
        {/* left */}
        <div className="flex items-center space-x-2">
          <div className="h-14 w-14 rounded-full overflow-hidden">
            <Image
              src="/coreAssets/PandarUs/PandarScents/prett5.jpeg"
              alt="soul image"
              width={50}
              height={50}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-xs md:text-sm flex flex-col">
            <div className="flex space-x-1">
              <span>you</span>{" "}
              <span className="font-semibold space-x-1">left</span>
              <span>a scent for</span>
              <span className="text-secondary">@theperksoftpearly</span>
            </div>
            <div className="text-xs md:text-sm italic text-tertiary-300">14 mins ago</div>
          </div>
        </div>
        {/* right */}
        <div className="flex items-center space-x-2">
          {/* <span className="inline-flex h-3 w-3 p-1 rounded-full bg-[red] m-0"></span> */}
          <span className="material-symbols-outlined">more_vert</span>
        </div>
      </article>
    </div>
  )
}

export default PandaScent