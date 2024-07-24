import React, { useState, FormEvent } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const initialBrands = [
  "Brand 1",
  "Brand 2",
  "Brand 3",
  "Brand 4",
  "Brand 5",
  "Brand 6",
  "Brand 7",
  "Brand 8",
  "Brand 9",
  "Brand 10",
]

const ProductsForm: React.FC = () => {
  const [overlay, setOverlay] = useState<{
    type: string | null
    options: string[]
  }>({
    type: null,
    options: [],
  })
  const [selectedSitadelSertification, setSelectedSitadelSertification] =
    useState<string>("All")
  const [selectedLocation, setSelectedLocation] = useState<string>("(3)")
  const [selectedCategory, setSelectedCategory] = useState<string>("(3)")
  const [selectedDeliveryService, setSelectedDeliveryService] =
    useState<string>("All")
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialBrands)
  const [selectedProductCondition, setSelectedProductCondition] =
    useState<string>("All")
  const [startDate, setStartDate] = useState<Date | null>(new Date())

  const handleSelect = (type: string, options: string[]) => {
    setOverlay({ type, options })
  }

  const closeOverlay = () => {
    setOverlay({ type: null, options: [] })
  }

  const handleOptionClick = (option: string) => {
    if (overlay.type) {
      switch (overlay.type) {
        case "sitadelSertification":
          setSelectedSitadelSertification(option)
          break
        case "location":
          setSelectedLocation(option)
          break
        case "category":
          setSelectedCategory(option)
          break
        case "deliveryService":
          setSelectedDeliveryService(option)
          break
        case "productCondition":
          setSelectedProductCondition(option)
          break
        case "brands":
          handleBrandToggle(option)
          break
        default:
          break
      }
      closeOverlay()
    }
  }

  const handleBrandToggle = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands((prev) => prev.filter((item) => item !== brand))
    } else {
      setSelectedBrands((prev) => [...prev, brand])
    }
  }

  const handleDateChange = (date: Date | null) => {
    setStartDate(date)
    if (overlay.type && date) {
      switch (overlay.type) {
        case "happeningFrom":
        case "to":
          // Assuming this was meant to update the selected options for date fields
          // setSelectedOptions((prev) => ({
          //   ...prev,
          //   [overlay.type]: date.toDateString(),
          // }));
          break
        default:
          break
      }
      closeOverlay()
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("Form submitted with the following data:")
    console.log({
      sitadelSertification: selectedSitadelSertification,
      location: selectedLocation,
      category: selectedCategory,
      deliveryService: selectedDeliveryService,
      brands: selectedBrands,
      productCondition: selectedProductCondition,
    })
  }

  return (
    <div className="flex justify-center items-center">
      <form className="p-1 w-full lg:w-3/4 relative" onSubmit={handleSubmit}>
        <div className="flex lg:grid lg:grid-cols-3 lg:gap-6 overflow-x-auto no-scrollbar space-x-6 lg:space-x-0 lg:space-y-0">
          <div className="flex flex-col">
            <label
              htmlFor="sitadelSertification"
              className="block md:text-sm text-xs font-light text-gray-400 h-8"
            >
              Sitadel Sertification:
            </label>
            <button
              type="button"
              className="mt-1 flex justify-between items-center w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-1 bg-transparent border border-tertiary-200 text-gray-400 font-semibold"
              onClick={() =>
                handleSelect("sitadelSertification", [
                  "All",
                  "Certification 1",
                  "Certification 2",
                ])
              }
            >
              <span className="truncate">{selectedSitadelSertification}</span>
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </button>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="location"
              className="block md:text-sm text-xs font-light text-gray-400 h-8"
            >
              Location:
            </label>
            <button
              type="button"
              className="mt-1 flex justify-between items-center w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-1 bg-secondary border border-tertiary-200 text-white"
              onClick={() =>
                handleSelect("location", ["All", "Location 1", "Location 2"])
              }
            >
              <span className="truncate">{selectedLocation}</span>
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </button>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="block md:text-sm text-xs font-light text-gray-400 h-8"
            >
              Category/Niche:
            </label>
            <button
              type="button"
              className="mt-1 flex justify-between items-center w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-1 bg-transparent border border-tertiary-200 text-gray-400 font-semibold"
              onClick={() =>
                handleSelect("category", ["All", "Category 1", "Category 2"])
              }
            >
              <span className="truncate">{selectedCategory}</span>
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </button>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="deliveryService"
              className="block md:text-sm text-xs font-light text-gray-400 h-8"
            >
              Delivery service:
            </label>
            <button
              type="button"
              className="mt-1 flex justify-between items-center w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-1 bg-transparent border border-tertiary-200 text-gray-400 font-semibold"
              onClick={() =>
                handleSelect("deliveryService", [
                  "All",
                  "Yes (only products with delivery service will be displayed)",
                ])
              }
            >
              <span className="truncate">{selectedDeliveryService}</span>
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </button>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="brand"
              className="block md:text-sm text-xs font-light text-gray-400 h-8"
            >
              Brand:
            </label>
            <button
              type="button"
              className="mt-1 flex justify-between items-center w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-1 bg-transparent border border-tertiary-200 text-gray-400 font-semibold"
              onClick={() => handleSelect("brands", initialBrands)}
            >
              <span className="truncate">Select Brands</span>
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </button>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="productCondition"
              className="block md:text-sm text-xs font-light text-gray-400 h-8"
            >
              Product condition:
            </label>
            <button
              type="button"
              className="mt-1 flex justify-between items-center w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-1 bg-transparent border border-tertiary-200 text-gray-400 font-semibold"
              onClick={() =>
                handleSelect("productCondition", [
                  "All",
                  "Brand new",
                  "Fairly used",
                ])
              }
            >
              <span className="truncate">{selectedProductCondition}</span>
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button type="submit" className="text-secondary font-bold text-base">
            Advanced search
          </button>
        </div>
      </form>

      {overlay.type && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md shadow-md max-w-md w-full h-auto overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">
                Select {overlay.type === "brands" ? "Brands" : overlay.type}
              </h2>
              <button onClick={closeOverlay} className="text-gray-400">
                X
              </button>
            </div>
            <div className="flex flex-wrap">
              {overlay.type === "deliveryService" ? (
                <div className="flex flex-col">
                  <label className="mb-2">
                    <input
                      type="radio"
                      name="deliveryService"
                      value="All"
                      checked={selectedDeliveryService === "All"}
                      onChange={() => handleOptionClick("All")}
                    />
                    All
                  </label>
                  <label className="mb-2">
                    <input
                      type="radio"
                      name="deliveryService"
                      value="Yes (only products with delivery service will be displayed)"
                      checked={
                        selectedDeliveryService ===
                        "Yes (only products with delivery service will be displayed)"
                      }
                      onChange={() =>
                        handleOptionClick(
                          "Yes (only products with delivery service will be displayed)",
                        )
                      }
                    />
                    Yes (only products with delivery service will be displayed)
                  </label>
                </div>
              ) : overlay.type === "productCondition" ? (
                <div className="flex flex-col">
                  <label className="mb-2">
                    <input
                      type="radio"
                      name="productCondition"
                      value="All"
                      checked={selectedProductCondition === "All"}
                      onChange={() => handleOptionClick("All")}
                    />
                    All
                  </label>
                  <label className="mb-2">
                    <input
                      type="radio"
                      name="productCondition"
                      value="Brand new"
                      checked={selectedProductCondition === "Brand new"}
                      onChange={() => handleOptionClick("Brand new")}
                    />
                    Brand new
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="productCondition"
                      value="Fairly used"
                      checked={selectedProductCondition === "Fairly used"}
                      onChange={() => handleOptionClick("Fairly used")}
                    />
                    Fairly used
                  </label>
                </div>
              ) : overlay.type === "brands" ? (
                <div className="flex flex-wrap">
                  {initialBrands.map((brand) => (
                    <label key={brand} className="mb-2 mr-2">
                      <button
                        type="button"
                        className={`rounded-md py-1 px-2 mb-1 ${
                          selectedBrands.includes(brand)
                            ? "bg-secondary text-white"
                            : "bg-transparent text-gray-400"
                        }`}
                        onClick={() => handleBrandToggle(brand)}
                      >
                        {selectedBrands.includes(brand) ? (
                          <>
                            {brand}{" "}
                            <span className="text-red-500">&#10006;</span>
                          </>
                        ) : (
                          brand
                        )}
                      </button>
                    </label>
                  ))}
                </div>
              ) : (
                <ul>
                  {overlay.options.map((option) => (
                    <li
                      key={option}
                      className="cursor-pointer hover:bg-gray-200 p-2 rounded"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsForm
