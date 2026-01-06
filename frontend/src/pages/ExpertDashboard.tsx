import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UsersRound, Calendar, LogOut, BarChart } from "lucide-react";
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

  const token = localStorage.getItem("auth");
  const expert = JSON.parse(localStorage.getItem("expert") || "{}");
  const expertId = expert._id;

  // Fetch all services assigned to this expert
  const getExpertServices = async () => {
    if (!expertId) return;
    try {
      const res = await fetch(`https://cyber-bandhu.onrender.com/service/expert/${expertId}`, {
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
      const res = await fetch(`https://cyber-bandhu.onrender.com/service/pending`, {
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
      const res = await fetch(`https://cyber-bandhu.onrender.com/service/pending/${expertId}`, {
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
  }, [token, expertId, navigate]);

  // Handlers...

  const fetchServiceDetails = async (id: string) => {
    try {
      const res = await fetch(`https://cyber-bandhu.onrender.com/service/details/${id}`, {
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
      const res = await fetch(`https://cyber-bandhu.onrender.com/service/update/${serviceId}`, {
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
          <span className="ml-4 text-sm bg-gray-200 px-2 py-1 rounded">Expert Panel</span>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
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
                                className={`px-2 py-1 rounded-full text-xs ${
                                  booking.status === "Confirmed"
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
                                className={`px-2 py-1 rounded-full text-xs ${
                                  booking.status === "Confirmed"
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
                                    className={`px-2 py-1 rounded-full text-xs ${
                                      booking.status === "done"
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
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={closeModal}
                aria-label="Close modal"
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4">Service Details</h2>
              <div>
                <p><strong>Name:</strong> {serviceDetails.user_name}</p>
                <p><strong>Mobile:</strong> {serviceDetails.mobile_no}</p>
                <p><strong>Email:</strong> {serviceDetails.email}</p>
                <p><strong>Service:</strong> {serviceDetails.service_name}</p>
                <p><strong>Description:</strong> {serviceDetails.service_des}</p>
                <p><strong>Address:</strong> {serviceDetails.address}</p>
                <p><strong>Date:</strong> {new Date(serviceDetails.date).toLocaleString()}</p>
                <p><strong>Status:</strong> {serviceDetails.status}</p>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="ghost" onClick={closeModal}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ExpertDashboard;
