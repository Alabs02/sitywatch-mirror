// Assuming you import useState and useEffect from React
import React, { useState, useEffect } from "react"
import bookmarksData from "@/../../data.json"

interface Bookmarks {
  id: number
  avatarSrc: string
  handle: string
  university: string
  role: string
  time: string
  gist: string
  icons: string[]
  gif: string
  gist_stats: string
  emoji: string
  emoji_count: number
  share_count: string
  additionalContent?: {
    text?: string // Make text optional
    emoji?: { black: string; yellow: string }
    icons?: string[]
  }
}

const Gists: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<Bookmarks[]>([])

  useEffect(() => {
    setBookmarks(bookmarksData.bookmarks as Bookmarks[])
  }, [])

  const toggleEmoji = (index: number) => {
    const updatedBookmarks = [...bookmarks]
    const emojiKey =
      updatedBookmarks[index].emoji ===
      updatedBookmarks[index].additionalContent?.emoji?.black
        ? "yellow"
        : "black" // Use optional chaining
    updatedBookmarks[index].emoji =
      updatedBookmarks[index].additionalContent?.emoji?.[emojiKey] ?? "" 
    setBookmarks(updatedBookmarks)
  }

  return (
    <div>
      {bookmarks.map((bookmark, index) => (
        <div
          className="flex flex-col space-y-2 w-full h-full mt-2 bg-neutral-400 p-1 rounded-md overflow-y-auto"
          key={bookmark.id}
        >
          <div className="flex justify-between w-full h-full items-center">
            <div className="flex items-center">
              <img
                src={bookmark.avatarSrc}
                alt={bookmark.role}
                className="h-16 w-16 object-cover rounded-full ring-gradient mr-2"
              />
              <div className="text-sm">
                <div className="text-green-600">{bookmark.handle}</div>
                <div className="flex items-center">
                  <div className="mr">{bookmark.university}</div>
                  <div className="flex items-center">
                    <span className="h-1 w-1 bg-slate-700 mx-1 rounded-full"></span>
                    <div>{bookmark.role}</div>
                  </div>
                </div>
                <h4 className="text-[12px]">{bookmark.time}</h4>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="material-symbols-outlined">
                {bookmark.icons[0]}
              </span>
            </div>
          </div>
          <section className="">
            <span className="text-[16px] leading-tight tracking-tight">
              {bookmark.gist}
            </span>
            <div className="">
              <img src={bookmark.gif} alt={bookmark.role} className="my-1" />
              <div className="border-t border-b border-tertiary-200 flex items-center justify-between p-1">
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-red-400">
                    {bookmark.icons[1]}
                  </span>
                  <span className="text-sm italic">{bookmark.gist_stats}</span>
                </div>
                <div className="inline-flex items-center space-x-4">
                  <div className="flex items-center  space-x-2">
                    <span className="inline-flex items-center text-2xl">
                      {bookmark.emoji}
                      <p className="text-[10px] ml-1">555</p>
                    </span>
                    <span className="material-symbols-outlined">
                      {bookmark.additionalContent?.icons?.[0]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Add the new emojis and icons to the div below */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 p-1">
                <span
                  onClick={() => toggleEmoji(index)}
                  className="text-2xl flex items-center" // Adjust emoji size and align items
                >
                  {bookmark.additionalContent?.emoji &&
                    (bookmark.emoji === bookmark.additionalContent.emoji.black
                      ? bookmark.additionalContent.emoji.black
                      : bookmark.additionalContent.emoji.yellow)}
                </span>
                <span className="material-symbols-outlined">
                  {bookmark.additionalContent?.icons?.[0]}
                </span>
                <span className="material-symbols-outlined">
                  {bookmark.additionalContent?.icons?.[1]}
                </span>
              </div>
              <div className="flex items-center p-1">
                <span className="material-symbols-outlined">bookmark</span>
              </div>
            </div>
          </section>
        </div>
      ))}
    </div>
  )
}

export default Gists
