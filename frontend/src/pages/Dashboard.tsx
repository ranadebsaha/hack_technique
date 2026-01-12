import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { History, MapPin, Loader2, CheckCircle, Calendar, Clock, CheckCircle2, Menu, X, UsersRound, LogOut } from "lucide-react";
import { Label } from "@/components/ui/label";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get user info from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("auth") || "";

  const [user, setUser] = useState<any>(storedUser);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Service request form state - only fields user fills now
  const [serviceForm, setServiceForm] = useState({
    service_name: "",
    service_des: "",
    date: "",
    time: "",
    location: null as { type: string; coordinates: [number, number] } | null,
    female_preference: false,
  });
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string>("");

  // User profile update form state (clone of user to edit)
  const [updateForm, setUpdateForm] = useState({ ...storedUser });

  // Services stats from user history
  const [serviceStats, setServiceStats] = useState({
    totalRequested: 0,
    pending: 0,
    completed: 0,
  });

  // Fetch fresh user profile
  const fetchUserProfile = async () => {
    try {
      const res = await fetch(`http://localhost:5000/user/${user._id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data._id) {
        setUser(data);
        setUpdateForm(data);
        updateServiceStats(data.history || []);
      } else {
        toast({ title: "User profile fetch failed" });
      }
    } catch (e) {
      toast({ title: "Error fetching profile" });
    }
  };


  // Update service stats based on user history
  const updateServiceStats = (history: any[]) => {
    const totalRequested = history.length;
    const pending = history.filter((h) => h.status === "pending").length;
    const completed = history.filter((h) => h.status === "done").length;
    setServiceStats({ totalRequested, pending, completed });
  };

  useEffect(() => {
    if (!token || !user._id) {
      navigate("/login");
      return;
    }
    fetchUserProfile();
  }, []);

  // Handle service request form input changes
  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setServiceForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setServiceForm((prev) => ({ ...prev, [name]: checked }));
  };

  // Fetch location using browser geolocation
  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
      return;
    }

    setIsFetchingLocation(true);
    setLocationStatus("Fetching location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setServiceForm((prev) => ({
          ...prev,
          location: {
            type: "Point",
            coordinates: [longitude, latitude], // MongoDB GeoJSON format: [longitude, latitude]
          },
        }));
        setLocationStatus(`Location fetched: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        setIsFetchingLocation(false);
        toast({
          title: "Location fetched successfully",
          description: "Your location has been captured.",
        });
      },
      (error) => {
        setIsFetchingLocation(false);
        let errorMessage = "Failed to fetch location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timeout. Please try again.";
            break;
        }
        setLocationStatus(errorMessage);
        toast({
          title: "Location fetch failed",
          description: errorMessage,
          variant: "destructive",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // Submit service request and update user history/profile
  const submitServiceRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceForm.service_name || !serviceForm.service_des || !serviceForm.date || !serviceForm.time) {
      toast({ title: "Please fill all required service request fields" });
      return;
    }

    if (!serviceForm.location || !serviceForm.location.coordinates) {
      toast({
        title: "Location required",
        description: "Please click 'Fetch Location' to capture your current location.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Post service request to service API
      const serviceBody: any = {
        service_name: serviceForm.service_name,
        service_des: serviceForm.service_des,
        date: serviceForm.date,
        time: serviceForm.time,
        user_id: user._id,
        user_name: user.name,
        mobile_no: user.mobile_no,
        email: user.email,
        landmark: user.landmark,
        address: user.address,
        city: user.city,
        district: user.district,
        state: user.state,
        status: "pending",
        female_preference: serviceForm.female_preference,
      };

      // Add location if it exists
      if (serviceForm.location && serviceForm.location.coordinates) {
        serviceBody.location = serviceForm.location;
      }

      const resService = await fetch("http://localhost:5000/service", {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify(serviceBody),
      });

      const serviceResult = await resService.json();

      if (!serviceResult._id) {
        toast({ title: "Service request failed" });
        return;
      }

      const newHistoryEntry = {
        service_id: serviceResult._id,
        expert_id: "",
        date: serviceForm.date,
        service_name: serviceForm.service_name,
        status: "pending",
      };

      const updatedHistory = [...(user.history || []), newHistoryEntry];

      const resUserUpdate = await fetch(`http://localhost:5000/user/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify({ history: updatedHistory }),
      });

      const userUpdated = await resUserUpdate.json();

      if (resUserUpdate.ok) {
        // Refresh user profile and stats
        fetchUserProfile();
        // Clear service form
        setServiceForm({
          service_name: "",
          service_des: "",
          date: "",
          time: "",
          location: null,
          female_preference: false,
        });
        setLocationStatus("");
        toast({ title: "Service requested successfully" });
      } else {
        toast({ title: "Failed to update user history" });
      }
    } catch (e) {
      toast({ title: "Error processing request" });
    }
  };

  // Handle profile modal open/close
  const openProfileModal = () => setProfileModalOpen(true);
  const closeProfileModal = () => setProfileModalOpen(false);

  // Handle update modal open/close
  const openUpdateModal = () => setUpdateModalOpen(true);
  const closeUpdateModal = () => setUpdateModalOpen(false);

  // Handle profile form input change
  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit profile update
  const submitProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/user/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify(updateForm),
      });
      if (res.ok) {
        toast({ title: "Profile updated" });
        setUser(updateForm);
        closeUpdateModal();
      } else toast({ title: "Failed to update profile" });
    } catch {
      toast({ title: "Error updating profile" });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 flex flex-col">
      {/* Header */}
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-primary-100">
        <div className="container mx-auto px-4 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hello, {user.name || "User"}!</h1>
            <p className="text-sm text-gray-600 mt-1">Welcome to your dashboard</p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/user/history")}
              className="flex items-center gap-2 border-primary-300 hover:bg-primary-50 text-primary-700"
            >
              <History className="h-5 w-5" />
              <span className="hidden sm:inline">History</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={openProfileModal}
              className="flex items-center gap-2 border-primary-300 hover:bg-primary-50 text-primary-700"
            >
              <span className="hidden sm:inline">Profile</span>
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={handleLogout}
              className="hover:bg-red-50 hover:text-red-600 ml-2"
            >
              Logout
            </Button>
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
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                navigate("/user/history");
                setMobileMenuOpen(false);
              }}
              className="w-full justify-start h-12 text-base"
            >
              <History className="h-5 w-5 mr-3" />
              History
            </Button>

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
              Profile
            </Button>

            <div className="border-t pt-4 mt-2">
              <div className="flex items-center justify-between mb-4 px-1">
                <span className="text-sm font-medium text-gray-500">Currently logged in as</span>
                <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded font-medium">{user.name || "User"}</span>
              </div>
              <Button variant="destructive" size="lg" onClick={handleLogout} className="w-full h-12 text-base">
                <LogOut className="h-5 w-5 mr-3" /> Logout
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Stats */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-800">Total Requests</CardTitle>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-blue-700">{serviceStats.totalRequested}</p>
              <p className="text-sm text-gray-600 mt-2">All service requests</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-800">Pending</CardTitle>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-yellow-700">{serviceStats.pending}</p>
              <p className="text-sm text-gray-600 mt-2">Awaiting completion</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-800">Completed</CardTitle>
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-700">{serviceStats.completed}</p>
              <p className="text-sm text-gray-600 mt-2">Finished services</p>
            </CardContent>
          </Card>
        </div>

        {/* Request Service Form */}
        <Card className="bg-white border-2 border-gray-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold">Request a Service</CardTitle>
            <p className="text-primary-100 mt-1">Fill in the details below to request assistance</p>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={submitServiceRequest} className="space-y-6">
              <div>
                <label className="block mb-2 text-base font-semibold text-gray-700">Service Name *</label>
                <Input
                  name="service_name"
                  value={serviceForm.service_name}
                  onChange={handleServiceChange}
                  required
                  placeholder="e.g., College Admission Form, Scholarship Application"
                  className="h-12 text-base border-2 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-base font-semibold text-gray-700">Service Description *</label>
                <Textarea
                  name="service_des"
                  value={serviceForm.service_des}
                  onChange={handleServiceChange}
                  required
                  placeholder="Describe the service you need in detail..."
                  className="min-h-24 text-base border-2 focus:border-primary-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-base font-semibold text-gray-700">Date *</label>
                  <Input
                    name="date"
                    value={serviceForm.date}
                    onChange={handleServiceChange}
                    required
                    type="date"
                    className="h-12 text-base border-2 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-base font-semibold text-gray-700">Time *</label>
                  <Input
                    name="time"
                    value={serviceForm.time}
                    onChange={handleServiceChange}
                    required
                    type="time"
                    className="h-12 text-base border-2 focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="space-y-3 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                <Label className="text-base font-semibold text-gray-800 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary-600" />
                  Location * (Required)
                </Label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="button"
                    onClick={handleFetchLocation}
                    disabled={isFetchingLocation}
                    variant="outline"
                    className="flex items-center justify-center gap-2 h-12 text-base font-semibold border-2 border-primary-500 text-primary-700 hover:bg-primary-50"
                  >
                    {isFetchingLocation ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Fetching Location...
                      </>
                    ) : (
                      <>
                        <MapPin className="h-5 w-5" />
                        Fetch My Location
                      </>
                    )}
                  </Button>
                  {serviceForm.location && (
                    <div className="flex-1 px-4 py-3 border-2 border-green-300 rounded-lg bg-green-50 text-green-800 flex items-center justify-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-semibold">Location Captured</span>
                    </div>
                  )}
                </div>
                {locationStatus && (
                  <p className={`text-sm font-medium ${serviceForm.location ? "text-green-700" : "text-orange-600"}`}>
                    {locationStatus}
                  </p>
                )}
                <p className="text-sm text-gray-600 leading-relaxed">
                  Click "Fetch My Location" to allow your browser to access your location. This helps us match you with nearby experts who can assist you.
                </p>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-purple-50 border-2 border-purple-200 rounded-lg">
                <input
                  type="checkbox"
                  id="female_preference"
                  name="female_preference"
                  checked={serviceForm.female_preference}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 mt-0.5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
                />
                <Label htmlFor="female_preference" className="text-base font-semibold text-gray-800 cursor-pointer leading-relaxed">
                  I prefer a female expert/assistant
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl transition-all"
              >
                Submit Service Request
              </Button>
            </form>
          </CardContent>
        </Card>


      </main>

      {/* <Footer /> */}

      {/* Profile Modal */}
      {profileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto border-2 border-gray-200">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              onClick={closeProfileModal}
              aria-label="Close profile modal"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-primary-200 pb-3">Profile Details</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Name</p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-900">{user.name}</p>
                  <Button
                    variant="link"
                    onClick={() => {
                      closeProfileModal();
                      openUpdateModal();
                    }}
                    className="text-primary-600 h-auto p-0"
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="text-lg font-semibold text-gray-900">{user.email}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Phone</p>
                <p className="text-lg font-semibold text-gray-900">{user.mobile_no}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Address</p>
                <p className="text-base font-semibold text-gray-900">{user.address}, {user.landmark}, {user.city}, {user.district}, {user.state} {user.pincode && `- ${user.pincode}`}</p>
              </div>
              {user.dob && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Date of Birth</p>
                  <p className="text-base font-semibold text-gray-900">{user.dob}</p>
                </div>
              )}
              {user.gender && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Gender</p>
                  <p className="text-base font-semibold text-gray-900">{user.gender}</p>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                onClick={closeProfileModal}
                size="lg"
                className="h-12 px-8 text-base font-semibold bg-primary-600 hover:bg-primary-700"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Update Profile Modal */}
      {updateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto border-2 border-gray-200">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              onClick={closeUpdateModal}
              aria-label="Close update modal"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b-2 border-primary-200 pb-3">Update Profile</h2>
            <form onSubmit={submitProfileUpdate} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Name *</label>
                <Input
                  name="name"
                  value={updateForm.name}
                  onChange={handleUpdateChange}
                  placeholder="Enter your full name"
                  required
                  className="h-12 text-base border-2"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Email *</label>
                <Input
                  name="email"
                  value={updateForm.email}
                  onChange={handleUpdateChange}
                  placeholder="Enter your email"
                  type="email"
                  required
                  className="h-12 text-base border-2"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Phone *</label>
                <Input
                  name="mobile_no"
                  value={updateForm.mobile_no}
                  onChange={handleUpdateChange}
                  placeholder="Enter your phone number"
                  required
                  className="h-12 text-base border-2"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Date of Birth</label>
                <Input
                  name="dob"
                  value={updateForm.dob}
                  onChange={handleUpdateChange}
                  placeholder="Date of Birth"
                  type="date"
                  className="h-12 text-base border-2"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Gender</label>
                <Input
                  name="gender"
                  value={updateForm.gender}
                  onChange={handleUpdateChange}
                  placeholder="Enter your gender"
                  className="h-12 text-base border-2"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Address *</label>
                <Input
                  name="address"
                  value={updateForm.address}
                  onChange={handleUpdateChange}
                  placeholder="Enter your address"
                  required
                  className="h-12 text-base border-2"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Landmark</label>
                <Input
                  name="landmark"
                  value={updateForm.landmark}
                  onChange={handleUpdateChange}
                  placeholder="Enter landmark"
                  className="h-12 text-base border-2"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">City *</label>
                  <Input
                    name="city"
                    value={updateForm.city}
                    onChange={handleUpdateChange}
                    placeholder="Enter city"
                    required
                    className="h-12 text-base border-2"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">District *</label>
                  <Input
                    name="district"
                    value={updateForm.district}
                    onChange={handleUpdateChange}
                    placeholder="Enter district"
                    required
                    className="h-12 text-base border-2"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">State *</label>
                  <Input
                    name="state"
                    value={updateForm.state}
                    onChange={handleUpdateChange}
                    placeholder="Enter state"
                    required
                    className="h-12 text-base border-2"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">Pincode</label>
                  <Input
                    name="pincode"
                    value={updateForm.pincode}
                    onChange={handleUpdateChange}
                    placeholder="Enter pincode"
                    className="h-12 text-base border-2"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={closeUpdateModal}
                  size="lg"
                  className="h-12 px-8 text-base font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 px-8 text-base font-semibold bg-primary-600 hover:bg-primary-700"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
