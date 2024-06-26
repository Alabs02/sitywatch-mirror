import { useState, useEffect } from "react"

const useScrollCollapse = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const rightSideElement = document.getElementById("rightSide")
      if (rightSideElement) {
        const scrollPosition = rightSideElement.scrollTop
        setIsCollapsed(scrollPosition > 0)
      }
    }

    const rightSideElement = document.getElementById("rightSide")
    if (rightSideElement) {
      rightSideElement.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (rightSideElement) {
        rightSideElement.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  return isCollapsed
}

export default useScrollCollapse
