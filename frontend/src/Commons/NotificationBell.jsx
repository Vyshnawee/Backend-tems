import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { API_URL } from "../config";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const userId = localStorage.getItem("userId");

  // 🔄 Fetch notifications
  const fetchData = async () => {
    try {
      const notifRes = await fetch(`${API_URL}/notifications/${userId}`);
      const notifData = await notifRes.json();
      setNotifications(notifData);

      const countRes = await fetch(`${API_URL}/notifications/unread/${userId}`);
      const countData = await countRes.json();
      setCount(countData.count);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // ✅ Load once (NO auto refresh)
  useEffect(() => {
    fetchData();
  }, []);

  // 🔔 Only toggle UI (NO API CALL HERE)
  const toggle = () => {
    setOpen(!open);
  };

  // ✅ Mark all as read (ONLY HERE)
  const markAllAsRead = async () => {
    try {
      await fetch(`${API_URL}/notifications/read/${userId}`, {
        method: "PUT",
      });

      // ✅ instant UI update
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));

      setCount(0);
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  // ✅ Show only unread
  const unreadNotifications = notifications.filter((n) => !n.isRead);

  return (
    <div className="relative">
      {/* 🔔 Bell */}
      <button onClick={toggle}>
        <Bell className="w-6 h-6 text-gray-600" />
      </button>

      {/* 🔴 Badge */}
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
          {count}
        </span>
      )}

      {/* 📩 Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-72 bg-white shadow-lg rounded-lg p-4 z-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Notifications</h3>

            <button
              onClick={markAllAsRead}
              className="text-xs text-blue-600 hover:underline"
            >
              Mark all as read
            </button>
          </div>

          {unreadNotifications.length === 0 ? (
            <p className="text-gray-400 text-sm">No notifications</p>
          ) : (
            <ul className="space-y-2 text-sm max-h-60 overflow-y-auto">
              {unreadNotifications.map((n) => (
                <li
                  key={n.id}
                  className={`p-2 rounded ${
                    n.type === "APPROVED"
                      ? "bg-green-100 text-green-700"
                      : n.type === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : n.type === "PAYMENT"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100"
                  }`}
                >
                  {n.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
