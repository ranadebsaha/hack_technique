import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import HowItWorks from "./pages/HowItWorks";
import JoinUs from "./pages/JoinUs";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import BookService from "./pages/BookService";
import ExpertDashboard from "./pages/ExpertDashboard";
import UpdateServicePage from "./pages/UpdateServicePage";

import { ScrollToTop } from "./components/utils/ScrollToTop";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import AdminRegister from "./pages/AdminRegister";
import UserDashboard from "./pages/Dashboard";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/join-us" element={<JoinUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/login" element={<UserLogin />} />

          {/* <Route path="/expert" element={<AssistantPortal />} /> */}
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* <Route path="/admin/register" element={<AdminRegister />} /> */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/expert/dashboard" element={<ExpertDashboard />} />
          <Route path="/expert/update-service/:id" element={<UpdateServicePage />} />
          <Route path="/book-service" element={<BookService />} />

          <Route path="/register" element={<UserRegister />} />
          <Route path="/assistant/login" element={<AdminLogin />} />
          {/* <Route path="/assistant/register" element={<AdminRegister />} /> */}
          {/* <Route path="/assistant/dashboard" element={<AdminDashboard />} /> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
