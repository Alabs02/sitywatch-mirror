import React, { useEffect } from "react"
import { useRouter } from "next/router"
import Btn from "@/components/molecules/Btn"
import CardWithWithImage from "@/components/molecules/CardWithRoundedImage"

const LeftSide: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto h-screen p-2">
      <div>
        <img src="/tourneys-banner.png" alt="tourneys-banner" />
      </div>
      <h1 className="flex justify-center mt-2 text-green-700 text-sm font-semibold">
        #SWPA_SC2023
      </h1>
      <div className="flex space-x-4 items-center justify-center">
        <span>Media</span>
        <span className="inline-block h-[1px] w-[1px] bg-black rounded-full p-[2px] mt-2"></span>
        <span>Photography</span>
      </div>
      <h3 className="flex justify-center mt-2 text-center text-sm tracking-tight">
        Providing a platform for photography students worldwide - first prize is
        top Sony digital imaging equipment.
      </h3>
      <div className="flex justify-between items-center mt-2 px-4">
        <div>
          <Btn isCollapsed={false} />
        </div>
        <div className="flex space-x-4">
          <span className="material-symbols-outlined">preview</span>
          <span className="material-symbols-outlined">
            notifications_active
          </span>
          <span className="material-symbols-outlined">more_vert</span>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-12 mt-2">
        <div className="flex flex-col space-y-1 items-center">
          <h2 className="font-bold text-sm">199</h2>
          <p className="text-sm text-slate-500">Affiliate</p>
        </div>
        <span className="inline-block h-[1px] w-[1px] bg-black rounded-full p-[3px]"></span>

        <div className="flex flex-col space-y-1 items-center">
          <h2 className="font-bold text-sm">199</h2>
          <p className="text-sm text-slate-500">Affiliate</p>
        </div>
        <span className="inline-block h-[1px] w-[1px] bg-black rounded-full p-[3px]"></span>

        <div className="flex flex-col space-y-1 items-center">
          <h2 className="font-bold text-sm">199</h2>
          <p className="text-sm text-slate-500">Affiliate</p>
        </div>
      </div>
      <div className="mt-4">
        <CardWithWithImage
          title="Upcoming Tournaments"
          description="Join the competition and win big!"
          details={[
            "Compete with other players",
            "Multiple game modes available",
            "Earn rewards and prizes",
          ]}
        />
      </div>
      <span className="flex justify-end mt-2 text-green-700 text-sm font-semibold">
        #SWPA_SC2023
      </span>
    </div>
  )
}

const RightSide: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-200  shadow-inner shadow-gray-400/75 py-2 px-4 rounded-t-[10px] overflow-y-auto">
      <h1 className="flex justify-center mt-2 text-sm font-bold">
        STUDENT COMPETITION
      </h1>
      <span className="flex justify-center mt-2 text-sm text-center">
        Providing a platform for photography students worldwide - first prize is
        top Sony digital imaging equipment.
      </span>
      <h3 className="font-bold text-sm mt-2 px-2">Brief:</h3>
      <p className="text-[14px] mt-2 tracking-wider font-medium px-2">
        In a Changing World. <br /> For this year’s student competition, we’re
        asking entrants to consider the theme In a Changing World. <br /> Our
        world is changing rapidly, and we are looking for photographers who can
        show us positive stories of development and progress. This could
        encapsulate a whole range of different topics; from the environment, to
        technology, to the way we work and live. <br /> You may wish to focus on
        how we have shifted working patterns and office set-ups, how we are
        responding to the climate crisis in a more conscientious way or even
        particular advancements in technology and research. <br /> In five to 10
        images depict how you, or someone you document, are responding to the
        changes around them. <br />
        Your images can be taken on any device, shot in any style – be black &
        white or colour – and approached from whichever angle you feel is best.{" "}
        <br />
        While creative responses are encouraged, it’s key to stick to the brief.{" "}
        <br />
        If your institution is not registered yet, you can register here. <br />{" "}
        For information relating to this year’s brief or any other questions
        please email Panos Pomonis at panagiotis@worldphoto.org *A programme
        refers to a formalised photography course/ credit/module/foundation
        which is taught at higher education level, within a diploma / Bachelor
        of Arts / Master of Arts curriculum.
      </p>
      <h3 className="font-bold text-sm mt-2">Prizes:</h3>
      <h5>Overall winner:</h5>
      <ul className="text-[14px] mt-2 tracking-wider font-medium ml-4 list-disc">
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
          voluptate!
        </li>
        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</li>
        <li>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione,
          quia delectus. Veniam?
        </li>
        <li>Lorem ipsum dolor sit amet.</li>
        <li>Lorem ipsum dolor sit amet consectetur.</li>
        <li>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae,
          rerum.
        </li>
        <li>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
          eveniet ipsa eos illo quo.
        </li>
        <li>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos, soluta?
          Error, architecto.
        </li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
        <li>Lorem ipsum dolor sit.</li>
      </ul>
      <h5>Overall winner's institution/university:</h5>
      <ul className="text-[14px] mt-2 tracking-wider font-medium ml-4 list-disc">
        <li>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel, at!
        </li>
      </ul>
    </div>
  )
}

const Tourneys: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    const query = { collapsed: true }
    router.push({ pathname: "/tourneys", query })
  }, [])

  return (
    <div className="flex bg-gray-100 shadow-inner shadow-gray-400/75 py-2 px-2 rounded-t-[10px]">
      <LeftSide />
      <RightSide />
    </div>
  )
}

export default Tourneys
