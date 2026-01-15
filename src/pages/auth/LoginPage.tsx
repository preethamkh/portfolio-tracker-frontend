/**
 * Login Page
 *
 * Full page layout for login form.
 * Centers the form and adds branding.
 */

import { LoginForm } from "@/components/auth/LoginForm";

import { ENV } from "@/utils/constants";
import { RoadmapTimeline } from "@/components/common/RoadmapTimeline";

export function LoginPage() {
  // Calculate week dates
  const today = new Date();
  const weekDates = Array.from({ length: 4 }, (_, i) => {
    const d = new Date(today.getTime() + (i + 1) * 7 * 24 * 60 * 60 * 1000);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-slate-100 px-4 font-sans">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Roadmap & Features */}
        <div className="space-y-8">
          {/* Logo/Branding */}
          <div className="text-left mb-4">
            <span className="inline-block bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent text-5xl font-extrabold tracking-tight drop-shadow-md">
              {ENV.APP_NAME || "Portfolio Tracker"}
            </span>
            <p className="mt-2 text-lg text-slate-700 font-medium tracking-wide">
              A modern, multi-stack architecture to track your investment
              portfolio
            </p>
          </div>

          {/* Roadmap Timeline */}
          <div className="bg-gradient-to-br from-white via-indigo-50 to-blue-100 border border-indigo-200 rounded-2xl p-6 shadow-xl">
            <RoadmapTimeline weekDates={weekDates} />
          </div>

          {/* Current Capabilities */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2 flex items-center gap-2">
              ✅ What's Ready to Use
            </h3>
            <ul className="space-y-2 text-left text-slate-700">
              <li>
                <span className="font-bold text-indigo-600">
                  User Registration & Login:
                </span>{" "}
                Secure account creation, JWT management, protected dashboard
                access.
              </li>
              <li>
                <span className="font-bold text-indigo-600">
                  Portfolio Dashboard:
                </span>{" "}
                Real-time holdings, sortable table, color-coded gains/losses,
                responsive design.
              </li>
              <li>
                <span className="font-bold text-indigo-600">
                  Backend Architecture:
                </span>{" "}
                Clean layers, repository/service patterns, external API
                integration, Redis caching, 144+ tests.
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="flex flex-col justify-center items-center h-full">
          <div className="w-full max-w-md">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
              <LoginForm />
            </div>
            <div className="mt-8 text-center text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Portfolio Tracker. All rights
              reserved.
              <br />
              <span className="text-indigo-400">
                .NET 8 + React + PostgreSQL + Redis
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
