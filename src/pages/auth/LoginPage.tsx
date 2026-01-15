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
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Logo/Branding */}
        <div className="text-center mb-8">
          {/* <h1 className="text-4xl font-bold text-primary mb-2">
            {ENV.APP_NAME}
          </h1>
          <p className="text-muted-foreground">
            Track your investment portfolio
          </p> */}
        </div>

        {/* Login Form */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
