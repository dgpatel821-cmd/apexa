import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminTopbar({ logout, admin,toggleSidebar }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const name = admin?.name || "Admin";
  const email = admin?.email || "admin@gmail.com";

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-4 max-sm:px-3 lg:px-8 h-16"
      style={{
        background: "rgba(8,12,26,0.97)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center gap-4">
        {/* Hamburger only on mobile */}
        <button
          onClick={toggleSidebar}
          className="sm:hidden text-white text-2xl"
        >
          ☰
        </button>

        <h1 className="text-white font-bold text-sm">
          Admin Panel
        </h1>
      </div>

      <div className="relative" ref={dropdownRef}>
        {/* USER ICON BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="w-9 h-9 rounded-xl bg-[rgba(201,168,76,0.15)]
                     border border-[rgba(201,168,76,0.3)]
                     flex items-center justify-center
                     hover:bg-[rgba(201,168,76,0.25)]
                     transition-all duration-200"
        >
          {/* USER SVG ICON */}
          <svg
            className="w-4 h-4 text-[#C9A84C]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5z" />
            <path d="M12 14c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
          </svg>
        </button>

        {/* DROPDOWN WITH ANIMATION */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-[calc(100%+10px)] w-72 bg-[#0f1630]
                         border border-white/[0.08] rounded-2xl
                         shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                         overflow-hidden z-50"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center px-5 py-4 border-b border-white/[0.06]">
                <div>
                  <p className="text-white font-bold text-sm">{name}</p>
                  <p className="text-gray-500 text-xs">{email}</p>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-white text-lg"
                >
                  ✕
                </button>
              </div>

              {/* LOGOUT */}
              <div className="p-4">
                <button
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  className="w-full bg-red-500/10 hover:bg-red-500/20
                             text-red-400 py-2 rounded-xl
                             transition-all duration-200 font-medium"
                >
                  Logout
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}