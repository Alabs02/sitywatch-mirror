import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { http } from "@/libs";
import { apiRoutes } from "@/constants/apiRoutes";
import { successStatusCodes } from "@/constants";
import _toLower from "lodash/toLower";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store"

const VerifyEmail = () => {
  const authStore = useAuthStore();

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const { token } = router.query;

  const verifyEmail = async () => {
    try {
      const response = await http.post(apiRoutes.VERIFY_EMAIL, { token });
      console.log({ response });

      if (successStatusCodes.includes(response.status)) {
        toast.success("You're email has been successfully verified!");

        setTimeout(() => {
          router.replace("/");
        }, 500);
      } else {
        setLoading(false);
        toast.error(response.data?.message || "An error occured. Pleae try again.");
      }
    } catch (error: any) {
      setLoading(false);
      console.error({ error });
      toast.error(error?.response.data?.message || "An error occured. Pleae try again.");
    }
  }

  useEffect(() => {    
    authStore.resetForm();
    
    if (token) {
      console.log('Token:', token);
      // ! Remember to un-comment this
      // verifyEmail();
    }
  }, [token]);


  return (
    <div className="w-full min-h-screen grid place-items-center">
      <div className="flex flex-col gap-y-4 items-center">
        { loading && (<div className="w-12 h-12 border-4 border-red-500 border-t-transparent border-solid rounded-full animate-spin"></div>) }

        <p className="text-base">Hang in tight. We're verify your email...</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
