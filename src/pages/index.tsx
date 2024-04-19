// import Image from "next/image";

// LAYOUTS
import { AppLayout } from "@/layouts";

export default function Home() {
  return (
    <div className="min-h-screen text-tertiary bg-neutral">
      <AppLayout.Header>
        <nav>Nav component goes here</nav>
      </AppLayout.Header>

      <AppLayout.Main>
        <div>Content goes here</div>
      </AppLayout.Main>

      <AppLayout.Footer>
        <div>Footer component goes here</div>
      </AppLayout.Footer>
    </div>
  )
}
