import React, { useEffect, useState } from "react";
import { API_URL } from "../config";

const PaidExpenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/expenses/paid`)
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      {/* 🔥 HEADER */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">💳 Paid Expenses</h1>
          <p className="text-gray-500 text-sm">
            Track all completed payments and transactions
          </p>
        </div>

        {/* Optional badge */}
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
          Total: {expenses.length}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-gray-100 p-6 rounded-2xl shadow">
        {/* HEADER ROW */}
        <ul className="grid grid-cols-6 text-gray-600 font-semibold text-sm pb-3 border-b">
          <li>TITLE</li>
          <li>AMOUNT</li>
          <li>EMPLOYEE</li>
          <li>TEAM</li>
          <li>STATUS</li>
          <li>PAID DATE</li>
        </ul>

        {/* ROWS */}
        {Array.isArray(expenses) && expenses.length > 0 ? (
          expenses.map((exp) => (
            <ul
              key={exp.expenseId}
              className="grid grid-cols-6 items-center py-4 border-b hover:bg-gray-50"
            >
              <li className="font-medium">{exp.title}</li>

              <li className="text-green-600 font-semibold">₹{exp.amount}</li>

              <li>{exp.userName || "N/A"}</li>

              <li>{exp.teamName || "N/A"}</li>

              <li>
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  PAID
                </span>
              </li>

              <li>
                {exp.paidAt ? new Date(exp.paidAt).toLocaleString() : "N/A"}
              </li>
            </ul>
          ))
        ) : (
          <p className="text-center py-6 text-gray-500">
            No paid expenses found
          </p>
        )}
      </div>
    </div>
  );
};

export default PaidExpenses;
