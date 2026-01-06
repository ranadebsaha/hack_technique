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

  const token = localStorage.getItem("auth") || "";

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

  const getPendingQuery = async () => {
    try {
      const res = await fetch(`https://cyber-bandhu.onrender.com/query/pending`, {
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
      const res = await fetch(`https://cyber-bandhu.onrender.com/expert/active`, {
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
      const res = await fetch(`https://cyber-bandhu.onrender.com/service/all`, {
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
                              <form
                                onSubmit={async (e) => {
                                  e.preventDefault();
                                  const form = e.target as HTMLFormElement;
                                  const newStatus = (form.elements.namedItem("status") as HTMLSelectElement).value;
                                  try {
                                    const res = await fetch(
                                      `https://cyber-bandhu.onrender.com/service/update/${booking._id}`,
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
                              <form
                                onSubmit={async (e) => {
                                  e.preventDefault();
                                  const form = e.target as HTMLFormElement;
                                  const newStatus = (form.elements.namedItem("status") as HTMLSelectElement).value;
                                  try {
                                    const res = await fetch(
                                      `https://cyber-bandhu.onrender.com/query/update/${booking._id}`,
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
                                <span className="ml-1">{assistant.rating}</span>
                              </div>
                            </td>
                            <td className="py-2">
                              <Button variant="link" size="sm">
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
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
