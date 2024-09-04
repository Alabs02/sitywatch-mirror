import React, { useState } from "react"

// Dummy images (replace with your own)
const images = [
  "/sitadel/srv-5.svg",
  "/sitadel/srv-4.svg",
  "/sitadel/srv-1.svg",
  "/sitadel/srv-2.svg",
  "/sitadel/srv-3.svg",
]

const SitadelServicesCarousel: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(2)

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
    <div className="max-w-full mx-auto mt-2 relative overflow-hidden px-4">
      <div className="relative flex justify-center items-center h-40 md:h-96">
        {/* Left blurred image */}
        <img
          src={images[getPreviousIndex(selectedImageIndex)]}
          alt={`Image ${getPreviousIndex(selectedImageIndex) + 1}`}
          className="absolute w-1/3 md:w-1/4 object-cover blur-sm transform scale-90 transition-opacity duration-500 ease-in-out opacity-50"
          style={{ left: "10%", zIndex: 5 }}
        />
        {/* Emphasized image */}
        <img
          src={images[selectedImageIndex]}
          alt={`Image ${selectedImageIndex + 1}`}
          className="absolute w-1/2 md:w-1/3 rounded-lg shadow-lg transform scale-90 md:scale-75 transition-transform duration-500 ease-in-out z-10"
          style={{ left: "50%", transform: "translateX(-50%)" }}
        />
        {/* Right blurred image */}
        <img
          src={images[getNextIndex(selectedImageIndex)]}
          alt={`Image ${getNextIndex(selectedImageIndex) + 1}`}
          className="absolute w-1/3 md:w-1/4 object-cover blur-sm transform scale-90 transition-opacity duration-500 ease-in-out opacity-50"
          style={{ right: "10%", zIndex: 5 }}
        />
        {/* Left arrow */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full z-20"
        >
          &#8592;
        </button>
        {/* Right arrow */}
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full z-20"
        >
          &#8594;
        </button>
      </div>
      {/* Thumbnails */}
      <div className="flex justify-center mt-2 space-x-1 md:space-x-3 z-10">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className={`cursor-pointer rounded-sm shadow-sm transition-all duration-300 ${
              index === selectedImageIndex
                ? "transform border-2 border-blue-500"
                : "opacity-50"
            } ${
              index === selectedImageIndex
                ? "w-12 h-12 md:w-12 md:h-12"
                : "w-10 h-10 md:w-10 md:h-10"
            }`}
            onClick={() => setSelectedImageIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default SitadelServicesCarousel
