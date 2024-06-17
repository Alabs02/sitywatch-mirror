import React from 'react'

const Affairs = () => {
  return (
    <div className='mx-36 my-4 bg-slate-100'>
      <div className=" shadow-sm cursor-pointer mt-4">
        <div className="relative">
          <div className="shadow-lg border border-b border-tertiary-100">
            <img
              src="CoreAssets/HomePage/PageContent/suggested-tourneys/sonyworld.jpeg"
              alt="Tourney's card"
              className="object-contain w-full h-full"
            />
          </div>
          <div className="">
            <span className="material-symbols-outlined text-lg absolute top-2 right-2 text-black bg-white p-2 rounded-full h-10 w-10 flex justify-center items-center">
              bookmark
            </span>
          </div>
        </div>
        <div className="text-center space-y-2 py-2">
          <h2 className="font-bold mb-2">header</h2>
          <p className="text-sm text-blue-800 font-bold">#hashtag</p>
          <p className="text-sm text-gray-900 font-medium">
            Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Affairs