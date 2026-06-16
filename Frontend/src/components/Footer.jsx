import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-xl
                       bg-yellow-400 hover:bg-yellow-300 text-black
                       flex items-center justify-center
                       shadow-[0_0_20px_rgba(250,204,21,0.4)]
                       hover:shadow-[0_0_30px_rgba(250,204,21,0.6)]
                       transition-all duration-300 group"
          >
            <svg
              className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-200"
              fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-[#080c1a] border-t border-white/[0.06] relative overflow-hidden">

        {/* Ambient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-14 relative z-10">

          {/* Top section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-yellow-400/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <span className="text-white font-black text-lg tracking-tight">Apexa Travels</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Your trusted Gir tour specialist. Experience the wild in comfort and style with our premium fleet.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-3 mt-5">
  {[
    {
      label: "Facebook",
      link: "https://www.facebook.com/haresh.giri.meghnathi",
      icon: (
        <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.3 0-1.7.8-1.7 1.6V12H17l-.4 3h-2.6v7A10 10 0 0022 12z" />
      ),
    },
    {
      label: "Instagram",
      link: "https://www.instagram.com/apexaturandtravelas4590",
      icon: (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" ry="5"></rect>
          <circle cx="12" cy="12" r="4"></circle>
          <circle cx="17.5" cy="6.5" r="1.5"></circle>
        </>
      ),
    },
  ].map((s) => (
    <a
      key={s.label}
      href={s.link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 rounded-lg bg-white/[0.05] hover:bg-yellow-400/10 
                 flex items-center justify-center
                 text-gray-400 hover:text-yellow-400
                 transition-all duration-200"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        {s.icon}
      </svg>
    </a>
  ))}
</div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-4 h-px bg-yellow-400 inline-block" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Home", path: "/" },
                  { name: "Our Cars", path: "/cars" },
                  { name: "Book a Ride", path: "/cars" },
                  { name: "About Us", path: "/about" },
                  { name: "Contact", path: "/contact" },
                ].map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      className="flex items-center gap-2 text-gray-500 hover:text-yellow-400 text-sm transition-colors duration-200 group"
                    >
                      <svg
                        className="w-3 h-3 text-yellow-500/0 group-hover:text-yellow-400 transition-all duration-200 group-hover:translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2">
                <span className="w-4 h-px bg-yellow-400 inline-block" />
                Contact Us
              </h4>
              <ul className="space-y-4">
                {[
                  {
                    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
                    text: "+91 93162 74668"
                  },
                  {
                    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                    text: " hareshgirimeghnathi7479@gmail.com"
                  },
                  {
                    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
                    text: "Near by dax resort ,sasan"
                  },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-yellow-400/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                      </svg>
                    </div>
                    <span className="text-gray-400 text-sm leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.06] mb-6" />

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
            <p className="text-gray-600 text-xs">
              © {new Date().getFullYear()} <span className="text-gray-400 font-semibold">Apexa Travels</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-gray-600 text-xs">
              <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Gir Tour Specialist — Gujarat's #1 Wildlife Travel Partner
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}