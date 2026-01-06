import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServiceCard } from "@/components/ui/service-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, GraduationCap, ShieldCheck, BookOpen, Award, Briefcase, Smartphone, CreditCard, } from "lucide-react";

const Services = () => {
    const services = [
        {
            id: "form-filling",
            icon: FileText,
            title: "Form Filling Assistance",
            description: "Get expert help with all types of online forms and applications. We ensure accurate data entry and timely submission.",
            details: [
                "College application forms",
                "Scholarship applications",
                "Government scheme registrations",
                "Job applications",
                "Document uploads and verification",
            ],
        },
        {
            id: "college-help",
            icon: GraduationCap,
            title: "College Admissions Help",
            description: "Navigate the complex college admission process with our guidance and support.",
            details: [
                "College selection guidance",
                "Application process assistance",
                "Document preparation and submission",
                "Interview preparation",
                "Admission follow-up support",
            ],
        },
        {
            id: "digital-safety",
            icon: ShieldCheck,
            title: "Digital Safety",
            description: "Learn how to stay safe online and protect your personal information from scams and threats.",
            details: [
                "Safe browsing practices",
                "Password management",
                "Identifying online scams",
                "Secure payments guidance",
                "Privacy protection measures",
            ],
        },
        {
            id: "scholarship",
            icon: Award,
            title: "Scholarship Applications",
            description: "Discover and apply for scholarships that can fund your education and reduce financial burden.",
            details: [
                "Scholarship eligibility assessment",
                "Application form completion",
                "Document preparation",
                "Essay writing assistance",
                "Application tracking",
            ],
        },
        {
            id: "career-guidance",
            icon: BookOpen,
            title: "Career Guidance",
            description: "Get expert advice on career paths, skill development, and future opportunities aligned with your interests.",
            details: [
                "Career aptitude assessment",
                "Course selection guidance",
                "Skill development recommendations",
                "Industry trends analysis",
                "Job market information",
            ],
        },
        {
            id: "job-applications",
            icon: Briefcase,
            title: "Job Applications",
            description: "Receive assistance with job applications, resume building, and preparing for interviews.",
            details: [
                "Resume and CV creation",
                "Job application form filling",
                "Cover letter writing",
                "Online profile creation",
                "Interview preparation",
            ],
        },
        {
            id: "digital-literacy",
            icon: Smartphone,
            title: "Digital Literacy",
            description: "Learn essential digital skills to navigate today's technology-driven world with confidence.",
            details: [
                "Basic computer operations",
                "Internet browsing skills",
                "Email management",
                "Mobile app usage",
                "Document creation basics",
            ],
        },
        {
            id: "financial-services",
            icon: CreditCard,
            title: "Financial Services Assistance",
            description: "Get help with banking, payments, and financial applications for a secure financial future.",
            details: [
                "Bank account applications",
                "Digital payment setup",
                "Loan applications",
                "Insurance form filling",
                "UPI and wallet setup",
            ],
        },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <section className="bg-primary-50 py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
                            <p className="text-lg text-gray-600 mb-6">Comprehensive digital assistance services for students in rural and semi-urban India</p>
                            <Button asChild className="bg-secondary-500 hover:bg-secondary-600">
                                <Link to="/contact">Book a Service</Link>
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service) => (
                                <div key={service.id} id={service.id}>
                                    <ServiceCard icon={service.icon} title={service.title} description={service.description} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
                            <p className="text-gray-600 text-lg">Detailed explanation of our core services and how they can help you</p>
                        </div>
                        {services.slice(0, 4).map((service, index) => (
                            <div key={service.id} id={`${service.id}-details`} className={`py-12 ${index % 2 === 0 ? "" : "bg-white"}`}>
                                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8`}>
                                        <div className="lg:w-1/2">
                                            <div className="bg-gradient-to-br from-primary-100 to-primary-200 h-64 rounded-lg shadow-lg flex items-center justify-center">
                                                <service.icon className="h-20 w-20 text-primary-600" />
                                            </div>
                                        </div>
                                        <div className="lg:w-1/2">
                                            <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                                            <p className="text-gray-600 mb-6">{service.description}</p>
                                            <ul className="space-y-2">
                                                {service.details.map((detail, i) => (
                                                    <li key={i} className="flex items-start">
                                                        <span className="inline-block w-5 h-5 bg-primary-100 rounded-full flex-shrink-0 mr-2 mt-1">
                                                            <span className="flex h-full w-full items-center justify-center text-primary-600 text-xs">✓</span>
                                                        </span>
                                                        <span className="text-gray-700">{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
                            <p className="text-gray-600 text-lg">Our services are affordable with no hidden costs. Pricing varies based on service complexity.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
                                <h3 className="text-xl font-semibold mb-4 text-center">Basic Assistance</h3>
                                <div className="text-center mb-6">
                                    <span className="text-4xl font-bold">₹99</span>
                                    <span className="text-gray-500"> / service</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-start">
                                        <span className="inline-block w-5 h-5 bg-primary-100 rounded-full flex-shrink-0 mr-2 mt-1">
                                            <span className="flex h-full w-full items-center justify-center text-primary-600 text-xs">✓</span>
                                        </span>
                                        <span className="text-gray-700">Form filling assistance</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-block w-5 h-5 bg-primary-100 rounded-full flex-shrink-0 mr-2 mt-1">
                                            <span className="flex h-full w-full items-center justify-center text-primary-600 text-xs">✓</span>
                                        </span>
                                        <span className="text-gray-700">Basic digital literacy</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-block w-5 h-5 bg-primary-100 rounded-full flex-shrink-0 mr-2 mt-1">
                                            <span className="flex h-full w-full items-center justify-center text-primary-600 text-xs">✓</span>
                                        </span>
                                        <span className="text-gray-700">30 minutes session</span>
                                    </li>
                                </ul>
                                <Button asChild className="w-full bg-secondary-500 hover:bg-secondary-600">
                                    <Link to="/contact">Book Now</Link>
                                </Button>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-8 border-2 border-primary-500 relative transform scale-105">
                                <div className="absolute top-0 right-0 left-0 bg-primary-500 text-white text-center text-sm py-1 rounded-t-lg">Most Popular</div>
                                <h3 className="text-xl font-semibold mb-4 text-center">Standard Package</h3>
                                <div className="text-center mb-6">
                                    <span className="text-4xl font-bold">₹199</span>
                                    <span className="text-gray-500"> / service</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-start">
                                        <span className="inline-block w-5 h-5 bg-primary-100 rounded-full flex-shrink-0 mr-2 mt-1">
                                            <span className="flex h-full w-full items-center justify-center text-primary-600 text-xs">✓</span>
                                        </span>
                                        <span className="text-gray-700">Complete application assistance</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-block w-5 h-5 bg-primary-100 rounded-full flex-shrink-0 mr-2 mt-1">
                                            <span className="flex h-full w-full items-center justify-center text-primary-600 text-xs">✓</span>
                                        </span>
                                        <span className="text-gray-700">Document preparation</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-block w-5 h-5 bg-primary-100 rounded-full flex-shrink-0 mr-2 mt-1">
                                            <span className="flex h-full w-full items-center justify-center text-primary-600 text-xs">✓</span>
                                        </span>
                                        <span className="text-gray-700">60 minutes session</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-block w-5 h-5 bg-primary-100 rounded-full flex-shrink-0 mr-2 mt-1">
                                            <span className="flex h-full w-full items-center justify-center text-primary-600 text-xs">✓</span>
                                        </span>
                                        <span className="text-gray-700">Follow-up support</span>
                                    </li>
                                </ul>
                                <Button asChild className="w-full bg-secondary-500 hover:bg-secondary-600">
                                    <Link to="/contact">Book Now</Link>
                                </Button>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
                                <h3 className="text-xl font-semibold mb-4 text-center">Premium Support</h3>
                                <div className="text-center mb-6">
                                    <span className="text-4xl font-bold">₹399</span>
                                    <span className="text-gray-500"> / service</span>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-start">
                                        <span className="inline-block w-5 h-5 bg-primary-100 rounded-full flex-shrink-0 mr-2 mt-1">
                                            <span className="flex h-full w-full items-center justify-center text-primary-600 text-xs">✓</span>
                                        </span>
                                        <span className="text-gray-700">Comprehensive assistance</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-block w-5 h-5 bg-primary-100 rounded-full flex-shrink-0 mr-2 mt-1">
                                            <span className="flex h-full w-full items-center justify-center text-primary-600 text-xs">✓</span>
                                        </span>
                                        <span className="text-gray-700">Career/college counseling</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-block w-5 h-5 bg-primary-100 rounded-full flex-shrink-0 mr-2 mt-1">
                                            <span className="flex h-full w-full items-center justify-center text-primary-600 text-xs">✓</span>
                                        </span>
                                        <span className="text-gray-700">90 minutes session</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-block w-5 h-5 bg-primary-100 rounded-full flex-shrink-0 mr-2 mt-1">
                                            <span className="flex h-full w-full items-center justify-center text-primary-600 text-xs">✓</span>
                                        </span>
                                        <span className="text-gray-700">Priority support for 30 days</span>
                                    </li>
                                </ul>
                                <Button asChild className="w-full bg-secondary-500 hover:bg-secondary-600">
                                    <Link to="/contact">Book Now</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="max-w-3xl mx-auto text-center mt-12">
                            <p className="text-sm text-gray-500">* Additional charges may apply for complex applications or services requiring more time. You will be informed of any extra costs before services begin.</p>
                        </div>
                    </div>
                </section>
                <section className="py-16 bg-primary-600">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
                            <p className="text-primary-100 text-lg mb-8">Book an appointment with Digital Dost today and take the first step towards digital empowerment.</p>
                            <Button asChild variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                                <Link to="/contact">Book Now</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Services;
