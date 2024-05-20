import React from "react"

interface AvatarWithTextsAndIconProps {
  avatarSrc: string
  textUp: string
  textDown: string
  icon: string
  iconText: string
  action: string
}

const AvatarWithTextsAndIcon: React.FC<AvatarWithTextsAndIconProps> = ({
  avatarSrc,
  textUp,
  textDown,
  icon,
  iconText,
  action,
}) => {
  return (
    <div className="flex items-center justify-between my-4">
      <div className="rounded-full h-10 w-10 flex justify-center items-center border border-double border-[#F24055] bg-gradient-to-t from-[#F24055] to-[#1E7881]">
        <img
          src={avatarSrc}
          alt="avatar"
          className="rounded-full object-cover w-full h-full"
        />
        {icon && iconText && (
          <div className="absolute top-0 right-0 flex items-center mr-1 mt-1">
            {icon}
            <span className="text-xs text-white">{iconText}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-green-700 font-semibold text-sm flex space-x-2">
          {textUp}
          <span className="text-sm text-tertiary-600">{action}</span>
        </div>
        <span className="text-sm italic">{textDown}</span>
      </div>
    </div>
  )
}

export default AvatarWithTextsAndIcon
