import { useEffect, useState } from "react";
import { API_URL } from "../config";

const Approvals = () => {
  const [approvals, setApprovals] = useState([]);

  const fetchApprovals = async () => {
    try {
      const res = await fetch("${API_URL}/approvals");
      const data = await res.json();
      setApprovals(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  return (
    <>
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Approved Expenses
      </h1>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Employee</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {approvals.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No approved expenses yet 🚫
                  </td>
                </tr>
              ) : (
                approvals.map((a) => (
                  <tr
                    key={a.approvalId}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium">{a.expense.title}</td>

                    <td className="p-3 text-green-600 font-semibold">
                      ₹{a.expense.amount}
                    </td>

                    <td className="p-3 text-gray-600">
                      {a.expense.description}
                    </td>

                    <td className="p-3">{a.expense.user.userName}</td>

                    <td className="p-3 text-gray-500">
                      {new Date(a.approvedAt).toLocaleString()}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(
                          a.status,
                        )}`}
                      >
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Approvals;
