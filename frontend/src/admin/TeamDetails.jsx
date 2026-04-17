import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../config";

const TeamDetails = () => {
  const location = useLocation();
  const { team } = location.state || {};

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Add User States
  const [showModal, setShowModal] = useState(false);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  // 🔹 Fetch team users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!team?.teamId) return;

        const res = await fetch(`${API_URL}/teams/${team.teamId}/users`);

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [team]);

  // 🔹 Fetch available users (NOT in team)
  useEffect(() => {
    const fetchAvailableUsers = async () => {
      try {
        const res = await fetch("${API_URL}/users/available-employees");

        if (!res.ok) throw new Error("Failed to fetch employees");

        const data = await res.json();
        setAvailableUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (showModal) {
      fetchAvailableUsers();
    }
  }, [showModal]);

  // 🔹 Add user to team
  const handleAddUser = async () => {
    if (!selectedUserId) return;

    const userId = parseInt(selectedUserId);

    try {
      const res = await fetch(
        `${API_URL}/teams/${team.teamId}/member/${userId}`,
        {
          method: "POST",
        },
      );

      console.log("Response:", res.status);

      if (!res.ok) throw new Error("Failed to add user");

      // ✅ FIX: fetch updated team users
      const updatedRes = await fetch(`${API_URL}/teams/${team.teamId}/users`);

      const updatedUsers = await updatedRes.json();
      setUsers(updatedUsers);

      // optional: update dropdown
      setAvailableUsers((prev) => prev.filter((u) => u.userId !== userId));

      setShowModal(false);
      setSelectedUserId("");
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Remove user
  const handleRemove = async (userId) => {
    try {
      const res = await fetch(
        `${API_URL}/teams/${team.teamId}/users/${userId}/remove`,
        {
          method: "PUT",
        },
      );

      if (!res.ok) {
        throw new Error("Failed to remove user");
      }

      setUsers((prev) => prev.filter((u) => u.userId !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  // ⚠️ If page refreshed and no state
  if (!team) {
    return (
      <div className="p-6 text-red-500">
        No team data found. Please go back and click View again.
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Team: {team.teamName}</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add User
        </button>
      </div>

      {/* Loading */}
      {loading && <p>Loading team members...</p>}

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Empty */}
      {!loading && users.length === 0 && <p>No team members found</p>}

      {/* Table */}
      {!loading && users.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">User ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.userId} className="border-t hover:bg-gray-50">
                  <td className="p-3">{user.userId}</td>
                  <td className="p-3">{user.userName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role?.roleName}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleRemove(user.userId)}
                      className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add Employee to Team</h2>

            <select
              className="w-full border p-2 mb-4"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">Select Employee</option>
              {availableUsers.map((user) => (
                <option key={user.userId} value={user.userId}>
                  {user.userName} ({user.email})
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleAddUser}
                disabled={!selectedUserId}
                className={`px-3 py-1 rounded text-white ${
                  selectedUserId
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetails;
