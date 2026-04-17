import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { API_URL } from "../config";

const TeamMembers = () => {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    try {
      const teamId = localStorage.getItem("teamId");

      const res = await fetch(`${API_URL}/teams/${teamId}/users`);
      const data = await res.json();

      setMembers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {" "}
      {/* ✅ centered + controlled width */}
      {/* Header */}
      <div className="flex items-center gap-3">
        <Users className="text-blue-600" size={26} />
        <h1 className="text-2xl font-semibold text-gray-800">Team Members</h1>
      </div>
      {/* Card */}
      <div className="bg-white shadow-md rounded-xl px-6 py-5 border border-gray-100">
        <table className="w-full text-sm">
          {/* Header */}
          <thead>
            <tr className="border-b text-gray-500 uppercase text-xs tracking-wide">
              <th className="py-3 text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-400">
                  No team members 🚫
                </td>
              </tr>
            ) : (
              members.map((m) => (
                <tr
                  key={m.userId}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 font-medium text-gray-800">
                    {m.userName}
                  </td>

                  <td className="text-gray-600">{m.email}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${
                      m.role?.roleName === "MANAGER"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                    >
                      {m.role?.roleName}
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

export default TeamMembers;
