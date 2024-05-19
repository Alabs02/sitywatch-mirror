import React from "react"

interface PandaCardProps {
  icon: string
  image: string
  title: string
  description: string
}

const PandPollContent: React.FC<PandaCardProps> = ({
  icon,
  image,
  title,
  description,
}) => {
  return (
    <div className="border border-tertiary-400 bg-neutral-200 p-3 rounded-lg gap-y-4 mx-12 my-4">
      <div className="flex items-center">
        <span className="material-symbols-outlined text-3xl mr-2 bg-gradient-to-b from-[#F24055] to-[#1E7881] bg-clip-text text-transparent cursor-pointer">
          {icon}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-2">
        <div className=" rounded-full shadow-md overflow-hidden w-[60px] h-[60px] p-3 bg-white">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain rounded-full"
          />
        </div>
        <div className="flex flex-col place-content-center text-center gap-y-2">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default PandPollContent
