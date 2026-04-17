import { useRoutes } from "react-router-dom";
import Login from "./Commons/Login.jsx";

import ManagerDashboard from "./manager/ManagerDashboard";
import TeamExpenses from "./manager/TeamExpenses";
import Approvals from "./manager/Approvals";
import ManagerSidebar from "./manager/ManagerSidebar";

import EmployeeDashboard from "./employee/EmployeeDashboard";
import AddExpense from "./employee/AddExpense";
import MyExpense from "./employee/MyExpense";
import Profile from "./Commons/Profile.jsx";
import EmployeeSidebar from "./employee/EmployeeSidebar.jsx";

import AdminDashboard from "./admin/AdminDashboard";
import UserList from "./admin/UserList";
import AddUserForm from "./admin/AddUserForm";
import TeamList from "./admin/TeamList";
import TeamForm from "./admin/TeamForm";
import TeamDetails from "./admin/TeamDetails";
import AdminSidebar from "./admin/AdminSidebar.jsx";
import AdminPayments from "./admin/AdminPayments";
import PaymentSuccess from "./admin/PaymentSuccess";
import PaidExpenses from "./admin/PaidExpenses";
import TeamMembers from "./manager/TeamMembers.jsx";
import LandingPage from "./Commons/LandingPage.jsx";
import Signup from "./Commons/SignUp.jsx";

const App = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },

    {
      path: "/employee",
      element: <EmployeeSidebar />,
      children: [
        { index: true, element: <EmployeeDashboard /> },
        { path: "dashboard", element: <EmployeeDashboard /> },
        { path: "add-expense", element: <AddExpense /> },
        { path: "expense", element: <MyExpense /> },
        { path: "profile", element: <Profile /> },
      ],
    },
    {
      path: "/manager",
      element: <ManagerSidebar />,
      children: [
        { index: true, element: <ManagerDashboard /> },
        { path: "dashboard", element: <ManagerDashboard /> },
        { path: "team-members", element: <TeamMembers /> },
        { path: "team-expenses", element: <TeamExpenses /> },
        { path: "approvals", element: <Approvals /> },
        { path: "profile", element: <Profile /> },
      ],
    },
    {
      path: "/admin",
      element: <AdminSidebar />,
      children: [
        { index: true, element: <AdminDashboard /> },
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "users", element: <UserList /> },
        { path: "addUser", element: <AddUserForm /> },
        { path: "teams", element: <TeamList /> },
        { path: "addTeam", element: <TeamForm /> },
        { path: "teamDetails", element: <TeamDetails /> },
        { path: "payment", element: <AdminPayments /> },
        { path: "paid", element: <PaidExpenses /> },
        { path: "profile", element: <Profile /> },
      ],
    },
    {
      path: "/payment-success",
      element: <PaymentSuccess />,
    },
  ]);
  return routes;
};

export default App;
