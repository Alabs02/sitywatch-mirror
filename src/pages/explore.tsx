// import Image from "next/image";

// LAYOUTS
import { AppLayout } from "@/layouts"
import { FC, ReactNode } from "react"

const Explore: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="grid w-full h-full pr-5 ">
      <div className="w-full h-full grid shadow-inner shadow-gray-400/75 border rounded-t-[32px] px-5 lg:p-6">
        <section className="h-full w-full grid grid-cols-12">
          
        </section>
        <section className="mt-8">
          
        </section>
        <section className="mt-8">
          <h1 className="font-bold">
            Bottom of the top
          </h1>
          <div className="grid grid-cols-2 gap-x-2 ">
            <div className="grid col-span-1 border border-[red] p-24"></div>
            <div className="grid col-span-1 border border-[red] p-24"></div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Explore
