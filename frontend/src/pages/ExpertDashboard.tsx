import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UsersRound, Calendar, LogOut, BarChart, Star, Menu, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

const ExpertDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [pendingServicesData, setPendingServicesData] = useState<any[]>([]);
  const [myPendingServicesData, setMyPendingServicesData] = useState<any[]>([]);
  const [expertServices, setExpertServices] = useState<any[]>([]);
  const [serviceDetails, setServiceDetails] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [revenueModalOpen, setRevenueModalOpen] = useState(false);
  const [expertData, setExpertData] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const token = localStorage.getItem("auth");
  const expert = JSON.parse(localStorage.getItem("expert") || "{}");
  const expertId = expert._id;

  // Fetch expert data
  const getExpertData = async () => {
    if (!expertId) return;
    try {
      // Since we don't have a single expert endpoint, we'll fetch from expert/all and find our expert
      const res = await fetch(`http://localhost:5000/expert/all`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const experts = await res.json();
      const currentExpert = Array.isArray(experts)
        ? experts.find((e: any) => e._id === expertId)
        : null;
      if (currentExpert) {
        setExpertData(currentExpert);
      }
    } catch (err) {
      console.error("Error fetching expert data:", err);
    }
  };

  // Fetch all services assigned to this expert
  const getExpertServices = async () => {
    if (!expertId) return;
    try {
      const res = await fetch(`http://localhost:5000/service/expert/${expertId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setExpertServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching expert services:", err);
      toast({ title: "Failed to load expert services." });
    }
  };

  const getPendingServices = async () => {
    try {
      const res = await fetch(`http://localhost:5000/service/pending`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setPendingServicesData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching pending services:", err);
      toast({ title: "Failed to load pending services." });
    }
  };

  const getMyPendingServices = async () => {
    if (!expertId) return;
    try {
      const res = await fetch(`http://localhost:5000/service/pending/${expertId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setMyPendingServicesData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching my pending services:", err);
      toast({ title: "Failed to load your pending services." });
    }
  };

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      navigate("/admin/login");
      return;
    }
    getPendingServices();
    getMyPendingServices();
    getExpertServices();
    getExpertData();
  }, [token, expertId, navigate]);

  // Handlers...

  const fetchServiceDetails = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/service/details/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        toast({ title: "Failed to fetch service details." });
        return;
      }
      const data = await res.json();
      setServiceDetails(data);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching service details:", error);
      toast({ title: "Error fetching service details." });
    }
  };

  const handleAcceptService = async (serviceId: string) => {
    if (!expertId) {
      toast({ title: "Expert ID not found. Please login again." });
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/service/update/${serviceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ expert_id: expertId }),
      });
      if (res.ok) {
        toast({ title: "Service accepted successfully!" });
        getPendingServices();
        getMyPendingServices();
        getExpertServices();
      } else {
        toast({ title: "Failed to accept the service." });
      }
    } catch (error) {
      console.error("Error accepting service:", error);
      toast({ title: "Something went wrong." });
    }
  };

  const handleDoneClick = (taskId: string) => {
    navigate(`/expert/update-service/${taskId}`);
  };

  const closeModal = () => {
    setModalOpen(false);
    setServiceDetails(null);
  };

  // Profile Update Logic
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    email: "",
    mobile_no: "",
    role: "",
  });

  const openProfileModal = () => {
    if (expertData) {
      setUpdateFormData({
        name: expertData.name || "",
        email: expertData.email || "",
        mobile_no: expertData.mobile_no || "",
        role: expertData.role || "",
      });
    }
    setProfileModalOpen(true);
  };

  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    try {
      const res = await fetch(`http://localhost:5000/expert/update/${expertId}`, { // Assuming endpoint exists
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateFormData),
      });

      if (res.ok) {
        const updatedExpert = await res.json();
        setExpertData(updatedExpert);
        // Update local storage if needed, or just rely on state
        toast({ title: "Profile updated successfully" });
        setProfileModalOpen(false);
      } else {
        toast({ title: "Failed to update profile" });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({ title: "Error updating profile" });
    } finally {
      setIsUpdatingProfile(false);
    }
  };


  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.clear();
    navigate("/admin/login");
  };

  // Calculate total bookings and revenue for expert's services
  const totalBookings = expertServices.length;
  const totalRevenue = expertServices.reduce((sum, service) => {
    const amount = parseFloat(service.payment_amount);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);
  const completedServices = expertServices.filter((service) => service.status === "done");
  const completedRevenue = completedServices.reduce((sum, service) => {
    const amount = parseFloat(service.payment_amount);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);
  const averageCompletedRevenue =
    completedServices.length > 0 ? completedRevenue / completedServices.length : 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary-600">Cyber</span>
            <span className="text-xl font-bold text-secondary-500">Bandhu</span>
          </div>
          <div className="hidden md:flex items-center gap-6"> {/* Increased gap */}
            <div
              className="bg-green-100 px-3 py-1.5 rounded-md cursor-pointer hover:bg-green-200 transition-colors flex items-center gap-2 border border-green-200"
              onClick={() => setRevenueModalOpen(true)}
            >
              <BarChart className="h-4 w-4 text-green-700" />
              <span className="text-sm font-bold text-green-800">Revenue: ₹{totalRevenue.toFixed(2)}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={openProfileModal}
              className="flex items-center gap-2"
            >
              <UsersRound className="h-4 w-4" />
              Profile
            </Button>

            <div className="flex items-center gap-4 border-l pl-4 border-gray-300">
              <span className="text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded font-medium">Expert Panel</span>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg p-4 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200 z-50">
            <div
              className="bg-green-50 px-4 py-3 rounded-md cursor-pointer hover:bg-green-100 border border-green-200 flex items-center justify-between"
              onClick={() => {
                setRevenueModalOpen(true);
                setMobileMenuOpen(false);
              }}
            >
              <div className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-green-700" />
                <span className="font-semibold text-green-800">My Revenue</span>
              </div>
              <span className="font-bold text-green-900">₹{totalRevenue.toFixed(2)}</span>
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                openProfileModal();
                setMobileMenuOpen(false);
              }}
              className="w-full justify-start h-12 text-base"
            >
              <UsersRound className="h-5 w-5 mr-3" />
              My Profile
            </Button>

            <div className="border-t pt-4 mt-2">
              <div className="flex items-center justify-between mb-4 px-1">
                <span className="text-sm font-medium text-gray-500">Currently logged in as</span>
                <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded font-medium">Expert</span>
              </div>
              <Button variant="destructive" size="lg" onClick={handleLogout} className="w-full h-12 text-base">
                <LogOut className="h-5 w-5 mr-3" /> Logout
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Expert Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle>Total Bookings</CardTitle>
              <Calendar className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalBookings}</div>
              <p className="text-xs text-gray-500">Bookings assigned to you</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle>My Pending Services</CardTitle>
              <UsersRound className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{myPendingServicesData.length}</div>
              <p className="text-xs text-gray-500">Pending requests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle>Total Revenue</CardTitle>
              <BarChart className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹{totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-gray-500">Revenue from your services</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bookings" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="bookings">Pending Services</TabsTrigger>
            <TabsTrigger value="mybookings">My Pending Services</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 text-left font-medium">Name</th>
                          <th className="py-2 text-left font-medium">Mobile</th>
                          <th className="py-2 text-left font-medium">Email</th>
                          <th className="py-2 text-left font-medium">Service</th>
                          <th className="py-2 text-left font-medium">Description</th>
                          <th className="py-2 text-left font-medium">Address</th>
                          <th className="py-2 text-left font-medium">Date</th>
                          <th className="py-2 text-left font-medium">Status</th>
                          <th className="py-2 text-left font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingServicesData.map((booking) => (
                          <tr key={booking._id} className="border-b">
                            <td className="py-2">{booking.user_name}</td>
                            <td className="py-2">{booking.mobile_no}</td>
                            <td className="py-2">{booking.email}</td>
                            <td className="py-2">{booking.service_name}</td>
                            <td className="py-2">{booking.service_des}</td>
                            <td className="py-2">{booking.address}</td>
                            <td className="py-2">{new Date(booking.date).toLocaleString()}</td>
                            <td className="py-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${booking.status === "Confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : booking.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                  }`}
                              >
                                {booking.status}
                              </span>
                            </td>
                            <td className="py-2">
                              <div className="mt-2 flex gap-4">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => fetchServiceDetails(booking._id)}
                                >
                                  Show Details
                                </Button>
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => handleAcceptService(booking._id)}
                                >
                                  Accept
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mybookings">
            <Card>
              <CardHeader>
                <CardTitle>My Pending Services</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 text-left font-medium">Name</th>
                          <th className="py-2 text-left font-medium">Mobile</th>
                          <th className="py-2 text-left font-medium">Email</th>
                          <th className="py-2 text-left font-medium">Service</th>
                          <th className="py-2 text-left font-medium">Description</th>
                          <th className="py-2 text-left font-medium">Address</th>
                          <th className="py-2 text-left font-medium">Date</th>
                          <th className="py-2 text-left font-medium">Status</th>
                          <th className="py-2 text-left font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myPendingServicesData.map((booking) => (
                          <tr key={booking._id} className="border-b">
                            <td className="py-2">{booking.user_name}</td>
                            <td className="py-2">{booking.mobile_no}</td>
                            <td className="py-2">{booking.email}</td>
                            <td className="py-2">{booking.service_name}</td>
                            <td className="py-2">{booking.service_des}</td>
                            <td className="py-2">{booking.address}</td>
                            <td className="py-2">{new Date(booking.date).toLocaleString()}</td>
                            <td className="py-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${booking.status === "Confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : booking.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                                  }`}
                              >
                                {booking.status}
                              </span>
                            </td>
                            <td className="py-2">
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleDoneClick(booking._id)}
                              >
                                Done
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Completed Services</CardTitle>
                <p className="text-sm text-gray-500">
                  Review the services you have completed along with their revenue details.
                </p>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex flex-wrap gap-4 text-sm">
                  <span className="font-semibold">
                    Completed: <span className="text-primary-600">{completedServices.length}</span>
                  </span>
                  <span className="font-semibold">
                    Revenue: <span className="text-primary-600">₹{completedRevenue.toFixed(2)}</span>
                  </span>
                  <span className="font-semibold">
                    Avg / Job: <span className="text-primary-600">₹{averageCompletedRevenue.toFixed(2)}</span>
                  </span>
                </div>

                {completedServices.length === 0 ? (
                  <p className="text-sm text-gray-500">No completed services yet.</p>
                ) : (
                  <ScrollArea className="h-[300px]">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="py-2 text-left font-medium">Name</th>
                            <th className="py-2 text-left font-medium">Mobile</th>
                            <th className="py-2 text-left font-medium">Email</th>
                            <th className="py-2 text-left font-medium">Service</th>
                            <th className="py-2 text-left font-medium">Description</th>
                            <th className="py-2 text-left font-medium">Address</th>
                            <th className="py-2 text-left font-medium">Payment (₹)</th>
                            <th className="py-2 text-left font-medium">Payment Type</th>
                            <th className="py-2 text-left font-medium">Completed On</th>
                            <th className="py-2 text-left font-medium">Status</th>
                            <th className="py-2 text-left font-medium">Remarks</th>
                            <th className="py-2 text-left font-medium">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {completedServices.map((booking) => {
                            const paymentAmount = parseFloat(booking.payment_amount);
                            const formattedPayment = isNaN(paymentAmount)
                              ? "-"
                              : `₹${paymentAmount.toFixed(2)}`;
                            const completedOn = booking.solved_date
                              ? new Date(booking.solved_date).toLocaleDateString()
                              : booking.date
                                ? new Date(booking.date).toLocaleDateString()
                                : "-";

                            return (
                              <tr key={booking._id} className="border-b">
                                <td className="py-2">{booking.user_name}</td>
                                <td className="py-2">{booking.mobile_no || "-"}</td>
                                <td className="py-2">{booking.email}</td>
                                <td className="py-2">{booking.service_name}</td>
                                <td className="py-2">{booking.service_des || "-"}</td>
                                <td className="py-2">{booking.address || "-"}</td>
                                <td className="py-2">{formattedPayment}</td>
                                <td className="py-2">{booking.payment_type || "-"}</td>
                                <td className="py-2">{completedOn}</td>
                                <td className="py-2">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${booking.status === "done"
                                      ? "bg-green-100 text-green-800"
                                      : booking.status === "pending"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                      }`}
                                  >
                                    {booking.status ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1) : "-"}
                                  </span>
                                </td>
                                <td className="py-2">{booking.remarks || "-"}</td>
                                <td className="py-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fetchServiceDetails(booking._id)}
                                  >
                                    View Details
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Modal for Service Details */}
        {modalOpen && serviceDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
                onClick={closeModal}
                aria-label="Close modal"
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4">Service Details</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600"><strong>Name:</strong></p>
                    <p>{serviceDetails.user_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600"><strong>Mobile:</strong></p>
                    <p>{serviceDetails.mobile_no}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600"><strong>Email:</strong></p>
                    <p>{serviceDetails.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600"><strong>Status:</strong></p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs inline-block ${serviceDetails.status === "done"
                        ? "bg-green-100 text-green-800"
                        : serviceDetails.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                        }`}
                    >
                      {serviceDetails.status?.charAt(0).toUpperCase() + serviceDetails.status?.slice(1)}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600"><strong>Service:</strong></p>
                  <p>{serviceDetails.service_name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600"><strong>Description:</strong></p>
                  <p>{serviceDetails.service_des}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600"><strong>Address:</strong></p>
                  <p>{serviceDetails.address}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600"><strong>Date:</strong></p>
                  <p>{new Date(serviceDetails.date).toLocaleString()}</p>
                </div>

                {/* Rating and Feedback Section */}
                {serviceDetails.status === "done" && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold mb-3">Rating & Feedback</h3>

                    {/* Overall Expert Rating */}
                    {expertData && expertData.rating && parseFloat(expertData.rating) > 0 && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1"><strong>Your Overall Rating:</strong></p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-5 w-5 ${star <= parseFloat(expertData.rating || "0")
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                                  }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">
                            {parseFloat(expertData.rating).toFixed(1)} / 5.0
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Service-specific Rating and Feedback */}
                    {serviceDetails.rating && serviceDetails.rating !== "0" ? (
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600 mb-2"><strong>Rating for this service:</strong></p>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-5 w-5 ${star <= parseFloat(serviceDetails.rating || "0")
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                    }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium">
                              {parseFloat(serviceDetails.rating).toFixed(1)} / 5.0
                            </span>
                          </div>
                        </div>

                        {serviceDetails.feedback && (
                          <div>
                            <p className="text-sm text-gray-600 mb-2"><strong>Feedback:</strong></p>
                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-sm text-gray-700 whitespace-pre-wrap">{serviceDetails.feedback}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <p className="text-sm text-yellow-800">
                          No rating or feedback has been provided for this service yet.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Payment Information */}
                {serviceDetails.status === "done" && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold mb-3">Payment Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {serviceDetails.payment_amount && (
                        <div>
                          <p className="text-sm text-gray-600"><strong>Payment Amount:</strong></p>
                          <p className="text-lg font-semibold text-green-600">
                            ₹{parseFloat(serviceDetails.payment_amount).toFixed(2)}
                          </p>
                        </div>
                      )}
                      {serviceDetails.payment_type && (
                        <div>
                          <p className="text-sm text-gray-600"><strong>Payment Type:</strong></p>
                          <p>{serviceDetails.payment_type}</p>
                        </div>
                      )}
                    </div>
                    {serviceDetails.remarks && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600"><strong>Remarks:</strong></p>
                        <p>{serviceDetails.remarks}</p>
                      </div>
                    )}
                    {serviceDetails.solved_date && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600"><strong>Completed On:</strong></p>
                        <p>{new Date(serviceDetails.solved_date).toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-end">
                <Button variant="ghost" onClick={closeModal}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Revenue Split Modal */}
        {revenueModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative animate-in fade-in zoom-in duration-200">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
                onClick={() => setRevenueModalOpen(false)}
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-6 text-center text-gray-900">Revenue Breakdown</h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <span className="font-medium text-gray-600">Total Revenue</span>
                  <span className="font-bold text-xl text-gray-900">₹{totalRevenue.toFixed(2)}</span>
                </div>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase">Split Details</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-100">
                  <div>
                    <span className="font-bold text-green-800 block">Expert Share</span>
                    <span className="text-xs font-medium text-green-600 bg-green-200 px-2 py-0.5 rounded-full inline-block mt-1">80%</span>
                  </div>
                  <span className="font-bold text-2xl text-green-700">₹{(totalRevenue * 0.8).toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                  <div>
                    <span className="font-medium text-indigo-800 block">Platform Fee</span>
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-200 px-2 py-0.5 rounded-full inline-block mt-1">20%</span>
                  </div>
                  <span className="font-semibold text-lg text-indigo-700">₹{(totalRevenue * 0.2).toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <p className="text-xs text-gray-400 text-center">
                  Payments are processed monthly. <br />Contact support for discrepancies.
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Expert Profile Modal */}
        {profileModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative animate-in fade-in zoom-in duration-200">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
                onClick={() => setProfileModalOpen(false)}
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-6 text-gray-900 border-b pb-2">Update Profile</h2>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={updateFormData.name}
                    onChange={handleUpdateChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={updateFormData.email}
                    onChange={handleUpdateChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input
                    type="text"
                    name="mobile_no"
                    value={updateFormData.mobile_no}
                    onChange={handleUpdateChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialization/Role</label>
                  <input
                    type="text"
                    name="role"
                    value={updateFormData.role}
                    onChange={handleUpdateChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <Button variant="outline" type="button" onClick={() => setProfileModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isUpdatingProfile} className="bg-indigo-600 hover:bg-indigo-700">
                    {isUpdatingProfile ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ExpertDashboard;
