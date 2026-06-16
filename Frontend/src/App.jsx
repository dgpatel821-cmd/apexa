import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Cars from "./pages/Cars";
import AboutUs from "./pages/AboutUs";
import TourPlaces from "./pages/TourPlaces";
import ContactUs from "./pages/ContactUs";
import Enquiry from "./pages/Enquiry";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Navbar />

      <div className="pt-[56px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/tours" element={<TourPlaces />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/enquiry/:id" element={<Enquiry />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>

      <Footer />
    </BrowserRouter>
  );
}