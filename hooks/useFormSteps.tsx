import { useState, useEffect } from "react"

interface BaseFormData {
  category: string // Ensure that every form data object must have 'category'
}

export const useFormSteps = <T extends BaseFormData>(
  initialFormData: T,
  getCategorySteps: (formData: T) => any[], // Steps based on category
) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<T>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([])

  // Dynamically get steps based on the selected category
  const categorySteps = getCategorySteps(formData)

  useEffect(() => {
    // Update completed steps dynamically based on the current category's steps
    setCompletedSteps(new Array(categorySteps.length).fill(false))
  }, [formData.category, categorySteps.length])

  const canNavigateToStep = (stepIndex: number) => {
    return completedSteps[stepIndex] || stepIndex <= currentStep
  }

  const handleNext = (data: Partial<T>) => {
    if (!data.category && currentStep === 0) {
      console.error("Category must be selected to proceed.")
      return
    }

    setFormData((prev) => ({ ...prev, ...data }))

    // Update completed steps dynamically
    setCompletedSteps((prev) =>
      prev.map((completed, index) =>
        index === currentStep ? true : completed,
      ),
    )

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
    CurrentStepComponent: categorySteps[currentStep]?.component || (() => null), // Ensure no undefined component
    canNavigateToStep,
  }
}
