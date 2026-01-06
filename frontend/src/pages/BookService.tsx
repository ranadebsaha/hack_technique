import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const BookService = () => {

  const [user_name, setUser_name] = useState("");
  const [email, setEmail] = useState("");
  const [mobile_no, setMobile_no] = useState("");
  const [landmark, setLandmark] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [service_name, setService_name] = useState("");
  const [service_des, setService_des] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [t_c, setT_c] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();


  const collectData = async (e) => {
    e.preventDefault();
    if (!user_name || !landmark || !mobile_no || !email || !time||!date|| !address || !city ||!district|| !state|| !service_name||!service_des) {
      setError(true);
      return;
    }
    let result = await fetch("https://cyber-bandhu.onrender.com/service", {
      method: "POST",
      body: JSON.stringify({ user_name,landmark ,mobile_no ,email,time,date ,address ,city ,district,state,service_name,service_des}),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    if (result) {
      toast({
        title: "Service Successfully Registered",
        description: "Our Expert will visit your address soon",
      });
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Book a Service</h2>
                    <div>
                      <div className="mb-6">
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service Type*</label>
                        <select id="service" value={service_name} onChange={(e) => setService_name(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500" required>
                          <option value="">Select a service</option>
                          <option value="form-filling">Form Filling Assistance</option>
                          <option value="college-help">College Admissions Help</option>
                          <option value="scholarship">Scholarship Applications</option>
                          <option value="digital-safety">Digital Safety</option>
                          <option value="career-guidance">Career Guidance</option>
                        </select>
                        {error && !service_name && <span className="text-red-500">Select Service</span>}
                      </div>
                      <div className="mb-6">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">User Name*</label>
                        <Input id="text" value={user_name} onChange={(e) => setUser_name(e.target.value)} placeholder="Enter Name" required />
                        {error && !user_name && <span className="text-red-500">Enter Name</span>}
                      </div>
                      <div className="mb-6">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Mobile No*</label>
                        <Input id="text" value={mobile_no} onChange={(e) => setMobile_no(e.target.value)} placeholder="Enter Mobile no" required />
                        {error && !mobile_no && <span className="text-red-500">Enter Mobile no</span>}
                      </div>
                      <div className="mb-6">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                        <Input id="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required />
                        {error && !email && <span className="text-red-500">Enter email</span>}
                      </div>
                      <div className="mb-6">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
                        <Input id="location" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required />
                        {error && !address && <span className="text-red-500">Enter Address</span>}
                      </div>
                      <div className="mb-6">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Landmark*</label>
                        <Input id="location" value={landmark} onChange={(e) => setLandmark(e.target.value)} placeholder="LandMark" required />
                        {error && !landmark && <span className="text-red-500">Enter Landmark</span>}
                      </div>
                      <div className="mb-6">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">City*</label>
                        <Input id="location" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
                        {error && !city && <span className="text-red-500">Enter City</span>}
                      </div>
                      <div className="mb-6">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">District*</label>
                        <Input id="location" value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="District" required />
                        {error && !district && <span className="text-red-500">Enter District</span>}
                      </div>
                      <div className="mb-6">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">State*</label>
                        <Input id="location" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" required />
                        {error && !state && <span className="text-red-500">Enter State</span>}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Preferred Date*</label>
                          <Input id="date" value={date} onChange={(e) => setDate(e.target.value)} type="date" required />
                          {error && !date && <span className="text-red-500">Enter date</span>}
                        </div>
                        <div>
                          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Preferred Time*</label>
                          <Input id="time" value={time} onChange={(e) => setTime(e.target.value)} type="time" required />
                          {error && !time && <span className="text-red-500">Enter time</span>}
                        </div>
                      </div>
                      <div className="mb-6">
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Service Description</label>
                        <Textarea id="notes" value={service_des} onChange={(e) => setService_des(e.target.value)} placeholder="Tell us more about what you need help with..." className="h-20" />
                        {error && !service_des && <span className="text-red-500">Enter Description</span>}
                      </div>
                      <Button type="submit" onClick={collectData} className="w-full bg-primary-600 hover:bg-primary-700">Book Appointment</Button>
                    </div>
                  </div>
      
    </div>
  );
};

export default BookService;
