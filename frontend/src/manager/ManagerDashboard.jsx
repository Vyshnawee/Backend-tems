import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { API_URL } from "../config";

import { IndianRupee, CheckCircle, Clock, XCircle } from "lucide-react";
import NotificationBell from "../Commons/NotificationBell";

const COLORS = [
  "#22c55e",
  "#f59e0b",
  "#3b82f6",
  "#ef4444",
  "#a855f7",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
  "#f97316",
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ManagerDashboard = () => {
  const [summary, setSummary] = useState({});
  const [monthly, setMonthly] = useState([]);
  const [category, setCategory] = useState([]);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const teamId = localStorage.getItem("teamId");

      const [s, m, c, p] = await Promise.all([
        fetch(`${API_URL}/manager/dashboard/summary?teamId=${teamId}`),
        fetch(`${API_URL}/manager/dashboard/monthly?teamId=${teamId}`),
        fetch(`${API_URL}/manager/dashboard/category?teamId=${teamId}`),
        fetch(`${API_URL}/manager/dashboard/pending?teamId=${teamId}`),
      ]);

      setSummary(await s.json());
      setMonthly(await m.json());
      setCategory(await c.json());
      setPending(await p.json());

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApprove = async (id) => {
    await fetch(`${API_URL}/manager/expenses/${id}/approve`, {
      method: "PUT",
    });
    fetchData();
  };

  const handleReject = async (id) => {
    await fetch(`${API_URL}/manager/expenses/${id}/reject`, {
      method: "PUT",
    });
    fetchData();
  };

  if (loading) return <h2 className="p-6">Loading...</h2>;

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 space-y-6">
      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Manager Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Manage team expenses and approvals
          </p>
        </div>

        <NotificationBell />
      </div>

      {/* 🔥 SUMMARY CARDS */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card
          title="Total Expenses"
          value={summary.total}
          icon={<IndianRupee />}
        />
        <Card
          title="Approved"
          value={summary.approved}
          icon={<CheckCircle />}
          color="text-green-600"
        />
        <Card
          title="Pending"
          value={summary.pending}
          icon={<Clock />}
          color="text-yellow-500"
        />
        <Card
          title="Rejected"
          value={summary.rejected}
          icon={<XCircle />}
          color="text-red-500"
        />
      </div>

      {/* 🔥 CHARTS */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Monthly */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Monthly Expenses
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthly}>
              <XAxis
                dataKey="month"
                tickFormatter={(m) => months[m - 1]}
                stroke="#6b7280"
                axisLine={true}
                tickLine={true}
              />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#22c55e"
                strokeWidth={3}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category */}
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Category Breakdown
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={category}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={110}
                label={({ name, value }) => `${name} : ₹${value}`}
              >
                {category.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔥 PENDING APPROVALS */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Pending Approvals
        </h2>

        <table className="w-full">
          <thead>
            <tr className="text-gray-500 text-sm border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left">Title</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Category</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {pending.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No pending approvals 🎉
                </td>
              </tr>
            ) : (
              pending.map((item) => (
                <tr
                  key={item.expenseId}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 font-medium">{item.user?.userName}</td>
                  <td>{item.title}</td>
                  <td className="text-green-600 font-semibold">
                    ₹{item.amount}
                  </td>
                  <td>
                    <span className="bg-gray-200 px-2 py-1 rounded text-sm">
                      {item.category?.name}
                    </span>
                  </td>
                  <td className="space-x-2">
                    <button
                      onClick={() => handleApprove(item.expenseId)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm transition active:scale-95"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleReject(item.expenseId)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition active:scale-95"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Card = ({ title, value, icon, color }) => (
  <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold text-gray-800">₹{value || 0}</h2>
    </div>
    <div className={`${color} text-3xl`}>{icon}</div>
  </div>
);

export default ManagerDashboard;
