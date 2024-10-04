import { useState, useEffect } from "react"

interface BaseFormData {
  category: string
}

interface SitadelFormData extends BaseFormData {
  name: string
  shortName: string
  info: string
  coverPhoto: File | null
  profilePhoto: File | null
}

export const useFormSteps = <T extends BaseFormData>(
  initialFormData: T,
  steps: any[], // Steps based on category
) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<T>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([])

  useEffect(() => {
    // Update completed steps dynamically based on the current category's steps
    setCompletedSteps(new Array(steps.length).fill(false))
  }, [formData.category, steps.length])

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
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
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
    CurrentStepComponent: steps[currentStep]?.component || (() => null),
    canNavigateToStep,
  }
}
