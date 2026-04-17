import { useNavigate } from "react-router-dom";
import dashboardImg from "../assets/dashboard.png";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* 🔷 Navbar */}
      <nav className="flex justify-between items-center px-10 py-5 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-emerald-400">TEMS</h1>

        <button
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 px-5 py-2 rounded-lg font-medium shadow-md transition"
        >
          Login
        </button>
      </nav>

      {/* 🔥 Hero */}
      <section className="text-center px-6 py-24">
        <h1 className="text-5xl font-bold leading-tight max-w-3xl mx-auto">
          Stop Managing Expenses in Chaos.
          <br />
          <span className="text-emerald-400">Start Managing with Clarity.</span>
        </h1>

        <p className="text-gray-400 mt-6 max-w-xl mx-auto text-lg">
          TEMS helps teams track, approve, and settle expenses in one
          streamlined platform — no spreadsheets, no confusion.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-8 bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:scale-105 transition"
        >
          Get Started
        </button>
      </section>

      {/* 💡 Problem → Solution */}
      <section className="px-10 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Why TEMS?</h2>

        <p className="text-gray-300 text-lg leading-relaxed">
          Managing team expenses manually leads to delays, confusion, and lack
          of transparency. TEMS eliminates these problems by providing a
          centralized platform where employees submit expenses, managers approve
          them, and payments are processed seamlessly — all in one place.
        </p>
      </section>

      {/* 📊 Stats */}
      <section className="flex justify-center gap-12 mt-20 text-center">
        <div>
          <h2 className="text-3xl font-bold text-emerald-400">100+</h2>
          <p className="text-gray-400">Expenses Managed</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-emerald-400">50+</h2>
          <p className="text-gray-400">Active Users</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-emerald-400">99%</h2>
          <p className="text-gray-400">Accuracy</p>
        </div>
      </section>

      {/* 🔥 Features */}
      <section className="grid md:grid-cols-3 gap-8 px-10 mt-20">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:scale-105 transition">
          <h3 className="text-lg font-semibold mb-2 text-emerald-400">
            Smart Expense Tracking
          </h3>
          <p className="text-gray-300">
            Capture every expense with categories, timestamps, and tracking —
            ensuring complete financial clarity across your team.
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:scale-105 transition">
          <h3 className="text-lg font-semibold mb-2 text-emerald-400">
            Approval Workflow
          </h3>
          <p className="text-gray-300">
            Managers can review, approve, or reject expenses instantly without
            delays or manual communication.
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:scale-105 transition">
          <h3 className="text-lg font-semibold mb-2 text-emerald-400">
            Secure Payments
          </h3>
          <p className="text-gray-300">
            Approved expenses are processed securely with integrated payment
            systems like Stripe.
          </p>
        </div>
      </section>

      {/* 🖥️ Dashboard Preview */}
      <section className="mt-24 px-10 text-center">
        <h2 className="text-3xl font-bold mb-10">
          Everything in One Dashboard
        </h2>

        <div className="bg-white/5 border border-white/10 rounded-xl p-10 max-w-4xl mx-auto">
          <p className="text-gray-400">
            Visualize expenses, track approvals, and manage payments — all from
            a single interface.
          </p>

          <div className="mt-6 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg flex items-center justify-center p-4">
            <img
              alt="dashboard-img"
              src={dashboardImg}
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* 🧠 How it works */}
      <section className="mt-24 px-10 text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-emerald-400 font-semibold mb-2">1. Submit</h3>
            <p className="text-gray-300">
              Employees submit expense details with required information.
            </p>
          </div>

          <div>
            <h3 className="text-emerald-400 font-semibold mb-2">2. Approve</h3>
            <p className="text-gray-300">
              Managers review and approve or reject instantly.
            </p>
          </div>

          <div>
            <h3 className="text-emerald-400 font-semibold mb-2">3. Pay</h3>
            <p className="text-gray-300">
              Approved expenses are paid securely through the system.
            </p>
          </div>
        </div>
      </section>

      {/* 👥 Roles */}
      <section className="mt-24 px-10">
        <h2 className="text-3xl font-bold text-center mb-10">
          Built for Every Role
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 p-6 rounded-xl">
            <h3 className="font-semibold mb-2">Admin</h3>
            <p className="text-gray-300">
              Full control over teams, payments, and expense tracking.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl">
            <h3 className="font-semibold mb-2">Manager</h3>
            <p className="text-gray-300">
              Approve or reject expenses and monitor team activity.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl">
            <h3 className="font-semibold mb-2">Employee</h3>
            <p className="text-gray-300">
              Submit expenses and track reimbursement status easily.
            </p>
          </div>
        </div>
      </section>

      {/* 🔒 Trust */}
      <section className="mt-24 px-10 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Built for Transparency & Trust
        </h2>

        <p className="text-gray-400 max-w-3xl mx-auto">
          Every expense is tracked, every approval is recorded, and every
          payment is secure — ensuring complete accountability across your
          organization.
        </p>
      </section>

      {/* 🚀 CTA */}
      <section className="text-center mt-24 pb-20">
        <h2 className="text-3xl font-bold mb-4">
          Ready to simplify your team expenses?
        </h2>

        <button
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 px-8 py-3 rounded-lg text-lg font-semibold shadow-lg"
        >
          Start Now
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
