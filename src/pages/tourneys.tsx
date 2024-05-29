import React, { useEffect } from "react"
import { useRouter } from "next/router"

const LeftSide: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto h-screen p-2">
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
      <h1>left</h1>
    </div>
  )
}

const RightSide: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-200">
      {/* Content for the right side */}
      {/* This side will remain static */}
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
    <div className="flex">
      <LeftSide />
      <RightSide />
    </div>
  )
}

export default Tourneys
