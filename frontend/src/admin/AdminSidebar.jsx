import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Users,
  CreditCard,
  LayoutDashboard,
  IndianRupee,
  LogOut,
  UserCircle,
} from "lucide-react";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const linkClass = "flex items-center gap-3 p-2 rounded-lg transition";

  const activeClass = "bg-gray-700";

  return (
    <div className="flex">
      {/* ✅ Sidebar */}
      <div className="w-64 h-screen bg-gray-900 text-white p-5 fixed top-0 left-0 flex flex-col">
        <div>
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

          <ul className="space-y-4">
            <li>
              <NavLink
                to="/admin/dashboard"
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
                to="/admin/users"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : "hover:bg-gray-700"}`
                }
              >
                <Users size={18} />
                Users
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/teams"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : "hover:bg-gray-700"}`
                }
              >
                <Users size={18} />
                Teams
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/payment"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : "hover:bg-gray-700"}`
                }
              >
                <CreditCard size={18} />
                Payment
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/paid"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : "hover:bg-gray-700"}`
                }
              >
                <IndianRupee size={18} />
                Paid Expenses
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/profile"
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

export default AdminSidebar;
