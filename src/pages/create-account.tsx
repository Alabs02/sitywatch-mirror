import React, { FC, useEffect } from "react"
import LookSitizenStep1 from "@/components/contents/create-new-look/LookSitizenStep1"
import LookSitadelStep1 from "@/components/contents/create-new-look/LookSitadelStep1"
import LookSitizenStep2 from "@/components/contents/create-new-look/LookSitizenStep2"
import LookSitadelStep2 from "@/components/contents/create-new-look/LookSitadelStep2"
import LookSitizenStep3 from "@/components/contents/create-new-look/LookSitizenStep3"
import LookSitadelStep3 from "@/components/contents/create-new-look/LookSitadelStep3"
import LookSitizenStep4 from "@/components/contents/create-new-look/LookSitizenStep4"
import LookSitadelStep4 from "@/components/contents/create-new-look/LookSitadelStep4"
import LookStepType from "@/components/contents/create-new-look/LookStepType"
import Link from "next/link"
import { useFormSteps } from "../../hooks/useFormSteps"
import { FormData } from "@/types"

interface Step {
  component: FC<any>
  label: string
  icon: string
  text: string
}

// Define the steps for both Sitizen and Sitadel
const sitizenSteps: Step[] = [
  {
    component: LookStepType,
    label: "Type",
    icon: "list_alt",
    text: "Choose a look type.",
  },
  {
    component: LookSitizenStep1,
    label: "Name",
    icon: "signature",
    text: "Create a Sitizen look.",
  },
  {
    component: LookSitizenStep2,
    label: "Info",
    icon: "school",
    text: "Provide detailed Sitizen info.",
  },
  {
    component: LookSitizenStep3,
    label: "Interests",
    icon: "description",
    text: "Add interests to your Sitizen look.",
  },
  {
    component: LookSitizenStep4,
    label: "Finish",
    icon: "check",
    text: "Review and finish your Sitizen look.",
  },
]

const sitadelSteps: Step[] = [
  {
    component: LookStepType,
    label: "Type",
    icon: "list_alt",
    text: "Choose a look type.",
  },
  {
    component: LookSitadelStep1,
    label: "Name",
    icon: "signature",
    text: "Create a Sitadel look.",
  },
  {
    component: LookSitadelStep2,
    label: "Organization",
    icon: "category",
    text: "Provide detailed Sitadel info.",
  },
  // {
  //   component: LookSitadelStep3,
  //   label: "Interests",
  //   icon: "description",
  //   text: "Add interests to your Sitadel look.",
  // },
  {
    component: LookSitadelStep4,
    label: "Finish",
    icon: "check",
    text: "Review and finish your Sitadel look.",
  },
]

const allSteps: Step[] = [...sitizenSteps, ...sitadelSteps]

// Get the steps based on the selected category
const getCategorySteps = (formData: FormData): Step[] => {
  if (formData.category === "sitizen") return sitizenSteps
  if (formData.category === "sitadel") return sitadelSteps
  return [] // No steps if no category is selected
}

const CreateNewLook: FC = () => {
  const {
    currentStep,
    formData,
    loading,
    handleNext,
    handleBack,
    goToStep,
    updateFormData, 
    CurrentStepComponent,
  } = useFormSteps<FormData>(
    {
      name: "",
      shortName: "",
      info: "",
      coverPhoto: null,
      profilePhoto: null,
      link: "",
      email: "",
      contact: "",
      country: "",
      state: "",
      address: "",
      password: "",
      confirmPassword: "",
      fieldOfStudy: "",
      options: [],
      dob: { month: "", day: "", year: "" },
      showDob: "",
      gender: "",
      sexuality: "",
      relationshipStatus: "",
      nightLife: "",
      institutionType: "",
      schoolStatus: "",
      category: "sitizen",
      bio: "",
      phone: "",
      website: "",
    },
  
    getCategorySteps,
  )

  useEffect(() => {
    console.log("CreateNewLook - FormData:", formData)
  }, [formData])

  const handleStepClick = (index: number) => {
    if (formData.category || index === 0) {
      // Ensure category is selected
      goToStep(index)
    } else {
      alert("Please select a category to proceed.")
    }
  }


  return (
    <div
      className="relative min-h-screen w-full bg-no-repeat"
      style={{
        backgroundImage: "url('/sw-login-bg.png')",
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
                  onClick={() => handleStepClick(index)}
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
        {/* Current Step Component */}
        {CurrentStepComponent ? (
          <CurrentStepComponent
            formData={formData}
            updateFormData={updateFormData}
            onNext={() => handleNext({ category: formData.category })}
            handleBack={handleBack}
          />
        ) : (
          <div>No step available. Please select a category to proceed.</div>
        )}
      </div>
    </div>
  )
}

export default CreateNewLook
