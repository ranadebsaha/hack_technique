import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    HelpCircle,
    MessageSquare,
    Phone,
    Mail,
    Search,
    Plus,
    Minus,
    ChevronDown,
    ArrowRight
} from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const FAQ = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const allFaqs: FAQItem[] = [
        // General
        {
            question: "What is Cyber Bandhu?",
            answer: "Cyber Bandhu is an affordable, secure doorstep digital assistance service for students in rural and semi-urban India. We help with online form filling, college admissions, scholarship applications, and other digital tasks.",
            category: "general"
        },
        {
            question: "Who can use Cyber Bandhu services?",
            answer: "Our services are designed primarily for students in rural or semi-urban areas with limited digital access. However, we're happy to assist anyone who needs help with digital tasks, regardless of age or background.",
            category: "general"
        },
        {
            question: "How do I book a service?",
            answer: "You can book a service through our website, mobile app, or by calling our toll-free number. Simply select the service you need, choose your preferred date and time, and we'll confirm your booking instantly.",
            category: "general"
        },
        {
            question: "Do you operate in my area?",
            answer: "We're continuously expanding across rural and semi-urban India. You can check availability by entering your pincode on our home page. If we're not there yet, join our waitlist!",
            category: "general"
        },
        // Services
        {
            question: "What specific services do you offer?",
            answer: "We offer a wide range of services: College Application Filling, Scholarship Applications, Entrance Exam Registrations, Government Scheme Enrollments, Resume Building, and basic Digital Literacy training.",
            category: "services"
        },
        {
            question: "How long does a session take?",
            answer: "Basic forms take 30-45 minutes. Complex applications (like college admissions with multiple document uploads) may take 1-2 hours. We'll give you a time estimate before we start.",
            category: "services"
        },
        {
            question: "What documents do I need?",
            answer: "Generally, keep your Aadhaar card, mark sheets (10th/12th), passport photos, and signature scans ready. For specific applications, we'll send you a checklist beforehand.",
            category: "services"
        },
        // Pricing
        {
            question: "How is the pricing decided?",
            answer: "We have fixed, transparent rates starting at ₹99. The price depends on the complexity of the task (e.g., a simple form vs. a complex multi-stage application). You will always see the full price before booking.",
            category: "pricing"
        },
        {
            question: "Are there hidden charges?",
            answer: "Absolutely not. The price you see is the price you pay. Our digital assistants are strictly prohibited from asking for extra money.",
            category: "pricing"
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept UPI (GooglePay, PhonePe, Paytm), Cash on completion, and Debit Cards. You receive a digital receipt immediately after payment.",
            category: "pricing"
        },
        // Privacy
        {
            question: "Is my personal data safe?",
            answer: "Yes, data privacy is our top priority. We do not store your passwords. Your documents are only accessed during the session for the purpose of the application and are not retained on our devices.",
            category: "privacy"
        },
        {
            question: "How do you verify your assistants?",
            answer: "Every Cyber Bandhu assistant undergoes a rigorous 3-step verification process: ID check, Address verification, and Police verification. They are also trained in data privacy protocols.",
            category: "privacy"
        },
    ];

    const categories = [
        { id: "all", label: "All Questions" },
        { id: "general", label: "General" },
        { id: "services", label: "Services" },
        { id: "pricing", label: "Pricing" },
        { id: "privacy", label: "Privacy" },
    ];

    const filteredFaqs = allFaqs.filter((faq) => {
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-50">
            <Header />
            <main className="flex-grow">
                {/* Hero Section with Search */}
                <section className="relative py-20 lg:py-28 bg-slate-900 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-black opacity-90"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-medium mb-6 backdrop-blur-md">
                            <HelpCircle className="w-4 h-4 mr-2" />
                            Help Center
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">How can we help you?</h1>
                        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                            Search for answers or browse through our most frequently asked questions below.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto relative group">
                            <div className="absolute inset-0 bg-indigo-500 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                            <div className="relative bg-white rounded-full p-2 flex items-center shadow-2xl">
                                <Search className="w-6 h-6 text-slate-400 ml-4" />
                                <input
                                    type="text"
                                    placeholder="Search specific questions (e.g., 'refund', 'documents')..."
                                    className="flex-1 px-4 py-3 text-lg text-slate-700 placeholder-slate-400 bg-transparent border-none focus:ring-0 focus:outline-none"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Button className="rounded-full px-8 py-6 bg-indigo-600 hover:bg-indigo-700 text-white">
                                    Search
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Content Section */}
                <section className="py-16 lg:py-24 bg-slate-50 relative">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">

                        {/* Category Tabs */}
                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat.id
                                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105"
                                            : "bg-white text-slate-600 hover:bg-slate-100 hover:text-indigo-600 border border-slate-200"
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* FAQ Accordion */}
                        <div className="space-y-4">
                            {filteredFaqs.length > 0 ? (
                                filteredFaqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === index
                                                ? "border-indigo-200 shadow-xl shadow-indigo-100/50"
                                                : "border-slate-200 shadow-sm hover:border-indigo-100"
                                            }`}
                                    >
                                        <button
                                            onClick={() => toggleAccordion(index)}
                                            className="w-full text-left px-8 py-6 flex items-start md:items-center justify-between focus:outline-none bg-inherit"
                                        >
                                            <span className={`text-lg md:text-xl font-bold pr-8 transition-colors ${openIndex === index ? "text-indigo-700" : "text-slate-800"}`}>
                                                {faq.question}
                                            </span>
                                            <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index ? "bg-indigo-100 rotate-180" : "bg-slate-100"
                                                }`}>
                                                <ChevronDown className={`w-5 h-5 ${openIndex === index ? "text-indigo-600" : "text-slate-500"}`} />
                                            </span>
                                        </button>
                                        <div
                                            className={`transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                                }`}
                                        >
                                            <div className="px-8 pb-8 pt-0 text-slate-600 text-lg leading-relaxed border-t border-slate-50/50">
                                                <div className="h-4"></div> {/* Spacer */}
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 mb-2">No results found</h3>
                                    <p className="text-slate-500">Try adjusting your search terms or browse all categories.</p>
                                    <button
                                        onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}
                                        className="mt-4 text-indigo-600 font-medium hover:underline"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Contact Support Section */}
                <section className="py-20 bg-white border-t border-slate-100">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Still need help?</h2>
                            <p className="text-slate-600 text-lg">We are available 24/7 to help you with your queries.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            <div className="group bg-slate-50 hover:bg-indigo-50 p-8 rounded-2xl transition-colors duration-300 text-center border border-slate-100 hover:border-indigo-100">
                                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <MessageSquare className="w-7 h-7 text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Live Chat</h3>
                                <p className="text-slate-500 mb-6">Chat with our AI or human support instantly.</p>
                                <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-all">Start Chat</Button>
                            </div>

                            <div className="group bg-slate-50 hover:bg-indigo-50 p-8 rounded-2xl transition-colors duration-300 text-center border border-slate-100 hover:border-indigo-100">
                                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Mail className="w-7 h-7 text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Email Support</h3>
                                <p className="text-slate-500 mb-6">Send us an email and we'll reply within 24h.</p>
                                <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-all">
                                    <a href="mailto:support@cyberbandhu.com">Send Email</a>
                                </Button>
                            </div>

                            <div className="group bg-slate-50 hover:bg-indigo-50 p-8 rounded-2xl transition-colors duration-300 text-center border border-slate-100 hover:border-indigo-100">
                                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Phone className="w-7 h-7 text-indigo-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Phone Support</h3>
                                <p className="text-slate-500 mb-6">Call our toll-free number for immediate help.</p>
                                <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-all">
                                    <a href="tel:18001234567">Call Now</a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-indigo-600 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -ml-32 -mb-32"></div>

                    <div className="container relative mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to experience the future of digital help?</h2>
                        <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">Join thousands of students who have simplified their digital lives with Cyber Bandhu.</p>
                        <Button asChild size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-xl px-10 py-6 text-lg h-auto font-bold">
                            <Link to="/contact">Get Started Now <ArrowRight className="ml-2 w-5 h-5" /></Link>
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default FAQ;
