import React, { FC, useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"

export interface OptionsCardProps {
  onUpdateOptions: (updatedOptions: string[]) => void
  cardHeight: string
  isVisible: boolean
  onClose: () => void
  buttonRef: React.RefObject<HTMLButtonElement>
}

const OptionsCard: FC<OptionsCardProps> = ({
  isVisible,
  onClose,
  buttonRef,
  onUpdateOptions,
}) => {
  const controls = useAnimation()
  const optionsCardRef = useRef<HTMLDivElement>(null)
  const [options, setOptions] = useState([
    "Geography",
    "Literature",
    "Photography",
    "Movies",
  ])
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [newOption, setNewOption] = useState("")

  useEffect(() => {
    if (isVisible) {
      controls.start({ opacity: 1, y: -300, height: "auto" })
    } else {
      controls.start({ opacity: 0, y: -20, height: 0 })
    }
  }, [isVisible, controls])

  const handleEdit = (index: number) => {
    setEditIndex(index)
    setNewOption(options[index])
  }

  const handleSave = (index: number) => {
    const updatedOptions = [...options]
    updatedOptions[index] = newOption
    setOptions(updatedOptions)
    setEditIndex(null)
    onUpdateOptions(updatedOptions)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewOption(e.target.value)
  }

  return (
    <motion.div
      ref={optionsCardRef}
      initial={{ opacity: 0, y: -20, height: 0 }}
      animate={controls}
      transition={{ duration: 0.3 }}
      className="absolute top-full left-0 mt-2 max-w-md bg-none rounded-lg"
    >
      <div className="flex flex-wrap gap-2 rounded items-center justify-center">
        {options.map((option, index) => (
          <div
            key={option}
            className="flex items-center justify-between p-2 border-b border-gray-300 bg-black text-white rounded-lg"
          >
            {editIndex === index ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={newOption}
                  onChange={handleChange}
                  className="p-1 rounded text-black"
                />
                <button
                  onClick={() => handleSave(index)}
                  className="ml-2 text-green-500"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <span>{option}</span>
                <span
                  className="material-symbols-outlined text-primary-500 ml-2 cursor-pointer"
                  onClick={() => handleEdit(index)}
                >
                  edit
                </span>
              </>
            )}
          </div>
        ))}
      </div>
      {/* <button
        onClick={onClose}
        className="mt-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
      >
        Close
      </button> */}
    </motion.div>
  )
}

export default OptionsCard
