import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_URL } from "../config";

const TeamForm = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    teamName: "",
    managerName: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const editTeam = location.state?.team;

  // ✅ fetch users
  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  // ✅ prefill form (EDIT)
  useEffect(() => {
    if (editTeam) {
      setForm({
        teamName: editTeam.teamName || "",
        managerName: editTeam.manager?.userName || "", // ✅ FIXED
      });
    }
  }, [editTeam]);

  // ✅ handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const managerUser = users.find(
        (u) => u.userName.toLowerCase() === form.managerName.toLowerCase(),
      );

      if (!managerUser) {
        alert("Manager not found");
        return;
      }

      const payload = {
        teamName: form.teamName,
        createdById: Number(localStorage.getItem("userId")),
        managerId: managerUser.userId,
      };

      console.log("FINAL PAYLOAD:", payload);

      const res = await fetch(`${API_URL}/teams`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (!res.ok) {
        throw new Error("Failed to create team");
      }

      alert("Team added!");
      navigate("/admin/teams");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-xl font-bold mb-4">
        {editTeam ? "Edit Team" : "Add Team"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Team Name */}
        <input
          type="text"
          name="teamName"
          placeholder="Team Name"
          value={form.teamName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Manager Name */}
        <input
          type="text"
          name="managerName"
          placeholder="Manager Name"
          value={form.managerName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          {editTeam ? "Update Team" : "Add Team"}
        </button>
      </form>
    </div>
  );
};

export default TeamForm;
