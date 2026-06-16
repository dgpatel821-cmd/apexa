import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

// ── Validation rules ──────────────────────────────────────────────
const RULES = {
  name: {
    regex: /^[A-Za-z\s]{3,50}$/,
    required: "Full name is required.",
    invalid: "Name must be 3–50 letters only (no numbers or symbols).",
  },
  phone: {
    regex: /^[6-9]\d{9}$/,           // Indian 10-digit mobile
    required: "Phone number is required.",
    invalid: "Enter a valid 10-digit Indian mobile number (starts with 6–9).",
  },
  message: {
    regex: /^.{0,500}$/,             // optional, max 500 chars
    required: null,                  // not required
    invalid: "Message must be under 500 characters.",
  },
};

function validate(form) {
  const errors = {};
  for (const field of ["name", "phone", "message"]) {
    const value = form[field].trim();
    const rule = RULES[field];

    if (!value && rule.required) {
      errors[field] = rule.required;
    } else if (value && !rule.regex.test(value)) {
      errors[field] = rule.invalid;
    }
  }
  return errors;
}

// ── Tiny error message component ─────────────────────────────────
function FieldError({ msg }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          key="err"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5 text-red-400 text-[11px] mt-1.5 ml-1"
        >
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

// ── Main component ────────────────────────────────────────────────
export default function Enquiry() {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state;

  const [form, setForm]     = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  // validate on blur
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldErrors = validate({ ...form });
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
  };

  // live-validate if field was already touched
  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) {
      const fieldErrors = validate(updated);
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    // mark all touched so errors show
    setTouched({ name: true, phone: true, message: true });

    const allErrors = validate(form);
    setErrors(allErrors);

    if (Object.keys(allErrors).length > 0) return; // stop here

    setLoading(true);
    try {
      await axios.post("/api/booking", {
        ...form,
        carId:   car._id,
        carName: car.name,
        price:   car.price,
      });
      toast.success("Enquiry sent successfully 🚗");
      navigate("/");
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // helper: ring colour based on field state
  const ringClass = (field) => {
    if (!touched[field]) return "";
    return errors[field]
      ? "shadow-[0_0_0_2px_rgba(248,113,113,0.5)]"   // red ring
      : "shadow-[0_0_0_2px_rgba(74,222,128,0.35)]";  // green ring
  };

  return (
    <div className="min-h-screen bg-[#080c1a] flex items-center justify-center px-4 py-16 relative overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 text-sm mb-8 transition-colors duration-200 group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Cars
        </button>

        {/* Card */}
        <div className="bg-[#0f1630] rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden">

          {/* Car info header */}
          <div className="relative px-7 pt-7 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-1">Booking Request</p>
                <h2 className="text-2xl font-black text-white">{car?.name}</h2>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-[10px] uppercase tracking-wider">Rate</p>
                <p className="text-yellow-400 text-2xl font-black">₹{car?.price}</p>
                <p className="text-gray-500 text-[9px] uppercase tracking-widest">/km</p>
              </div>
            </div>

            {car?.image && (
              <div className="mt-5 rounded-2xl overflow-hidden h-36">
                <img
                  src={`https://apexaadmin.online${car.image}`}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex items-center gap-2 mt-4 flex-wrap">
              {[
                { icon: "M17 20H7m10 0a2 2 0 002-2v-1a4 4 0 00-4-4H9a4 4 0 00-4 4v1a2 2 0 002 2m10 0H7M12 4a4 4 0 110 8 4 4 0 010-8z", label: `${car?.seats || 4} Seats` },
                { icon: "M12 3v1m0 16v1M4.22 4.22l.7.7m13.86 13.86.7.7M3 12h1m16 0h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7M12 6a6 6 0 100 12A6 6 0 0012 6z", label: "AC" },
                { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z", label: "GPS" },
              ].map((spec) => (
                <span key={spec.label} className="flex items-center gap-1.5 bg-white/[0.05] text-gray-300 text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full">
                  <svg className="w-3 h-3 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={spec.icon}/>
                  </svg>
                  {spec.label}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.06] mx-7" />

          {/* Form */}
          <div className="px-7 py-6 space-y-4">

            {/* ── Name ── */}
            <div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <input
                  placeholder="Your Full Name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  className={`w-full bg-white/[0.04] hover:bg-white/[0.06] focus:bg-white/[0.08]
                             text-white placeholder-gray-500 text-sm
                             pl-11 pr-4 py-3.5 rounded-xl outline-none
                             transition-all duration-200 ${ringClass("name")}`}
                />
              </div>
              <FieldError msg={errors.name} />
            </div>

            {/* ── Phone ── */}
            <div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-400 transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <input
                  placeholder="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  className={`w-full bg-white/[0.04] hover:bg-white/[0.06] focus:bg-white/[0.08]
                             text-white placeholder-gray-500 text-sm
                             pl-11 pr-4 py-3.5 rounded-xl outline-none
                             transition-all duration-200 ${ringClass("phone")}`}
                />
              </div>
              <FieldError msg={errors.phone} />
            </div>

            {/* ── Message ── */}
            <div>
              <div className="relative group">
                <div className="absolute left-4 top-4 text-gray-500 group-focus-within:text-yellow-400 transition-colors duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                  </svg>
                </div>
                <textarea
                  placeholder="Any special requests or message..."
                  rows={3}
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  className={`w-full bg-white/[0.04] hover:bg-white/[0.06] focus:bg-white/[0.08]
                             text-white placeholder-gray-500 text-sm
                             pl-11 pr-4 py-3.5 rounded-xl outline-none resize-none
                             transition-all duration-200 ${ringClass("message")}`}
                />
                {/* character count */}
                <p className={`text-right text-[10px] mt-1 mr-1 transition-colors ${form.message.length > 450 ? "text-red-400" : "text-gray-600"}`}>
                  {form.message.length}/500
                </p>
              </div>
              <FieldError msg={errors.message} />
            </div>

            {/* ── Submit ── */}
            <motion.button
              type="button"
              onClick={handleSubmit}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2
                         bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60
                         text-black font-bold text-sm py-4 rounded-xl
                         shadow-[0_0_25px_rgba(250,204,21,0.3)]
                         hover:shadow-[0_0_35px_rgba(250,204,21,0.5)]
                         transition-all duration-300"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  Submit Enquiry
                </>
              )}
            </motion.button>

            <p className="text-center text-gray-600 text-[11px]">
              We'll contact you within 24 hours to confirm your booking.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}