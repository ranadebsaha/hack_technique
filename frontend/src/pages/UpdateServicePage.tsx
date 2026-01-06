import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateServicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState<any>(null);
  const [form, setForm] = useState({
    remarks: "",
    solved_date: "",
    solved_time: "",
    payment_type: "",
    payment_amount: "",
  });

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("auth") || "";
  // const userId = localStorage.getItem("userId") || "";

  // Fetch service data on mount
  useEffect(() => {
    if (!id) return;
    const fetchService = async () => {
      try {
        const res = await fetch(`https://cyber-bandhu.onrender.com/expert/pending-service/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setService(data);
        console.log(data);
      } catch (err) {
        alert("Failed to fetch service data");
      }
    };
    fetchService();
  }, [id, token]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !form.remarks ||
      !form.solved_date ||
      !form.solved_time ||
      !form.payment_amount ||
      !form.payment_type
    ) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const updatePayload = {
        ...form,
        status: "done",
        solved_date: form.solved_date,
        solved_time: form.solved_time,
      };
      const res = await fetch(`https://cyber-bandhu.onrender.com/service/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(updatePayload),
      });

      if (!res.ok) {
        const error = await res.json();
        alert("Service update failed: " + (error.message || ""));
        setLoading(false);
        return;
      }
      const userRes = await fetch(`https://cyber-bandhu.onrender.com/user/${service[0].user_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!userRes.ok) {
        alert("Failed to fetch user data");
        setLoading(false);
        return;
      }
      const user = await userRes.json();

      // Update the service status in user's history
      const updatedHistory = user.history.map((entry:any) => {
        if (entry.service_id === id) {
          return { ...entry, status: "done", date: form.solved_date, time: form.solved_time };
        }
        return entry;
      });

      const userUpdateRes = await fetch(`https://cyber-bandhu.onrender.com/user/${service[0].user_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ history: updatedHistory }),
      });

      if (!userUpdateRes.ok) {
        alert("Failed to update user history");
        setLoading(false);
        return;
      }

      alert("Service marked as done successfully!");
      navigate("/expert/dashboard");
    } catch (error) {
      alert("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (!service) {
    return <p className="text-center mt-10">Loading service details...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Update Service: {service.service_name}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Remarks</label>
          <textarea
            name="remarks"
            value={form.remarks}
            onChange={onChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Solved Date</label>
            <input
              type="date"
              name="solved_date"
              value={form.solved_date}
              onChange={onChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Solved Time</label>
            <input
              type="time"
              name="solved_time"
              value={form.solved_time}
              onChange={onChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Amount (₹)</label>
            <input
              type="number"
              name="payment_amount"
              value={form.payment_amount}
              onChange={onChange}
              required
              min="0"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Type</label>
            <select
              name="payment_type"
              value={form.payment_type}
              onChange={onChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            >
              <option value="">Select Type</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Online">Online</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? "Updating..." : "Mark as Done"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateServicePage;
