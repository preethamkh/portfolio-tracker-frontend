/**
 * Login Page
 *
 * Full page layout for login form.
 * Centers the form and adds branding.
 */

import { LoginForm } from "@/components/auth/LoginForm";
import { ENV } from "@/utils/constants";

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-100 to-indigo-100 px-4 font-sans">
      <div className="w-full max-w-md">
        {/* Logo/Branding */}
        <div className="text-center mb-8">
          {/* Replace with your logo if available */}
          <div className="flex justify-center mb-2">
            {/* <img src={Logo} alt="Portfolio Tracker" className="h-12" /> */}
            <span className="inline-block bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent text-4xl font-extrabold tracking-tight drop-shadow-md">
              {ENV.APP_NAME || "Portfolio Tracker"}
            </span>
          </div>
          <p className="text-base text-slate-600 font-medium tracking-wide">
            Track your investment portfolio
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl">
          <LoginForm />
        </div>
        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Portfolio Tracker. All rights
          reserved.
        </div>
      </div>
    </div>
  );
}
