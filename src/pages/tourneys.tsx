import React, { useEffect } from "react"
import { useRouter } from "next/router"

const Tourneys: React.FC = () => {
  const router = useRouter()
  const { cardId } = router.query

  useEffect(() => {
    const query = { collapsed: true }
    router.push({ pathname: "/tourneys", query })
  }, [])

  return <div>Tourneys</div>
}

export default Tourneys
