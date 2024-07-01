import React from 'react'

const WTS = () => {
  return (
    <div className="grid place-items-center gap-y-6">
      <img
        src="/coreAssets/MessagesPage/wts.png"
        alt=""
        className="h-[120px] w-[120px] object-cover rounded-[50px]"
      />
      <h3 className='italic font-medium w-[50%] text-center'>Have private conversations with someone on SityWatch</h3>
      <button className="flex bg-gradient-to-b from-primary-500 to-secondary-500 text-primary-content rounded-full hover:shadow-lg focus:outline-none p-2 text-white">
        Whisper to someone
      </button>
    </div>
  )
}

export default WTS