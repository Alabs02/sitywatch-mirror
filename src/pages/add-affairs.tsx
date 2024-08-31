import React, { FC } from "react"
import Link from "next/link"
import { useFormSteps } from "../../hooks/useFormSteps"
import AffairsStep1 from "@/components/contents/add-affairs-component copy/AffairsStep1"
import AffairsStep2 from "@/components/contents/add-affairs-component copy/AffairsStep2"
import AffairsStep3 from "@/components/contents/add-affairs-component copy/AffairsStep3"
import AffairsStep4 from "@/components/contents/add-affairs-component copy/AffairsStep4"
import AffairsStep5 from "@/components/contents/add-affairs-component copy/AffairsStep5"

const steps = [
  {
    component: AffairsStep1,
    label: "Type",
    icon: "view_stream",
    description:
      "An affair is any engaging activity or program organised by a sitadel that people can participate in. It can alsobe a product or service marketed oprovided by the sitadel.There are three types of affairs: Tourney, Event, Provice.",
  },
  {
    component: AffairsStep2,
    label: "Category",
    icon: "category",
    description:
      "Every event must be in a certain category under a specific niche. This allows users to easily find your tourney when they search for affairs based on their interests",
  },
  {
    component: AffairsStep3,
    label: "Info",
    icon: "description",
    description:
      "Every event must be in a certain category under a specific niche. This allows users to easily find your tourney when they search for affairs based on their interests",
  },
  {
    component: AffairsStep4,
    label: "Image",
    icon: "image",
    description: "Upload images that best represent your sitadel.",
  },
  {
    component: AffairsStep5,
    label: "Confirm",
    icon: "check",
    description: "Review and confirm all details before submission.",
  },
]

const AddAffairs: FC = () => {
  const {
    currentStep,
    formData,
    loading,
    handleNext,
    handleBack,
    goToStep,
    CurrentStepComponent,
  } = useFormSteps(
    {
      name: "",
      shortName: "",
      info: "",
      coverPhoto: null,
      profilePhoto: null,
      // Add other necessary initial fields
    },
    steps,
  )

  const handleSubmit = () => {
    console.log("Final Form Data:", formData)
  }

  return (
    <div
      className="relative min-h-screen w-full bg-no-repeat"
      style={{
        backgroundImage: `url('/sw-login-bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="loader bg-gradient-to-r from-[#F24055] to-[#1E7881]"></div>
        </div>
      )}
      <Link href="/">
        <button className="absolute top-2 left-4 text-xl lg:flex hidden bg-tertiary-100 rounded-full p-1 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-white shadow-md shadow-gray-400">
          ✕
        </button>
      </Link>

      {/* Mobile X Button */}
      <Link href="/welcome">
        <button className="absolute top-1 right-2 text-xl lg:hidden flex ">
          ✕
        </button>
      </Link>

      <div className="absolute top-8 left-4 w-full md:w-1/3 p-4 text-transparent bg-clip-text bg-gradient-to-r from-[#F24055] to-[#1E7881] lg:block hidden">
        <p className="text-lg font-semibold">
          {steps[currentStep].description}
        </p>
      </div>

      <div className="relative w-full max-w-xl bg-white bg-opacity-50 shadow-lg rounded-lg p-6 md:w-1/2 h-screen mx-auto lg:mx-0 lg:h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gradient lg:absolute lg:top-10 lg:right-4 overflow-hidden md:px-20">
        {/* Step Navigation */}
        <div className="flex items-center justify-center mb-4">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div
                  onClick={() => goToStep(index)}
                  className={`relative flex flex-col items-center cursor-pointer ${
                    index <= currentStep
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-[#F24055] to-[#1E7881]"
                      : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-2 ${
                      index <= currentStep
                        ? "border-[#F24055] bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white"
                        : "border-gray-200"
                    }`}
                  >
                    <span className="material-symbols-outlined text-xs sm:text-sm">
                      {step.icon}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-center w-12 sm:w-16">
                    {step.label}
                  </div>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 ${
                    index < currentStep
                      ? "bg-gradient-to-r from-[#F24055] to-[#1E7881]"
                      : "bg-gray-200"
                  }`}
                  style={{
                    width: "3.5rem", // Adjust this value to make the divider longer
                    marginLeft: "-0.68rem", // Adjust to reduce the spacing between divider and circle
                    marginRight: "-0.68rem", // Adjust to reduce the spacing between divider and circle
                    marginTop: "-1.2rem", // Keep this to move the connector up
                    marginBottom: "-0.25rem", // Keep this to ensure it is centered
                  }}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step-specific Instructions or Details */}
        <div className="mb-4 text-gray-700">
          {/* You can add step-specific content here */}
        </div>

        {/* Current Step Component */}
        <CurrentStepComponent
          onNext={handleNext}
          onBack={currentStep > 0 ? handleBack : undefined}
          formData={formData}
          onSubmit={currentStep === steps.length - 1 ? handleSubmit : undefined}
        />
      </div>
    </div>
  )
}

export default AddAffairs
