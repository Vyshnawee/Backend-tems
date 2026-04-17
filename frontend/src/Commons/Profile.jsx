import { useEffect, useState } from "react";
import { API_URL } from "../config";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`${API_URL}/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, [userId]);

  return (
    <div className="flex-1 p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
              {profile.userName?.charAt(0)}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {profile.userName}
              </h2>
              <p className="text-gray-500 text-sm">{profile.email}</p>

              <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-green-100 text-green-600">
                {profile.role}
              </span>
            </div>
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Edit
          </button>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="mt-2 text-gray-800 font-medium">
                {profile.userName}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="mt-2 text-gray-800 font-medium">{profile.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="mt-2 text-gray-800 font-medium">{profile.role}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Team</p>
              <p className="mt-2 text-gray-800 font-medium">
                {profile.teamName || "No Team"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
