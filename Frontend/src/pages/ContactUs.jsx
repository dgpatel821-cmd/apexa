import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};



const tours = [
  "Devaliya Safari",
  "Sasan Gir Safari",
  "Somnath Temple",
  "Junagadh Girnar Ropway",
  "Diu Sightseeing",
  "Jamjir Waterfall",
  "Kankai Mandir",
  "Porbandar",
  "Dwarka",
  "Custom Tour",
];

function SectionLabel({ children, dark = false }) {
  return (
    <span
      className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border"
      style={{
        background: dark ? "rgba(201,168,76,0.15)" : "linear-gradient(135deg,#fff8e6,#fef3c7)",
        color: "#C9A84C",
        borderColor: dark ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.3)",
      }}
    >
      {children}
    </span>
  );
}

function FAQItem({ faq, i }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      custom={i}
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: open ? "linear-gradient(135deg,#fff8e6,#fffbf0)" : "#f8f8fc",
        border: `1.5px solid ${open ? "#C9A84C" : "#e8e8f0"}`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 flex justify-between items-center bg-transparent border-none cursor-pointer text-left gap-4"
      >
        <span className="font-bold text-sm text-gray-900">{faq.q}</span>
        <span
          className="text-xl flex-shrink-0 transition-transform duration-300"
          style={{ color: "#C9A84C", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-6 pb-5 text-sm text-gray-500 leading-relaxed"
        >
          {faq.a}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", phone: "", from: "", tour: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
      const [showWhatsApp, setShowWhatsApp] = useState(false);
  const message = encodeURIComponent(
  "Hello, I want to book a ride with Apexa Travels."
);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const nameRegex = /^[A-Za-z\s]{3,}$/;
  const phoneRegex = /^[6-9]\d{9}$/;   // Indian mobile numbers
  const cityRegex = /^[A-Za-z\s]{2,}$/;
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔎 Regex Validation
    if (!nameRegex.test(form.name)) {
      return toast.error("Enter valid name (only letters, min 3 characters)");
    }

    if (!phoneRegex.test(form.phone)) {
      return toast.error("Enter valid 10 digit Indian mobile number");
    }

    if (form.from && !cityRegex.test(form.from)) {
      return toast.error("Enter valid city name");
    }

    if (form.message.length > 300) {
      return toast.error("Message too long (max 300 characters)");
    }

    try {
      await axios.post("/api/contact", form);

      setSubmitted(true);
      setForm({ name: "", phone: "", from: "", tour: "", message: "" });

      // toast.success("Enquiry Submitted 🚗");
    } catch (error) {
      toast.error("Something went wrong ❌");
    }
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl text-sm text-gray-900 bg-white outline-none transition-all duration-200 placeholder-gray-300";
  const inputStyle = { border: "1.5px solid #e8e8f0", fontFamily: "'Outfit',sans-serif" };

  const contactCards = [
    { href: "https://wa.me/919316274668", iconBg: "#dcfce7", icon: "💬", title: "WhatsApp", valueColor: "#16a34a", value: "93162 74668", sub: "Chat with us anytime" },
    { href: "tel:+919316274668", iconBg: "#fff8e6", icon: "📞", title: "Call Us", valueColor: "#C9A84C", value: "93162 74668", sub: "Haresh Goswami" },
    { href: "tel:+917359940299", iconBg: "#ede9fe", icon: "📱", title: "Alternate Number", valueColor: "#7c3aed", value: "73599 40299", sub: "Available 24/7" },
    { href: null, iconBg: "#fce7f3", icon: "📍", title: "Our Location", valueColor: "#be185d", value: "Sasan Gir, Gujarat", sub: "Near Gir National Park" },
  ];

  const infoBlocks = [
    { icon: "🕐", title: "Working Hours", lines: ["Mon – Sun: 24/7", "Safaris: 6:00 AM – 6:00 PM"] },
    { icon: "🚗", title: "Available Vehicles", lines: ["Innova (7 Seater)", "Ertiga (7 Seater)", "Swift Dzire (4 Seater)", "Etyos (4 Seater)", "Tempo Traveller (12–15 Seater)"] },
    { icon: "🗺️", title: "We Cover", lines: ["Sasan Gir · Devaliya", "Somnath · Junagadh · Diu", "Jamjir Waterfall · Kankai Mandir", "Rajkot · Ahmedabad · Veraval Pickup"] },
  ];

  const faqs = [
    { q: "Where do you offer pickup from?", a: "We offer pickup from Rajkot, Ahmedabad, Veraval, Junagadh and Sasan Gir itself. Contact us to confirm your pickup point." },
    { q: "Do you offer night safaris?", a: "Gir National Park does not allow night safaris. We operate early morning and afternoon safari trips with our expert guides." },
    { q: "Can I book for a large group?", a: "Yes! Our Tempo Traveller accommodates 12–15 passengers. Perfect for family trips, school tours and group pilgrimages." },
    { q: "How do I confirm my booking?", a: "Simply call or WhatsApp us on 93162 74668 or 73599 40299. We confirm bookings instantly and provide all tour details." },
    { q: "What vehicles are available?", a: "Innova (7 Seater), Ertiga (7 Seater), Swift Dzire / Etyos (4 Seater) and Tempo Traveller (12–15 Seater)." },
  ];

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden" style={{ fontFamily: "'Outfit',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;1,600&display=swap" rel="stylesheet" />

      {/* ── HERO ── */}
      <section
        className="min-h-[52vh] flex items-center justify-center text-center px-6 pt-28 pb-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#0f0f1a 0%,#1a1a3e 50%,#0f1a2e 100%)" }}
      >
        <div className="absolute top-[15%] left-[8%] w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(201,168,76,0.12) 0%,transparent 70%)" }} />
        <div className="absolute bottom-[5%] right-[8%] w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(201,168,76,0.08) 0%,transparent 70%)" }} />

        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <SectionLabel dark>📞 Get In Touch</SectionLabel>
          </motion.div>
          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-white font-bold leading-tight mb-5"
            style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(36px,7vw,68px)" }}
          >
            Contact<br />
            <span style={{ color: "#C9A84C", fontStyle: "italic" }}>Apexa Travels Gir</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2} className="text-white/55 text-lg mb-3">
            Book a safari, plan a tour or just ask us anything.
          </motion.p>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={3} className="font-bold text-base" style={{ color: "#C9A84C" }}>
            🙏 Jay Somnath
          </motion.p>
        </div>
      </section>

      {/* ── QUICK CONTACT CARDS ── */}
      <section className="py-12 px-6 border-b border-gray-100" style={{ background: "#f8f8fc" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactCards.map((card, i) => {
            const Inner = (
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="bg-white rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                style={{ border: "1px solid #e8e8f0" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#C9A84C"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(201,168,76,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e8e8f0"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div className="w-13 h-13 min-w-[52px] min-h-[52px] rounded-xl flex items-center justify-center text-2xl" style={{ background: card.iconBg }}>
                  {card.icon}
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900 mb-1">{card.title}</div>
                  <div className="text-sm font-bold" style={{ color: card.valueColor }}>{card.value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{card.sub}</div>
                </div>
              </motion.div>
            );
            return card.href ? (
              <a key={card.title} href={card.href} target={card.href.startsWith("https") ? "_blank" : undefined} rel="noreferrer" className="no-underline">
                {Inner}
              </a>
            ) : <div key={card.title}>{Inner}</div>;
          })}
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* FORM */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <SectionLabel>Book a Tour</SectionLabel>
            <h2 className="font-bold leading-tight mb-2" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,42px)", color: "#1a1a2e" }}>
              Send Us a Message
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-9">
              Fill in the details below and we'll get back to you via call or WhatsApp.
            </p>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl p-10 text-center" style={{ background: "linear-gradient(135deg,#f0fdf4,#dcfce7)", border: "1.5px solid #86efac" }}>
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="font-bold text-xl mb-2" style={{ fontFamily: "'Playfair Display',serif" }}>Message Received!</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Thank you, <strong>{form.name}</strong>! We'll contact you shortly on <strong>{form.phone}</strong>.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", from: "", tour: "", message: "" }); }}
                  className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "#C9A84C", color: "#0f0f1a", border: "none" }}
                >
                  Send Another →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2 tracking-wide">Your Name *</label>
                  <input className={inputClass} style={inputStyle} name="name" value={form.name} onChange={handleChange} placeholder="e.g. Rajesh Patel" required
                    onFocus={e => { e.target.style.borderColor = "#C9A84C"; e.target.style.boxShadow = "0 0 0 4px rgba(201,168,76,0.1)"; }}
                    onBlur={e => { e.target.style.borderColor = "#e8e8f0"; e.target.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2 tracking-wide">Phone Number *</label>
                  <input className={inputClass} style={inputStyle} name="phone" value={form.phone} onChange={handleChange} placeholder="e.g. 98765 43210" required
                    onFocus={e => { e.target.style.borderColor = "#C9A84C"; e.target.style.boxShadow = "0 0 0 4px rgba(201,168,76,0.1)"; }}
                    onBlur={e => { e.target.style.borderColor = "#e8e8f0"; e.target.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2 tracking-wide">Travelling From</label>
                  <input className={inputClass} style={inputStyle} name="from" value={form.from} onChange={handleChange} placeholder="e.g. Ahmedabad, Rajkot, Mumbai..."
                    onFocus={e => { e.target.style.borderColor = "#C9A84C"; e.target.style.boxShadow = "0 0 0 4px rgba(201,168,76,0.1)"; }}
                    onBlur={e => { e.target.style.borderColor = "#e8e8f0"; e.target.style.boxShadow = "none"; }} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2 tracking-wide">Select Tour / Destination</label>
                  <select className={inputClass} style={{ ...inputStyle, cursor: "pointer" }} name="tour" value={form.tour} onChange={handleChange}
                    onFocus={e => { e.target.style.borderColor = "#C9A84C"; e.target.style.boxShadow = "0 0 0 4px rgba(201,168,76,0.1)"; }}
                    onBlur={e => { e.target.style.borderColor = "#e8e8f0"; e.target.style.boxShadow = "none"; }}>
                    <option value="">-- Choose a destination --</option>
                    {tours.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-2 tracking-wide">Message (Optional)</label>
                  <textarea className={inputClass} style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
                    name="message" value={form.message} onChange={handleChange} rows={4}
                    placeholder="Any special requirements, travel dates, group size..."
                    onFocus={e => { e.target.style.borderColor = "#C9A84C"; e.target.style.boxShadow = "0 0 0 4px rgba(201,168,76,0.1)"; }}
                    onBlur={e => { e.target.style.borderColor = "#e8e8f0"; e.target.style.boxShadow = "none"; }} />
                </div>
                <button
                  type="submit"

                  className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-base font-bold cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "#C9A84C", color: "#0f0f1a", border: "none" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#F0D080"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(201,168,76,0.35)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#C9A84C"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  📩 Send Enquiry
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Or reach us directly · 93162 74668 · 73599 40299
                </p>
              </form>
            )}
          </motion.div>

          {/* INFO SIDE */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="flex flex-col gap-7">
            <div>
              <SectionLabel>Our Info</SectionLabel>
              <h2 className="font-bold leading-tight mb-3" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,42px)", color: "#1a1a2e" }}>
                We're Always Here
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Based in Sasan Gir, Gujarat — we serve travelers across Saurashtra. Available 24 hours a day, 7 days a week.
              </p>
            </div>

            {infoBlocks.map((block, i) => (
              <motion.div key={block.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 2}
                className="rounded-2xl p-6 flex gap-4 items-start" style={{ background: "#f8f8fc", border: "1px solid #e8e8f0" }}>
                <div className="text-2xl mt-0.5">{block.icon}</div>
                <div>
                  <div className="font-bold text-sm text-gray-900 mb-2">{block.title}</div>
                  {block.lines.map((l) => (
                    <div key={l} className="text-xs text-gray-400 leading-7">· {l}</div>
                  ))}
                </div>
              </motion.div>
            ))}


          </motion.div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="pb-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-8">
            <SectionLabel>Location</SectionLabel>
            <h2 className="font-bold leading-tight" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,42px)", color: "#1a1a2e" }}>
              Find Us in Sasan Gir
            </h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
            className="rounded-3xl overflow-hidden h-80" style={{ border: "1px solid #e8e8f0" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14883.123!2d70.5069!3d21.1244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3958414a5b5d6a5b%3A0x4bf74b7a9b0e3d3e!2sSasan%20Gir%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%" height="100%" style={{ border: 0, display: "block" }}
              allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Sasan Gir Location"
            />
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="pb-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-bold leading-tight" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,42px)", color: "#1a1a2e" }}>
              Common Questions
            </h2>
          </motion.div>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => <FAQItem key={i} faq={faq} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 text-center" style={{ background: "linear-gradient(135deg,#0f0f1a,#1a1a3e)" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-xl mx-auto">
          <SectionLabel dark>🦁 Apexa Travels Gir</SectionLabel>
          <h2 className="text-white font-bold leading-tight mb-3" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,4vw,42px)" }}>
            Ready to Explore Gujarat?
          </h2>
          <p className="font-bold text-lg mb-9" style={{ color: "#C9A84C" }}>
            📞 93162 74668 &nbsp;|&nbsp; 73599 40299
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
             <button
              onClick={() => setShowWhatsApp(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: "#25D366", color: "#fff", border: "none" }}
            >
              💬 WhatsApp Now
            </button>
            <a
              href="tel:+919316274668"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 no-underline"
              style={{ background: "#C9A84C", color: "#0f0f1a" }}
            >
              📞 Call Now
            </a>
          </div>
        </motion.div>
      </section>
            <AnimatePresence>
  {showWhatsApp && (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 40 }}
        transition={{ duration: 0.35 }}
        className="relative w-[320px] bg-white rounded-2xl shadow-2xl p-8 text-center"
      >

        {/* Close Button */}
        <button
          onClick={() => setShowWhatsApp(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold mb-6">
          Contact on WhatsApp
        </h3>

        <div className="flex flex-col gap-4">

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`https://wa.me/919316274668?text=${message}`}
            target="_blank"
            rel="noreferrer"
            className="bg-[#25D366] text-white py-3 rounded-xl font-semibold shadow-md"
          >
            📱 93162 74668
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`https://wa.me/917359940299?text=${message}`}
            target="_blank"
            rel="noreferrer"
            className="bg-[#25D366] text-white py-3 rounded-xl font-semibold shadow-md"
          >
            📱 73599 40299
          </motion.a>

        </div>

      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
}