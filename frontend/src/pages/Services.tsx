import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    FileText,
    GraduationCap,
    ShieldCheck,
    BookOpen,
    Award,
    Briefcase,
    Smartphone,
    CreditCard,
    ArrowRight,
    Check
} from "lucide-react";

const Services = () => {
    const services = [
        {
            id: "form-filling",
            icon: FileText,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
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
            color: "text-purple-600",
            bgColor: "bg-purple-100",
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
            id: "scholarship",
            icon: Award,
            color: "text-yellow-600",
            bgColor: "bg-yellow-100",
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
            id: "digital-safety",
            icon: ShieldCheck,
            color: "text-green-600",
            bgColor: "bg-green-100",
            title: "Digital Safety Training",
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
            id: "career-guidance",
            icon: BookOpen,
            color: "text-indigo-600",
            bgColor: "bg-indigo-100",
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
            color: "text-pink-600",
            bgColor: "bg-pink-100",
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
            color: "text-teal-600",
            bgColor: "bg-teal-100",
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
            color: "text-orange-600",
            bgColor: "bg-orange-100",
            title: "Financial Services Support",
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
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
            <Header />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative py-24 bg-slate-900 border-b border-slate-800 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950 via-slate-900 to-slate-900 opacity-90"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>

                    {/* Decorative Elements */}
                    <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

                    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-6 backdrop-blur-md">
                            <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
                            Comprehensive Solutions
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                            Services Designed for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Your Digital Success</span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                            From basic form filling to expert career guidance, we provide comprehensive digital assistance at your doorstep.
                        </p>
                        <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-900/50 px-8 py-6 text-lg h-auto">
                            <Link to="/contact">Book a Service <ArrowRight className="ml-2 w-5 h-5" /></Link>
                        </Button>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-20 -mt-10 relative z-10">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service) => (
                                <div key={service.id} className="group bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-300 transform hover:-translate-y-1">
                                    <div className={`w-14 h-14 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300`}>
                                        <service.icon className={`h-7 w-7 ${service.color}`} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors">{service.title}</h3>
                                    <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>

                                    <div className="space-y-2 border-t border-slate-100 pt-4">
                                        {service.details.slice(0, 3).map((detail, idx) => (
                                            <div key={idx} className="flex items-start text-sm text-slate-500">
                                                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                <span>{detail}</span>
                                            </div>
                                        ))}
                                        {service.details.length > 3 && (
                                            <div className="text-sm text-indigo-500 font-medium pl-6 pt-1">
                                                + {service.details.length - 3} more features
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Detailed Features Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-2 block">Deep Dive</span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">What We Offer</h2>
                            <p className="text-slate-600 text-lg">A closer look at how our core services empower you to achieve more.</p>
                        </div>

                        <div className="space-y-20">
                            {services.slice(0, 3).map((service, index) => (
                                <div key={service.id} className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-20`}>
                                    <div className="w-full lg:w-1/2">
                                        <div className={`relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group`}>
                                            <div className={`absolute inset-0 bg-gradient-to-br ${index % 2 === 0 ? "from-indigo-600 to-purple-700" : "from-blue-600 to-cyan-600"} opacity-90`}></div>
                                            {/* Abstract Pattern overlay */}
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>

                                            <div className="absolute inset-0 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-700">
                                                <service.icon className="w-32 h-32 text-white/90 drop-shadow-lg" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-1/2">
                                        <div className={`inline-flex items-center px-3 py-1 rounded-full ${service.bgColor} ${service.color} text-sm font-bold mb-4`}>
                                            Popular Service
                                        </div>
                                        <h3 className="text-3xl font-bold text-slate-900 mb-4">{service.title}</h3>
                                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">{service.description}</p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {service.details.map((detail, i) => (
                                                <div key={i} className="flex items-start">
                                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                                                        <Check className="w-3.5 h-3.5 text-green-600" />
                                                    </div>
                                                    <span className="text-slate-700 font-medium">{detail}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-8">
                                            <Button asChild variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                                                <Link to="/contact">Learn More <ArrowRight className="ml-2 w-4 h-4" /></Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                {/* <section className="py-24 bg-slate-50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>
                    
                    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Transparent Pricing</h2>
                            <p className="text-slate-600 text-lg">Simple, affordable rates. No hidden fees. Pay only for what you need.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                            
                            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 relative">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Basic Assistance</h3>
                                <div className="flex items-baseline mb-6">
                                    <span className="text-4xl font-extrabold text-slate-900">₹99</span>
                                    <span className="text-slate-500 ml-2">/ service</span>
                                </div>
                                <p className="text-slate-500 text-sm mb-6 pb-6 border-b border-slate-100">Perfect for simple form filling and quick digital tasks.</p>
                                <ul className="space-y-4 mb-8">
                                    {["Form filling assistance", "Basic digital literacy", "30 minutes session", "Digital receipt"].map((feat, i) => (
                                        <li key={i} className="flex items-center text-slate-700">
                                            <Check className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                                <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                                    <Link to="/contact">Choose Basic</Link>
                                </Button>
                            </div>

                            
                            <div className="bg-white rounded-2xl shadow-2xl border-2 border-indigo-500 p-8 relative transform scale-105 z-10">
                                <div className="absolute top-0 right-0 left-0 bg-indigo-600 text-white text-center text-xs font-bold uppercase tracking-wider py-1.5 rounded-t-lg">
                                    Most Popular
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2 mt-2">Standard Package</h3>
                                <div className="flex items-baseline mb-6">
                                    <span className="text-5xl font-extrabold text-indigo-600">₹199</span>
                                    <span className="text-slate-500 ml-2">/ service</span>
                                </div>
                                <p className="text-slate-500 text-sm mb-6 pb-6 border-b border-indigo-100">For complete application support and document handling.</p>
                                <ul className="space-y-4 mb-8">
                                    {["Complete application assistance", "Document preparation", "60 minutes session", "Follow-up support", "Priority Processing"].map((feat, i) => (
                                        <li key={i} className="flex items-center text-slate-700 font-medium">
                                            <div className="bg-indigo-100 rounded-full p-0.5 mr-3">
                                                 <Check className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                                            </div>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                                <Button asChild size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200">
                                    <Link to="/contact">Choose Standard</Link>
                                </Button>
                            </div>

                            
                            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 relative">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Premium Support</h3>
                                <div className="flex items-baseline mb-6">
                                    <span className="text-4xl font-extrabold text-slate-900">₹399</span>
                                    <span className="text-slate-500 ml-2">/ service</span>
                                </div>
                                <p className="text-slate-500 text-sm mb-6 pb-6 border-b border-slate-100">Comprehensive guidance for career and complex needs.</p>
                                <ul className="space-y-4 mb-8">
                                    {["Comprehensive assistance", "Career/college counseling", "90 minutes session", "Priority support for 30 days"].map((feat, i) => (
                                        <li key={i} className="flex items-center text-slate-700">
                                            <Check className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                                <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                                    <Link to="/contact">Choose Premium</Link>
                                </Button>
                            </div>
                        </div>
                        
                        <div className="mt-12 text-center">
                            <p className="text-slate-500 text-sm">* Additional charges may apply for complex applications. We always inform you upfront.</p>
                        </div>
                    </div>
                </section> */}

                {/* Final CTA */}
                <section className="py-20 bg-indigo-600">
                    <div className="container mx-auto px-4 text-center text-white">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to simplify your digital tasks?</h2>
                        <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of satisfied students who trust Cyber Bandhu for their digital needs.
                        </p>
                        <Button asChild size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-slate-100 shadow-xl px-10 py-6 text-lg h-auto font-bold">
                            <Link to="/contact">Get Started Today</Link>
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Services;
