import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_URL } from "../config";

const AddUserForm = () => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    roleId: "",
  });
  const [roles, setRoles] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const editUser = location.state?.user;

  useEffect(() => {
    fetch(`${API_URL}/roles`)
      .then((res) => res.json())
      .then((data) => setRoles(data));
  }, []);

  useEffect(() => {
    if (editUser) {
      setForm({
        userName: editUser.userName,
        email: editUser.email,
        password: "",
        roleId: editUser.role?.roleId,
      });
    }
  }, [editUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editUser) {
      //  UPDATE USER
      await fetch(`http://localhost:8080/users/${editUser.userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      alert("User updated successfully!");
    } else {
      //create user
      await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      alert("User added successfully!");
    }

    navigate("/admin/users");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">
        {editUser ? "Edit User" : "Add User"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="userName"
          value={form.userName}
          placeholder="Username"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <select
          name="roleId"
          value={form.roleId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Role</option>

          {roles.map((role) => (
            <option key={role.roleId} value={role.roleId}>
              {role.roleName}
            </option>
          ))}
        </select>

        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          {editUser ? "Update User" : "Add User"}
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
