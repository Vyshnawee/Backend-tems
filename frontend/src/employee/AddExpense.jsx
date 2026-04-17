import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const AddExpense = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const editData = location.state?.expense;

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // ✅ Fetch categories
  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ Prefill for edit
  useEffect(() => {
    if (editData) {
      setTitle(editData.title || "");
      setAmount(editData.amount || "");
      setDescription(editData.description || "");
      setCategoryId(editData.categoryId || "");
    }
  }, [editData]);

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in");
      return;
    }

    if (!categoryId) {
      alert("Please select category");
      return;
    }

    if (file && file.size > 5 * 1024 * 1024) {
      alert("File too large (max 5MB)");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("amount", Number(amount));
      formData.append("description", description);
      formData.append("categoryId", Number(categoryId));

      if (file) formData.append("file", file);

      const url = editData
        ? `${API_URL}/expenses/${editData.expenseId}`
        : `${API_URL}/expenses`;

      const method = editData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          userId: userId,
        },
        body: formData,
      });

      const text = await res.text();

      if (res.ok) {
        setSuccess(
          editData
            ? "✅ Expense updated successfully!"
            : "✅ Expense added successfully!",
        );

        // Reset
        setTitle("");
        setAmount("");
        setDescription("");
        setCategoryId("");
        setFile(null);

        setTimeout(() => {
          navigate("/employee/expense");
        }, 1500);
      } else {
        alert("❌ Failed: " + text);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {editData ? "✏️ Edit Expense" : "➕ Add Expense"}
        </h1>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="text-sm text-gray-600">Title</label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="text-sm text-gray-600">Amount</label>
            <input
              type="number"
              className="w-full border rounded-lg px-3 py-2 mt-1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm text-gray-600">Category</label>
            <select
              className="w-full border rounded-lg px-3 py-2 mt-1"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <textarea
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* File */}
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading
              ? editData
                ? "Updating..."
                : "Adding..."
              : editData
                ? "Update Expense"
                : "Add Expense"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
