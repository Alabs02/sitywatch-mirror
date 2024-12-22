import React, { FC, Fragment, useState } from "react"
import Link from "next/link"

// AXIOS
import { http } from "@/libs"

// STORE
import { useAuthStore, School } from "@/store"
import { apiRoutes, baseURI } from "@/constants/apiRoutes"
import { debounce } from "lodash"

// Define an interface for the response structure
interface SignUpResponse {
  statusCode: number
  message: string
}

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
    const [schoolOptions, setSchoolOptions] = useState<School[]>([])
    const [showDropdown, setShowDropdown] = useState(false)

const fetchSchools = debounce(
  async (query: string) => {
    // Fetch only if query is meaningful
    if (query.trim().length < 2) {
      setSchoolOptions([])
      setShowDropdown(false)
      return
    }

    try {
      const response = await http.get<any>(
        `${baseURI}${apiRoutes.OPTIONS_SCHOOLS}?query=${query}`,
      )

      if (response.status === 200) {
        const schools = response.data.success || [] // Ensure fallback to an empty array
        setSchoolOptions(schools)
        setShowDropdown(schools.length > 0)
      } else {
        console.error("API Error:", response.statusText)
        setSchoolOptions([])
        setShowDropdown(false)
      }
    } catch (error) {
      console.error("Error fetching schools:", error)
      setSchoolOptions([])
      setShowDropdown(false)
    }
  },
  300,
  { leading: true, trailing: true },
)

// Handle input changes for the school field
const handleSchoolInputChange = (index: number, value: string) => {
  const updatedSchoolingList = [...authStore.form.rawSchoolingList]
  updatedSchoolingList[index].school.name = value
  authStore.setForm("rawSchoolingList", updatedSchoolingList)

  // Fetch school options
  fetchSchools(value)
}


 const selectSchool = (index: number, school: School) => {
   const updatedSchoolingList = [...authStore.form.rawSchoolingList]
   updatedSchoolingList[index].school = school
   authStore.setForm("rawSchoolingList", updatedSchoolingList)

   // Close dropdown after selection
   setShowDropdown(false)
 }

  const handleInputChange = (
    index: number,
    field: keyof School | string,
    value: string,
  ) => {
    const updatedSchoolingList = [...authStore.form.rawSchoolingList]
    updatedSchoolingList[index].school[field as string] = value
    authStore.setForm("rawSchoolingList", updatedSchoolingList)
  }
 const handleStatusChange = (index: number, value: string) => {
   console.log(`Updating status for index ${index} to:`, value)
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
       const payload = {
         email: authStore.form.email,
         password: authStore.form.password,
         firstName: authStore.form.firstName,
         lastName: authStore.form.lastName,
         otherNames: authStore.form.otherNames,
         phone: authStore.form.phone,
         countryCode: authStore.form.countryCode || "defaultCountryCode",
         rawSchoolingList: authStore.form.rawSchoolingList,
         interests: authStore.form.interests,
       }

       try {
         authStore.setUI("loading", true)
         const response = await http.post<SignUpResponse>(
           `${baseURI}${apiRoutes.SITIZENS_SIGN_UP}`,
           payload,
         )

         if ([200, 201].includes(response.status)) {
           const tokenMatch = response.data.message.match(/token=(.*)$/)
           const token = tokenMatch ? tokenMatch[1] : null

           if (token) {
             authStore.setForm("emailToken", token)
             onNext()
           } else {
             alert("Registration successful, but no token received.")
           }
         }
       } catch (error) {
         console.error("Error during registration:", error)
         alert("Registration failed.")
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
          <div className="relative">
            <input
              type="text"
              value={formItem.school.name}
              onChange={(e) => handleSchoolInputChange(index, e.target.value)}
              placeholder="Example: University of Lagos"
              className="mb-1 p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
              onFocus={() =>
                setShowDropdown(
                  schoolOptions.length > 0 && formItem.school.name.length > 1,
                )
              } // Open only if conditions are met
            />

            {showDropdown && (
              <ul className="bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-y-auto absolute z-10 w-full">
                {schoolOptions.map((school) => (
                  <li
                    key={school.id}
                    onClick={() => selectSchool(index, school)}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                  >
                    {school.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <h2 className="text-sm font-semibold text-center mt-2 mb-1">
            What type of institution is it?
          </h2>
          <div className="flex justify-between items-center space-x-4">
            <label className="text-sm flex items-center">
              Tertiary
              <input
                type="radio"
                name={`school-type-${index}`}
                value="0"
                checked={formItem.school.type === 0}
                onChange={(e) => handleInputChange(index, "type", "0")}
                className="ml-2 text-black"
              />
            </label>
            <label className="text-sm flex items-center">
              High school
              <input
                type="radio"
                name={`school-type-${index}`}
                value="1"
                checked={formItem.school.type === 1}
                onChange={(e) => handleInputChange(index, "type", "1")}
                className="ml-2 text-black bg-transparent"
              />
            </label>
            <label className="text-sm flex items-center">
              Other
              <input
                type="radio"
                name={`school-type-${index}`}
                value="2"
                checked={formItem.school.type === 2}
                onChange={(e) => handleInputChange(index, "type", "2")}
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
                value="STUDENT"
                checked={formItem.status === "STUDENT"}
                onChange={(e) => handleStatusChange(index, "STUDENT")}
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
                onChange={(e) => handleStatusChange(index, "ALUMNUS")}
                className="ml-2 text-black bg-transparent"
              />
            </label>
            <label className="text-sm flex items-center">
              Other
              <input
                type="radio"
                name={`school-status-type-${index}`}
                value="OTHER"
                checked={formItem.status === "OTHER"}
                onChange={(e) => handleStatusChange(index, "OTHER")}
                className="ml-2 text-black"
              />
            </label>
          </div>

          <h2 className="text-sm font-semibold text-center mt-2 mb-1">
            What course of study did you pursue?
          </h2>
          <input
            type="text"
            value={formItem.course}
            onChange={(e) => handleCourseChange(index, e.target.value)}
            placeholder="Example: Computer Science"
            className="mb-1 p-2 border border-gray-300 rounded w-full shadow-inner shadow-gray-600/50"
          />
        </div>
      ))}

      <div className="flex justify-between my-4">
        <button
          onClick={onBack}
          className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
        >
          Back
        </button>

        <button
          onClick={onSubmit}
          className="p-2 bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </Fragment>
  )
}

export default LookSitizenStep3
