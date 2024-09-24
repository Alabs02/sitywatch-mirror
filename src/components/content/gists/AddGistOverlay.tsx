import React, { useState } from "react"

// Define the types here
interface Gist {
  id: string
  avatarSrc: string
  textUp: string
  textDown: string
  content: string
  isFocused: boolean
  icons: string[]
}

interface GistItemProps {
  gist: Gist
  handleContentChange: (value: string, id: string) => void
  handleFocus: (id: string) => void
  handleBlur: (id: string) => void
}

const AddGistOverlay: React.FC<GistItemProps> = ({
  gist,
  handleContentChange,
  handleFocus,
  handleBlur,
}) => {
  const [isOverlayOpen, setOverlayOpen] = useState(false)

  const toggleOverlay = () => setOverlayOpen(!isOverlayOpen)

  return (
    <>
      {/* Gist Item */}
      <div className="bg-neutral-300 shadow-md rounded-md p-2">
        <div className="flex items-center justify-between my-1 md:my-2">
          <div className="flex items-center space-x-2">
            <div className="rounded-full h-14 w-14 lg:h-16 lg:w-16 flex justify-center items-center inset-0 border border-double border-[#F24055] bg-gradient-to-t from-[#F24055] to-[#1E7881]">
              <img
                src={gist.avatarSrc}
                alt="avatar"
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-green-700 font-semibold text-[12px] lg:text-sm">
                {gist.textUp}
              </span>
              <div className="flex items-center">
                {/* Text and Dropdown together */}
                <span className="text-[12px] lg:text-sm">{gist.textDown}</span>
                <span className="material-symbols-outlined ml-1">
                  arrow_drop_down
                </span>
              </div>
            </div>
          </div>

          {/* Gist button */}
          <button className="bg-gradient-to-t from-[#F24055] to-[#1E7881] text-white rounded-md px-2 py-1 text-xs lg:text-sm">
            Gist
          </button>
        </div>

        <div className="flex flex-col bg-neutral-300 shadow-inner shadow-gray-400/75 py-2 px-2 rounded-t-[10px]">
          <span className="material-symbols-outlined text-tertiary-200 text-lg lg:text-xl">
            person_pin_circle
          </span>{" "}
          <textarea
            className="p-1 text-tertiary-300 text-[12px] lg:text-sm bg-transparent border-none focus:outline-none resize-none"
            value={gist.content}
            onChange={(e) => handleContentChange(e.target.value, gist.id)}
            onFocus={() => handleFocus(gist.id)}
            onBlur={() => handleBlur(gist.id)}
            placeholder={
              gist.isFocused
                ? ""
                : "Hey Nasir, let people know the latest gist. Add pics, vids, voice-notes, hashtags or cite others if you like"
            }
            rows={3}
          />
        </div>

        <div className="flex items-center justify-around mt-2 lg:mt-4">
          {gist.icons.map((icon, index) => (
            <span
              key={index}
              className="material-symbols-outlined text-sm lg:text-lg"
            >
              {icon}
            </span>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isOverlayOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
            {/* Overlay Content */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Drop a Gist</h2>
              <button onClick={toggleOverlay} className="text-lg">
                ✕
              </button>
            </div>
            <p>Your gist content here...</p>
          </div>
        </div>
      )}
    </>
  )
}

export default AddGistOverlay
