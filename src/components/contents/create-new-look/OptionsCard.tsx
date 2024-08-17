import React, { FC, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"

interface OptionsCardProps {
  isVisible: boolean
  onClose: () => void
  buttonRef: React.RefObject<HTMLButtonElement>
}

const OptionsCard: FC<OptionsCardProps> = ({
  isVisible,
  onClose,
  buttonRef,
}) => {
  const controls = useAnimation()
  const optionsCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isVisible) {
      controls.start({ opacity: 1, y: -230, height: "auto" })
    } else {
      controls.start({ opacity: 0, y: -20, height: 0 })
    }
  }, [isVisible, controls])

  return (
    <motion.div
      ref={optionsCardRef}
      initial={{ opacity: 0, y: -20, height: 0 }}
      animate={controls}
      transition={{ duration: 0.3 }}
      className="absolute top-full left-0 mt-2 max-w-md bg-transparent shadow-none rounded-lg"
    >
      <div className="flex flex-wrap gap-2 rounded items-center justify-center">
        {["Geography", "Literature", "Photography", "Movies"].map((option) => (
          <div
            key={option}
            className="flex items-center justify-between p-2 border-b border-gray-300 bg-black text-white rounded-lg"
          >
            <span>{option}</span>
            <span className="material-symbols-outlined text-primary-500 ml-2">edit</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default OptionsCard
