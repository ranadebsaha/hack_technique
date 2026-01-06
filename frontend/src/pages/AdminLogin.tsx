import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, ShieldAlert } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("expert");
  const [error, setError] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    let loginEndpoint = "https://cyber-bandhu.onrender.com/admin/login";
    let loginRole = role;
    if (role === "expert") {
      loginEndpoint = "https://cyber-bandhu.onrender.com/expert/login";
      loginRole = "expert";
    }

    try {
      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: loginRole }),
      });

      const data = await response.json();

      if (response.ok) {
        if (role === "admin") {
          localStorage.setItem("admin", JSON.stringify(data.admin));
          localStorage.setItem("auth", data.auth);
        } else if (role === "expert") {
          localStorage.setItem("expert", JSON.stringify(data.expert));
          localStorage.setItem("auth", data.auth);
        }
        toast({
          title: "Login successful",
          description: `Welcome back, ${role.charAt(0).toUpperCase() + role.slice(1)}!`,
        });
        if (role === "expert") {
          navigate("/expert/dashboard");
        } else if (role === "admin") {
          navigate("/admin/dashboard");
        }
      } else {
        setError(data.message || "Invalid credentials.");
        toast({
          title: "Login failed",
          description: data.message || "Login failed. Please check your email, password, and role.",
          variant: "destructive",
        });
      }
    } catch (err) {
      setError("Network or server error. Please try again.");
      toast({
        title: "Login failed",
        description: "Network or server error. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16 bg-gray-50">
        <div className="container max-w-md">
          <Card className="w-full">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <ShieldAlert className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">Portal Login</CardTitle>
              <CardDescription className="text-center">
                Login to access the portal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Select Role</Label>
                    <RadioGroup
                      defaultValue="expert"
                      value={role}
                      onValueChange={(value) => setRole(value)}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="expert" id="expert" />
                        <Label htmlFor="expert">Expert</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="admin" id="admin" />
                        <Label htmlFor="admin">Admin</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  {/* Error Message */}
                  {error && (
                    <div className="text-red-500 text-sm mb-2 text-center">{error}</div>
                  )}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading
                      ? "Logging in..."
                      : `Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 text-center">
              <p className="text-sm text-gray-500">
                Want to become an assistant?{" "}
                <Link to="/join-us#apply" className="text-primary-600 hover:underline">
                  Apply here
                </Link>
              </p>
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary-600 hover:underline">
                  Register here
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLogin;
