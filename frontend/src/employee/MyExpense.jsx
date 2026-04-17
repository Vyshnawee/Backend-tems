import { useEffect, useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const MyExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in");
      return;
    }

    fetch(`${API_URL}/expenses/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error(err));
  }, []);

  // 🎨 Status Colors
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

  // 🗑️ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    try {
      const res = await fetch(`${API_URL}/expenses/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setExpenses((prev) => prev.filter((exp) => exp.expenseId !== id));
        alert("Expense deleted ✅");
      } else {
        alert("Delete failed ❌");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✏️ Edit
  const handleEdit = (expense) => {
    navigate("/employee/add-expense", {
      state: { expense },
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">📄 My Expenses</h1>

      <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Title</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Category</th>
              <th className="p-3">Status</th>
              <th className="p-3">Receipt</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {expenses.length > 0 ? (
              expenses.map((exp) => (
                <tr key={exp.expenseId} className="border-b hover:bg-gray-50">
                  <td className="p-3">{exp.title}</td>
                  <td className="p-3 font-semibold">₹ {exp.amount}</td>
                  <td className="p-3">{exp.categoryName}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                        exp.status,
                      )}`}
                    >
                      {exp.status}
                    </span>
                  </td>

                  <td className="p-3">
                    {exp.receiptUrl ? (
                      <a
                        href={
                          exp.receiptUrl.startsWith("http")
                            ? exp.receiptUrl
                            : `http://localhost:8080/${exp.receiptUrl.replace(
                                /^\/?/,
                                "",
                              )}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    ) : (
                      <span className="text-gray-400">No File</span>
                    )}
                  </td>

                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="text-yellow-500 hover:text-yellow-600"
                    >
                      <Pencil size={20} />
                    </button>

                    <button
                      onClick={() => handleDelete(exp.expenseId)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No expenses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyExpenses;
