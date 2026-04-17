import { useEffect, useState } from "react";
import { IndianRupee, Receipt, CreditCard, TrendingUp } from "lucide-react";
import NotificationBell from "../Commons/NotificationBell";
import { API_URL } from "../config";

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
  Legend,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = [
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#14b8a6",
    "#f97316",
  ];

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

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.error("No userId or token found");
      return;
    }

    const monthNames = [
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

    const fetchDashboard = async () => {
      const res = await fetch(`${API_URL}/employee/dashboard/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return;

      const data = await res.json();

      setStats({
        totalAmount: data.totalAmount,
        paidAmount: data.paidAmount,
        pendingAmount: data.pendingAmount,
        thisMonth: data.thisMonth,
      });
    };

    const fetchMonthlyData = async () => {
      const res = await fetch(
        `${API_URL}/employee/dashboard/${userId}/monthly`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) return;

      const data = await res.json();

      const fullYear = Array.from({ length: 12 }, (_, i) => ({
        month: monthNames[i],
        amount: 0,
      }));

      data.forEach((item) => {
        const index = item.month - 1;
        if (index >= 0 && index < 12) {
          fullYear[index].amount = item.amount;
        }
      });

      setMonthlyData(fullYear);
    };

    const fetchCategoryData = async () => {
      const res = await fetch(
        `${API_URL}/employee/dashboard/${userId}/category`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) return;

      const data = await res.json();
      setCategoryData(data || []);
    };

    const fetchRecentExpenses = async () => {
      const res = await fetch(
        `${API_URL}/employee/dashboard/${userId}/recent`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) return;

      const data = await res.json();
      setExpenses(data || []);
    };

    const loadAll = async () => {
      await Promise.all([
        fetchDashboard(),
        fetchMonthlyData(),
        fetchCategoryData(),
        fetchRecentExpenses(),
      ]);
      setLoading(false);
    };

    loadAll();
  }, []);

  if (loading) return <h2 className="p-6">Loading...</h2>;

  return (
    <div className="w-full p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Welcome back 👋 Here’s your expense overview
          </p>
        </div>

        <NotificationBell />
      </div>

      {/* 🔥 QUICK ACTIONS */}
      <div className="flex gap-4 mb-6">
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm">
          + Add Expense
        </button>

        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm">
          View Reports
        </button>
      </div>

      {/* 🔥 STATS */}
      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <Card
          title="Total Expenses"
          value={stats.totalAmount || 0}
          icon={<IndianRupee />}
        />
        <Card
          title="Paid"
          value={stats.paidAmount || 0}
          icon={<CreditCard />}
          green
        />
        <Card
          title="Pending"
          value={stats.pendingAmount || 0}
          icon={<Receipt />}
          red
        />
        <Card
          title="This Month"
          value={stats.thisMonth || 0}
          icon={<TrendingUp />}
        />
      </div>

      {/* 🔥 CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="font-semibold mb-4">Monthly Spending</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="font-semibold mb-4">Category Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔥 RECENT EXPENSES */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="font-semibold mb-4">Recent Expenses</h2>

        <table className="w-full">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th className="text-left">Name</th>
              <th className="text-left">Title</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-400">
                  No expenses found
                </td>
              </tr>
            ) : (
              expenses.map((exp) => (
                <tr
                  key={exp.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-3">{exp.userName}</td>
                  <td>{exp.title}</td>
                  <td>₹{exp.amount}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyle(exp.status)}`}
                    >
                      {exp.status}
                    </span>
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

const Card = ({ title, value, icon, green, red }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition flex items-center justify-between">
      <div>
        <p className="text-gray-500">{title}</p>
        <h3
          className={`text-xl font-bold ${green ? "text-green-600" : red ? "text-red-500" : ""}`}
        >
          ₹{value}
        </h3>
      </div>
      <div className="text-gray-500">{icon}</div>
    </div>
  );
};

export default Dashboard;
