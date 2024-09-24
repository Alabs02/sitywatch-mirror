import React from "react"
import { useAuthStore } from "@/store"

const LookStepType: React.FC = () => {
  const authStore = useAuthStore()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        What type of look do you want to create?
      </h2>

      {/* SITIZEN */}
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="category"
            value="sitizen"
            checked={authStore.ui.category === "sitizen"}
            onChange={() => authStore.setUI("category", "sitizen")}
            className="form-radio"
          />
          <span className="ml-2 font-semibold text-xl">SITIZEN</span>
        </label>
        <p className="italic text-gray-500">
          A Sitizen is a personal account on ScoutSity.
        </p>
      </div>

      {/* SITADEL */}
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="category"
            value="sitadel"
            checked={authStore.ui.category === "sitadel"}
            onChange={() => authStore.setUI("category", "sitadel")}
            className="form-radio"
          />
          <span className="ml-2 font-semibold text-xl">SITADEL</span>
        </label>
        <p className="italic text-gray-500">
          A Sitadel is an account on ScoutSity for brands, businesses,
          companies, organizations, etc.
        </p>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-end mt-6">
        <button
          onClick={authStore.setNext}
          className={`bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white px-4 py-2 rounded ${
            !authStore.ui.category ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!authStore.ui.category}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default LookStepType
