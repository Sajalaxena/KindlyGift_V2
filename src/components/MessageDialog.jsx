import { useEffect } from "react";

export default function MessageDialog({ isOpen, type, message, onClose, autoClose = 3000 }) {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, onClose]);

  if (!isOpen) return null;

  const bgColor = type === "success" ? "bg-green-50" : "bg-red-50";
  const borderColor = type === "success" ? "border-green-300" : "border-red-300";
  const iconColor = type === "success" ? "text-green-600" : "text-red-600";
  const buttonColor = type === "success" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${bgColor} border-2 ${borderColor} rounded-lg shadow-xl p-6 max-w-md w-full`}>
        <div className="flex items-start gap-4">
          <div className={`text-3xl ${iconColor} flex-shrink-0`}>
            {type === "success" ? "✓" : "✕"}
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-bold ${iconColor} mb-2`}>
              {type === "success" ? "Success!" : "Error"}
            </h3>
            <p className="text-gray-700">{message}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className={`${buttonColor} text-white px-6 py-2 rounded font-semibold transition-colors cursor-pointer`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
