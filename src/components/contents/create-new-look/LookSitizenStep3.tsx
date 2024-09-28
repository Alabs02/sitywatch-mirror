// src/components/LookSitizenStep3.tsx
import React, { FC, Fragment } from "react"
import Link from "next/link"

// AXIOS
import { http } from "@/libs"

// STORE
import { useAuthStore, School } from "@/store"
import { apiRoutes } from "@/constants/apiRoutes"

interface StepProps {
  onNext: () => void
  onBack: () => void
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

const LookSitizenStep3: FC<StepProps> = ({ onNext, onBack }) => {
  const authStore = useAuthStore()

  const handleInputChange = (
    index: number,
    field: keyof School | string,
    value: string,
  ) => {
    const updatedSchoolingList = [...authStore.form.rawSchoolingList]
    const updatedSchool = { ...updatedSchoolingList[index].school }
    updatedSchool[field as string] = value
    updatedSchoolingList[index].school = updatedSchool
    authStore.setForm("rawSchoolingList", updatedSchoolingList)
  }

  const handleStatusChange = (index: number, value: string) => {
    const updatedSchoolingList = [...authStore.form.rawSchoolingList]
    updatedSchoolingList[index].status = value
    authStore.setForm("rawSchoolingList", updatedSchoolingList)
  }

  const handleCourseChange = (index: number, value: string) => {
    const updatedSchoolingList = [...authStore.form.rawSchoolingList]
    updatedSchoolingList[index].course = value
    authStore.setForm("rawSchoolingList", updatedSchoolingList)
  }

  const onSubmit = async () => {
    try {
      authStore.setUI("loading", true)

      const rawSchoolingList = authStore.form.rawSchoolingList.map((item) => {
        const { status, course, confirmedSchool, school } = item
        return {
          school: {
            ...school,
            type: Number(school.type) || 0,
          },
          course,
          confirmedSchool,
          status: Number(status) || 0,
        }
      })

      const payload = {
        email: authStore.form.email,
        password: authStore.form.password,
        name: authStore.form.name,
        phone: authStore.form.phone,
        countryCode: authStore.form.countryCode || "defaultCountryCode",
        rawSchoolingList,
        interests: authStore.form.interests,
      }

      const response = await http.post(apiRoutes.SITIZENS_SIGN_UP, payload)
      const token = response.data.message.match(/token=(.*)$/)?.[1]

      if (token) {
        authStore.setForm("emailToken", token) // Store token for Step 4
        onNext() // Proceed to Step 4 (email verification)
      } else {
        alert("Registration successful, but no token received.")
      }
    } catch (error: any) {
      console.error("Error during sign-up:", error)
      alert("Sign-up failed. Please try again.")
    } finally {
      authStore.setUI("loading", false)
    }
  }

  return (
    <Fragment>
      {authStore.form.rawSchoolingList.map((formItem, index) => (
        <div key={formItem.school.id} className="h-full overflow-y-auto">
          <h2 className="text-sm font-semibold text-center mt-6 mb-1">
            What is the name of your school?
          </h2>
          <input
            type="text"
            value={formItem.school.name}
            onChange={(e) => handleInputChange(index, "name", e.target.value)}
            placeholder="Example: John Hopkins University"
            className="mb-1 p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
          />

          <h2 className="text-sm font-semibold text-center mt-2 mb-1">
            What type of institution is it?
          </h2>
          <div className="flex justify-between items-center space-x-4">
            <label className="text-sm flex items-center">
              Tertiary
              <input
                type="radio"
                name={`school-type-${index}`}
                value="TETIARY"
                checked={formItem.school.type === "TETIARY"}
                onChange={(e) =>
                  handleInputChange(index, "type", e.target.value)
                }
                className="ml-2 text-black"
              />
            </label>
            <label className="text-sm flex items-center">
              Higher institution
              <input
                type="radio"
                name={`school-type-${index}`}
                value="1"
                checked={formItem.school.type === "1"}
                onChange={(e) =>
                  handleInputChange(index, "type", e.target.value)
                }
                className="ml-2 text-black bg-transparent"
              />
            </label>
            <label className="text-sm flex items-center">
              Other
              <input
                type="radio"
                name={`school-type-${index}`}
                value="2"
                checked={formItem.school.type === "2"}
                onChange={(e) =>
                  handleInputChange(index, "type", e.target.value)
                }
                className="ml-2 text-black"
              />
            </label>
          </div>

          <div className="mb-6 mt-4">
            <label className="block text-sm font-semibold mb-1 text-center">
              Where is the school located?
            </label>
            <div className="flex justify-center space-x-2">
              <div className="w-1/2 bg-white shadow-inner shadow-gray-600/50 border border-gray-300">
                <select
                  value={formItem.school.country}
                  onChange={(e) =>
                    handleInputChange(index, "country", e.target.value)
                  }
                  className="p-2 rounded w-full bg-white shadow-inner shadow-gray-600/50 border border-gray-300"
                >
                  <option value="" disabled>
                    Select Country
                  </option>
                  <option value="Nigeria">Nigeria</option>
                </select>
              </div>
              <div className="w-1/2">
                <select
                  value={formItem.school.state}
                  onChange={(e) =>
                    handleInputChange(index, "state", e.target.value)
                  }
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

          <h2 className="text-sm font-semibold text-center mt-2 mb-1">
            What is your status in reference to the school?
          </h2>
          <div className="flex justify-between items-center space-x-1 md:space-x-4">
            <label className="text-sm flex items-center">
              Student
              <input
                type="radio"
                name={`school-status-type-${index}`}
                value="0"
                checked={formItem.status === "0"}
                onChange={(e) => handleStatusChange(index, e.target.value)}
                className="ml-2 text-black"
              />
            </label>
            <label className="text-sm flex items-center">
              Alumnus/Alumna
              <input
                type="radio"
                name={`school-status-type-${index}`}
                value="ALUMNUS"
                checked={formItem.status === "ALUMNUS"}
                onChange={(e) => handleStatusChange(index, e.target.value)}
                className="ml-2 text-black bg-transparent"
              />
            </label>
            <label className="text-sm flex items-center">
              Dropout
              <input
                type="radio"
                name={`school-status-type-${index}`}
                value="2"
                checked={formItem.status === "2"}
                onChange={(e) => handleStatusChange(index, e.target.value)}
                className="ml-2 text-black"
              />
            </label>
          </div>

          <div className="mb-6 mt-2">
            <label className="block text-sm font-semibold mb-1 text-center">
              What did you study?
            </label>
            <p className="text-sm text-black italic mb-2 text-center">
              It will not be made public.
            </p>
            <input
              type="text"
              value={formItem.course}
              onChange={(e) => handleCourseChange(index, e.target.value)}
              placeholder="Example: Medicine and Surgery"
              className="p-2 shadow-inner shadow-gray-600/50 border border-gray-300 rounded w-full"
            />
          </div>

          <div className="text-center">
            <button
              onClick={onBack}
              className="mt-8 mr-8 p-2 shadow-md bg-gray-200 rounded-md"
            >
              Back
            </button>
            <button
              onClick={onSubmit}
              className="mt-8 p-2 shadow-md bg-blue-500 text-white rounded-md"
            >
              Submit
            </button>
          </div>

          <div className="w-full flex justify-center items-center">
            <p className="text-center text-gray-600">
              <Link href="/auth/signin" className="text-blue-500 underline">
                Sign In instead
              </Link>
            </p>
          </div>
        </div>
      ))}
    </Fragment>
  )
}

export default LookSitizenStep3
