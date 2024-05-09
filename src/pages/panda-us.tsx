import React from 'react'

const PandaUs = () => {
  return (
    <div className="w-full h-full px-4">
      <div className="w-full h-full grid grid-cols-12 gap-x-6">
        <section className="grid col-span-7 p-4">
          <div className="shadow-inner shadow-gray-400/75 border rounded-t-[32px]">
            {/* <span className="bg-gray-500 w-full">Nav Tabs</span> */}
          </div>
        </section>
        <section className="grid col-span-5 w-full h-full border border-red-400"></section>
      </div>
    </div>
  )
}

export default PandaUs