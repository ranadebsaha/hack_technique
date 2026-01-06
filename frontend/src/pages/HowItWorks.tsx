import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    Calendar,
    Users,
    FileText,
    Clock,
    Shield,
    CheckCircle,
    HelpCircle,
    User,
    MapPin,
    CreditCard,
    BookOpen,
    CheckCheck,
    Play,
    Check,
    ArrowRight
} from "lucide-react";

const HowItWorks = () => {
    const steps = [
        {
            icon: Calendar,
            title: "1. Book an Appointment",
            description: "Schedule a visit through our website, app, or toll-free number. Choose a date and time that works best for your schedule.",
            color: "bg-blue-100 text-blue-600",
        },
        {
            icon: User,
            title: "2. Meet Your Cyber Bandhu",
            description: "Our trained and verified digital assistant visits your home at the scheduled time, equipped with a laptop and internet connection.",
            color: "bg-purple-100 text-purple-600",
        },
        {
            icon: FileText,
            title: "3. Explain Issues",
            description: "Simply tell us what you need—whether it's a scholarship application, government form, or bill payment. We handle the complex digital parts.",
            color: "bg-pink-100 text-pink-600",
        },
        {
            icon: CheckCheck,
            title: "4. Get Digital Assistance",
            description: "Watch as we complete your task securely and efficiently. We verify every detail with you before final submission.",
            color: "bg-indigo-100 text-indigo-600",
        },
        {
            icon: CreditCard,
            title: "5. Transparent Payment",
            description:
                "Pay a small, fixed service fee only after the work is done. No hidden charges, no surprises. You get a digital receipt instantly.",
            color: "bg-teal-100 text-teal-600",
        },
        {
            icon: BookOpen,
            title: "6. Learn & Empower",
            description: "Our assistants explain what they're doing, helping you understand the process so you can become more digitally independent.",
            color: "bg-orange-100 text-orange-600",
        },
    ];

    const faqs = [
        {
            question: "How long does a typical session take?",
            answer: "Most basic sessions take 30-60 minutes. More complex services like complete college applications may take 1-2 hours. We'll always inform you about the expected duration before starting.",
        },
        {
            question: "Do I need to provide my own device?",
            answer: "No, our digital assistants bring their own laptops or tablets for the session. However, if you have your own device, we can also work on it to help you get familiar with the process.",
        },
        {
            question: "How do I prepare for a Cyber Bandhu visit?",
            answer: "Keep all relevant documents ready (ID proof, mark sheets, certificates, etc., based on your requirement). Ensure a basic seating arrangement with access to electricity. Our team will handle the rest.",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
            <Header />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-900 border-b border-slate-800">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-black opacity-80"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                    {/* Decorative blur elements */}
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl"></div>

                    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-6 backdrop-blur-md">
                            <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
                            Trusted by 10,000+ Students
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                            Digital Assistance, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Simplified.</span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                            We bring the internet to your doorstep. Secure, affordable, and personalized digital help for all your needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-900/40 text-lg px-8 py-6 h-auto">
                                <Link to="/contact">Book Now <ArrowRight className="ml-2 w-5 h-5" /></Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Timeline Process Section */}
                <section className="py-24 bg-white relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
                    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center mb-20">
                            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 font-display">Our Simple Process</h2>
                            <p className="text-slate-600 text-xl leading-relaxed">Getting digital assistance is easy with Cyber Bandhu. Here's exactly how it works, step-by-step.</p>
                        </div>

                        <div className="relative max-w-5xl mx-auto">
                            {/* Vertical Line for Desktop */}
                            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-200 via-purple-200 to-indigo-200 rounded-full"></div>

                            <div className="space-y-12 md:space-y-24">
                                {steps.map((step, index) => (
                                    <div key={index} className={`flex flex-col md:flex-row items-center relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                        {/* Spacer for alternating layout */}
                                        <div className="flex-1 w-full md:w-1/2"></div>

                                        {/* Center Icon/Number */}
                                        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
                                            <div className="w-12 h-12 rounded-full bg-white border-4 border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg shadow-md">
                                                {index + 1}
                                            </div>
                                        </div>

                                        {/* Content Card */}
                                        <div className={`flex-1 w-full md:w-1/2 p-4 md:p-8 ${index % 2 === 0 ? 'md:pr-16 text-center md:text-right' : 'md:pl-16 text-center md:text-left'}`}>
                                            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-indigo-100 transition-all duration-300 hover:translate-y-[-5px]">
                                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto ${index % 2 === 0 ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'} ${step.color}`}>
                                                    <step.icon className="h-8 w-8" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title.split('. ')[1]}</h3>
                                                <p className="text-slate-600 leading-relaxed text-lg">{step.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Advantages Grid */}
                <section className="py-24 bg-gradient-to-b from-indigo-50 via-white to-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-2 block">Why Choose Us</span>
                            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">The Cyber Bandhu Advantage</h2>
                            <p className="text-slate-600 text-lg">Why students across rural and semi-urban India trust us</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: MapPin, title: "Doorstep Service", desc: "No need to travel. We come to you." },
                                { icon: Clock, title: "Convenient Scheduling", desc: "Book times that work for you, including weekends." },
                                { icon: Shield, title: "Secure & Trustworthy", desc: "Verified assistants and strict privacy protocols." },
                                { icon: Users, title: "Local Assistants", desc: "Assistants who speak your language and know your needs." },
                                { icon: CreditCard, title: "Transparent Pricing", desc: "Affordable rates. No hidden charges ever." },
                                { icon: CheckCircle, title: "Quality Assurance", desc: "Accurate work guaranteed by trained experts." }
                            ].map((adv, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 group">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                                        <adv.icon className="h-6 w-6 text-indigo-600 group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{adv.title}</h3>
                                    <p className="text-slate-600">{adv.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Preview Section */}
                <section className="py-24 bg-slate-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                            <div>
                                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Got Questions?</h2>
                                <p className="text-lg text-slate-600 mb-8">
                                    We understand you might have queries. Check our common questions or reach out to us directly.
                                </p>
                                <div className="space-y-6">
                                    {faqs.map((faq, index) => (
                                        <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                                            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-start">
                                                <HelpCircle className="w-5 h-5 text-indigo-500 mr-3 mt-1 flex-shrink-0" />
                                                {faq.question}
                                            </h3>
                                            <p className="text-slate-600 ml-8">{faq.answer}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 ml-2">
                                    <Button asChild variant="link" className="text-indigo-600 p-0 text-lg font-semibold hover:text-indigo-800">
                                        <Link to="/faq">View all Frequently Asked Questions <ArrowRight className="ml-2 w-4 h-4" /></Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="relative">
                                {/* Decorative abstraction */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-3xl transform rotate-3 scale-105 opacity-50 blur-lg"></div>
                                <div className="bg-indigo-900 rounded-3xl p-10 text-white relative z-10 shadow-2xl">
                                    <div className="text-indigo-300 font-semibold uppercase tracking-wider text-sm mb-2">Still Unsure?</div>
                                    <h3 className="text-3xl font-bold mb-6">Let's have a chat</h3>
                                    <p className="text-indigo-100 mb-8 leading-relaxed">
                                        Our support team is available to answer any specific questions you may have about our services or process.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="flex items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                                            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-4">
                                                <Check className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <div className="text-xs text-indigo-300">Call Us Toll Free</div>
                                                <div className="font-bold text-lg">1800-123-4567</div>
                                            </div>
                                        </div>
                                        <Button asChild className="w-full bg-white text-indigo-900 hover:bg-slate-100 h-12 text-lg font-semibold">
                                            <Link to="/contact">Contact Support</Link>
                                        </Button>
                                    </div>
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

export default HowItWorks;
