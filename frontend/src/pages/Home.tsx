import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  GraduationCap, 
  ShieldCheck, 
  Users, 
  FileText, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Star 
} from "lucide-react";

const Home = () => {
  const services = [
    {
      icon: FileText,
      title: "Form Filling Assistance",
      description: "Expert help with complex online applications, government forms, and digital paperwork to ensure error-free submissions.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: GraduationCap,
      title: "College Admissions",
      description: "Comprehensive guidance for college applications, scholarships, and unlocking new academic opportunities.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: ShieldCheck,
      title: "Digital Safety",
      description: "Learn essential practices to secure your online presence and navigate the digital world with confidence.",
      color: "bg-teal-100 text-teal-600",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Rajasthan",
      testimonial: "Cyber Bandhu helped me apply for a scholarship I didn't even know existed. Thanks to them, my college education is now fully funded!",
      imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
    },
    {
      name: "Priya Singh",
      location: "Bihar",
      testimonial: "I was struggling with online forms for my college admission. Cyber Bandhu came to my home and helped me complete everything in just an hour!",
      imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
    },
    {
      name: "Ananya Patel",
      location: "Gujarat",
      testimonial: "The career guidance I received was eye-opening. I now have a clear path for my future studies and career goals.",
      imageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden bg-white">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 opacity-70"></div>
            <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
                            Trusted by 10,000+ Students
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
                            Your Digital Friend at <span className="text-indigo-600">Your Doorstep</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Affordable, secure, and expert digital assistance for students in rural and semi-urban India. We bridge the digital divide, one click at a time.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Button asChild size="lg" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 h-12 px-8 text-base">
                                <Link to="/contact">
                                    Book Now <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 h-12 px-8 text-base">
                                <Link to="/how-it-works">Learn More</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="lg:w-1/2 relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                            <img 
                                src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                                alt="Digital Dost Services" 
                                className="w-full h-auto transform hover:scale-105 transition-transform duration-700" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -z-10 -top-12 -right-12 w-64 h-64 bg-purple-200 rounded-full opacity-50 blur-3xl"></div>
                        <div className="absolute -z-10 -bottom-12 -left-12 w-64 h-64 bg-indigo-200 rounded-full opacity-50 blur-3xl"></div>
                    </div>
                </div>
            </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Empowering Services</h2>
              <p className="text-lg text-gray-600">We provide affordable digital assistance to help students access opportunities and navigate the digital world.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
                  <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-medium text-lg">
                <Link to="/services" className="flex items-center">
                    View All Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Simple Steps to Digital Freedom</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Getting digital assistance is simple, affordable, and secure with Cyber Bandhu. We bring the internet to your doorstep.
                    </p>
                    <div className="space-y-8">
                        {[
                            { step: "01", title: "Book an Appointment", desc: "Schedule a visit through our website, app, or toll-free number." },
                            { step: "02", title: "Meet Your Cyber Bandhu", desc: "Our trained assistant visits your home at the scheduled time." },
                            { step: "03", title: "Get Digital Help", desc: "Receive assistance with your digital tasks at transparent pricing." }
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xl border border-indigo-100">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-base">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10">
                        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-xl shadow-lg shadow-indigo-200">
                            <Link to="/how-it-works">See How It Works</Link>
                        </Button>
                    </div>
                </div>
                <div className="lg:w-1/2 relative">
                     <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
                     <img 
                        src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1674&q=80" 
                        alt="How it works" 
                        className="rounded-3xl shadow-2xl w-full object-cover h-[500px]"
                    />
                </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-slate-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
                <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
            </div>

          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Creating Impact Stories</h2>
              <p className="text-lg text-gray-600">Hear from students who have unlocked their potential with our digital assistance services.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                        src={testimonial.imageSrc} 
                        alt={testimonial.name} 
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-100"
                    />
                    <div>
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="w-3 h-3 mr-1" /> {testimonial.location}
                        </div>
                    </div>
                  </div>
                  <div className="flex mb-4 text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <blockquote className="text-gray-600 italic flex-grow">"{testimonial.testimonial}"</blockquote>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us & CTA */}
        <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 to-purple-900/90"></div>
            
            <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Students Choose Cyber Bandhu?</h2>
                        <p className="text-indigo-100 text-lg mb-10 max-w-lg">
                            We're committed to making digital access simple, affordable, and trustworthy. Join thousands of students who trust us.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { title: "Doorstep Service", icon: MapPin },
                                { title: "Safe & Secure", icon: ShieldCheck },
                                { title: "Educational Guidance", icon: BookOpen },
                                { title: "Transparent Pricing", icon: FileText } // Using FileText as generic icon for now
                            ].map((feature, idx) => (
                                <div key={idx} className="flex items-center space-x-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                    <feature.icon className="w-6 h-6 text-indigo-300" />
                                    <span className="font-medium">{feature.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="relative bg-white rounded-3xl p-8 md:p-12 text-center text-gray-900 shadow-2xl">
                        <h3 className="text-3xl font-bold mb-4">Start Your Journey</h3>
                        <p className="text-gray-600 mb-8">Ready to unlock digital opportunities? Book your first appointment today.</p>
                        <div className="flex flex-col gap-4">
                            <Button asChild size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-14 text-lg">
                                <Link to="/contact">Book Now</Link>
                            </Button>
                            <p className="text-sm text-gray-500">No hidden fees. Cancel anytime.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Join CTA */}
        <section className="py-16 bg-indigo-50 border-t border-indigo-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Want to earn while you learn?</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">Are you a student with digital skills? Join our network of Digital Assistants and help others while earning a steady income.</p>
            <Button asChild variant="outline" size="lg" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8">
              <Link to="/join-us">Join As Digital Assistant</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

