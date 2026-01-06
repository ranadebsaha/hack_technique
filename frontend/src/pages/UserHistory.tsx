import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Star, ArrowLeft } from "lucide-react";

const UserHistory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get user info from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("auth") || "";

  const [user, setUser] = useState<any>(storedUser);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [editFeedbackModalOpen, setEditFeedbackModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedbackDescription, setFeedbackDescription] = useState("");

  // Apply theme
  const applyTheme = (themeMode: "light" | "dark") => {
    const root = document.documentElement;
    if (themeMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  // Fetch user history
  const fetchHistory = async () => {
    try {
      const res = await fetch(`http://localhost:5000/user/${user._id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data._id) {
        setUser(data);
        
        // Apply theme from user preference
        const userTheme = data.theme_preference || "light";
        applyTheme(userTheme);
        
        const historyData = data.history || [];
        
        // Fetch detailed service information for each history entry
        const detailedHistory = await Promise.all(
          historyData.map(async (entry: any) => {
            try {
              const serviceRes = await fetch(
                `http://localhost:5000/service/details/${entry.service_id}`,
                {
                  headers: { authorization: `Bearer ${token}` },
                }
              );
              const serviceData = await serviceRes.json();
              return {
                ...entry,
                serviceDetails: serviceData,
              };
            } catch (e) {
              return entry;
            }
          })
        );
        
        setHistory(detailedHistory);
      }
    } catch (e) {
      toast({ title: "Error fetching history", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || !user._id) {
      navigate("/login");
      return;
    }
    fetchHistory();
  }, []);

  const openFeedbackModal = (service: any) => {
    setSelectedService(service);
    setRating(0);
    setHoveredRating(0);
    setFeedbackDescription("");
    setFeedbackModalOpen(true);
  };

  const openEditFeedbackModal = (service: any) => {
    setSelectedService(service);
    const existingRating = service.serviceDetails?.rating 
      ? parseFloat(service.serviceDetails.rating) 
      : 0;
    setRating(existingRating);
    setHoveredRating(0);
    setFeedbackDescription(service.serviceDetails?.feedback || "");
    setEditFeedbackModalOpen(true);
  };

  const closeFeedbackModal = () => {
    setFeedbackModalOpen(false);
    setSelectedService(null);
    setRating(0);
    setHoveredRating(0);
    setFeedbackDescription("");
  };

  const closeEditFeedbackModal = () => {
    setEditFeedbackModalOpen(false);
    setSelectedService(null);
    setRating(0);
    setHoveredRating(0);
    setFeedbackDescription("");
  };

  const submitFeedback = async () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please provide a rating by selecting stars",
        variant: "destructive",
      });
      return;
    }

    if (!selectedService) return;

    try {
      // Update service with feedback and rating
      const updatePayload = {
        feedback: feedbackDescription,
        rating: rating.toString(),
      };

      const serviceId = selectedService.service_id || selectedService.serviceDetails?._id;
      if (!serviceId) {
        toast({
          title: "Error",
          description: "Service ID not found",
          variant: "destructive",
        });
        return;
      }

      const res = await fetch(
        `http://localhost:5000/service/update/${serviceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatePayload),
        }
      );

      if (res.ok) {
        toast({
          title: "Feedback submitted successfully",
          description: "Thank you for your feedback!",
        });
        
        closeFeedbackModal();
        fetchHistory(); // Refresh history
      } else {
        const errorData = await res.json();
        toast({
          title: "Failed to submit feedback",
          description: errorData.result || "Please try again",
          variant: "destructive",
        });
      }
    } catch (e) {
      toast({
        title: "Error submitting feedback",
        variant: "destructive",
      });
    }
  };

  const submitEditFeedback = async () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please provide a rating by selecting stars",
        variant: "destructive",
      });
      return;
    }

    if (!selectedService) return;

    try {
      // Update service with feedback and rating
      const updatePayload = {
        feedback: feedbackDescription,
        rating: rating.toString(),
      };

      const serviceId = selectedService.service_id || selectedService.serviceDetails?._id;
      if (!serviceId) {
        toast({
          title: "Error",
          description: "Service ID not found",
          variant: "destructive",
        });
        return;
      }

      const res = await fetch(
        `http://localhost:5000/service/update/${serviceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatePayload),
        }
      );

      if (res.ok) {
        toast({
          title: "Feedback updated successfully",
          description: "Your feedback has been updated!",
        });
        
        closeEditFeedbackModal();
        fetchHistory(); // Refresh history
      } else {
        const errorData = await res.json();
        toast({
          title: "Failed to update feedback",
          description: errorData.result || "Please try again",
          variant: "destructive",
        });
      }
    } catch (e) {
      toast({
        title: "Error updating feedback",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      done: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${
          statusColors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status?.toUpperCase() || "UNKNOWN"}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-lg dark:text-white">Loading history...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-primary-100">
        <div className="container mx-auto px-4 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/user/dashboard")}
              className="border-primary-300 hover:bg-primary-50"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Service History</h1>
              <p className="text-sm text-gray-600 mt-1">View all your service requests</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6 flex-grow">
        {history.length === 0 ? (
          <Card className="bg-white border-2 border-gray-200 shadow-lg">
            <CardContent className="py-16 text-center">
              <p className="text-gray-600 text-xl font-semibold mb-2">No service requests found</p>
              <p className="text-gray-500 text-base">Your service request history will appear here</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-5">
            {history.map((entry, index) => (
              <Card key={index} className="bg-white border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b-2 border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">{entry.service_name}</CardTitle>
                      <p className="text-base text-gray-600 mt-2">
                        <span className="font-semibold">Date:</span> {entry.date || "N/A"}
                      </p>
                    </div>
                    {getStatusBadge(entry.status)}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {entry.serviceDetails && (
                    <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg">
                      <p className="text-base text-gray-800">
                        <span className="font-semibold text-gray-700">Description:</span> {entry.serviceDetails.service_des || "N/A"}
                      </p>
                      {entry.serviceDetails.expert_id && (
                        <p className="text-base text-gray-800">
                          <span className="font-semibold text-gray-700">Expert ID:</span> {entry.expert_id}
                        </p>
                      )}
                    </div>
                  )}
                  {entry.status === "done" && (
                    <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                      {entry.serviceDetails?.rating && entry.serviceDetails.rating !== "0" ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <span className="text-base font-semibold text-gray-800">Your Rating:</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-6 w-6 ${
                                    star <= parseFloat(entry.serviceDetails.rating || "0")
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          {entry.serviceDetails.feedback && (
                            <div className="mt-3">
                              <p className="text-base text-gray-800 mb-3">
                                <span className="font-semibold text-gray-700">Feedback:</span> {entry.serviceDetails.feedback}
                              </p>
                              <Button
                                onClick={() => openEditFeedbackModal(entry)}
                                variant="outline"
                                size="lg"
                                className="border-2 border-primary-500 text-primary-700 hover:bg-primary-50"
                              >
                                Edit Feedback
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Button
                          onClick={() => openFeedbackModal(entry)}
                          size="lg"
                          className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white font-semibold"
                        >
                          Give Feedback
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Feedback Modal */}
      {feedbackModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg mx-4 bg-white border-2 border-gray-200 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold">Provide Feedback</CardTitle>
              <p className="text-primary-100 mt-1">Service: {selectedService.service_name}</p>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <p className="text-base font-semibold mb-4 text-gray-800">
                  Rate your experience with the expert <span className="text-red-600">*</span>
                </p>
                <div className="flex gap-3 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="focus:outline-none transform hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`h-10 w-10 cursor-pointer transition-colors ${
                          star <= (hoveredRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-center text-base font-semibold text-primary-700 mt-3">
                    {rating} Star{rating !== 1 ? "s" : ""} Selected
                  </p>
                )}
              </div>

              <div>
                <label className="block text-base font-semibold mb-3 text-gray-800">
                  Feedback Description (Optional)
                </label>
                <Textarea
                  value={feedbackDescription}
                  onChange={(e) => setFeedbackDescription(e.target.value)}
                  placeholder="Share your experience and feedback..."
                  rows={5}
                  className="text-base border-2 focus:border-primary-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={closeFeedbackModal}
                  size="lg"
                  className="h-12 px-6 text-base font-semibold"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={submitFeedback} 
                  disabled={rating === 0}
                  size="lg"
                  className="h-12 px-8 text-base font-semibold bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
                >
                  Submit Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Feedback Modal */}
      {editFeedbackModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg mx-4 bg-white border-2 border-gray-200 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold">Edit Feedback</CardTitle>
              <p className="text-primary-100 mt-1">Service: {selectedService.service_name}</p>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <p className="text-base font-semibold mb-4 text-gray-800">
                  Update your rating and feedback <span className="text-red-600">*</span>
                </p>
                <div className="flex gap-3 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="focus:outline-none transform hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`h-10 w-10 cursor-pointer transition-colors ${
                          star <= (hoveredRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-center text-base font-semibold text-primary-700 mt-3">
                    {rating} Star{rating !== 1 ? "s" : ""} Selected
                  </p>
                )}
              </div>

              <div>
                <label className="block text-base font-semibold mb-3 text-gray-800">
                  Feedback Description (Optional)
                </label>
                <Textarea
                  value={feedbackDescription}
                  onChange={(e) => setFeedbackDescription(e.target.value)}
                  placeholder="Share your experience and feedback..."
                  rows={5}
                  className="text-base border-2 focus:border-primary-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={closeEditFeedbackModal}
                  size="lg"
                  className="h-12 px-6 text-base font-semibold"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={submitEditFeedback} 
                  disabled={rating === 0}
                  size="lg"
                  className="h-12 px-8 text-base font-semibold bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
                >
                  Update Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UserHistory;

