import { useState, useEffect } from "react"

export const useFormSteps = <T extends object>(
  initialFormData: T,
  steps: any[],
) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<T>(initialFormData)
  const [loading, setLoading] = useState(false)

  // Load form data from local storage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("sitadelFormData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData(parsedData)
        console.log("Loaded form data:", parsedData)
      } catch (error) {
        console.error("Error parsing saved form data:", error)
      }
    }
  }, [])

  // Save form data to local storage whenever it changes
  useEffect(() => {
    console.log("Saving form data:", formData)
    localStorage.setItem("sitadelFormData", JSON.stringify(formData))
  }, [formData])

  const handleNext = (data: Partial<T>) => {
    console.log("Form data before next step:", formData)
    setFormData((prev) => ({ ...prev, ...data }))
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }, 2000) // Loader visible for 2 seconds
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex)
  }

  return {
    currentStep,
    formData,
    loading,
    handleNext,
    handleBack,
    goToStep,
    CurrentStepComponent: steps[currentStep].component,
  }
}
