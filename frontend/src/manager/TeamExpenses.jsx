import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { API_URL } from "../config";

const TeamExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const teamId = localStorage.getItem("teamId");

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "paid":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const updateStatus = async (expenseId, status) => {
    try {
      const userId = localStorage.getItem("userId"); // ✅ get manager id

      if (status === "APPROVED") {
        await fetch(
          `${API_URL}/approvals/approve/${expenseId}?userId=${userId}`,
          {
            method: "POST",
          },
        );
      } else {
        await fetch(
          `${API_URL}/approvals/reject/${expenseId}?userId=${userId}`,
          {
            method: "POST",
          },
        );
      }

      fetchExpenses(); // refresh
    } catch (err) {
      console.error(err);
    }
  };

  const fetchExpenses = async () => {
    try {
      const res = await fetch(`${API_URL}/expenses/team/${teamId}`);
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (teamId) fetchExpenses();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Team Expenses</h1>

      <div className="bg-white shadow rounded p-4 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2">Title</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Employee</th>
              <th className="p-2">Category</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
              <th className="p-2">Receipt</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">
                  No expenses found
                </td>
              </tr>
            ) : (
              expenses.map((exp) => (
                <tr key={exp.expenseId} className="border-b hover:bg-gray-50">
                  <td className="p-2">{exp.title}</td>
                  <td className="p-2 font-medium">₹{exp.amount}</td>
                  <td className="p-2">{exp.user?.userName}</td>
                  <td className="p-2">{exp.category?.name}</td>

                  <td className="p-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                        exp.status,
                      )}`}
                    >
                      {exp.status}
                    </span>
                  </td>

                  <td className="p-2">
                    {exp.createdAt
                      ? new Date(exp.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="p-2">
                    {exp.receiptUrl ? (
                      <a
                        href={`${API_URL}/${exp.receiptUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400">No Receipt</span>
                    )}
                  </td>

                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => updateStatus(exp.expenseId, "APPROVED")}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      <Check size={16} />
                    </button>

                    <button
                      onClick={() => updateStatus(exp.expenseId, "REJECTED")}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      <X size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TeamExpenses;
