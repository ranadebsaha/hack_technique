import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
    FileText
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
        password: "",    // <-- Added password field
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
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
            const response = await fetch("https://cyber-bandhu.onrender.com/expert/register", {
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
                });
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
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <section className="py-16 md:py-24 bg-gradient-to-b from-primary-50 to-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Become a Cyber Bandhu Assistant
                            </h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Join your peers and help students across India navigate digital world while earning.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg" className="bg-secondary-500 hover:bg-secondary-600">
                                    <a href="#apply">
                                        <UserPlus className="mr-2" />
                                        Register as Assistant
                                    </a>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <Link to="/assistant/login">
                                        <LogIn className="mr-2" />
                                        Assistant Login
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Digital Assistants Do</h2>
                            <p className="text-gray-600 text-lg">As a Digital Dost assistant, you'll help students in your community access digital opportunities</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileText className="h-8 w-8 text-primary-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Form Assistance</h3>
                                <p className="text-gray-600">Help students complete online forms for college admissions, scholarships, and government schemes.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <GraduationCap className="h-8 w-8 text-primary-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Education Guidance</h3>
                                <p className="text-gray-600">Provide information about colleges, courses, and career opportunities to help make informed decisions.</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ShieldCheck className="h-8 w-8 text-primary-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Digital Safety</h3>
                                <p className="text-gray-600">Teach basic online safety practices and help students protect their digital information.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of Becoming a Digital Dost</h2>
                            <p className="text-gray-600 text-lg">Why students across India are joining our network of digital assistants</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                                    <div className="flex items-start">
                                        <div className="mr-4">
                                            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                                <benefit.icon className="h-6 w-6 text-primary-600" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                                            <p className="text-gray-600">{benefit.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Who Can Join</h2>
                            <p className="text-gray-600 text-lg">We're looking for responsible students who want to make a difference</p>
                        </div>
                        <div className="max-w-3xl mx-auto">
                            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
                                <h3 className="text-xl font-semibold mb-6 text-center">Basic Requirements</h3>
                                <ul className="space-y-4">
                                    {requirements.map((requirement, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{requirement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-16 bg-primary-600 text-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h2 className="text-3xl font-bold mb-4">We Provide Complete Training</h2>
                                    <p className="text-primary-100 mb-6">Don't worry if you don't have all the skills yet. We provide comprehensive training to all new digital assistants.</p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start">
                                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                                                <CheckCircle className="h-4 w-4 text-primary-600" />
                                            </div>
                                            <span>Digital skills training</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                                                <CheckCircle className="h-4 w-4 text-primary-600" />
                                            </div>
                                            <span>Form filling procedures</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                                                <CheckCircle className="h-4 w-4 text-primary-600" />
                                            </div>
                                            <span>Communication skills</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                                                <CheckCircle className="h-4 w-4 text-primary-600" />
                                            </div>
                                            <span>Educational counseling basics</span>
                                        </li>
                                        <li className="flex items-start">
                                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                                                <CheckCircle className="h-4 w-4 text-primary-600" />
                                            </div>
                                            <span>Customer service excellence</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-white rounded-lg p-8 text-gray-900">
                                    <h3 className="text-xl font-semibold mb-4">Training Process</h3>
                                    <ol className="space-y-4">
                                        <li className="flex">
                                            <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3 flex-shrink-0">
                                                <span className="font-semibold text-primary-600">1</span>
                                            </span>
                                            <div>
                                                <h4 className="font-semibold">Initial Online Training</h4>
                                                <p className="text-gray-600 text-sm">Complete our basic digital skills course online</p>
                                            </div>
                                        </li>
                                        <li className="flex">
                                            <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3 flex-shrink-0">
                                                <span className="font-semibold text-primary-600">2</span>
                                            </span>
                                            <div>
                                                <h4 className="font-semibold">In-Person Workshop</h4>
                                                <p className="text-gray-600 text-sm">Attend a one-day workshop in your area</p>
                                            </div>
                                        </li>
                                        <li className="flex">
                                            <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3 flex-shrink-0">
                                                <span className="font-semibold text-primary-600">3</span>
                                            </span>
                                            <div>
                                                <h4 className="font-semibold">Shadowing Experience</h4>
                                                <p className="text-gray-600 text-sm">Accompany an experienced assistant</p>
                                            </div>
                                        </li>
                                        <li className="flex">
                                            <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3 flex-shrink-0">
                                                <span className="font-semibold text-primary-600">4</span>
                                            </span>
                                            <div>
                                                <h4 className="font-semibold">Final Certification</h4>
                                                <p className="text-gray-600 text-sm">Complete assessment and get certified</p>
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stories from Our Digital Assistants</h2>
                            <p className="text-gray-600 text-lg">Hear from students who've joined our mission to bridge the digital divide</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                                <div className="flex items-center mb-4">
                                    <div className="h-12 w-12 rounded-full bg-primary-100 overflow-hidden flex-shrink-0">
                                        <div className="h-full w-full flex items-center justify-center text-primary-600 font-semibold text-lg">A</div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-semibold text-gray-900">Aman Verma</h4>
                                        <p className="text-sm text-gray-500">Digital Assistant - Madhya Pradesh</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic">"Working as a Digital Dost has not only helped me financially during my college years, but also gave me confidence and communication skills that I now use in my professional career. It's incredibly rewarding to help students from my own village access opportunities they didn't know existed."</p>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                                <div className="flex items-center mb-4">
                                    <div className="h-12 w-12 rounded-full bg-primary-100 overflow-hidden flex-shrink-0">
                                        <div className="h-full w-full flex items-center justify-center text-primary-600 font-semibold text-lg">S</div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-semibold text-gray-900">Sunita Patel</h4>
                                        <p className="text-sm text-gray-500">Digital Assistant - Maharashtra</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic">"Being a girl from a small town, I faced digital barriers myself. Now I help other girls overcome these same challenges. The flexible hours allow me to continue my studies while earning enough to cover my expenses. The impact I'm making in my community is priceless."</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="apply" className="py-16">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <h2 className="text-3xl font-bold text-center mb-6">
                            Apply to Become a Digital Assistant
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Full Name *"
                                required
                            />
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email *"
                                required
                            />
                            <Input
                                name="mobile_no"
                                value={formData.mobile_no}
                                onChange={handleInputChange}
                                placeholder="Mobile Number *"
                                required
                            />
                            <Input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleInputChange}
                                placeholder="Date of Birth *"
                                required
                            />
                            <Label>Gender *</Label>
                            <RadioGroup
                                value={formData.gender}
                                onValueChange={(val) => setFormData((prev) => ({ ...prev, gender: val }))}
                                className="flex space-x-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem id="male" value="male" />
                                    <Label htmlFor="male">Male</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem id="female" value="female" />
                                    <Label htmlFor="female">Female</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem id="other" value="other" />
                                    <Label htmlFor="other">Other</Label>
                                </div>
                            </RadioGroup>

                            <Input
                                name="govt_id"
                                value={formData.govt_id}
                                onChange={handleInputChange}
                                placeholder="Government ID Number *"
                                required
                            />

                            <Input
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Address *"
                                required
                            />
                            <Input
                                name="landmark"
                                value={formData.landmark}
                                onChange={handleInputChange}
                                placeholder="Landmark"
                            />
                            <Input
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="City *"
                                required
                            />
                            <Input
                                name="district"
                                value={formData.district}
                                onChange={handleInputChange}
                                placeholder="District *"
                                required
                            />
                            <Input
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                placeholder="State *"
                                required
                            />
                            <Input
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleInputChange}
                                placeholder="Pincode"
                            />

                            <select
                                name="education"
                                value={formData.education}
                                onChange={handleInputChange}
                                required
                                className="w-full border rounded p-2"
                            >
                                <option value="" disabled>
                                    Select Education *
                                </option>
                                <option value="12th">12th Pass</option>
                                <option value="diploma">Diploma</option>
                                <option value="undergraduate">Undergraduate</option>
                                <option value="graduate">Graduate</option>
                                <option value="postgraduate">Postgraduate</option>
                            </select>

                            <Textarea
                                name="experience"
                                value={formData.experience}
                                onChange={handleInputChange}
                                placeholder="Experience"
                                className="h-20"
                            />

                            <Textarea
                                name="whyJoin"
                                value={formData.whyJoin}
                                onChange={handleInputChange}
                                placeholder="Why Join *"
                                className="h-32"
                                required
                            />

                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Password *"
                                required
                            />

                            <div className="flex items-center">
                                <input id="terms" type="checkbox" required className="mr-2" />
                                <label htmlFor="terms" className="text-gray-700 text-sm">
                                    I agree to the <Link to="#" className="underline">Terms</Link> and <Link to="#" className="underline">Privacy Policy</Link>.
                                </label>
                            </div>

                            <Button type="submit" disabled={isSubmitting} className="w-full">
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </Button>

                            <p className="text-center text-gray-500 mt-4">
                                After review, approved applicants will receive an email with further instructions.
                            </p>
                        </form>
                        </div>
                </section>
                <section className="py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                            <p className="text-gray-600 text-lg">Common questions about becoming a Digital Dost assistant</p>
                        </div>
                        <div className="max-w-3xl mx-auto">
                            <div className="space-y-6">
                                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                                    <h3 className="text-lg font-semibold mb-2">How much can I earn as a Digital Assistant?</h3>
                                    <p className="text-gray-600">Earnings depend on the number of sessions you conduct and services you provide. Digital Assistants typically earn between ₹5,000 to ₹15,000 per month working part-time, depending on their location and commitment.</p>
                                </div>
                                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                                    <h3 className="text-lg font-semibold mb-2">Do I need to have my own computer?</h3>
                                    <p className="text-gray-600">Yes, you should have access to a laptop or tablet to provide services. However, in some locations, we can provide assistance in obtaining the necessary equipment for highly qualified candidates.</p>
                                </div>
                                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                                    <h3 className="text-lg font-semibold mb-2">How much time do I need to commit?</h3>
                                    <p className="text-gray-600">We require a minimum commitment of 10 hours per week, but the schedule is flexible. You can choose when you're available to provide services, making it ideal for students.</p>
                                </div>
                                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                                    <h3 className="text-lg font-semibold mb-2">How long is the training period?</h3>
                                    <p className="text-gray-600">The initial training takes approximately 2 weeks, including online modules and in-person sessions. After that, there will be occasional refresher training as needed.</p>
                                </div>
                            </div>
                            <div className="text-center mt-10">
                                <p className="text-gray-600 mb-4">Have more questions about joining our team?</p>
                                <Button asChild variant="outline" className="border-primary-500 text-primary-600 hover:bg-primary-50">
                                    <Link to="/contact">Contact Us</Link>
                                </Button>
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

