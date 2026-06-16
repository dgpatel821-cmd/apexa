import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./Sidebar";
import SidebarContent from "./SidebarContent";
import AdminTopbar from "./AdminTopbar";


export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const admin = {
    name: "Haresh Goswami",
    email: "admin@gmail.com",
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setSidebarOpen(false);
    }
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  /* 🔥 Prevent body scroll when mobile sidebar open */
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [sidebarOpen]);

  return (
    <div className="flex w-full min-h-screen bg-[#080c1a] overflow-x-hidden">

      {/* ================= DESKTOP SIDEBAR ================= */}
      <Sidebar />

      {/* ================= MOBILE SIDEBAR ================= */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Slide Sidebar */}
            <motion.div
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full z-50 lg:hidden shadow-2xl"
            >
              <SidebarContent
                mobile
                onClose={() => setSidebarOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Topbar */}
        <AdminTopbar
          logout={logout}
          admin={admin}
          toggleSidebar={() => setSidebarOpen(true)}
        />

        {/* Page Content */}
        <main className="flex-1 w-full overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 text-white">
          <Outlet />
        </main>

      </div>
    </div>
  );
}