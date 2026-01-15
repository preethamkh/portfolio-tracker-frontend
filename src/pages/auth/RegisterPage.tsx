/**
 * Register Page
 *
 * Full page layout for registration form.
 */

import { RegisterForm } from "@/components/auth/RegisterForm";
//import { ENV } from "@/utils/constants";

export function RegisterPage() {
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

        {/* Register Form */}
        <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
