import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  UserCircle,
  Receipt,
  PlusCircle,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

const EmployeeSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const linkClass =
    "flex items-center gap-3 cursor-pointer p-2 rounded-lg transition";

  const activeClass = "bg-gray-700";

  return (
    <div className="flex">
      {/* ✅ Sidebar */}
      <div className="w-64 h-screen bg-gray-900 text-white p-5 fixed top-0 left-0 flex flex-col">
        <div>
          <h1 className="text-xl font-bold mb-8">Employee Panel</h1>

          <ul className="space-y-4">
            <li>
              <NavLink
                to="/employee/dashboard"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : "hover:bg-gray-700"}`
                }
              >
                <LayoutDashboard size={18} />
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/employee/expense"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : "hover:bg-gray-700"}`
                }
              >
                <Receipt size={18} />
                My Expenses
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/employee/add-expense"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : "hover:bg-gray-700"}`
                }
              >
                <PlusCircle size={18} />
                Add Expense
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/employee/profile"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : "hover:bg-gray-700"}`
                }
              >
                <UserCircle size={18} />
                Profile
              </NavLink>
            </li>
          </ul>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 p-2 rounded mt-auto transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* ✅ Content Area */}
      <div className="flex-1 ml-64 p-6 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeSidebar;
