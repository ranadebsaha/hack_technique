import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Eye, EyeOff, User } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/components/ui/use-toast";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.auth) {
        // Save token & user info as needed, e.g. localStorage
        localStorage.setItem("auth", data.auth);
        localStorage.setItem("user", JSON.stringify(data.user));

        toast({
          title: "Login successful",
          description: `Welcome back, ${data.user.name}`,
        });

        navigate("/user/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: data.result || "Invalid email or password",
          variant: "destructive",
        });
      }

    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Header />
      <main className="flex-grow flex items-center justify-center py-8 px-4">
        <div className="container max-w-md w-full">
          <Card className="w-full shadow-xl border-2 border-primary-100">
            <CardHeader className="space-y-3 pb-6">
              <div className="flex justify-center mb-2">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-center text-gray-900">User Login</CardTitle>
              <CardDescription className="text-center text-base">Login to access your account</CardDescription>
            </CardHeader>
            <CardContent className="px-6">
              <form onSubmit={handleLogin}>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <label htmlFor="email" className="text-base font-semibold text-gray-700">Email Address</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 text-base border-2 focus:border-primary-500"
                    />
                  </div>
                  <div className="grid gap-3">
                    <label htmlFor="password" className="text-base font-semibold text-gray-700">Password</label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 text-base border-2 focus:border-primary-500 pr-12"
                      />
                      <button
                        type="button"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="h-12 text-base font-semibold bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg transition-all"
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 text-center pb-6 pt-4">
              <p className="text-base text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary-600 hover:text-primary-700 font-semibold underline">Register here</Link>
              </p>
              <p className="text-base text-gray-600">
                Are you an assistant?{" "}
                <Link to="/assistant/login" className="text-primary-600 hover:text-primary-700 font-semibold underline">Login here</Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserLogin;
