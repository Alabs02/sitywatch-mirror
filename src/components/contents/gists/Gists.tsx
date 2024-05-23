import React from 'react'

import bookmarksData from "@/../../data.json"

interface Bookmarks {
  id: number
  avatarSrc: string
  handle: string
  university: string
  role: string
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
          className="flex space-y-4 w-full h-full mt-4 ml-2"
          key={bookmark.id}
        >
          <div className="flex justify-between w-full h-full items-center">
            <div className="flex">
              <img
                src={bookmark.avatarSrc}
                alt={bookmark.role}
                className="h-12 w-12 object-cover rounded-full ring-gradient mr-2"
              />
              <div>
                <div className="text-green-600">{bookmark.handle}</div>
                <div className="flex items-center">
                  <div className="mx-2">{bookmark.university}</div>
                  <div className='flex items-center'>
                    <span className="h-1 w-1 bg-slate-700 mx-1 rounded-full"></span>
                    <div>{bookmark.role}</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className="material-symbols-outlined">
                {bookmark.icons[0]}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Gists