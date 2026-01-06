import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HelpCircle, MessageSquare, Phone, Mail } from "lucide-react";

const FAQ = () => {
    const generalFaqs = [
        {
            question: "What is Cyber Bandhu?",
            answer: "Cyber Bandhu is an affordable, secure doorstep digital assistance service for students in rural and semi-urban India. We help with online form filling, college admissions, scholarship applications, and other digital tasks that students may find challenging.",
        },
        {
            question: "Who can use Cyber Bandhu services?",
            answer: "Our services are designed primarily for students who have passed 10th or 12th standard and reside in rural or semi-urban areas with limited digital access or literacy. However, we're happy to assist anyone who needs help with digital tasks.",
        },
        {
            question: "How do I book a service?",
            answer: "You can book a service through our website, mobile app, or by calling our toll-free number. Simply select the service you need, choose your preferred date and time, and provide your location details. We'll confirm your booking and send a Digital Assistant to your location.",
        },
        {
            question: "Do you operate in my area?",
            answer: "We're continuously expanding our services across rural and semi-urban areas in India. Please check our service availability by entering your location on our website or contacting our support team. If we're not in your area yet, you can join our waitlist.",
        },
        {
            question: "Can I request a specific Digital Assistant?",
            answer: "Yes, if you've worked with a specific Digital Assistant before and would like to request them again, you can mention their name during the booking process. We'll try our best to accommodate your request based on their availability.",
        },
    ];

    const serviceFaqs = [
        {
            question: "What services does Cyber Bandhu offer?",
            answer: "We offer a wide range of digital assistance services including form filling for college applications, scholarship applications, career guidance, college admissions help, digital safety training, job applications assistance, digital literacy training, and financial services assistance.",
        },
        {
            question: "How long does a typical service session take?",
            answer: "The duration depends on the complexity of the service. Basic form filling may take 30-60 minutes, while comprehensive college application assistance could take 1-2 hours. We'll always inform you about the expected duration before starting the service.",
        },
        {
            question: "What documents do I need to have ready?",
            answer: "For most services, you should have your ID proof (Aadhaar, PAN card), educational certificates/mark sheets, passport-sized photographs, and any specific documents required for the application you're filling. Our confirmation message will include a checklist of required documents.",
        },
        {
            question: "Can you help with specific college applications?",
            answer: "Yes, our Digital Assistants are trained to help with applications for a wide range of colleges and universities. We have specialized knowledge about various educational institutions and their application processes.",
        },
        {
            question: "Do you provide content for personal statements or essays?",
            answer: "We can guide you on structuring your personal statements or essays and help you express your thoughts clearly. However, the content should be your own authentic expression. We help you present your achievements and aspirations effectively.",
        },
    ];

    const pricingFaqs = [
        {
            question: "How much do your services cost?",
            answer: "Our services start at ₹99 for basic assistance. Standard packages cost ₹199, and premium support services are ₹399. The exact price depends on the complexity of the service and the time required. We always provide transparent pricing before starting any service.",
        },
        {
            question: "Are there any hidden charges?",
            answer: "No, we believe in complete transparency. The price quoted at the time of booking is what you pay. If any service requires additional time or resources, we'll inform you and get your approval before proceeding.",
        },
        {
            question: "Do you offer any discounts for multiple services?",
            answer: "Yes, we offer package discounts when you book multiple services together. We also have special rates for returning customers and referral benefits when you recommend our services to friends and family.",
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept cash, UPI payments, debit/credit cards, and mobile wallets. Our Digital Assistants carry portable payment devices for card payments and can assist with digital payment methods if needed.",
        },
        {
            question: "Can I get a refund if I'm not satisfied?",
            answer: "Yes, we stand behind our services. If you're not satisfied with the assistance provided, please inform us within 24 hours of service completion, and we'll address your concerns or process a refund as appropriate.",
        },
    ];

    const privacyFaqs = [
        {
            question: "How do you ensure my personal information is safe?",
            answer: "We take data privacy very seriously. All our Digital Assistants are trained in data protection practices and sign strict confidentiality agreements. We never store your sensitive information like passwords. Our systems are secured with encryption, and we only collect information necessary for providing our services.",
        },
        {
            question: "Do you share my data with third parties?",
            answer: "We never sell your data to third parties. We only share your information with the necessary institutions (like colleges or scholarship providers) with your explicit permission and only as required to complete the application process you've requested help with.",
        },
        {
            question: "How do you verify your Digital Assistants?",
            answer: "All our Digital Assistants undergo thorough background verification, including identity checks, address verification, and reference checks. They receive comprehensive training and are regularly evaluated on their performance and adherence to our privacy and security policies.",
        },
        {
            question: "What happens to my documents after the service?",
            answer: "Our Digital Assistants will only view your documents during the service session. They don't keep physical copies of your documents. Any digital copies used for application purposes are securely deleted from our systems after the service is completed.",
        },
        {
            question: "Can I request data deletion?",
            answer: "Yes, you have the right to request deletion of your personal information from our systems. You can make this request through our website or by contacting our support team. We'll process your request in accordance with applicable data protection regulations.",
        },
    ];

    const sections = [
        { id: "general", title: "General Questions", faqs: generalFaqs },
        { id: "services", title: "Services", faqs: serviceFaqs },
        { id: "pricing", title: "Pricing & Payment", faqs: pricingFaqs },
        { id: "privacy", title: "Privacy & Security", faqs: privacyFaqs },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <section className="bg-primary-50 py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
                            <p className="text-lg text-gray-600 mb-6">Find answers to common questions about Cyber Bandhu services</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button asChild className="bg-secondary-500 hover:bg-secondary-600">
                                    <a href="#general">General</a>
                                </Button>
                                <Button asChild variant="outline" className="border-primary-500 text-primary-600 hover:bg-primary-50">
                                    <a href="#services">Services</a>
                                </Button>
                                <Button asChild variant="outline" className="border-primary-500 text-primary-600 hover:bg-primary-50">
                                    <a href="#pricing">Pricing</a>
                                </Button>
                                <Button asChild variant="outline" className="border-primary-500 text-primary-600 hover:bg-primary-50">
                                    <a href="#privacy">Privacy</a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
                {sections.map((section) => (
                    <section id={section.id} key={section.id} className="py-16 border-b border-gray-100 last:border-b-0">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="max-w-3xl mx-auto">
                                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{section.title}</h2>
                                <div className="space-y-6">
                                    {section.faqs.map((faq, index) => (
                                        <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                                            <div className="flex items-start">
                                                <HelpCircle className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                                                <div>
                                                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                                                    <p className="text-gray-600">{faq.answer}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4"> Didn't Find Your Answer?</h2>
                            <p className="text-gray-600 text-lg mb-8"> Contact us directly and we'll be happy to help you with any questions</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 flex flex-col items-center">
                                    <MessageSquare className="h-10 w-10 text-primary-600 mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">Chat With Us</h3>
                                    <p className="text-gray-600 text-center mb-4"> Chat with our support team through WhatsApp</p>
                                    <Button asChild variant="outline" className="border-primary-500 text-primary-600 hover:bg-primary-50 mt-auto">
                                        <a href="#">Start Chat</a>
                                    </Button>
                                </div>
                                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 flex flex-col items-center">
                                    <Phone className="h-10 w-10 text-primary-600 mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                                    <p className="text-gray-600 text-center mb-4"> Speak with our support team directly</p>
                                    <p className="text-primary-600 font-semibold mb-4"> +91 9876543210</p>
                                    <Button asChild variant="outline" className="border-primary-500 text-primary-600 hover:bg-primary-50 mt-auto">
                                        <a href="tel:+919876543210">Call Now</a>
                                    </Button>
                                </div>
                                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 flex flex-col items-center">
                                    <Mail className="h-10 w-10 text-primary-600 mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                                    <p className="text-gray-600 text-center mb-4"> Send your questions to our support email</p>
                                    <p className="text-primary-600 font-semibold mb-4"> help@digitaldost.in</p>
                                    <Button asChild variant="outline" className="border-primary-500 text-primary-600 hover:bg-primary-50 mt-auto">
                                        <a href="mailto:help@digitaldost.in">Send Email</a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-16 bg-primary-600">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-white mb-4"> Ready to Get Started?</h2>
                            <p className="text-primary-100 text-lg mb-8"> Book your first appointment with Cyber Bandhu and experience hassle-free digital assistance.</p>
                            <Button asChild variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
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

export default FAQ;
