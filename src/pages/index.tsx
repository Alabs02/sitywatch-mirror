// import Image from "next/image";

// LAYOUTS
import { AppLayout } from "@/layouts";

export default function Home() {
  return (
    <div className="min-h-screen text-tertiary bg-neutral">
      <div className="grid grid-cols-12">
        {" "}
        {/* Define a 12-column grid */}
        <AppLayout.Header className="col-span-full">
          {" "}
          {/* Header spans all columns */}
          <nav>Nav component goes here</nav>
        </AppLayout.Header>
        <AppLayout.SidePane className="col-span-3">
          {" "}
          {/* SidePane takes 3 columns */}
          {/* SidePane content goes here */}
        </AppLayout.SidePane>
        <AppLayout.Main className="col-span-9">
          {" "}
          {/* Main content takes 9 columns */}
          <div>Content goes here</div>
        </AppLayout.Main>
      </div>
    </div>
  )
}
