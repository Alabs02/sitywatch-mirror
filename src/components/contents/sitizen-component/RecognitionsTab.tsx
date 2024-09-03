import React, { useState } from "react"
import clsx from "clsx"
import { motion } from "framer-motion"

const notifications = [
  {
    id: 1,
    avatarSrc: "/coreAssets/Notifications/invested.jpeg",
    name: "Sylvester King",
    handle: "@investedsylvester",
    textDown: "13 mins ago",
    action: [
      "cited you in a gist",
      "started watching you",
      "looked at you",
      "just dropped a gist",
    ],
    icons: ["add_a_photo", "attach_file", "more_vert"],
  },
  {
    id: 2,
    avatarSrc: "/coreAssets/Notifications/afan.jpeg",
    name: "Another User",
    handle: "@another_user",
    textDown: "38 mins ago",
    action: [
      "started watching you",
      "cited you",
      "looked at you",
      "just dropped a gist",
    ],
    icons: ["add_a_photo", "send", "more_vert"],
  },
  {
    id: 3,
    avatarSrc: "/coreAssets/Notifications/afan.jpeg",
    name: "Afan Jalinda",
    handle: "@afanjalinda",
    textDown: "13 mins ago",
    action: [
      "looked at you",
      "cited you",
      "started watching you",
      "just dropped a gist",
    ],
    icons: ["add_a_photo", "attach_file", "more_vert"],
  },
  {
    id: 4,
    avatarSrc: "/coreAssets/Notifications/veechic.jpeg",
    name: "Vivian Ejiro",
    handle: "@veechic",
    textDown: "38 mins ago",
    action: [
      "just dropped a gist",
      "cited you",
      "started watching you",
      "looked at you",
    ],
    icons: ["add_a_photo", "send", "more_vert"],
  },
  {
    id: 5,
    avatarSrc: "/coreAssets/Notifications/yungboss.jpeg",
    name: "Nasir Gambo",
    handle: "@nasir_gambo",
    textDown: "13 mins ago",
    action: [
      "cited you",
      "started watching you",
      "looked at you",
      "just dropped a gist",
    ],
    icons: ["add_a_photo", "attach_file", "more_vert"],
  },
  {
    id: 6,
    avatarSrc: "/coreAssets/Notifications/datbrain.jpeg",
    name: "Another User",
    handle: "@another_user",
    textDown: "38 mins ago",
    action: [
      "cited you",
      "started watching you",
      "looked at you",
      "just dropped a gist",
    ],
    icons: ["add_a_photo", "send", "more_vert"],
  },
]

const RecognitionsTab = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.handle.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <motion.div
      className="space-y-4 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
    >
      {/* Search Input */}
      <div className="flex w-full items-center mb-4">
        <input
          type="text"
          placeholder="Enter handle"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-left text-sm md:text-base text-black pr-4 pl-2 py-2 bg-transparent outline-none placeholder-gray-500"
        />
        <span className="material-symbols-outlined text-black">search</span>
      </div>

      {/* Notification List */}
      {filteredNotifications.map((notification) => (
        <motion.div
          key={notification.id}
          className="flex items-start space-x-4"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src={notification.avatarSrc}
            alt={notification.name}
            className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
          />
          <div className="flex flex-col flex-grow">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm md:text-base text-black">
                  {notification.name}
                </span>
                <span className="text-secondary font-semibold">
                  {notification.handle}
                </span>
              </div>
              <button
                className={clsx(
                  "rounded-full border-2 px-4 py-1 text-xs md:text-sm font-bold",
                  notification.id % 2 === 0
                    ? "bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white"
                    : "border-primary-500 text-primary-500 bg-transparent",
                )}
              >
                {notification.id % 2 === 0 ? (
                  <span className="material-symbols-outlined text-white mr-1">
                    style
                  </span>
                ) : null}
                {notification.id % 2 === 0 ? "JOIN" : "SITIZEN"}
              </button>
            </div>
            <p className="text-gray-700 mt-2 text-xs md:text-sm">
              I am the kind of girl you can find in a Bond movie. Let's go
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default RecognitionsTab
