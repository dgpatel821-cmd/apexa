import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./Pages/Dashboard";
import AdminCars from "./Pages/AdminCars";
import Login from "./Pages/Login";
import BookingEnquiry from "./Pages/BookingEnquiry";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminContacts from "./Pages/AdminContacts";
import ProtectedRoute from "./components/ProtectedRoute";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        {/* Layout Route */}
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
>

          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AdminCars />} />
          <Route path="bookingenquiries" element={<BookingEnquiry />} />
          <Route path="contactenquiries" element={<AdminContacts />} />

        </Route>

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}