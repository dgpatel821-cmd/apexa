import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate()

  const handleclick = () => {
    navigate("/cars")
  }

  const scrollTimer = useRef(null);
  const openRef = useRef(false);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // sidebar animation
  useEffect(() => {
    if (open) {
      setTimeout(() => setSidebarVisible(true), 10);
      document.body.style.overflow = "hidden";
    } else {
      setSidebarVisible(false);
      document.body.style.overflow = "";
    }
  }, [open]);

  const menu = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Cars", path: "/cars" },
    { name: "Tour Places", path: "/tours" },

    { name: "Contact", path: "/contact" },
  ];

  // scroll animation
  useEffect(() => {
    const handleScroll = () => {
      if (openRef.current) return;

      setHidden(true);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);

      scrollTimer.current = setTimeout(() => {
        setHidden(false);
      }, 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer.current) clearTimeout(scrollTimer.current);
    };
  }, []);

  const handleClose = () => {
    setSidebarVisible(false);
    setTimeout(() => setOpen(false), 200);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        style={{
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.45s cubic-bezier(.22,.61,.36,1)",
        }}
        className="fixed top-0 left-0 w-full bg-white shadow-sm z-50"
      >
        <div className="w-full h-[70px] flex items-center justify-between px-4">

          {/* LEFT LOGO */}
          <div className="flex items-center md:w-[120px] lg:w-[140px]">
            <NavLink to="/">
              <img src="/logo4.png" className="h-20 mt-2" />
            </NavLink>
          </div>

          {/* CENTER MENU */}
          <ul className="hidden md:flex flex-1 justify-center gap-6 lg:gap-10 font-semibold text-[14px] lg:text-[16px] text-blue-900">
            {menu.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `relative group pb-1 whitespace-nowrap ${isActive ? "text-orange-500" : "text-blue-900"}`
                  }
                >
                  {item.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* RIGHT BUTTON */}
          <div className="hidden md:flex w-[120px] lg:w-[140px] justify-end">
            <button onClick={handleclick} className="
        bg-orange-500 hover:bg-orange-600
        text-white
        h-10 w-30
        rounded-full
        text-[15px] font-semibold
        shadow-md hover:shadow-lg
        transition-all duration-300
        hover:cursor-pointer
      ">
              Book Now
            </button>
          </div>
          {/* MOBILE HAMBURGER */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setOpen(true)}>
              <Menu size={28} />
            </button>
          </div>

        </div>
      </nav>
      {/* MOBILE MENU */}
      {open && (
        <>
          <div
            onClick={handleClose}
            className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${sidebarVisible ? "opacity-100" : "opacity-0"
              }`}
          />

          <div
            className={`fixed top-0 right-0 w-[280px] h-full bg-white z-50 p-6 shadow-2xl flex flex-col transition-all duration-500 ease-in-out ${sidebarVisible ? "translate-x-0" : "translate-x-full"
              }`}
          >
            <div className="flex justify-between items-center mb-10">
              <NavLink to="/" onClick={handleClose}>
                <img src="/logo4.png" className="h-10" alt="Logo" />
              </NavLink>
              <button onClick={handleClose}>
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              {menu.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={handleClose}
                  className={({ isActive }) =>
                    `px-3 py-3 rounded-lg font-semibold ${isActive
                      ? "bg-orange-50 text-orange-500"
                      : "text-blue-900 hover:bg-gray-50"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            <button onClick={handleclick} className="w-full bg-orange-500 text-white py-3 rounded-full mt-6">
              Book Now
            </button>
          </div>
        </>
      )}
    </>
  );
}