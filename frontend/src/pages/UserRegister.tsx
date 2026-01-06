import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/components/ui/use-toast";

const UserRegister = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    mobile_no: "", 
    dob: "", 
    gender: "", 
    address: "", 
    landmark: "", 
    city: "", 
    district: "", 
    state: "", 
    pincode: "", 
    password: "", 
    confirmPassword: "" 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    // Basic validation for required fields
    if (!formData.name || !formData.email || !formData.mobile_no || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://cyber-bandhu.onrender.com/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile_no: formData.mobile_no,
          dob: formData.dob,
          gender: formData.gender,
          address: formData.address,
          landmark: formData.landmark,
          city: formData.city,
          district: formData.district,
          state: formData.state,
          pincode: formData.pincode,
          password: formData.password,
        }),
      });
      const data = await response.json();

      if (data.result === "User Already Registered") {
        toast({
          title: "Error",
          description: "User with this email already exists",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Registration successful! Please login.",
        });
        navigate("/login");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
                  <UserPlus className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">Create Account</CardTitle>
              <CardDescription className="text-center">Enter your information to create an account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                    <Input 
                      id="name" 
                      name="name" 
                      type="text" 
                      placeholder="Enter your full name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="mobile_no" className="text-sm font-medium">Mobile Number</label>
                    <Input 
                      id="mobile_no" 
                      name="mobile_no" 
                      type="tel" 
                      placeholder="Enter your mobile number" 
                      value={formData.mobile_no} 
                      onChange={handleInputChange} 
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="dob" className="text-sm font-medium">Date of Birth</label>
                    <Input 
                      id="dob" 
                      name="dob" 
                      type="date" 
                      value={formData.dob} 
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Gender</label>
                    <div className="flex space-x-4">
                      <label>
                        <input 
                          type="radio" 
                          name="gender" 
                          value="male" 
                          checked={formData.gender === "male"} 
                          onChange={handleInputChange}
                        /> Male
                      </label>
                      <label>
                        <input 
                          type="radio" 
                          name="gender" 
                          value="female" 
                          checked={formData.gender === "female"} 
                          onChange={handleInputChange}
                        /> Female
                      </label>
                      <label>
                        <input 
                          type="radio" 
                          name="gender" 
                          value="other" 
                          checked={formData.gender === "other"} 
                          onChange={handleInputChange}
                        /> Other
                      </label>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="address" className="text-sm font-medium">Address</label>
                    <Input 
                      id="address" 
                      name="address" 
                      type="text" 
                      placeholder="Enter your address" 
                      value={formData.address} 
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="landmark" className="text-sm font-medium">Landmark</label>
                    <Input 
                      id="landmark" 
                      name="landmark" 
                      type="text" 
                      placeholder="Nearby landmark" 
                      value={formData.landmark} 
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="city" className="text-sm font-medium">City</label>
                    <Input 
                      id="city" 
                      name="city" 
                      type="text" 
                      placeholder="City" 
                      value={formData.city} 
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="district" className="text-sm font-medium">District</label>
                    <Input 
                      id="district" 
                      name="district" 
                      type="text" 
                      placeholder="District" 
                      value={formData.district} 
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="state" className="text-sm font-medium">State</label>
                    <Input 
                      id="state" 
                      name="state" 
                      type="text" 
                      placeholder="State" 
                      value={formData.state} 
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="pincode" className="text-sm font-medium">Pincode</label>
                    <Input 
                      id="pincode" 
                      name="pincode" 
                      type="text" 
                      placeholder="Pincode" 
                      value={formData.pincode} 
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <Input 
                        id="password" 
                        name="password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Create your password" 
                        value={formData.password} 
                        onChange={handleInputChange} 
                        required 
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Confirm your password" 
                      value={formData.confirmPassword} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 text-center">
              <p className="text-sm text-gray-500">
                Already have an account? <Link to="/login" className="text-primary-600 hover:underline">Login here</Link>
              </p>
              <p className="text-sm text-gray-500">
                Are you an assistant? <Link to="/assistant/login" className="text-primary-600 hover:underline">Login here</Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserRegister;
