// CustomButton.tsx

import React from "react"
import classnames from "classnames"

interface CustomButtonProps {
  isCollapsed: boolean
}

const CustomButton: React.FC<CustomButtonProps> = ({ isCollapsed }) => (
  <button
    className={classnames(
      "p-3 lg:px-8 lg:py-2 rounded-full lg:rounded-3xl bg-gradient-to-b from-primary-500 to-secondary-500 text-primary-content font-medium text-[15px] grid place-items-center lg:flex lg:items-center lg:gap-x-2 shadow z-50",
      {
        "hidden lg:block": isCollapsed, 
        "hidden md:block": isCollapsed && !isCollapsed, 
        "hidden sm:block": isCollapsed && !isCollapsed,
        "text-[18px]": isCollapsed, 
      },
    )}
  >
    {isCollapsed ? (
      <span className="hidden">Drop a Gist</span>
    ) : (
      <span className="text-content lg:inline">Drop a Gist</span>
    )}
    <span className="material-symbols-outlined text-[26px] lg:text-inherit">
      draft_orders
    </span>
  </button>
)

export default CustomButton
