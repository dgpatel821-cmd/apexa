import { useNavigate, useLocation } from "react-router-dom";

export default function SidebarContent({ onClose, mobile }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Add Car", path: "/dashboard/add-car" },
    { label: "Booking Enquiry", path: "/dashboard/bookingenquiries" },
    { label: "Contact Enquiry", path: "/dashboard/contactenquiries" },
  ];

  return (
    <div className="flex flex-col h-full w-64 bg-[#0f1630]">
      
      
   {/* HEADER */}

<div className="flex items-center justify-between h-16 px-4 border-b border-white/10">

  {/* LOGO - LEFT */}
  <img
    src="/logo4.png"
    alt="Logo"
    className="h-12 mt-1 object-contain md:h-14 lg:h-15"
  />

  {/* CLOSE BUTTON - RIGHT (ONLY MOBILE) */}
  {mobile && (
    <button
      onClick={onClose}
      className="w-9 h-9 flex items-center justify-center
                 rounded-lg bg-white/10 hover:bg-white/20
                 text-white transition"
    >
      ✕
    </button>
  )}

</div>

      {/* MENU LABEL */}
      <div className="px-6 pt-6 pb-2">
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          Main Menu
        </span>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-3 pb-4 flex flex-col gap-1">
        {menuItems.map((item) => {
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                if (mobile && onClose) onClose(); // close only on mobile
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-200 relative ${
                active
                  ? "bg-[rgba(201,168,76,0.15)] text-[#C9A84C] border border-[rgba(201,168,76,0.25)]"
                  : "text-white/50 hover:bg-white/5"
              }`}
            >
              <span className="flex-1">{item.label}</span>

              {active && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-[#C9A84C]" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}