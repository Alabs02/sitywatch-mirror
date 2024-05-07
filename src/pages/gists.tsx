import React from 'react'

const Gists = () => {
  return (
    <div className="w-full h-full px-14 border border-[red] p-2 grid gap-y-4">
      <section className="grid grid-cols-12 gap-x-14">
        <div className="grid col-span-8 border border-[red] p-14 bg-gray-300 shadow-lg rounded-md">
          <div className="bg-gray-300 shadow-inner shadow-gray-400/75 py-6 px-2">
            <h4>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus.
            </h4>
          </div>
        </div>
        <div className="grid col-span-4 border border-[red] p-14 bg-gray-500"></div>
      </section>
      <section className="grid grid-cols-12 gap-x-14">
        <div className="grid col-span-8 border border-[red] p-14 bg-gray-300 shadow-lg rounded-md">
          <div className="bg-gray-300 shadow-inner shadow-gray-400/75 py-6 px-2">
            <h4>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus.
            </h4>
          </div>
        </div>
        <div className="grid col-span-4 border border-[red] p-14 bg-gray-500"></div>
      </section>{" "}
      <section className="grid grid-cols-12 gap-x-14">
        <div className="grid col-span-8 border border-[red] p-14 bg-gray-300 shadow-lg rounded-md">
          <div className="bg-gray-300 shadow-inner shadow-gray-400/75 py-6 px-2">
            <h4>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus.
            </h4>
          </div>
        </div>
        <div className="grid col-span-4 border border-[red] p-14 bg-gray-500"></div>
      </section>
    </div>
  )
}

export default Gists