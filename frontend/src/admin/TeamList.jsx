import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    const res = await fetch(`${API_URL}/teams`);
    const data = await res.json();
    setTeams(data);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this team?");
    if (!confirmDelete) return;

    await fetch(`${API_URL}/teams/${id}`, {
      method: "DELETE",
    });

    fetchTeams();
  };

  const handleEdit = (team) => {
    navigate("/admin/addTeam", { state: { team } });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Teams</h1>
          <p className="text-gray-500 text-sm">Manage your teams and members</p>
        </div>

        <button
          onClick={() => navigate("/admin/addTeam")}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition"
        >
          + Add Team
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div
            key={team.teamId}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >
            {/* Team Icon + Name */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold">
                {team.teamName.charAt(0).toUpperCase()}
              </div>

              <h2 className="text-lg font-semibold text-gray-800">
                {team.teamName}
              </h2>
            </div>

            {/* Info */}
            <p className="text-gray-400 text-sm mb-4">Team ID: {team.teamId}</p>

            {/* Actions */}
            <div className="flex justify-between items-center">
              {/* View */}
              <button
                onClick={() =>
                  navigate("/admin/teamDetails", { state: { team } })
                }
                className="text-sm px-3 py-1 bg-green-100 text-green-600 rounded-md hover:bg-green-200 transition"
              >
                View
              </button>

              <div className="flex gap-2">
                {/* Edit */}
                <button
                  onClick={() => handleEdit(team)}
                  className="text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition"
                >
                  Edit
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(team.teamId)}
                  className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
