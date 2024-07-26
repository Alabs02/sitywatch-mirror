// ProfileImage.tsx
import React from "react"

interface ProfileImageProps {
  src: string
  ringColor: string
  ringThickness: string
  size: string
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  ringColor,
  ringThickness,
  size,
}) => {
  return (
    <div
      className={`relative ${size} ${ringThickness} rounded-full border border-transparent bg-gradient-to-r ${ringColor}`}
    >
      <img
        src={src}
        alt="Profile"
        className="rounded-full w-full h-full object-cover"
      />
    </div>
  )
}

export default ProfileImage
