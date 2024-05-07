// import Image from "next/image";

// LAYOUTS
import { AppLayout } from "@/layouts";
import { FC, ReactNode } from "react";

const Home: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="grid w-full h-full pr-5 ">
      <div className="w-full h-full grid shadow-inner shadow-gray-400/75 border rounded-t-[32px] px-5 lg:p-6">
        <section className="h-full w-full grid grid-cols-12">
          <div className="grid col-span-8 border border-bg-[red] bg-orange-400 p-16 rounded-lg">
            left
          </div>
          <div className="col-span-4 border border-bg-[red] bg-orange-700 p-16 rounded-lg">
            right
          </div>
        </section>
        <section className="mt-8">
          <h1 className="font-bold">
            Suggested Tourneys That Might Interest You
          </h1>
          <div className="grid grid-cols-12 w-full gap-x-2 ">
            <div className="grid col-span-4 border border-[red] p-24"></div>
            <div className="grid col-span-4 border border-[red] p-24"></div>
            <div className="grid col-span-4 border border-[red] p-24"></div>
          </div>
        </section>
        <section className="mt-8">
          <h1 className="font-bold">
            Suggested Tourneys That Might Interest You
          </h1>
          <div className="grid grid-cols-12 w-full gap-x-2 ">
            <div className="grid col-span-4 border border-[red] p-24"></div>
            <div className="grid col-span-4 border border-[red] p-24"></div>
            <div className="grid col-span-4 border border-[red] p-24"></div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home;
