import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Eye, EyeOff, ShieldPlus } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const AdminRegister = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "", adminCode: "", });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState("assistant");
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value, }));
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match",
                variant: "destructive",
            });
            return;
        }

        const expectedCode = role === "admin" ? "ADMIN2024" : "ASSISTANT2024";
        if (formData.adminCode !== expectedCode) {
            toast({
                title: "Error",
                description: `Invalid ${role} registration code`,
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            toast({
                title: "Registration successful",
                description: `You can now login as a ${role}`,
            });
            navigate("/assistant/login");
            setIsLoading(false);
        }, 1000);
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
                                    <ShieldPlus className="h-6 w-6 text-primary-600" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl text-center">Portal Registration</CardTitle>
                            <CardDescription className="text-center">Create a new admin/assistant account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleRegister}>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label>Select Role</Label>
                                        <RadioGroup defaultValue="assistant" onValueChange={(value) => setRole(value)} className="flex flex-col space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="assistant" id="r-assistant" />
                                                <Label htmlFor="r-assistant">Assistant</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="admin" id="r-admin" />
                                                <Label htmlFor="r-admin">Admin</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="username" className="text-sm font-medium">Username</label>
                                        <Input id="username" name="username" type="text" placeholder="Enter username" value={formData.username} onChange={handleInputChange} required />
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                                        <Input id="email" name="email" type="email" placeholder="Enter email" value={formData.email} onChange={handleInputChange} required />
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                                        <div className="relative">
                                            <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Create a password" value={formData.password} onChange={handleInputChange} required />
                                            <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? (
                                                    <EyeOff size={18} />
                                                ) : (
                                                    <Eye size={18} />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
                                        <Input id="confirmPassword" name="confirmPassword" type={showPassword ? "text" : "password"} placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleInputChange} required />
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="adminCode" className="text-sm font-medium">
                                            {role.charAt(0).toUpperCase() + role.slice(1)}{" "}
                                            Registration Code
                                        </label>
                                        <Input id="adminCode" name="adminCode" type="text" placeholder={`Enter ${role} registration code`} value={formData.adminCode} onChange={handleInputChange} required />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={isLoading}>
                                        {isLoading
                                            ? "Creating account..."
                                            : `Register as ${role.charAt(0).toUpperCase() + role.slice(1)
                                            }`}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <p className="text-sm text-gray-500">
                                Already have an account?{" "}
                                <Link to="/assistant/login" className="text-primary-600 hover:underline">Login here</Link>
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminRegister;
