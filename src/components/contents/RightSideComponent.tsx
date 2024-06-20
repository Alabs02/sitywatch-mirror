import Image from 'next/image'
import React from 'react'

const RightSideComponent = () => {
  return (
    <div className="h-screen">
      <div className="p-4 bg-neutral-200 rounded-sm">
        <div className="flex justify-end space-x-14 mx-2">
          <h3 className="font-bold">Your Sitadels</h3>
          <span className="material-symbols-outlined">more_horiz</span>
        </div>
        <div className="flex items-center">
          <div className="flex h-12 w-12 mr-2">
            <Image
              src="/coreAssets/RightSection/YourSitadelsSection/OIP.jpeg"
              alt="Hufl"
              width={50}
              height={50}
              className="object-cover rounded-full w-full h-full"
              blurDataURL="data:..."
              placeholder="blur"
            />
          </div>
          <div className="font-bold text-secondary">@NasirMGC</div>
        </div>
        <div className="flex flex-col items-center mx-auto mt-1">
          <article className="text-[13px] font-semibold space-y-1 space-x-1">
            <div className="flex">
              <span className="material-symbols-outlined">notifications</span>5
              <p> new notifications</p>
            </div>
            <div className="flex">
              <span className="material-symbols-outlined">switch_account</span>
              <p>Switch to Sitadel account</p>
            </div>
          </article>
        </div>
      </div>
      <div className="p-4 bg-neutral-200 rounded-sm mt-4 ">
        <div className="flex justify-end space-x-4 mx-2">
          <h3 className="font-bold">Ad</h3>
          <span className="material-symbols-outlined">more_horiz</span>
        </div>
        <span className="mt-4 text-sm font-bold text-center mx-auto flex">
          Subscribe with N100 airtime only and tap into your full potential with
          SityWatch Pro.
        </span>
        <div className="flex w-full h-full items-center justify-center">
          <div className="flex h-20 w-20 mr-2 items-center justify-center mt-4 ">
            <Image
              src="/coreAssets/RightSection/adsSection/space-run.png"
              alt="Hufl"
              width={50}
              height={50}
              className="object-cover rounded-full w-full h-full"
              blurDataURL="data:..."
              placeholder="blur"
            />
          </div>
        </div>
        <article className="flex flex-col items-center justify-center p-2">
          <h3 className="mt-4 text-center uppercase">Benefits</h3>
          <ul className="list-disc text-center inline-flex flex-col">
            <li>Appear on the search list of renowned talent scouts. </li>
            <li>
              Gain access to lucrative opportunities tailored to your interests
              & side hustles.
            </li>
            <li>
              Network with professionals and other enthusiasts who share your
              goals and passions
            </li>
          </ul>
        </article>
      </div>
    </div>
  )
}

export default RightSideComponent