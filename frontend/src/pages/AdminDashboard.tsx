import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UsersRound, Calendar, LogOut, BarChart, AtSignIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [pendingServicesData, setPendingServicesData] = useState<any[]>([]);
  const [pendingQueryData, setPendingQueryData] = useState<any[]>([]);
  const [expert, setExpert] = useState<any[]>([]);
  const [allServices, setAllServices] = useState<any[]>([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [serviceDetails, setServiceDetails] = useState<any>(null);
  const [expertModalOpen, setExpertModalOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<any>(null);

  const token = localStorage.getItem("auth") || "";

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

  const getPendingQuery = async () => {
    try {
      const res = await fetch(`http://localhost:5000/query/pending`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setPendingQueryData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching pending queries:", err);
      toast({ title: "Failed to load pending queries." });
    }
  };

  const getActiveExperts = async () => {
    try {
      const res = await fetch(`http://localhost:5000/expert/active`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setExpert(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching active experts:", err);
      toast({ title: "Failed to load active experts." });
    }
  };

  const getAllServices = async () => {
    try {
      const res = await fetch(`http://localhost:5000/service/all`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAllServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching all services:", err);
      toast({ title: "Failed to load all services." });
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    getPendingServices();
    getPendingQuery();
    getActiveExperts();
    getAllServices();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  const handleBookService = () => {
    navigate("/book-service");
  };

  // Calculate total bookings count and total revenue
  const totalBookings = allServices.length;
  const totalRevenue = allServices.reduce((sum, service) => {
    const amount = parseFloat(service.payment_amount);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  // Calculate expert ratings from services
  const expertRatings: Record<string, { total: number; count: number }> = {};
  allServices.forEach(service => {
    if (service.expert_id && service.rating && service.rating !== "0") {
      const rating = parseFloat(service.rating);
      if (!isNaN(rating)) {
        if (!expertRatings[service.expert_id]) {
          expertRatings[service.expert_id] = { total: 0, count: 0 };
        }
        expertRatings[service.expert_id].total += rating;
        expertRatings[service.expert_id].count += 1;
      }
    }
  });

  const getExpertRating = (expertId: string) => {
    const data = expertRatings[expertId];
    if (!data || data.count === 0) return "N/A";
    return (data.total / data.count).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary-600">Cyber</span>
            <span className="text-xl font-bold text-secondary-500">Bandhu</span>
            <span className="ml-4 text-sm bg-gray-200 rounded px-2 py-1">Admin Panel</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={handleBookService}>
              <AtSignIcon className="h-4 w-4 mr-2" /> Book Service
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle>Total Bookings</CardTitle>
              <Calendar className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{totalBookings}</p>
              <p className="text-xs text-gray-500">Total bookings in system</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle>Active Assistants</CardTitle>
              <UsersRound className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{expert.length}</p>
              <p className="text-xs text-gray-500">Currently active assistants</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle>Total Revenue</CardTitle>
              <BarChart className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">₹{totalRevenue.toFixed(2)}</p>
              <p className="text-xs text-gray-500">Sum of all payments received</p>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="bookings" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="bookings">Pending Services</TabsTrigger>
            <TabsTrigger value="query">Pending Query</TabsTrigger>
            <TabsTrigger value="assistants">Digital Experts</TabsTrigger>
            <TabsTrigger value="pending_experts">Pending by Experts</TabsTrigger>
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
                              <form
                                onSubmit={async (e) => {
                                  e.preventDefault();
                                  const form = e.target as HTMLFormElement;
                                  const newStatus = (form.elements.namedItem("status") as HTMLSelectElement).value;
                                  try {
                                    const res = await fetch(
                                      `http://localhost:5000/service/update/${booking._id}`,
                                      {
                                        method: "PUT",
                                        headers: {
                                          "Content-Type": "application/json",
                                          authorization: `Bearer ${token}`,
                                        },
                                        body: JSON.stringify({ status: newStatus }),
                                      }
                                    );
                                    const result = await res.json();
                                    if (result.success) {
                                      getPendingServices();
                                    }
                                  } catch (err) {
                                    console.error("Error updating status:", err);
                                    toast({ title: "Failed to update status." });
                                  }
                                }}
                              >
                                <select
                                  name="status"
                                  defaultValue={booking.status}
                                  className="text-xs border rounded px-2 py-1"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="done">Done</option>
                                  <option value="rejected">Rejected</option>
                                </select>
                                <button
                                  type="submit"
                                  className="ml-2 text-blue-600 text-xs underline"
                                >
                                  Update
                                </button>
                              </form>
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

          <TabsContent value="query">
            <Card>
              <CardHeader>
                <CardTitle>Pending Query</CardTitle>
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
                          <th className="py-2 text-left font-medium">Subject</th>
                          <th className="py-2 text-left font-medium">Message</th>
                          <th className="py-2 text-left font-medium">Date</th>
                          <th className="py-2 text-left font-medium">Status</th>
                          <th className="py-2 text-left font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingQueryData.map((booking) => (
                          <tr key={booking._id} className="border-b">
                            <td className="py-2">{booking.f_name + " " + booking.l_name}</td>
                            <td className="py-2">{booking.mobile_no}</td>
                            <td className="py-2">{booking.email}</td>
                            <td className="py-2">{booking.query_name}</td>
                            <td className="py-2">{booking.query_des}</td>
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
                              <form
                                onSubmit={async (e) => {
                                  e.preventDefault();
                                  const form = e.target as HTMLFormElement;
                                  const newStatus = (form.elements.namedItem("status") as HTMLSelectElement).value;
                                  try {
                                    const res = await fetch(
                                      `http://localhost:5000/query/update/${booking._id}`,
                                      {
                                        method: "PUT",
                                        headers: {
                                          "Content-Type": "application/json",
                                          authorization: `Bearer ${token}`,
                                        },
                                        body: JSON.stringify({ status: newStatus }),
                                      }
                                    );
                                    const result = await res.json();
                                    if (result.success) {
                                      getPendingQuery();
                                    }
                                  } catch (err) {
                                    console.error("Error updating query status:", err);
                                    toast({ title: "Failed to update query status." });
                                  }
                                }}
                              >
                                <select
                                  name="status"
                                  defaultValue={booking.status}
                                  className="text-xs border rounded px-2 py-1"
                                >
                                  <option value="pending">Pending</option>
                                  <option value="done">Resolved</option>
                                  <option value="rejected">Rejected</option>
                                </select>
                                <button
                                  type="submit"
                                  className="ml-2 text-blue-600 text-xs underline"
                                >
                                  Update
                                </button>
                              </form>
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

          <TabsContent value="assistants">
            <Card>
              <CardHeader>
                <CardTitle>Digital Assistants</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 text-left font-medium">Name</th>
                          <th className="py-2 text-left font-medium">Area</th>
                          <th className="py-2 text-left font-medium">Email</th>
                          <th className="py-2 text-left font-medium">Mobile</th>
                          <th className="py-2 text-left font-medium">Gender</th>
                          <th className="py-2 text-left font-medium">Verified</th>
                          <th className="py-2 text-left font-medium">Certified</th>
                          <th className="py-2 text-left font-medium">Rating</th>
                          <th className="py-2 text-left font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expert.map((assistant) => (
                          <tr key={assistant._id} className="border-b">
                            <td className="py-2">{assistant.name}</td>
                            <td className="py-2">{assistant.address}</td>
                            <td className="py-2">{assistant.email}</td>
                            <td className="py-2">{assistant.mobile_no}</td>
                            <td className="py-2">{assistant.gender}</td>
                            <td className="py-2">{assistant.verified.toString()}</td>
                            <td className="py-2">{assistant.certified.toString()}</td>
                            <td className="py-2">
                              <div className="flex items-center">
                                <span className="text-yellow-500">★</span>
                                <span className="ml-1">{getExpertRating(assistant._id)}</span>
                              </div>
                            </td>
                            <td className="py-2">
                              <Button
                                variant="link"
                                size="sm"
                                onClick={() => {
                                  setSelectedExpert(assistant);
                                  setExpertModalOpen(true);
                                }}
                              >
                                View Profile
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

          <TabsContent value="pending_experts">
            <Card>
              <CardHeader>
                <CardTitle>Pending by Experts</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 text-left font-medium">Service Name</th>
                          <th className="py-2 text-left font-medium">User Name</th>
                          <th className="py-2 text-left font-medium">Assigned Expert</th>
                          <th className="py-2 text-left font-medium">Date</th>
                          <th className="py-2 text-left font-medium">Status</th>
                          <th className="py-2 text-left font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allServices
                          .filter((service) => service.status === "pending" && service.expert_id)
                          .map((service) => {
                            const assignedExpert = expert.find((e) => e._id === service.expert_id);
                            return (
                              <tr key={service._id} className="border-b">
                                <td className="py-2">{service.service_name}</td>
                                <td className="py-2">{service.user_name}</td>
                                <td className="py-2 font-medium text-indigo-600">
                                  {assignedExpert ? assignedExpert.name : "Unknown Expert"}
                                </td>
                                <td className="py-2">{new Date(service.date).toLocaleDateString()}</td>
                                <td className="py-2">
                                  <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                                    In Progress
                                  </span>
                                </td>
                                <td className="py-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setServiceDetails(service);
                                      setViewModalOpen(true);
                                    }}
                                  >
                                    View Details
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        {allServices.filter((service) => service.status === "pending" && service.expert_id).length === 0 && (
                          <tr>
                            <td colSpan={5} className="py-4 text-center text-gray-500">No services currently pending with experts.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* View Details Modal */}
        {viewModalOpen && serviceDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Service Details</h2>
                  <button
                    onClick={() => setViewModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Service Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3 border-b pb-2">Service Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Service Name</p>
                        <p className="font-medium">{serviceDetails.service_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <span className="px-2 py-0.5 rounded-full text-xs bg-orange-100 text-orange-800 font-medium">
                          In Progress / Pending
                        </span>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Description</p>
                        <p className="font-medium">{serviceDetails.service_des}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Requested Date</p>
                        <p className="font-medium">{new Date(serviceDetails.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="font-semibold text-gray-900 mb-3 border-b border-blue-200 pb-2">User Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{serviceDetails.user_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{serviceDetails.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Mobile</p>
                        <p className="font-medium">{serviceDetails.mobile_no}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium text-sm">{serviceDetails.address}, {serviceDetails.city}</p>
                      </div>
                    </div>
                  </div>

                  {/* Expert Info */}
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <h3 className="font-semibold text-gray-900 mb-3 border-b border-green-200 pb-2">Assigned Expert Details</h3>
                    {(() => {
                      const assignedExpert = expert.find(e => e._id === serviceDetails.expert_id);
                      if (assignedExpert) {
                        return (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Name</p>
                              <p className="font-medium text-green-900">{assignedExpert.name}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Email</p>
                              <p className="font-medium text-green-900">{assignedExpert.email}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Mobile</p>
                              <p className="font-medium text-green-900">{assignedExpert.mobile_no}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Rating</p>
                              <div className="flex items-center text-green-900 font-medium">
                                <span className="text-yellow-500 mr-1">★</span>
                                {getExpertRating(assignedExpert._id)}
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        return <p className="text-red-500 font-medium">Expert details not found.</p>;
                      }
                    })()}
                  </div>

                </div>

                <div className="mt-8 flex justify-end">
                  <Button onClick={() => setViewModalOpen(false)}>Close</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Expert Profile Modal */}
      {expertModalOpen && selectedExpert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            <div className="relative">
              <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-lg"></div>
              <div className="px-6 pb-6">
                <div className="relative flex justify-between items-end -mt-12 mb-4">
                  <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md overflow-hidden flex items-center justify-center">
                    <span className="text-4xl font-bold text-indigo-600 uppercase">
                      {selectedExpert.name.charAt(0)}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedExpert.verified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {selectedExpert.verified ? 'Verified Expert' : 'Unverified'}
                    </span>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedExpert.name}</h2>
                  <p className="text-gray-500">{selectedExpert.role || "Digital Assistant"}</p>
                  <div className="flex items-center justify-center mt-2 text-yellow-500">
                    <span className="text-lg font-bold mr-1">{getExpertRating(selectedExpert._id)}</span>
                    <span className="text-sm text-gray-400">Rating</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                      <span className="text-xl">@</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email Address</p>
                      <p className="font-medium text-gray-900">{selectedExpert.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                      <span className="text-xl">📞</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone Number</p>
                      <p className="font-medium text-gray-900">{selectedExpert.mobile_no || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4">
                      <span className="text-xl">📍</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location/Area</p>
                      <p className="font-medium text-gray-900">{selectedExpert.address || "N/A"}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-4">
                      <span className="text-xl">♀️</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Gender</p>
                      <p className="font-medium text-gray-900">{selectedExpert.gender || "N/A"}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button className="w-full" onClick={() => setExpertModalOpen(false)}>Close</Button>
                </div>
              </div>
              <button
                onClick={() => setExpertModalOpen(false)}
                className="absolute top-2 right-2 text-white hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
