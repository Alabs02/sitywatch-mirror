import React, { FC, useEffect, useState } from "react";
import LookSitizenStep1 from "@/components/contents/create-new-look/LookSitizenStep1";
import LookSitadelStep1 from "@/components/contents/create-new-look/LookSitadelStep1";
import LookSitizenStep2 from "@/components/contents/create-new-look/LookSitizenStep2";
import LookSitadelStep2 from "@/components/contents/create-new-look/LookSitadelStep2";
import LookSitizenStep3 from "@/components/contents/create-new-look/LookSitizenStep3";
import LookSitadelStep3 from "@/components/contents/create-new-look/LookSitadelStep3";
import LookStepType from "@/components/contents/create-new-look/LookStepType";
import Link from "next/link";

// STORE
import { useAuthStore } from "@/store";

interface StepProps {
  onBack: () => void
  onNext?: () => void
}

const CreateNewLook: FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const authStore = useAuthStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sitizenSteps = [
    { id: 1, label: "Step 1", icon: "step_icon" },
    { id: 2, label: "Step 2", icon: "step_icon" },
    { id: 3, label: "Step 3", icon: "step_icon" },
  ];

  const sitadelSteps = [
    { id: 1, label: "Step 1", icon: "step_icon" },
    { id: 2, label: "Step 2", icon: "step_icon" },
    { id: 3, label: "Step 3", icon: "step_icon" },
  ];

  const onChangeStep = (step: number) => {
    if (!!authStore.ui.category || authStore.ui.currentStep === 0) {
      authStore.setNext();
    } else {
      alert("Please select a category to proceed.");
    }
  };

  const renderSteps = () => {
    switch (authStore.ui.currentStep) {
      case 0:
        return <LookStepType />;
      case 1:
        return authStore.ui.category === "sitizen" ? (
          <LookSitizenStep1 onBack={authStore.setPrevious} onNext={authStore.setNext} />
        ) : (
          <LookSitadelStep1 onBack={authStore.setPrevious} onNext={authStore.setNext} />
        );
      case 2:
        return authStore.ui.category === "sitizen" ? (
          <LookSitizenStep2 onBack={authStore.setPrevious} onNext={authStore.setNext} />
        ) : (
          <LookSitadelStep2 onBack={authStore.setPrevious} onNext={authStore.setNext} />
        );
      case 3:
        return authStore.ui.category === "sitizen" ? (
          <LookSitizenStep3 onBack={authStore.setPrevious} onNext={authStore.setNext} />
        ) : (
          <LookSitadelStep3 onBack={authStore.setPrevious} onNext={authStore.setNext} />
        );
      default:
        return <LookStepType />;
    }
  };

  if (!isMounted) return null;

  return (
    <div
      className="relative min-h-screen w-full bg-no-repeat overflow-hidden z-10 top-0"
      style={{
        backgroundImage: "url('/sw-login-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      {authStore.ui.loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="loader bg-gradient-to-r from-[#F24055] to-[#1E7881]"></div>
        </div>
      )}
      <Link href="/">
        <button className="absolute top-2 left-4 text-xl lg:grid hidden bg-tertiary-100 rounded-full h-8 w-8 place-items-center p-1 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-white shadow-md shadow-gray-400">
          ✕
        </button>
      </Link>

      <div className="relative w-full max-w-xl bg-white bg-opacity-80 shadow-lg rounded-lg p-6 md:w-1/2 h-screen mx-auto lg:mx-0 lg:h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gradient lg:absolute lg:top-10 lg:right-4 overflow-hidden md:px-20">
        <div className="flex items-center justify-between mb-6">
          {authStore.ui.category === "sitizen" &&
            sitizenSteps.map((step) => (
              <div key={step.id} className="flex flex-col items-center relative mb-10 h-full">
                <div
                  onClick={() => onChangeStep(step.id)}
                  className={`flex flex-col items-center cursor-pointer mb-4 overflow-hidden ${
                    step.id === authStore.ui.currentStep
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-[#F24055] to-[#1E7881]"
                      : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                      step.id === authStore.ui.currentStep
                        ? "border-[#F24055] bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white"
                        : "border-gray-200"
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">{step.icon}</span>
                  </div>
                  <div className="mt-2 text-xs sm:text-sm text-center w-20">{step.label}</div>
                </div>
              </div>
            ))}

          {authStore.ui.category === "sitadel" &&
            sitadelSteps.map((step) => (
              <div key={step.id} className="flex flex-col items-center relative mb-10 h-full">
                <div
                  onClick={() => onChangeStep(step.id)}
                  className={`flex flex-col items-center cursor-pointer mb-4 overflow-hidden ${
                    step.id === authStore.ui.currentStep
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-[#F24055] to-[#1E7881]"
                      : "text-gray-500"
                  }`}
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                      step.id === authStore.ui.currentStep
                        ? "border-[#F24055] bg-gradient-to-r from-[#F24055] to-[#1E7881] text-white"
                        : "border-gray-200"
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">{step.icon}</span>
                  </div>
                  <div className="mt-2 text-xs sm:text-sm text-center w-20">{step.label}</div>
                </div>
              </div>
            ))}
        </div>

        <div>{renderSteps()}</div>
      </div>
    </div>
  );
};

export default CreateNewLook;
