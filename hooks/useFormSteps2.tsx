import { useState, useEffect } from "react"

interface BaseFormData {
  type: "tourney" | "product" | "event" | "service"
  category: string
  // Add other necessary properties
}

export const useFormSteps2 = <T extends BaseFormData>(
  initialFormData: T,
  getCategorySteps: (formData: T) => any[], // Steps based on category
) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<T>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([])

  const categorySteps = getCategorySteps(formData)

  useEffect(() => {
    // Reset completed steps when steps change
    setCompletedSteps(new Array(categorySteps.length).fill(false))
  }, [formData.type, categorySteps.length])

  const canNavigateToStep = (stepIndex: number) => {
    return completedSteps[stepIndex] || stepIndex <= currentStep
  }

 const handleNext = (data: Partial<T>) => {
   // Ensure a type is selected
   if (!formData.type && currentStep === 0) {
     console.error("Type must be selected to proceed.")
     return
   }

   // Update form data with newly passed data
   setFormData((prev) => ({ ...prev, ...data }))

   // Move to next step after form update
   setCompletedSteps((prev) =>
     prev.map((completed, index) => (index === currentStep ? true : completed)),
   )

   // Simulate loading and go to the next step
   setLoading(true)
   setTimeout(() => {
     setLoading(false)
     setCurrentStep((prev) => Math.min(prev + 1, categorySteps.length - 1))
   }, 1000)
 }


  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const goToStep = (stepIndex: number) => {
    if (canNavigateToStep(stepIndex)) {
      setCurrentStep(stepIndex)
    }
  }

  const updateFormData = (data: Partial<T>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  return {
    currentStep,
    formData,
    loading,
    handleNext,
    handleBack,
    goToStep,
    updateFormData,
    CurrentStepComponent: categorySteps[currentStep]?.component || (() => null),
    canNavigateToStep,
  }
}
