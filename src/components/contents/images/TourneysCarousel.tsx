import React, { useState } from "react"

// Dummy images (replace with your own)
const images = [
  "https://dummyimage.com/600x400",
  "https://dummyimage.com/600x400",
  "https://dummyimage.com/600x400",
  "https://dummyimage.com/600x400",
  "https://dummyimage.com/600x400",
]

const TourneysCarousel: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const handlePrev = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    )
  }

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    )
  }

  const getPreviousIndex = (index: number) =>
    index === 0 ? images.length - 1 : index - 1
  const getNextIndex = (index: number) =>
    index === images.length - 1 ? 0 : index + 1

  return (
    <div className="max-w-full mx-auto mt-4 relative overflow-hidden px-4">
      <div className="relative flex justify-center items-center">
        {/* Left blurred image */}
        <img
          src={images[getPreviousIndex(selectedImageIndex)]}
          alt={`Image ${getPreviousIndex(selectedImageIndex) + 1}`}
          className="w-1/4 object-cover blur-sm transform scale-90"
          style={{ zIndex: 9 }}
        />
        {/* Emphasized image */}
        <img
          src={images[selectedImageIndex]}
          alt={`Image ${selectedImageIndex + 1}`}
          className="w-1/3 rounded-lg shadow-lg z-20 transform scale-110 mx-2"
          style={{ position: "relative" }}
        />
        {/* Right blurred image */}
        <img
          src={images[getNextIndex(selectedImageIndex)]}
          alt={`Image ${getNextIndex(selectedImageIndex) + 1}`}
          className="w-1/4 object-cover blur-sm transform scale-90"
          style={{ zIndex: 9 }}
        />
        {/* Left arrow */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-gray-800 p-2 rounded-full z-30"
        >
          &#8592;
        </button>
        {/* Right arrow */}
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-gray-800 p-2 rounded-full z-30"
        >
          &#8594;
        </button>
      </div>
      {/* Thumbnails */}
      <div className="flex justify-center mt-4 space-x-4 z-20">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className={`cursor-pointer rounded-lg shadow-sm transition-all duration-300 ${
              index === selectedImageIndex
                ? "transform scale-110 border-4 border-blue-500"
                : "opacity-50"
            }`}
            onClick={() => setSelectedImageIndex(index)}
            style={{ width: "80px", height: "60px" }}
          />
        ))}
      </div>
    </div>
  )
}

export default TourneysCarousel
