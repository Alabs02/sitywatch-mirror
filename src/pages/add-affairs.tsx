import React, { FC, useEffect } from "react"
import Link from "next/link"
import { useFormSteps2 } from "../../hooks/useFormSteps2"
import { FormData } from "@/types"
import AffairsStepType from "@/components/contents/add-affairs-component copy/AffairsStepType"

// Import step components
import AffairsTourneyStep1 from "@/components/contents/add-affairs-component copy/AffairsTourneyStep1"
import AffairsTourneyStep2 from "@/components/contents/add-affairs-component copy/AffairsTourneyStep2"
import AffairsTourneyStep3 from "@/components/contents/add-affairs-component copy/AffairsTourneyStep3"
import AffairsTourneyStep4 from "@/components/contents/add-affairs-component copy/AffairsTourneyStep4"
import AffairsTourneyStep5 from "@/components/contents/add-affairs-component copy/AffairsTourneyStep5"
import AffairsProductStep1 from "@/components/contents/add-affairs-component copy/AffairsProductStep1"
import AffairsProductStep2 from "@/components/contents/add-affairs-component copy/AffairsProductStep2"
import AffairsProductStep3 from "@/components/contents/add-affairs-component copy/AffairsProductStep3"
import AffairsProductStep4 from "@/components/contents/add-affairs-component copy/AffairsProductStep4"
import AffairsProductStep5 from "@/components/contents/add-affairs-component copy/AffairsProductStep5"
import AffairsEventStep1 from "@/components/contents/add-affairs-component copy/AffairsEventStep1"
import AffairsEventStep2 from "@/components/contents/add-affairs-component copy/AffairsEventStep2"
import AffairsEventStep3 from "@/components/contents/add-affairs-component copy/AffairsEventStep3"
import AffairsEventStep4 from "@/components/contents/add-affairs-component copy/AffairsEventStep4"
import AffairsEventStep5 from "@/components/contents/add-affairs-component copy/AffairsEventStep5"
import AffairsServiceStep1 from "@/components/contents/add-affairs-component copy/AffairsServiceStep1"
import AffairsServiceStep2 from "@/components/contents/add-affairs-component copy/AffairsServiceStep2"
import AffairsServiceStep3 from "@/components/contents/add-affairs-component copy/AffairsServiceStep3"
import AffairsServiceStep4 from "@/components/contents/add-affairs-component copy/AffairsServiceStep4"
import AffairsServiceStep5 from "@/components/contents/add-affairs-component copy/AffairsServiceStep5"

interface Step {
  component: FC<any>
  label: string
  icon: string
  description: string
  validate: (formData: FormData) => boolean
}

// Define steps for each category
const categories: Record<string, Step[]> = {
  tourney: [
    {
      component: AffairsTourneyStep1,
      label: "Type",
      icon: "view_stream",
      description: "Step 1 Tourney Description",
      validate: (formData: FormData) => true,
    },
    {
      component: AffairsTourneyStep2,
      label: "Category",
      icon: "category",
      description: "Step 2 Tourney Description",
      validate: (formData: FormData) => !!formData.category,
    },
    {
      component: AffairsTourneyStep3,
      label: "Info",
      icon: "info",
      description: "Step 3 Tourney Description",
      validate: (formData: FormData) => !!formData.info,
    },
    {
      component: AffairsTourneyStep4,
      label: "Image",
      icon: "image",
      description: "Step 4 Tourney Description",
      validate: (formData: FormData) =>
        !!formData.coverPhoto && !!formData.profilePhoto,
    },
    {
      component: AffairsTourneyStep5,
      label: "Review",
      icon: "check",
      description: "Step 5 Tourney Description",
      validate: (formData: FormData) => true,
    },
  ],
  product: [
    {
      component: AffairsProductStep1,
      label: "Type",
      icon: "view_stream",
      description: "Step 1 Product Description",
      validate: (formData: FormData) => !!formData.type,
    },
    {
      component: AffairsProductStep2,
      label: "Category",
      icon: "category",
      description: "Step 2 Product Description",
      validate: (formData: FormData) => !!formData.category,
    },
    {
      component: AffairsProductStep3,
      label: "Info",
      icon: "info",
      description: "Step 3 Product Description",
      validate: (formData: FormData) => !!formData.info,
    },
    {
      component: AffairsProductStep4,
      label: "Image",
      icon: "image",
      description: "Step 4 Product Description",
      validate: (formData: FormData) =>
        !!formData.coverPhoto && !!formData.profilePhoto,
    },
    {
      component: AffairsProductStep5,
      label: "Review",
      icon: "check",
      description: "Step 5 Product Description",
      validate: (formData: FormData) => true,
    },
  ],
  event: [
    {
      component: AffairsEventStep1,
      label: "Type",
      icon: "view_stream",
      description: "Step 1 Event Description",
      validate: (formData: FormData) => !!formData.type,
    },
    {
      component: AffairsEventStep2,
      label: "Category",
      icon: "category",
      description: "Step 2 Event Description",
      validate: (formData: FormData) => !!formData.category,
    },
    {
      component: AffairsEventStep3,
      label: "Info",
      icon: "info",
      description: "Step 3 Event Description",
      validate: (formData: FormData) => !!formData.info,
    },
    {
      component: AffairsEventStep4,
      label: "Image",
      icon: "image",
      description: "Step 4 Event Description",
      validate: (formData: FormData) =>
        !!formData.coverPhoto && !!formData.profilePhoto,
    },
    {
      component: AffairsEventStep5,
      label: "Review",
      icon: "check",
      description: "Step 5 Event Description",
      validate: (formData: FormData) => true,
    },
  ],
  service: [
    {
      component: AffairsServiceStep1,
      label: "Type",
      icon: "view_stream",
      description: "Step 1 Service Description",
      validate: (formData: FormData) => !!formData.type,
    },
    {
      component: AffairsServiceStep2,
      label: "Category",
      icon: "category",
      description: "Step 2 Service Description",
      validate: (formData: FormData) => !!formData.category,
    },
    {
      component: AffairsServiceStep3,
      label: "Info",
      icon: "info",
      description: "Step 3 Service Description",
      validate: (formData: FormData) => !!formData.info,
    },
    {
      component: AffairsServiceStep4,
      label: "Image",
      icon: "image",
      description: "Step 4 Service Description",
      validate: (formData: FormData) =>
        !!formData.coverPhoto && !!formData.profilePhoto,
    },
    {
      component: AffairsServiceStep5,
      label: "Review",
      icon: "check",
      description: "Step 5 Service Description",
      validate: (formData: FormData) => true,
    },
  ],
}

// Get steps based on the form type
const getCategorySteps = (formData: FormData): Step[] => {
  console.log("Fetching steps for type: ", formData.type)
  const type = formData.type || "tourney"
  return categories[type] || []
}


const AddAffairs: FC = () => {
  const {
    currentStep,
    formData,
    loading,
    handleNext,
    handleBack,
    goToStep,
    updateFormData,
    CurrentStepComponent,
  } = useFormSteps2(
    {
      fieldOfStudy: "",
      name: "",
      shortName: "",
      info: "",
      coverPhoto: null,
      profilePhoto: null,
      email: "",
      contact: "",
      address: "",
      study: "",
      dob: { month: "", day: "", year: "" },
      showDob: "",
      gender: "",
      sexuality: "",
      relationshipStatus: "",
      nightLife: "",
      sideHustle: "",
      institutionType: "",
      schoolStatus: "",
      options: [],
      country: "",
      state: "",
      type: "tourney", 
      handle: "",
      description: "",
      startDate: "",
      endDate: "",
      time: { hour: "", minute: "", period: "" },
      highlightImage: null,
      category: "",
      bio: "",
      phone: "",
      website: "",
      password: "",
      confirmPassword: "",
    },
    getCategorySteps,
  )

  const handleStepChange = (stepIndex: number) => {
    if (stepIndex <= currentStep) {
      goToStep(stepIndex)
    } else {
      alert("Please complete the current step before proceeding.")
    }
  }

  const handleSubmit = () => {
    console.log("Final Form Data:", formData)
  }
  useEffect(() => {
    console.log("Form Data Updated: ", formData)
  }, [formData])


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

      <div className="relative w-full max-w-xl bg-white bg-opacity-80 shadow-lg rounded-lg p-6 md:w-1/2 h-screen mx-auto lg:mx-0 lg:h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gradient lg:absolute lg:top-10 lg:right-4 overflow-hidden md:px-20">
        {/* Step Navigation */}
        <div className="flex items-center justify-between mb-6">
          {getCategorySteps(formData).map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center relative">
                <div
                  onClick={() => handleStepChange(index)}
                  className={`flex flex-col items-center cursor-pointer mb-4 overflow-hidden ${
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
                    <span className="material-symbols-outlined text-lg">
                      {step.icon}
                    </span>
                  </div>
                  <div className="mt-2 text-xs sm:text-sm text-center w-20">
                    {step.label}
                  </div>
                </div>
                {index < getCategorySteps(formData).length - 1 && (
                  <div
                    className={`h-0.5 ${
                      index < currentStep
                        ? "bg-gradient-to-r from-[#F24055] to-[#1E7881]"
                        : "bg-gray-200"
                    }`}
                    style={{
                      width: "1.9rem",
                      marginLeft: "2.68rem",
                      marginRight: "-2.0rem",
                      marginTop: "-3.2rem",
                      marginBottom: "-0.25rem",
                    }}
                  ></div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Display the current step */}
        {CurrentStepComponent ? (
          <CurrentStepComponent
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleNext}
            handleBack={handleBack}
          />
        ) : (
          <div>No step available. Please select a type to proceed.</div>
        )}

        {/* Submit button for the last step */}
        {currentStep === getCategorySteps(formData).length - 1 && (
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddAffairs
