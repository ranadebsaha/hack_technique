import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Link, useLocation } from "react-router-dom";
import {
    CreditCard,
    Clock,
    Smartphone,
    Users,
    GraduationCap,
    ShieldCheck,
    UserPlus,
    LogIn,
    CheckCircle,
    FileText,
    MapPin,
    Loader2,
    Briefcase,
    Lock,
    User,
    Home
} from "lucide-react";

const JoinUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile_no: "",
        dob: "",
        gender: "",
        govt_id: "",
        address: "",
        landmark: "",
        city: "",
        district: "",
        state: "",
        pincode: "",
        education: "",
        experience: "",
        whyJoin: "",
        password: "",
        location: null as { type: string; coordinates: [number, number] } | null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);
    const [locationStatus, setLocationStatus] = useState<string>("");
    const { toast } = useToast();
    const location = useLocation();

    const benefits = [
        {
            icon: CreditCard,
            title: "Earn While Learning",
            description:
                "Make money while helping fellow students and gaining valuable work experience.",
        },
        {
            icon: Clock,
            title: "Flexible Hours",
            description: "Work when it fits your schedule - perfect for balancing studies.",
        },
        {
            icon: Smartphone,
            title: "Improve Digital Skills",
            description: "Enhance your digital literacy while helping others.",
        },
        {
            icon: Users,
            title: "Community Impact",
            description: "Make a real difference by empowering students digitally.",
        },
        {
            icon: GraduationCap,
            title: "Professional Growth",
            description: "Develop communication and problem-solving skills.",
        },
        {
            icon: ShieldCheck,
            title: "Digital Safety",
            description: "Teach basic online safety practices.",
        },
    ];

    const requirements = [
        "Completed 12th standard or above",
        "Basic computer and smartphone proficiency",
        "Good communication skills",
        "Access to a laptop/tablet",
        "Reliable internet connection",
        "Ability to travel locally",
        "Strong commitment to helping others",
    ];

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" });
                }, 200);
            }
        }
    }, [location]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFetchLocation = () => {
        if (!navigator.geolocation) {
            toast({
                title: "Location not supported",
                description: "Geolocation is not supported by your browser.",
                variant: "destructive",
            });
            return;
        }

        setIsFetchingLocation(true);
        setLocationStatus("Fetching location...");

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { longitude, latitude } = position.coords;
                setFormData((prev) => ({
                    ...prev,
                    location: {
                        type: "Point",
                        coordinates: [longitude, latitude], // MongoDB GeoJSON format: [longitude, latitude]
                    },
                }));
                setLocationStatus(`Location fetched: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
                setIsFetchingLocation(false);
                toast({
                    title: "Location fetched successfully",
                    description: "Your location has been captured.",
                });
            },
            (error) => {
                setIsFetchingLocation(false);
                let errorMessage = "Failed to fetch location.";
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = "Location access denied. Please enable location permissions.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = "Location information unavailable.";
                        break;
                    case error.TIMEOUT:
                        errorMessage = "Location request timeout. Please try again.";
                        break;
                }
                setLocationStatus(errorMessage);
                toast({
                    title: "Location fetch failed",
                    description: errorMessage,
                    variant: "destructive",
                });
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const mandatoryFields = [
            "name",
            "email",
            "mobile_no",
            "dob",
            "gender",
            "govt_id",
            "address",
            "city",
            "district",
            "state",
            "education",
            "whyJoin",
            "password",
        ];

        const missingField = mandatoryFields.find((field) => !formData[field as keyof typeof formData]);
        if (missingField) {
            toast({
                title: "Validation Error",
                description: `Please fill in your ${missingField}.`,
                variant: "destructive",
            });
            setIsSubmitting(false);
            return;
        }


        try {
            const response = await fetch("http://localhost:5000/expert/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (data.result === "Expert Already Registered") {
                toast({
                    title: "Registration Failed",
                    description: "Expert with this email or ID already exists.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Registration Successful",
                    description: "Check your email for further instructions.",
                });
                setFormData({
                    name: "",
                    email: "",
                    mobile_no: "",
                    dob: "",
                    gender: "",
                    govt_id: "",
                    address: "",
                    landmark: "",
                    city: "",
                    district: "",
                    state: "",
                    pincode: "",
                    education: "",
                    experience: "",
                    whyJoin: "",
                    password: "",
                    location: null,
                });
                setLocationStatus("");
            }
        } catch {
            toast({
                title: "Error",
                description: "Something went wrong, please try again.",
                variant: "destructive",
            });
        }
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            <Header />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative py-20 lg:py-28 overflow-hidden bg-indigo-900">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 opacity-90"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="container relative mx-auto px-4 text-center text-white">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-indigo-100 text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
                            <UserPlus className="w-4 h-4 mr-2" /> Join Our Network
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Cyber Bandhu</span>
                        </h1>
                        <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
                            Join your peers and help students across India navigate the digital world while earning a steady income.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="bg-white text-indigo-900 hover:bg-gray-100 shadow-xl shadow-indigo-900/20 text-lg px-8">
                                <a href="#apply">Apply Now</a>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="border-indigo-300 text-indigo-500 hover:bg-white hover:!text-indigo-600 hover:border-white text-lg px-8 transition-colors duration-300">
                                <Link to="/assistant/login">
                                    <LogIn className="mr-2 w-5 h-5" />
                                    Assistant Login
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Join as a Digital Dost?</h2>
                            <p className="text-gray-600 text-lg">More than just a job - it's an opportunity to grow and serve.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
                                    <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <benefit.icon className="h-7 w-7 text-indigo-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Requirements & Form Section */}
                <section id="apply" className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">

                            {/* Left Side: Requirements & Training */}
                            <div className="lg:w-4/12 space-y-8">
                                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                                    <h3 className="text-xl font-bold mb-6 flex items-center">
                                        <CheckCircle className="w-6 h-6 text-green-500 mr-2" /> Requirements
                                    </h3>
                                    <ul className="space-y-4">
                                        {requirements.map((req, idx) => (
                                            <li key={idx} className="flex items-start text-gray-700">
                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 mr-3 flex-shrink-0"></div>
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-indigo-900 rounded-3xl p-8 shadow-lg text-white">
                                    <h3 className="text-xl font-bold mb-4">Training Included</h3>
                                    <p className="text-indigo-200 mb-6 text-sm">We provide comprehensive training to ensure you succeed.</p>
                                    <div className="space-y-4">
                                        {[
                                            "Online Digital Skills Course",
                                            "One-Day In-Person Workshop",
                                            "Field Shadowing",
                                            "Official Certification"
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                                                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">
                                                    {i + 1}
                                                </div>
                                                <span className="text-sm font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Registration Form */}
                            <div className="lg:w-8/12">
                                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                                    <div className="mb-10">
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Application Form</h2>
                                        <p className="text-gray-600">Fill in your details to start your journey.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-10">

                                        {/* Personal Details */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-indigo-900 mb-6 flex items-center border-b pb-2">
                                                <User className="w-5 h-5 mr-2" /> Personal Details
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label>Full Name <span className="text-red-500">*</span></Label>
                                                    <Input name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your full name" required className="h-11" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Date of Birth <span className="text-red-500">*</span></Label>
                                                    <Input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required className="h-11" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Email <span className="text-red-500">*</span></Label>
                                                    <Input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" required className="h-11" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Mobile Number <span className="text-red-500">*</span></Label>
                                                    <Input name="mobile_no" value={formData.mobile_no} onChange={handleInputChange} placeholder="10-digit number" required className="h-11" />
                                                </div>
                                                <div className="space-y-2 md:col-span-2">
                                                    <Label>Government ID Number (Aadhaar/PAN) <span className="text-red-500">*</span></Label>
                                                    <Input name="govt_id" value={formData.govt_id} onChange={handleInputChange} placeholder="Enter ID number" required className="h-11" />
                                                </div>
                                                <div className="space-y-2 md:col-span-2">
                                                    <Label>Gender <span className="text-red-500">*</span></Label>
                                                    <RadioGroup value={formData.gender} onValueChange={(val) => setFormData((prev) => ({ ...prev, gender: val }))} className="flex space-x-6 pt-1">
                                                        <div className="flex items-center space-x-2"><RadioGroupItem id="male" value="male" /><Label htmlFor="male" className="font-normal cursor-pointer">Male</Label></div>
                                                        <div className="flex items-center space-x-2"><RadioGroupItem id="female" value="female" /><Label htmlFor="female" className="font-normal cursor-pointer">Female</Label></div>
                                                        <div className="flex items-center space-x-2"><RadioGroupItem id="other" value="other" /><Label htmlFor="other" className="font-normal cursor-pointer">Other</Label></div>
                                                    </RadioGroup>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Address & Location */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-indigo-900 mb-6 flex items-center border-b pb-2">
                                                <Home className="w-5 h-5 mr-2" /> Address & Location
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2 md:col-span-2">
                                                    <Label>Address <span className="text-red-500">*</span></Label>
                                                    <Input name="address" value={formData.address} onChange={handleInputChange} placeholder="Full street address" required className="h-11" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>City <span className="text-red-500">*</span></Label>
                                                    <Input name="city" value={formData.city} onChange={handleInputChange} placeholder="City name" required className="h-11" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>District <span className="text-red-500">*</span></Label>
                                                    <Input name="district" value={formData.district} onChange={handleInputChange} placeholder="District name" required className="h-11" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>State <span className="text-red-500">*</span></Label>
                                                    <Input name="state" value={formData.state} onChange={handleInputChange} placeholder="State name" required className="h-11" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Pincode</Label>
                                                    <Input name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="6-digit pincode" className="h-11" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Landmark</Label>
                                                    <Input name="landmark" value={formData.landmark} onChange={handleInputChange} placeholder="Nearby landmark" className="h-11" />
                                                </div>
                                                <div className="space-y-2 md:col-span-2 bg-blue-50 p-4 rounded-xl border border-blue-100">
                                                    <Label className="text-blue-900 font-semibold mb-2 block">Service Location</Label>
                                                    <p className="text-xs text-blue-700 mb-3">Please provide your current location to help us match you with nearby students.</p>
                                                    <div className="flex gap-3">
                                                        <Button type="button" onClick={handleFetchLocation} disabled={isFetchingLocation} variant="outline" className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50">
                                                            {isFetchingLocation ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Fetching...</> : <><MapPin className="h-4 w-4 mr-2" /> Fetch Current Location</>}
                                                        </Button>
                                                        {formData.location && <div className="flex-1 px-3 py-2 border border-green-200 rounded-md bg-green-50 text-green-700 text-sm flex items-center"><CheckCircle className="h-4 w-4 mr-2" /> Location captured</div>}
                                                    </div>
                                                    {locationStatus && <p className={`text-xs mt-2 ${formData.location ? "text-green-600" : "text-gray-500"}`}>{locationStatus}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Professional Info */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-indigo-900 mb-6 flex items-center border-b pb-2">
                                                <Briefcase className="w-5 h-5 mr-2" /> Education & Experience
                                            </h3>
                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <Label>Education Level <span className="text-red-500">*</span></Label>
                                                    <select name="education" value={formData.education} onChange={handleInputChange} required className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                                        <option value="" disabled>Select highest qualification</option>
                                                        <option value="12th">12th Pass</option>
                                                        <option value="diploma">Diploma</option>
                                                        <option value="undergraduate">Undergraduate</option>
                                                        <option value="graduate">Graduate</option>
                                                        <option value="postgraduate">Postgraduate</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Relevant Experience</Label>
                                                    <Textarea name="experience" value={formData.experience} onChange={handleInputChange} placeholder="Describe any relevant work or volunteer experience (optional)" className="min-h-[100px]" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Why do you want to join? <span className="text-red-500">*</span></Label>
                                                    <Textarea name="whyJoin" value={formData.whyJoin} onChange={handleInputChange} placeholder="Tell us about your motivation..." className="min-h-[120px]" required />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Account Security */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-indigo-900 mb-6 flex items-center border-b pb-2">
                                                <Lock className="w-5 h-5 mr-2" /> Account Security
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <Label>Create Password <span className="text-red-500">*</span></Label>
                                                    <Input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Choose a strong password" required className="h-11" />
                                                </div>
                                                <div className="flex items-start bg-gray-50 p-4 rounded-lg">
                                                    <input id="terms" type="checkbox" required className="mt-1 mr-3 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                    <label htmlFor="terms" className="text-gray-600 text-sm">
                                                        I confirm that all provided information is accurate. I agree to the <Link to="#" className="text-indigo-600 underline">Terms of Service</Link> and <Link to="#" className="text-indigo-600 underline">Privacy Policy</Link>.
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <Button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-14 text-lg shadow-lg shadow-indigo-200 rounded-xl">
                                                {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting Application...</> : "Submit Application"}
                                            </Button>
                                            <p className="text-center text-gray-400 text-sm mt-4">
                                                Approved applicants will receive an email within 48 hours.
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default JoinUs;

