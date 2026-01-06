import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MessageSquare } from "lucide-react";
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
  const navigate = useNavigate();
  const { toast } = useToast();

  const collectData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f_name || !l_name || !mobile_no || !email || !query_name || !query_des || !t_c) {
      setError(true);
      return;
    }
    let result = await fetch("https://cyber-bandhu.onrender.com/query", {
      method: "POST",
      body: JSON.stringify({ f_name, l_name, mobile_no, email, query_name, query_des }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    if (result) {
      toast({
        title: "We will contact you soon",
        description: "Thank you for using Cyber-bandhu",
      });
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-16 bg-gray-50">
        <section className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Get in Touch</h2>
          <form onSubmit={collectData} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name*
                </label>
                <Input
                  id="firstName"
                  value={f_name}
                  onChange={(e) => setF_name(e.target.value)}
                  placeholder="Your first name"
                  required
                />
                {error && !f_name && <span className="text-red-500">Enter First Name</span>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name*
                </label>
                <Input
                  id="lastName"
                  value={l_name}
                  onChange={(e) => setL_name(e.target.value)}
                  placeholder="Your last name"
                  required
                />
                {error && !l_name && <span className="text-red-500">Enter Last Name</span>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address*
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                />
                {error && !email && <span className="text-red-500">Enter a valid Email</span>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number*
                </label>
                <Input
                  id="phone"
                  value={mobile_no}
                  onChange={(e) => setMobile_no(e.target.value)}
                  placeholder="Your phone number"
                  required
                />
                {error && !mobile_no && <span className="text-red-500">Enter a valid phone number</span>}
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject*
              </label>
              <Input
                id="subject"
                value={query_name}
                onChange={(e) => setQuery_name(e.target.value)}
                placeholder="What is this regarding?"
                required
              />
              {error && !query_name && <span className="text-red-500">Enter Subject</span>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message*
              </label>
              <Textarea
                id="message"
                value={query_des}
                onChange={(e) => setQuery_des(e.target.value)}
                placeholder="How can we help you?"
                className="h-32"
                required
              />
              {error && !query_des && <span className="text-red-500">Enter message</span>}
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={t_c}
                  onChange={(e) => setT_c(e.target.checked)}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-primary-600 hover:text-primary-500">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>
            {error && !t_c && <span className="text-red-500 block mb-4">You must agree to the Privacy Policy</span>}
            <Button type="submit" className="w-full bg-secondary-500 hover:bg-secondary-600">
              Send Message
            </Button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
