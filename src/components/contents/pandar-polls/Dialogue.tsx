import React from "react"

interface DialogProps {
  title: string
  message: string
  onConfirm: () => void
  onCancel?: () => void
  isOpen: boolean
  confirmText?: string
  cancelText?: string
}

const Dialog: React.FC<DialogProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  isOpen,
  confirmText = "Yes",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{message}</p>
        <div className="flex justify-end">
          {onCancel && (
            <button
              className="px-4 py-2 mr-2 text-gray-600 bg-gray-100 rounded"
              onClick={onCancel}
            >
              {cancelText}
            </button>
          )}
          <button
            className="px-4 py-2 text-white bg-secondary rounded"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dialog
