import React, { FC, useEffect } from "react"
import Link from "next/link"
import { useFormSteps2 } from "../../hooks/useFormSteps2"
import { FormData } from "@/types"
import _toLower from "lodash/toLower"

// Import step components
import AffairsStepType from "@/components/contents/add-affairs-component copy/AffairsStepType"
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

// Define step interface
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
      validate: () => true,
    },
    {
      component: AffairsTourneyStep2,
      label: "Category",
      icon: "category",
      description: "Step 2 Tourney Description",
      validate: (formData) => !!formData.category,
    },
    {
      component: AffairsTourneyStep3,
      label: "Info",
      icon: "info",
      description: "Step 3 Tourney Description",
      validate: (formData) => !!formData.info,
    },
    {
      component: AffairsTourneyStep4,
      label: "Image",
      icon: "image",
      description: "Step 4 Tourney Description",
      validate: (formData) => !!formData.coverPhoto && !!formData.profilePhoto,
    },
    {
      component: AffairsTourneyStep5,
      label: "Review",
      icon: "check",
      description: "Step 5 Tourney Description",
      validate: () => true,
    },
  ],
  product: [
    {
      component: AffairsProductStep1,
      label: "Type",
      icon: "view_stream",
      description: "Step 1 Product Description",
      validate: (formData) => !!formData.type,
    },
    {
      component: AffairsProductStep2,
      label: "Category",
      icon: "category",
      description: "Step 2 Product Description",
      validate: (formData) => !!formData.category,
    },
    {
      component: AffairsProductStep3,
      label: "Info",
      icon: "info",
      description: "Step 3 Product Description",
      validate: (formData) => !!formData.info,
    },
    {
      component: AffairsProductStep4,
      label: "Image",
      icon: "image",
      description: "Step 4 Product Description",
      validate: (formData) => !!formData.coverPhoto && !!formData.profilePhoto,
    },
    {
      component: AffairsProductStep5,
      label: "Review",
      icon: "check",
      description: "Step 5 Product Description",
      validate: () => true,
    },
  ],
  event: [
    {
      component: AffairsEventStep1,
      label: "Type",
      icon: "view_stream",
      description: "Step 1 Event Description",
      validate: (formData) => !!formData.type,
    },
    {
      component: AffairsEventStep2,
      label: "Category",
      icon: "category",
      description: "Step 2 Event Description",
      validate: (formData) => !!formData.category,
    },
    {
      component: AffairsEventStep3,
      label: "Info",
      icon: "info",
      description: "Step 3 Event Description",
      validate: (formData) => !!formData.info,
    },
    {
      component: AffairsEventStep4,
      label: "Image",
      icon: "image",
      description: "Step 4 Event Description",
      validate: (formData) => !!formData.coverPhoto && !!formData.profilePhoto,
    },
    {
      component: AffairsEventStep5,
      label: "Review",
      icon: "check",
      description: "Step 5 Event Description",
      validate: () => true,
    },
  ],
  service: [
    {
      component: AffairsServiceStep1,
      label: "Type",
      icon: "view_stream",
      description: "Step 1 Service Description",
      validate: (formData) => !!formData.type,
    },
    {
      component: AffairsServiceStep2,
      label: "Category",
      icon: "category",
      description: "Step 2 Service Description",
      validate: (formData) => !!formData.category,
    },
    {
      component: AffairsServiceStep3,
      label: "Info",
      icon: "info",
      description: "Step 3 Service Description",
      validate: (formData) => !!formData.info,
    },
    {
      component: AffairsServiceStep4,
      label: "Image",
      icon: "image",
      description: "Step 4 Service Description",
      validate: (formData) => !!formData.coverPhoto && !!formData.profilePhoto,
    },
    {
      component: AffairsServiceStep5,
      label: "Review",
      icon: "check",
      description: "Step 5 Service Description",
      validate: () => true,
    },
  ],
}

// Get steps based on the form type
const getCategorySteps = (formData: FormData): Step[] => {
  const type = _toLower(formData.type) || "tourney"
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
      interests: [],
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

      <div className="relative w-full max-w-xl bg-white bg-opacity-50 backdrop-blur-md mx-auto shadow-md shadow-slate-600 min-h-screen pt-4 pb-20 lg:py-16 lg:rounded-lg lg:mt-12">
        <div className="text-center w-full text-white font-semibold uppercase text-2xl lg:text-3xl tracking-wider">
          Add Affairs
        </div>
        <div className="p-5 space-y-8 lg:p-8">
          <CurrentStepComponent
            formData={formData}
            onFormDataChange={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        </div>
        <div className="absolute flex justify-between w-full bottom-5 px-4 lg:px-8">
          <button
            className={`${
              currentStep === 0 ? "opacity-20 cursor-not-allowed" : ""
            } bg-tertiary-100 py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-transform duration-300 hover:-translate-y-1`}
            disabled={currentStep === 0}
            onClick={handleBack}
          >
            Previous
          </button>

          <button
            className="bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-transform duration-300 hover:-translate-y-1"
            onClick={handleSubmit}
          >
            {currentStep === getCategorySteps(formData).length - 1
              ? "Submit"
              : "Next"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddAffairs
