import Image from "next/image"

interface CardProps {
  title: string
  description: string
  details: string[]
  phone?: string
  address?: string
}

const CardWithImage: React.FC<CardProps> = ({
  title,
  description,
  details,
  phone,
  address,
}) => {
  return (
    <div className="container max-w-lg bg-white shadow-md rounded-lg overflow-hidden relative mx-auto">
      <div className="xl:flex flex-col p-6">
        <h3 className="text-lg xl:text-xl font-bold">{title}</h3>
        <p className="mt-2 text-gray-700 md:text-lg">{description}</p>
        <ul className="mt-4 list-disc space-y-2">
          {details.map((detail) => (
            <li key={detail} className="flex items-center">
              <span className="material-symbols-outlined text-gray-500 mr-2">
                link
              </span>
              <span className="text-[14px] md:text-sm lg:text-lg">
                {detail}
              </span>
            </li>
          ))}
        </ul>
        {phone && (
          <p className="mt-2 text-gray-700 md:text-lg">Phone: {phone}</p>
        )}
        {address && (
          <p className="mt-2 text-gray-700 md:text-lg">Address: {address}</p>
        )}
      </div>
      <div className="absolute bottom-0 right-0 h-16 md:h-24 w-16 md:w-24 rounded-full bg-white shadow-lg overflow-hidden">
        {/* Base layer for background effect (optional) */}
        <div
          className="absolute inset-0 bg-white opacity-75 z-0 rounded-full"
          style={{ width: "100%", height: "100%" }}
        />
        <Image
          src="/tourneys-banner.png"
          alt="Tourney Banner"
          className="object-cover"
          width={200}
          height={200}
        />
      </div>
    </div>
  )
}

export default CardWithImage
