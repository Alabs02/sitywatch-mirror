import React from "react"
import gistsData from "../../data.json"

interface Gist {
  id: number
  avatarSrc: string
  textUp: string
  textDown: string
  content: string
  icons: string[]
}

const Gists: React.FC = () => {
  const gists = gistsData.rightSection.gists as Gist[]

  return (
    <div className="w-full h-full border border-[red] px-6">
      {gists.map((gist: Gist) => (
        <section key={gist.id} className="grid grid-cols-12 gap-x-6">
          <div className="grid col-span-8 border border-[red] p-4 bg-gray-200 shadow-lg rounded-md">
            <div className="flex items-center space-x-2 my-2">
              <div className="rounded-full h-12 w-12 flex justify-center items-center inset-0 border border-double border-[#F24055] bg-gradient-to-t from-[#F24055] to-[#1E7881]">
                <img
                  src={gist.avatarSrc}
                  alt="avatar"
                  className="rounded-full h-10 w-10 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-green-700 font-semibold">
                  {gist.textUp}
                </span>
                <div className="flex">
                  <span>{gist.textDown}</span>
                  <span className="material-symbols-outlined">
                    arrow_drop_down
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col bg-gray-100 shadow-inner shadow-gray-400/75 py-2 px-2 rounded-t-[10px]">
              <span className="material-symbols-outlined text-tertiary-200 text-lg">
                person_pin_circle
              </span>{" "}
              <h4 className="p-1 text-tertiary-300 text-sm">{gist.content}</h4>
            </div>
            <div className="flex items-center justify-around mt-4">
              {gist.icons.map((icon, index) => (
                <span key={index} className="material-symbols-outlined">
                  {icon}
                </span>
              ))}
            </div>
          </div>
          <div className="grid col-span-4 border border-[red] p-14 bg-gray-200 place-content-center">
            <h1>CONTENT</h1>
          </div>
        </section>
      ))}
    </div>
  )
}

export default Gists
