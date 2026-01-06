import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Users, FileText, Clock, Shield, CheckCircle, HelpCircle, User, MapPin, CreditCard, BookOpen, CheckCheck, } from "lucide-react";

const HowItWorks = () => {
    const steps = [
        {
            icon: Calendar,
            title: "Book an Appointment",
            description: "Schedule a visit through our website, app, or toll-free number at your preferred date and time.",
        },
        {
            icon: User,
            title: "Meet Your Cyber Bandhu",
            description: "Our trained and verified digital assistant will visit your home at the scheduled time.",
        },
        {
            icon: FileText,
            title: "Explain Your Requirements",
            description: "Tell us what digital assistance you need - forms, applications, guidance, or any other digital task.",
        },
        {
            icon: CheckCheck,
            title: "Get Digital Assistance",
            description: "Our assistant will help you complete your digital tasks efficiently and securely.",
        },
        {
            icon: CreditCard,
            title: "Pay for Services",
            description:
                "Pay only for the services provided at transparent rates with no hidden charges.",
        },
        {
            icon: BookOpen,
            title: "Learn as You Go",
            description: "Our assistants will explain the process, helping you gain digital skills for the future.",
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
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <section className="bg-primary-50 py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">How Cyber Bandhu Works</h1>
                            <p className="text-lg text-gray-600 mb-6">Simple, secure, and affordable digital assistance at your doorstep</p>
                            <Button asChild className="bg-secondary-500 hover:bg-secondary-600">
                                <Link to="/contact">Book Now</Link>
                            </Button>
                        </div>
                    </div>
                </section>
                <section className="py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Simple Process</h2>
                            <p className="text-gray-600 text-lg">Getting digital assistance is easy with Cyber Bandhu. Here's how it works:</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {steps.map((step, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                        <step.icon className="h-8 w-8 text-primary-600" />
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-4">
                                            <span className="w-8 h-8 bg-primary-600 rounded-full text-white flex items-center justify-center font-semibold">
                                                {index + 1}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                        <p className="text-gray-600">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">See Cyber Bandhu in Action</h2>
                            <p className="text-gray-600 text-lg">Watch how our digital assistants help students achieve their goals</p>
                        </div>
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden relative aspect-video">
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                                    <div className="text-center">
                                        <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white transition-colors">
                                            <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-primary-600 ml-1"></div>
                                        </div>
                                        <p className="text-primary-700 font-medium">Video Demo</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Cyber Bandhu Advantage</h2>
                            <p className="text-gray-600 text-lg">Why students across rural and semi-urban India trust us</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                                <div className="mr-4">
                                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                        <MapPin className="h-6 w-6 text-primary-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Doorstep Service</h3>
                                    <p className="text-gray-600">No need to travel or find internet access. Our digital assistants come to your home, saving you time, effort, and money.</p>
                                </div>
                            </div>
                            <div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                                <div className="mr-4">
                                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                        <Clock className="h-6 w-6 text-primary-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Convenient Scheduling</h3>
                                    <p className="text-gray-600">Book appointments at times that work for you. We're available on weekends and evenings to accommodate your schedule.</p>
                                </div>
                            </div>
                            <div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                                <div className="mr-4">
                                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                        <Shield className="h-6 w-6 text-primary-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Secure & Trustworthy</h3>
                                    <p className="text-gray-600">All our digital assistants are verified, trained, and follow strict privacy protocols to protect your information.</p>
                                </div>
                            </div>
                            <div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                                <div className="mr-4">
                                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                        <Users className="h-6 w-6 text-primary-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Local Digital Assistants</h3>
                                    <p className="text-gray-600">Our assistants speak your language and understand local needs, making it easier to communicate your requirements.</p>
                                </div>
                            </div>
                            <div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                                <div className="mr-4">
                                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                        <CreditCard className="h-6 w-6 text-primary-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
                                    <p className="text-gray-600">Clear, affordable rates with no hidden charges. You'll always know the cost upfront before any service begins.</p>
                                </div>
                            </div>
                            <div className="flex items-start p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                                <div className="mr-4">
                                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                        <CheckCircle className="h-6 w-6 text-primary-600" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
                                    <p className="text-gray-600">We ensure accurate form filling, thorough guidance, and complete digital assistance for your needs.</p></div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Questions</h2>
                            <p className="text-gray-600 text-lg">Answers to frequently asked questions about our process</p>
                        </div>
                        <div className="max-w-3xl mx-auto">
                            <div className="space-y-6">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                                        <div className="flex items-start">
                                            <div className="mr-4 flex-shrink-0">
                                                <HelpCircle className="h-6 w-6 text-primary-600" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                                                <p className="text-gray-600">{faq.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-10">
                                <p className="text-gray-600 mb-4">Have more questions about how Cyber Bandhu works?</p>
                                <Button asChild variant="outline" className="border-primary-500 text-primary-600 hover:bg-primary-50">
                                    <Link to="/faq">View All FAQs</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-16 bg-secondary-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
                            <p className="text-gray-600 text-lg mb-8">Book your first appointment with Cyber Bandhu and experience hassle-free digital assistance.</p>
                            <Button asChild size="lg" className="bg-secondary-500 hover:bg-secondary-600">
                                <Link to="/contact">Book an Appointment</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default HowItWorks;
