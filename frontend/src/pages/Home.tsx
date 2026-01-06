import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServiceCard } from "@/components/ui/service-card";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, ShieldCheck, Users, FileText, MapPin, } from "lucide-react";

const Home = () => {
  const services = [
    {
      icon: FileText,
      title: "Form Filling Assistance",
      description: "Help with online applications, government forms, and digital paperwork.",
    },
    {
      icon: GraduationCap,
      title: "College Admissions",
      description: "Guidance for college applications, scholarships, and academic opportunities.",
    },
    {
      icon: ShieldCheck,
      title: "Digital Safety",
      description: "Secure your online presence and learn safe digital practices.",
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection
          title="Your Digital Friend at Your Doorstep"
          subtitle="Affordable and secure digital assistance for students in rural and semi-urban India. Let Cyber Bandhu help you navigate the online world."
          primaryButtonText="Book Now"
          primaryButtonLink="/contact"
          secondaryButtonText="Learn More"
          secondaryButtonLink="/how-it-works"
          image="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        />
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-gray-600 text-lg">We provide affordable digital assistance to help students access opportunities and navigate the digital world.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} icon={service.icon} title={service.title} description={service.description} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="outline" className="border-primary-500 text-primary-600 hover:bg-primary-50">
                <Link to="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-gray-600 text-lg">Getting digital assistance is simple, affordable, and secure with Cyber Bandhu.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Book an Appointment</h3>
                <p className="text-gray-600">Schedule a visit through our website, app, or toll-free number.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Meet Your Cyber Bandhu</h3>
                <p className="text-gray-600">Our trained assistant visits your home at the scheduled time.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Digital Help</h3>
                <p className="text-gray-600">Receive assistance with your digital tasks at transparent pricing.</p>
              </div>
            </div>
            <div className="text-center mt-12">
              <Button asChild className="bg-secondary-500 hover:bg-secondary-600">
                <Link to="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
              <p className="text-gray-600 text-lg">Hear from students who have benefited from our digital assistance services.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} name={testimonial.name} location={testimonial.location} testimonial={testimonial.testimonial} imageSrc={testimonial.imageSrc} />
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 bg-primary-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Become a Cyber Bandhu</h2>
              <p className="text-primary-100 text-lg mb-8">Are you a student with digital skills? Join our network and help others while earning.</p>
              <Button asChild variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                <Link to="/join-us">Join As Digital Assistant</Link>
              </Button>
            </div>
          </div>
        </section>
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Cyber Bandhu?</h2>
              <p className="text-gray-600 text-lg">We're committed to making digital access simple, affordable, and trustworthy.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Doorstep Service</h3>
                  <p className="text-gray-600">We come to you - no need to travel or find internet access.</p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
                  <p className="text-gray-600">All our digital assistants are verified and trained for your security.</p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Local Support</h3>
                  <p className="text-gray-600">Our assistants speak your language and understand local needs.</p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Educational Guidance</h3>
                  <p className="text-gray-600">Get expert advice on courses, colleges, and career opportunities.</p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Government Forms</h3>
                  <p className="text-gray-600">Navigate complex government applications and scholarship forms.</p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <div className="text-primary-600 font-bold">₹</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
                  <p className="text-gray-600">Clear, affordable rates with no hidden charges or surprises.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 bg-secondary-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Digital Assistance?</h2>
              <p className="text-gray-600 text-lg mb-8">Book an appointment today and let Cyber Bandhu help you navigate the digital world.</p>
              <Button asChild size="lg" className="bg-secondary-500 hover:bg-secondary-600">
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

export default Home;
