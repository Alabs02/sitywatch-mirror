import React, { FC, useState, useEffect } from "react"
import { FormData } from "@/types" // Adjust the path as necessary

interface StepProps {
  onBack: () => void
  onNext: (formData: FormData) => void // Pass formData to onNext
  formData: FormData
}

const AffairsServiceStep4: FC<StepProps> = ({ onBack, onNext, formData }) => {
  const [highlightImage, setHighlightImage] = useState<File | undefined>(
    undefined,
  )
  const [highlightImageUrl, setHighlightImageUrl] = useState<
    string | undefined
  >()

  useEffect(() => {
    if (highlightImage) {
      try {
        const url = URL.createObjectURL(highlightImage)
        setHighlightImageUrl(url)

        return () => {
          URL.revokeObjectURL(url)
        }
      } catch (error) {
        console.error("Failed to create object URL for highlight image:", error)
        setHighlightImageUrl(undefined)
      }
    } else {
      setHighlightImageUrl(undefined)
    }
  }, [highlightImage])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : undefined
    setHighlightImage(file)
    if (file) {
      setHighlightImageUrl(URL.createObjectURL(file))
    }
  }

  const handleNext = () => {
    onNext({ ...formData, highlightImage }) // Manually trigger the next step
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Upload a highlight for your event
      </h2>
      <p className="text-sm text-center mb-4 italic">
        Using a highlight for your event will give it an authentic and aesthetic
        look. It should be something that captivates people about your event.
      </p>

      <div
        className="relative w-full h-64 bg-dark-gray rounded-lg border border-gray-300 overflow-hidden cursor-pointer"
        onClick={() => document.getElementById("file-input")?.click()}
      >
        {highlightImageUrl ? (
          <img
            src={highlightImageUrl}
            alt="Highlight"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-gray-500">
            <span className="material-symbols-outlined text-4xl">
              add_a_photo
            </span>
            <p className="mt-2">Click to upload image</p>
          </div>
        )}
        <input
          id="file-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={onBack}
          className="p-2 bg-gray-300 text-black rounded-lg"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="p-2 bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default AffairsServiceStep4
