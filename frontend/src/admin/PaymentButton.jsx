import React from "react";
import { API_URL } from "../config";

const PaymentButton = ({ expenseId, amount }) => {
  const handlePayment = async () => {
    try {
      const response = await fetch(
        `${API_URL}/payments/create-checkout-session/${expenseId}`,
        {
          method: "POST",
        },
      );

      const data = await response.json();

      console.log("Stripe URL:", data.url);

      if (data.url) {
        window.location.href = data.url; // ✅ redirect works now
      } else {
        alert("No URL received");
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        backgroundColor: "#635bff",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Pay ₹{amount}
    </button>
  );
};

export default PaymentButton;
