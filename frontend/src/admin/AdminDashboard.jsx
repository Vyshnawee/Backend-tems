import { useEffect, useState } from "react";
import { Users, Receipt, CreditCard, TrendingUp } from "lucide-react";
import { API_URL } from "../config";

// ✅ ADD THIS IMPORT
import NotificationBell from "../commons/NotificationBell";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [monthlyData, setMonthlyData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const statsRes = await fetch(`${API_URL}/admin/dashboard`);
        setStats(await statsRes.json());

        const monthlyRes = await fetch(`${API_URL}/admin/dashboard/monthly`);
        setMonthlyData(await monthlyRes.json());

        const teamRes = await fetch(`${API_URL}/admin/dashboard/team-expenses`);
        setTeamData(await teamRes.json());

        const recentRes = await fetch(`${API_URL}/admin/dashboard/recent`);
        setRecentExpenses(await recentRes.json());

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <h2 className="p-6 text-gray-600 text-lg">Loading...</h2>;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      {/* ✅ UPDATED HEADER WITH NOTIFICATION */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

        {/* 🔔 Notification Bell */}
        <NotificationBell />
      </div>

      {/* 🔥 STATS */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card title="Total Users" value={stats.totalUsers} icon={<Users />} />

        <Card
          title="Total Expenses"
          value={stats.totalExpenses}
          icon={<Receipt />}
        />

        <Card
          title="Paid Amount"
          value={stats.paidAmount}
          icon={<CreditCard />}
          green
          isCurrency
        />

        <Card
          title="Pending Amount"
          value={stats.pendingAmount}
          icon={<TrendingUp />}
          red
          isCurrency
        />
      </div>

      {/* 🔥 CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="font-semibold text-gray-700 mb-4">Monthly Expenses</h2>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="font-semibold text-gray-700 mb-4">
            Team Expense Analysis
          </h2>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={teamData}>
              <XAxis dataKey="teamName" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Bar dataKey="amount" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔥 TABLE */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="font-semibold text-gray-700 mb-5">Recent Expenses</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="text-left py-3">User</th>
                <th className="text-left py-3">Title</th>
                <th className="text-left py-3">Amount</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentExpenses.map((exp) => (
                <tr
                  key={exp.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 font-medium text-gray-700">
                    {exp.userName}
                  </td>
                  <td>{exp.title}</td>
                  <td className="font-semibold">₹{exp.amount}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        exp.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : exp.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : exp.status === "REJECTED"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100"
                      }`}
                    >
                      {exp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ✅ CARD COMPONENT
const Card = ({ title, value, icon, green, red, isCurrency }) => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>

        <h3
          className={`text-2xl font-bold ${
            green ? "text-green-600" : red ? "text-red-500" : "text-gray-800"
          }`}
        >
          {isCurrency ? `₹${value || 0}` : value || 0}
        </h3>
      </div>

      <div className="p-3 bg-gray-100 rounded-xl text-gray-600">{icon}</div>
    </div>
  );
};

export default AdminDashboard;
