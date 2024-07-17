import React, { useState } from "react"

interface TagSelectorProps {
  options: string[]
  preselectedOptions: string[]
  onChange: (tags: string[]) => void
}

const TagSelector: React.FC<TagSelectorProps> = ({
  options,
  preselectedOptions,
  onChange,
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>(preselectedOptions)

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag]

    setSelectedTags(newTags)
    onChange(newTags)
  }

  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {options.map((tag) => (
        <div
          key={tag}
          className={`cursor-pointer px-3 py-1 border rounded-full flex items-center ${
            selectedTags.includes(tag)
              ? "bg-secondary text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => toggleTag(tag)}
        >
          {tag}
          {selectedTags.includes(tag) && (
            <span
              className="ml-2 text-sm text-white cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                toggleTag(tag)
              }}
            >
              ×
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export default TagSelector
