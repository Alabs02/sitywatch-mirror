import React, { useEffect } from "react"
import { useRouter } from "next/router"

const Tourneys: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    // Set the collapse state to true when the component mounts
    router.prefetch("/tourneys?collapsed=true")
    router.push("/tourneys?collapsed=true")
  }, [])

  return <div>Tourneys</div>
}

export default Tourneys
