"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleToggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={cn("flex flex-col items-center justify-center min-h-screen px-4", className)} {...props}>
      <Card className="w-full max-w-md p-6 sm:p-8 shadow-md">
        <CardContent className="grid gap-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">Login to your Acme Inc account</p>
          </div>

          {/* Login Form */}
          <form className="flex flex-col gap-4">
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm underline-offset-2 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={handleToggleVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                >
                  {isPasswordVisible ? <Eye /> : <EyeOff />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <form action="/dashboard">
            <Button type="submit" className="w-full">Login</Button>
            </form>
          </form>

          {/* OR Divider */}
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-3 gap-4">
            <Button variant="outline" className="w-full">Apple</Button>
            <Button variant="outline" className="w-full">Google</Button>
            <Button variant="outline" className="w-full">Meta</Button>
          </div>

          {/* Signup Link */}
          <div className="text-center text-sm">
            Don&apos;t have an account? <a href="#" className="underline underline-offset-4">Sign up</a>
          </div>
        </CardContent>
      </Card>

      {/* Login Image - Visible on larger screens */}
      <div className=" hidden sm:block mt-8">
        <Image 
          src="/loginPage.png" 
          alt="Login Page" 
          width={400} 
          height={300} 
          className="rounded-lg object-cover shadow-md"
        />
      </div>

      {/* Terms & Privacy Policy */}
      <div className="mt-4 text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
