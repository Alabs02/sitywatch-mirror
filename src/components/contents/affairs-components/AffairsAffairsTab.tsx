import React from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

interface EventCardProps {
  imageSrc?: string;
  link: string;
  description?: string;
  subscript?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  imageSrc,
  link,
  description,
  subscript,
}) => {
  return (
    <Link href={link} className="block w-full h-full">
      <div
        className={clsx(
          "relative w-full h-36 flex flex-col items-center justify-center rounded-md shadow-md",
          link === "/add-affairs" ? "bg-neutral-600" : ""
        )}
      >
        {link === "/add-affairs" ? (
          <>
            <span className="material-symbols-outlined text-neutral-700 text-6xl mb-2">
              add_circle
            </span>
            <p className="text-white text-center text-sm">Add a new affair</p>
          </>
        ) : (
          <Image
            src={imageSrc!}
            alt="Event"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        )}
      </div>
      {link !== "/add-affairs" && (
        <p className="text-blue-700 mt-2 text-sm font-semibold md:ml-2">
          <span className="align-text-top text-[6px] md:text-[8px]">
            {subscript}
          </span>
          <span className="align-baseline text-[10px] md:text-base">
            #{description}
          </span>
        </p>
      )}
    </Link>
  );
};

const AffairsAffairsTab: React.FC = () => {
  const eventCards = [
    {
      link: "/add-affairs",
    },
    {
      imageSrc: "/swa-card-1.svg",
      link: "/events/event-2",
      subscript: "PRD",
      description: "Event_2_Description",
    },
    {
      imageSrc: "/swa-card-2.svg",
      link: "/events/event-3",
      subscript: "SRV",
      description: "Event_3_Description",
    },
    {
      imageSrc: "/swa-card-3.svg",
      link: "/events/event-4",
      subscript: "TNY",
      description: "Event_4_Description",
    },
    {
      imageSrc: "/swa-card-4.svg",
      link: "/events/event-5",
      subscript: "PRD",
      description: "Event_5_Description",
    },
    {
      imageSrc: "/swa-card-5.svg",
      link: "/events/event-6",
      subscript: "SRV",
      description: "Event_6_Description",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:gap-4 gap-2 md:p-4 p-2 rounded-md shadow-md">
      {eventCards.map((card, index) => (
        <EventCard
          key={index}
          imageSrc={card.imageSrc}
          link={card.link}
          subscript={card.subscript}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default AffairsAffairsTab;
