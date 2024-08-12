// context/FormDataContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react"
import { FormData } from "@/types" // Adjust the path as necessary

interface FormDataContextProps {
  formData: FormData
  setFormData: (data: FormData) => void
}

const FormDataContext = createContext<FormDataContextProps | undefined>(
  undefined,
)

export const useFormData = () => {
  const context = useContext(FormDataContext)
  if (!context) {
    throw new Error("useFormData must be used within a FormDataProvider")
  }
  return context
}

export const FormDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    shortName: "",
    info: "",
    coverPhoto: null,
    profilePhoto: null,
  })

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  )
}
