import React from 'react'

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
}

const Gists: React.FC = () => {
  const bookmarks = bookmarksData.bookmarks as Bookmarks[]

  return (
    <div>
      {bookmarks.map((bookmark) => (
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
                {/* <span>span> */}
              </div>
            </div>
            <div>
              <span className="material-symbols-outlined">
                {bookmark.icons[0]}
              </span>
            </div>
          </div>
          <section className="">
            <span className='text-[16px] leading-tight tracking-tight'>{bookmark.gist}</span>
            <div>
              <img src={bookmark.gif} alt={bookmark.role} className='my-1' />
              <div className="border-t border-b border-tertiary-200 flex items-center justify-between">
                <div className="flex place-content-center">
                  <span className="material-symbols-outlined text-red-400">
                    {bookmark.icons[1]}
                  </span>
                  <span className="text-sm italic ml-1">
                    {bookmark.gist_stats}
                  </span>
                </div>
                <div className="inline-flex items-center space-x-4">
                  <span className="">
                    {bookmark.emoji}
                    <span className="text-[10px]">555</span>
                  </span>
                  <div className='flex items-center'>
                    <span className="material-symbols-outlined text-lg text-green-500">
                      {bookmark.icons[2]}
                    </span>
                    <span className='text-sm'>{bookmark.share_count}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ))}
    </div>
  )
}

export default Gists