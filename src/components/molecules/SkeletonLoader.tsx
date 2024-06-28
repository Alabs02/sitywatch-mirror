// components/SkeletonLoader.tsx
import React from "react"
import clsx from "clsx"

const SkeletonLoader: React.FC<{ className?: string }> = ({ className }) => (
  <div className={clsx("bg-gray-300 animate-pulse", className)} />
)

export default SkeletonLoader
