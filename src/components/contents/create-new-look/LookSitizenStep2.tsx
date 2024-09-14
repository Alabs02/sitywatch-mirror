import React, { FC, useState } from "react"
import { FormData } from "@/types"
import { useAppDispatch } from "@/app/store"
import { useRegisterSitizenMutation } from "@/features/auth/authApi"
import { setFormData } from "@/features/auth/authSlice"
import Link from "next/link"

interface StepProps {
  onNext: (data: Partial<FormData>) => void
  onBack: () => void
  formData: FormData
}

const nigeriaStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Kogi",
  "Katsina",
  "Kebbi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
]

const LookSitadelStep2: FC<StepProps> = ({ onNext, onBack, formData }) => {
  const dispatch = useAppDispatch()
  const [name, setName] = useState(formData.name || "")
  const [study, setStudy] = useState(formData.study || "")
  const [country, setCountry] = useState("Nigeria")
  const [state, setState] = useState(formData.state || "")
  const [institutionType, setInstitutionType] = useState<string>("")
  const [schoolStatus, setSchoolStatus] = useState<string>("")

  const [registerSitizen, { isLoading, error }] = useRegisterSitizenMutation()

   const handleNext = () => {
     const updatedFormData: Partial<FormData> = {
       name,
       study,
       country,
       state,
       institutionType,
       schoolStatus,
     }

     dispatch(setFormData(updatedFormData)) // Update form data in Redux store
     onNext(updatedFormData) // Proceed to the next step
   }

  return (
    <div>
      {/* Form Fields for Step 2 */}
      {/* Name Field */}
      <h2 className="text-sm font-semibold text-center mt-6 mb-1">
        What is the name of your school?
      </h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Example: John Hopkins University"
        className="mb-1 p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
      />

      {/* Institution Type */}
      <h2 className="text-sm font-semibold text-center mt-2 mb-1">
        What type of institution is it?
      </h2>
      <div className="flex justify-between items-center space-x-4">
        <label className="text-sm flex items-center">
          High school
          <input
            type="radio"
            name="school-type"
            value="high-school"
            checked={institutionType === "high-school"}
            onChange={(e) => setInstitutionType(e.target.value)}
            className="ml-2 text-black"
          />
        </label>
        <label className="text-sm flex items-center">
          Higher institution
          <input
            type="radio"
            name="school-type"
            value="higher-institution"
            checked={institutionType === "higher-institution"}
            onChange={(e) => setInstitutionType(e.target.value)}
            className="ml-2 text-black bg-transparent"
          />
        </label>
        <label className="text-sm flex items-center">
          Other
          <input
            type="radio"
            name="school-type"
            value="other"
            checked={institutionType === "other"}
            onChange={(e) => setInstitutionType(e.target.value)}
            className="ml-2 text-black"
          />
        </label>
      </div>

      {/* Location Field */}
      <div className="mb-6 mt-4">
        <label className="block text-sm font-semibold mb-1 text-center">
          Where is the school located?
        </label>
        <div className="flex justify-center space-x-2">
          <div className="w-1/2 bg-white shadow-inner shadow-gray-600/50 border border-gray-300">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="p-2 rounded w-full bg-white shadow-inner shadow-gray-600/50 border border-gray-300"
            >
              <option value="Nigeria">Nigeria</option>
            </select>
          </div>
          <div className="w-1/2">
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full bg-white shadow-inner shadow-gray-600/50"
            >
              <option value="">Select State</option>
              {nigeriaStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* School Status */}
      <h2 className="text-sm font-semibold text-center mt-2 mb-1">
        What is your status in reference to the school?
      </h2>
      <div className="flex justify-between items-center space-x-1 md:space-x-4">
        <label className="text-sm flex items-center">
          Student
          <input
            type="radio"
            name="school-status-type"
            value="student"
            checked={schoolStatus === "student"}
            onChange={(e) => setSchoolStatus(e.target.value)}
            className="ml-2 text-black"
          />
        </label>
        <label className="text-sm flex items-center">
          Alumnus/Alumna
          <input
            type="radio"
            name="school-status-type"
            value="alumnus"
            checked={schoolStatus === "alumnus"}
            onChange={(e) => setSchoolStatus(e.target.value)}
            className="ml-2 text-black bg-transparent"
          />
        </label>
        <label className="text-sm flex items-center">
          Dropout
          <input
            type="radio"
            name="school-status-type"
            value="dropout"
            checked={schoolStatus === "dropout"}
            onChange={(e) => setSchoolStatus(e.target.value)}
            className="ml-2 text-black"
          />
        </label>
      </div>

      {/* Field of Study */}
      <div className="mb-6 mt-2">
        <label className="block text-sm font-semibold mb-1 text-center">
          What did you study?
        </label>
        <p className="text-sm text-black italic mb-2 text-center">
          It will not be made public.
        </p>
        <input
          type="text"
          value={study}
          onChange={(e) => setStudy(e.target.value)}
          placeholder="Example: Computer Science"
          className="p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
        />
      </div>

      {/* Add School Button */}
      <Link href="#">
        <div className="flex items-center justify-center rounded-full">
          <button
            type="button"
            className="flex items-center w-1/2 border border-primary-500 rounded-full justify-center hover:bg-slate-200"
          >
            <span className="material-symbols-outlined text-xl md:text-2xl text-primary-500 font-bold mr-2">
              add_circle
            </span>
            <span className="text-primary-500 font-bold text-xs md:text-sm">
              ADD SCHOOL
            </span>
          </button>
        </div>
      </Link>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-2">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
        >
          Back
        </button>
        {/* Next Button */}
        <button
          onClick={handleNext}
          className="p-2 bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default LookSitadelStep2
