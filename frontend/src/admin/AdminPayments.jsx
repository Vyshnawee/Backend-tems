import React, { useEffect, useState } from "react";
import PaymentButton from "./PaymentButton";
import { API_URL } from "../config";

const AdminPayments = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch(`${API_URL}/expenses/approved`)
        .then((res) => res.json())
        .then((data) => setExpenses(data))
        .catch((err) => console.error(err));
    };

    fetchData();

    // 🔥 optional auto refresh every 5 sec
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      {/* 🔥 HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Payments Dashboard</h1>
        <p className="text-gray-500 mt-1">
          View and process all approved expenses
        </p>
      </div>

      {/* 🔥 CARD CONTAINER */}
      <div className="bg-white p-6 rounded-2xl shadow">
        {/* TABLE HEADER */}
        <ul className="grid grid-cols-7 gap-4 text-gray-500 font-semibold text-sm pb-3 border-b">
          <li>TITLE</li>
          <li>AMOUNT</li>
          <li>DESCRIPTION</li>
          <li>EMPLOYEE</li>
          <li>TEAM</li>
          <li>STATUS</li>
          <li>PAYMENT</li>
        </ul>

        {/* ROWS */}
        {expenses.length === 0 ? (
          <p className="text-gray-400 mt-4">No approved expenses found</p>
        ) : (
          expenses.map((expense) => (
            <ul
              key={expense.expenseId}
              className="grid grid-cols-7 gap-4 items-center py-4 border-b last:border-none hover:bg-gray-50 transition"
            >
              <li className="font-medium text-gray-800">{expense.title}</li>

              <li className="text-green-600 font-semibold">
                ₹{expense.amount}
              </li>

              <li className="text-gray-700">{expense.description}</li>

              <li className="text-gray-700">{expense.userName || "N/A"}</li>

              <li className="text-gray-700">{expense.teamName || "N/A"}</li>

              <li>
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                  {expense.status}
                </span>
              </li>

              <li>
                <PaymentButton
                  expenseId={expense.expenseId}
                  amount={expense.amount}
                />
              </li>
            </ul>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPayments;
