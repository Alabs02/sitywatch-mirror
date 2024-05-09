import React from 'react'

const Gists = () => {
  return (
    <div className="w-full h-full border border-[red] px-5 lg:p-6 grid gap-y-4 ">
      <section className="grid grid-cols-12 gap-x-14">
        <div className="grid col-span-8 border border-[red] p-14 bg-gray-200 shadow-lg rounded-md">
          <div className='flex items-center space-x-2 mb-4'>
            <img
              src="/header-images/ellipse.svg"
              alt="avatar"
              className="rounded-full h-12 w-12 object-contain"
            />
            <div className='flex flex-col'>
              <span>text up</span>
              <span>text down</span>
            </div>
          </div>
          <div className="flex bg-gray-100 shadow-inner shadow-gray-400/75 py-6 px-2 rounded-t-[10px] items-center">
            <h4 className="p-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus.
            </h4>
          </div>
          <div className="flex items-center justify-around mt-5">
            <span>icon1</span>
            <span>icon2</span>
            <span>icon3</span>
            <span>icon4</span>
          </div>
        </div>
        <div className="grid col-span-4 border border-[red] p-14 bg-gray-200 place-content-center">
          <h1>CONTENT</h1>
        </div>
      </section>
      <section className="grid grid-cols-12 gap-x-14">
        <div className="grid col-span-8 border border-[red] p-14 bg-gray-200 shadow-lg rounded-md">
          <div className="bg-gray-100 shadow-inner shadow-gray-400/75 py-6 px-2 rounded-t-[10px]">
            <h4 className="p-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus.
            </h4>
          </div>
          <div className="flex items-center justify-around mt-5">
            <span>icon1</span>
            <span>icon2</span>
            <span>icon3</span>
            <span>icon4</span>
          </div>
        </div>
        <div className="grid col-span-4 border border-[red] p-14 bg-gray-500"></div>
      </section>{" "}
      <section className="grid grid-cols-12 gap-x-14">
        <div className="grid col-span-8 border border-[red] p-14 bg-gray-200 shadow-lg rounded-md">
          <div className="bg-gray-100 shadow-inner shadow-gray-400/75 py-6 px-2 rounded-t-[10px]">
            <h4>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus.
            </h4>
          </div>
          <div className="flex items-center justify-around mt-5">
            <span>icon1</span>
            <span>icon2</span>
            <span>icon3</span>
            <span>icon4</span>
          </div>
        </div>
        <div className="grid col-span-4 border border-[red] p-14 bg-gray-500"></div>
      </section>
    </div>
  )
}

export default Gists