import React, { FC } from "react"
import Step1 from "@/components/contents/build-sitadel-component/Step1"
import Step2 from "@/components/contents/build-sitadel-component/Step2"
import Step3 from "@/components/contents/build-sitadel-component/Step3"
import Step4 from "@/components/contents/build-sitadel-component/Step4"
import Link from "next/link"
import { useFormSteps } from "../../hooks/useFormSteps" 

const steps = [
  {
    component: Step1,
    label: "Name",
    icon: "signature",
    text: "A sitadel is a brand, business, organization, company, etc... that represents an ideal and can host events, competitions, olympiads, pageants, tournaments, contests or even grant scholarship programmes.",
  },
  {
    component: Step2,
    label: "Info",
    icon: "school",
    text: "Provide detailed information about your sitadel to attract more participants and showcase your events.",
  },
  {
    component: Step3,
    label: "Image",
    icon: "description",
    text: "Upload a beautiful backdrop and a profile picture that best represents your sitadel.",
  },
  {
    component: Step4,
    label: "Confirm",
    icon: "image",
    text: "Review all the details to ensure everything is correct before submitting your sitadel.",
  },
]

const BuildSitadel: FC = () => {
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
    },
    steps,
  )

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
          {steps[currentStep].text.split(". ")[0]}.
        </p>
        <p className="mt-2">
          {steps[currentStep].text.split(". ").slice(1).join(". ")}
        </p>
      </div>

      <div className="relative w-full max-w-xl bg-white bg-opacity-50 shadow-lg rounded-lg p-6 md:w-1/2 h-screen mx-auto lg:mx-0 lg:h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gradient lg:absolute lg:top-10 lg:right-4 overflow-hidden  md:px-20">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div
              key={index}
              onClick={() => goToStep(index)}
              className={`relative flex items-center cursor-pointer ${
                index <= currentStep
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-[#F24055] to-[#1E7881]"
                  : "text-gray-500"
              }`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                  index <= currentStep
                    ? "border-[#F24055] bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white"
                    : "border-gray-200"
                }`}
              >
                <span className="material-symbols-outlined">{step.icon}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 border-t-2 mx-2 ${
                    index < currentStep
                      ? "border-gradient-to-r from-[#F24055] to-[#1E7881]"
                      : "border-gray-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        <div className="mb-4 text-gray-700">
          {/* {steps[currentStep].text} */}
        </div>
        <CurrentStepComponent
          onNext={handleNext}
          onBack={currentStep > 0 ? handleBack : () => {}}
          formData={formData}
        />
      </div>
    </div>
  )
}

export default BuildSitadel
