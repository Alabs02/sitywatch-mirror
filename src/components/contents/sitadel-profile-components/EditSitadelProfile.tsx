import React, { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useForm } from "react-hook-form"

interface EditSitadelOverlayProps {
  onClose: () => void
}

const EditSitadelOverlay: React.FC<EditSitadelOverlayProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm()
  const [profileImage, setProfileImage] = useState("/sitadel-ppix.png")
  const [coverImage, setCoverImage] = useState("/sitadel-backdrop.png")

  const handleImageChange = (
    type: "profile" | "cover",
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          if (type === "profile") {
            setProfileImage(e.target.result as string)
          } else {
            setCoverImage(e.target.result as string)
          }
        }
      }
      reader.readAsDataURL(event.target.files[0])
    }
  }

  const onSubmit = (data: any) => {
    console.log("Form Data:", data)
    onClose() // Close the overlay
  }

  const handle = watch("handle", "")
  const bio = watch("bio", "")

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="relative w-full max-w-xl mx-4 p-4 bg-white rounded-2xl shadow-lg overflow-y-auto"
        style={{ maxHeight: "80vh" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose} className="text-primary-500">
            <span className="material-symbols-outlined">cancel</span>
          </button>
          <h2 className="font-bold text-lg">Edit Sitadel</h2>
          <button
            type="submit"
            form="edit-sitadel-form"
            className="bg-gradient-to-b from-primary-500 to-secondary-500 text-white px-3 py-1 rounded-lg"
          >
            Save changes
          </button>
        </div>

        {/* Cover Photo */}
        <div className="relative mb-12">
          <Image
            src={coverImage}
            alt="Cover Photo"
            layout="responsive"
            width={1000}
            height={300}
            className="rounded-lg"
          />
          <label className="absolute inset-0 flex items-center justify-center text-white cursor-pointer">
            <span className="material-symbols-outlined text-5xl">
              add_a_photo
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange("cover", e)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
        </div>

        {/* Profile Photo */}
        <div
          className="relative"
          style={{ width: "150px", marginTop: "-75px", marginLeft: "20px" }}
        >
          <Image
            src={profileImage}
            alt="Profile Photo"
            className="rounded-full border-4 border-white"
            width={150}
            height={150}
          />
          <label className="absolute inset-0 flex items-center justify-center text-white cursor-pointer">
            <span className="material-symbols-outlined text-4xl">
              add_a_photo
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange("profile", e)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
        </div>

        {/* Form */}
        <form
          id="edit-sitadel-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 mt-8"
        >
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Handle</label>
            <input
              type="text"
              {...register("handle")}
              maxLength={20}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <p className="text-sm text-gray-500 mt-1">
              @{handle.length} / 20 characters
            </p>
          </div>
          <div>
            <label className="block mb-1">Bio</label>
            <textarea
              {...register("bio")}
              maxLength={200}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <p className="text-sm text-gray-500 mt-1">
              {bio.length} / 200 characters
            </p>
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex space-x-2 mb-4">
            <div className="flex-1 relative">
              <select
                {...register("countryCode")}
                className="w-full px-3 py-2 border border-gray-300 rounded pl-8"
              >
                <option value="+234">+234</option>
              </select>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Image
                  src="/flags/nigeria.svg"
                  alt="Nigeria Flag"
                  width={20}
                  height={15}
                />
              </span>
            </div>
            <input
              type="text"
              {...register("phone")}
              className="flex-1 px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex space-x-2 mb-4">
            <div className="flex-1">
              <label className="block mb-1">Country</label>
              <select
                {...register("country")}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="Nigeria">Nigeria</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-1">State</label>
              <select
                {...register("state")}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block mb-1">Address</label>
            <input
              type="text"
              {...register("address")}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default EditSitadelOverlay
