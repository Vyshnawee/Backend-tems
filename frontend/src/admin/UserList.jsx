import { useEffect, useState } from "react";
import { Pencil, Trash2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(`${API_URL}/users`);
    const data = await response.json();
    setUsers(data);
    setFilteredUsers(data);
  };

  const fetchRoles = async () => {
    const response = await fetch(`${API_URL}/roles`);
    const data = await response.json();
    setRoles(data);
  };

  const handleSearch = () => {
    let filtered = users;

    if (search) {
      filtered = filtered.filter((user) =>
        user.userName.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (role) {
      filtered = filtered.filter((user) => user.role === role);
    }

    setFilteredUsers(filtered);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (!confirmDelete) return;

    await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
    });

    // refresh users
    fetchUsers();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">User Management</h1>
      <p className="text-gray-500 mb-6">Manage all users, roles and access</p>

      {/* Search + Filters */}
      <div className="flex gap-3 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="border p-2 rounded-lg w-64"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
        <button
          onClick={() => {
            setSearch("");
            setRole("");
            setFilteredUsers(users);
          }}
          className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
        >
          Reset
        </button>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="" disabled hidden>
            Role
          </option>
          {roles.map((r, i) => (
            <option key={i} value={r.roleName}>
              {r.roleName}
            </option>
          ))}
        </select>

        <button
          onClick={() => navigate("/admin/addUser")}
          className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          + Add User
        </button>
      </div>

      {/* Table */}
      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Team</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.userId} className="border-t text-center">
              <td className="p-3">{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.teamName}</td>
              <td className="space-x-3">
                <button
                  onClick={() =>
                    navigate("/admin/addUser", { state: { user } })
                  }
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => handleDelete(user.userId)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
