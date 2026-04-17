import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  Users,
  Receipt,
  CheckCircle,
  LayoutDashboard,
  LogOut,
  UserCircle,
} from "lucide-react";

const ManagerSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8">Manager Panel</h1>

          <ul className="space-y-4">
            {/* Dashboard */}
            <li
              onClick={() => navigate("/manager/dashboard")}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded 
              ${
                location.pathname === "/manager/dashboard"
                  ? "bg-gray-700"
                  : "hover:bg-gray-800"
              }`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </li>

            {/* Team Members */}
            <li
              onClick={() => navigate("/manager/team-members")}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded 
              ${
                location.pathname === "/manager/team-members"
                  ? "bg-gray-700"
                  : "hover:bg-gray-800"
              }`}
            >
              <Users size={18} />
              Team Members
            </li>

            {/* Team Expenses */}
            <li
              onClick={() => navigate("/manager/team-expenses")}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded 
              ${
                location.pathname === "/manager/team-expenses"
                  ? "bg-gray-700"
                  : "hover:bg-gray-800"
              }`}
            >
              <Receipt size={18} />
              Team Expenses
            </li>

            {/* Approvals */}
            <li
              onClick={() => navigate("/manager/approvals")}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded 
              ${
                location.pathname === "/manager/approvals"
                  ? "bg-gray-700"
                  : "hover:bg-gray-800"
              }`}
            >
              <CheckCircle size={18} />
              Approvals
            </li>

            <li
              onClick={() => navigate("/manager/profile")}
              className={`flex items-center gap-3 cursor-pointer p-2 rounded 
              ${
                location.pathname === "/manager/profile"
                  ? "bg-gray-700"
                  : "hover:bg-gray-800"
              }`}
            >
              <UserCircle size={18} />
              Profile
            </li>
          </ul>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 p-2 rounded"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Page Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default ManagerSidebar;
