import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import FindDoctors from "./pages/FindDoctors";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Appointment from "./pages/Appointment";
import About from "./pages/About";
import Payment from "./pages/Payment";
import Receipt from "./pages/Receipt";
import UpcomingAppointments from "./pages/UpcomingAppointments";
import PendingPayments from "./pages/PendingPayments";
import CompletedAppointments from "./pages/CompletedAppointments";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/find-doctors" element={<FindDoctors />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/upcoming-appointments" element={<UpcomingAppointments />} />
          <Route path="/pending-payments" element={<PendingPayments />} />
          <Route path="/completed-appointments" element={<CompletedAppointments />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/receipt/:appointmentId" element={<Receipt />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;