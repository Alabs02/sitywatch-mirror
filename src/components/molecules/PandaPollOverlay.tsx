import React, { useEffect, useRef } from "react"

interface OverlayProps {
  onClose: () => void
}

const PandaPollOverlay: React.FC<OverlayProps> = ({ onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={overlayRef} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <ul className="space-y-4 text-center">
          <li className="flex items-center justify-center space-x-2">
            <span className="material-symbols-outlined">delete_sweep</span>
            <span>Trash Gist</span>
          </li>
          <li className="flex items-center justify-center space-x-2">
            <span className="material-symbols-outlined">mystery</span>
            <span>Watch @badassjess</span>
          </li>
          <li className="flex items-center justify-center space-x-2">
            <span className="material-symbols-outlined">swap_vert</span>
            <span>Avoid @badassjess</span>
          </li>
          <li className="flex items-center justify-center space-x-2">
            <span className="material-symbols-outlined">blind</span>
            <span>Blind @badassjess</span>
          </li>
          <li className="flex items-center justify-center space-x-2">
            <span className="material-symbols-outlined">healing</span>
            <span>Embed Gist</span>
          </li>
          <li className="flex items-center justify-center space-x-2">
            <span className="material-symbols-outlined">flag</span>
            <span>Report Gist</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default PandaPollOverlay
