import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MessageSquare, MapPin, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const [f_name, setF_name] = useState("");
  const [l_name, setL_name] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_no, setMobile_no] = useState("");
  const [query_name, setQuery_name] = useState("");
  const [query_des, setQuery_des] = useState("");
  const [t_c, setT_c] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const collectData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f_name || !l_name || !mobile_no || !email || !query_name || !query_des || !t_c) {
      setError(true);
      return;
    }

    setIsSubmitting(true);
    try {
      let result = await fetch("http://localhost:5000/query", {
        method: "POST",
        body: JSON.stringify({ f_name, l_name, mobile_no, email, query_name, query_des }),
        headers: { "Content-Type": "application/json" },
      });
      result = await result.json();
      if (result) {
        toast({
          title: "Message Sent Successfully! 🎉",
          description: "We will get back to you as soon as possible.",
        });
        navigate("/");
      }
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      <main className="flex-grow py-12 lg:py-20 flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px]">

          {/* Left Side - Contact Info */}
          <div className="lg:w-5/12 bg-indigo-900 p-10 lg:p-16 text-white relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/50 to-purple-900/50"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Connect</h2>
              <p className="text-indigo-100 text-lg mb-12">
                Have a question or need assistance? We're here to help! Fill out the form and our team will reach out to you within 24 hours.
              </p>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                    <Phone className="h-6 w-6 text-indigo-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                    <p className="text-indigo-100">+91 1800-123-4567</p>
                    <p className="text-indigo-200 text-sm">Mon-Fri from 8am to 5pm.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                    <Mail className="h-6 w-6 text-indigo-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                    <p className="text-indigo-100">support@cyberbandhu.com</p>
                    <p className="text-indigo-200 text-sm">We'll respond as soon as possible.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                    <MapPin className="h-6 w-6 text-indigo-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Visit Us</h3>
                    <p className="text-indigo-100">123 Digital Hub, Tech Park,</p>
                    <p className="text-indigo-100">New Delhi, India 110001</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 lg:mt-0">
              <div className="flex space-x-4">
                {/* Social Media placeholders if needed */}
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-7/12 p-10 lg:p-16 bg-white">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h3>

            <form onSubmit={collectData} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name <span className="text-red-500">*</span></label>
                  <Input
                    id="firstName"
                    value={f_name}
                    onChange={(e) => setF_name(e.target.value)}
                    placeholder="John"
                    className="bg-gray-50 border-gray-200 focus:bg-white h-12"
                  />
                  {error && !f_name && <span className="text-red-500 text-xs mt-1">First name is required</span>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name <span className="text-red-500">*</span></label>
                  <Input
                    id="lastName"
                    value={l_name}
                    onChange={(e) => setL_name(e.target.value)}
                    placeholder="Doe"
                    className="bg-gray-50 border-gray-200 focus:bg-white h-12"
                  />
                  {error && !l_name && <span className="text-red-500 text-xs mt-1">Last name is required</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address <span className="text-red-500">*</span></label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="bg-gray-50 border-gray-200 focus:bg-white h-12"
                  />
                  {error && !email && <span className="text-red-500 text-xs mt-1">Valid email is required</span>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                  <Input
                    id="phone"
                    value={mobile_no}
                    onChange={(e) => setMobile_no(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="bg-gray-50 border-gray-200 focus:bg-white h-12"
                  />
                  {error && !mobile_no && <span className="text-red-500 text-xs mt-1">Phone number is required</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject <span className="text-red-500">*</span></label>
                <Input
                  id="subject"
                  value={query_name}
                  onChange={(e) => setQuery_name(e.target.value)}
                  placeholder="How can we help you?"
                  className="bg-gray-50 border-gray-200 focus:bg-white h-12"
                />
                {error && !query_name && <span className="text-red-500 text-xs mt-1">Subject is required</span>}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Message <span className="text-red-500">*</span></label>
                <Textarea
                  id="message"
                  value={query_des}
                  onChange={(e) => setQuery_des(e.target.value)}
                  placeholder="Tell us more about your inquiry..."
                  className="bg-gray-50 border-gray-200 focus:bg-white min-h-[150px] resize-none"
                />
                {error && !query_des && <span className="text-red-500 text-xs mt-1">Message is required</span>}
              </div>

              <div className="flex items-start pt-2">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={t_c}
                    onChange={(e) => setT_c(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-600">
                    I agree to the{" "}
                    <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium hover:underline">
                      Privacy Policy
                    </a>
                    {" "}and Terms of Service.
                  </label>
                  {error && !t_c && <p className="text-red-500 text-xs mt-1">You must agree to the policy</p>}
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-14 text-lg shadow-lg shadow-indigo-200">
                  {isSubmitting ? (
                    <span className="flex items-center">Sending...</span>
                  ) : (
                    <span className="flex items-center">Send Message <Send className="ml-2 w-5 h-5" /></span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
