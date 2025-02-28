import { useState } from "react";

export default function Alert({ message, type = "info", onClose }) {
  const alertStyles = {
    info: "bg-blue-100 border-blue-500 text-blue-700",
    success: "bg-green-100 border-green-500 text-green-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
    error: "bg-red-100 border-red-500 text-red-700",
  };

  return (
    <div className={`fixed top-5 right-5 p-4 border-l-4 rounded shadow-lg ${alertStyles[type]}`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-lg font-bold">×</button>
      </div>
    </div>
  );
}

export function useAlert() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = "info") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const AlertComponent = alert ? <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} /> : null;

  return { showAlert, AlertComponent };
}
