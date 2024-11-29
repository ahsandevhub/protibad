// layout.jsx
import Link from "next/link";

export const metadata = {
  title: "Admin Panel | Protibad App - যেখানেই অন্যায় সেখানেই প্রতিবাদ",
  description: "Developed by: UGV_Squad",
};

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="h-16 bg-red-600 flex items-center justify-center text-xl font-semibold">
          Admin Dashboard
        </div>
        <ul className="space-y-4 mt-6 px-6">
          <li>
            <Link
              href="/admin/dashboard"
              className="text-gray-300 hover:text-white"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/admin/users"
              className="text-gray-300 hover:text-white"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              href="/admin/settings"
              className="text-gray-300 hover:text-white"
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              href="/admin/logout"
              className="text-gray-300 hover:text-white"
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Main content area */}
      <div className="flex-1 bg-gray-100">
        {/* Top bar */}
        <div className="h-16 bg-white shadow-md flex items-center justify-between px-6">
          <div className="text-xl font-semibold text-gray-800">Dashboard</div>
          <div>
            <button className="text-gray-600 hover:text-gray-800">
              Notifications
            </button>
            <button className="ml-6 text-gray-600 hover:text-gray-800">
              Profile
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
