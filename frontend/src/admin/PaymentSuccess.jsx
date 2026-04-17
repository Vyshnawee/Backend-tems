import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const PaymentSuccess = () => {
  const [status, setStatus] = useState("loading");
  const hasCalled = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    const expenseId = params.get("expenseId");

    fetch(
      `${API_URL}/payments/success?sessionId=${sessionId}&expenseId=${expenseId}`,
    )
      .then((res) => res.text())
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, []);

  // 🔄 Loading
  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-lg font-semibold">Processing payment...</h2>
      </div>
    );
  }

  // ❌ Error
  if (status === "error") {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-red-500 text-lg font-semibold">
          Payment Failed ❌
        </h2>
      </div>
    );
  }

  // ✅ Success UI
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center w-[350px]">
        {/* ✅ Green Circle Check */}
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">
          ✓
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">Payment Successful!</h2>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm mb-6">
          Thank you for your payment. Your booking has been successfully
          confirmed.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
