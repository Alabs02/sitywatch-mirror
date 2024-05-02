// import Image from "next/image";

// LAYOUTS
import { AppLayout } from "@/layouts";
import { FC, ReactNode } from "react";

const Home: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )
}

export default Home;
