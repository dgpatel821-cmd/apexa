import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const navigate=useNavigate()

  const handleclick=()=>{
    navigate("/tours")
  }
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const message = encodeURIComponent(
  "Hello, I want to book a ride with Apexa Travels."
);
  const team = [
    { name: "Ramesh Bhai", role: "Founder & Lead Driver", exp: "15+ Years", icon: "👨‍✈️", desc: "Born and raised in Sasan Gir, Ramesh knows every trail and route across Saurashtra." },
    { name: "Suresh Patel", role: "Senior Driver", exp: "10+ Years", icon: "🧑‍✈️", desc: "Expert at Somnath, Diu & Junagadh routes. Known for his calm driving and punctuality." },
    { name: "Kiran Shah", role: "Safari Specialist", exp: "8+ Years", icon: "🦁", desc: "Licensed Gir forest guide. Takes guests through the best wildlife routes safely." },
    { name: "Mahesh Joshi", role: "Customer Relations", exp: "5+ Years", icon: "🤝", desc: "Handles all bookings and ensures every customer has a smooth, stress-free experience." },
  ];

  const milestones = [
    { year: "2013", title: "Founded", desc: "Started with a single Innova, serving Gir Safari guests." },
    { year: "2016", title: "Fleet Expanded", desc: "Added Ertiga and Swift Dzire to serve more travelers." },
    { year: "2019", title: "500+ Trips", desc: "Crossed 500 happy trips milestone across Gujarat." },
    { year: "2022", title: "Tempo Traveller", desc: "Added group travel with 12-seater Tempo Traveller." },
    { year: "2024", title: "Present Day", desc: "Trusted by thousands of families across India." },
  ];

  const values = [
    { icon: "🛡️", title: "Safety First", desc: "Every vehicle undergoes regular maintenance checks. Your safety is our top priority on every journey." },
    { icon: "💎", title: "Premium Comfort", desc: "AC vehicles, clean interiors, and attentive service for a first-class travel experience." },
    { icon: "🤝", title: "Honesty & Trust", desc: "Transparent pricing with no hidden charges. What we quote is what you pay — always." },
    { icon: "🌿", title: "Local Expertise", desc: "Deep knowledge of Gir, Somnath, Diu & Junagadh. We don't just drive — we guide." },
    { icon: "⚡", title: "Always Available", desc: "24/7 service, 365 days a year. Early morning safaris or late-night pickups — we're there." },
    { icon: "❤️", title: "Customer Love", desc: "Over 500+ happy families. Our reputation is built on genuine care for every passenger." },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <div className="font-sans bg-white text-[#1a1a2e] overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="min-h-[60vh] bg-gradient-to-br from-[#0f0f1a] via-[#1a1a3e] to-[#0f1a2e] flex items-center justify-center text-center px-6 pt-28 pb-20 relative overflow-hidden">
        <div className="absolute top-[10%] left-[8%] w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-[5%] right-[8%] w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-2xl w-full">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-block bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.4)] text-[#C9A84C] text-xs font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-5">
              🦁 Our Story
            </span>
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-[clamp(38px,7vw,72px)] font-bold text-white leading-[1.1] mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            About Sasan Gir<br />
            <span className="text-[#C9A84C] italic">Travel Cars</span>
          </motion.h1>

          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-white/60 text-[clamp(15px,2vw,18px)] leading-relaxed mb-10">
            Over a decade of trusted cab service from the heart of Sasan Gir — connecting travelers to Gujarat's most sacred and scenic destinations.
          </motion.p>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="flex gap-3 justify-center flex-wrap">
               <a
              href="tel:+919316274668"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 no-underline"
              style={{ background: "#C9A84C", color: "#0f0f1a" }}
            >
              📞 Call Now
            </a>
            <button onClick={handleclick} className="bg-transparent border-2 border-white/30 hover:border-[#C9A84C] hover:text-[#C9A84C] text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-all duration-300 inline-flex items-center gap-2">
              🗺️ View Tours
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section className="bg-[#f8f8fc] border-b border-[#e8e8f0]">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              ["500+", "Happy Trips", "🚗"],
              ["10+", "Years Experience", "📅"],
              ["4", "Vehicle Types", "🚘"],
              ["24/7", "Availability", "⏰"],
              ["5★", "Average Rating", "⭐"],
            ].map(([num, label, icon], i) => (
              <motion.div key={label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.2)] rounded-2xl p-6 text-center">
                <div className="text-2xl mb-2">{icon}</div>
                <div className="text-[clamp(28px,4vw,36px)] font-extrabold text-[#C9A84C] leading-none">{num}</div>
                <div className="text-gray-500 text-xs mt-1.5">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="inline-block bg-[#fff8e6] border border-[rgba(201,168,76,0.3)] text-[#C9A84C] text-xs font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-4">
              Our Story
            </span>
            <h2 className="text-[clamp(32px,5vw,52px)] font-bold leading-[1.15] text-[#1a1a2e] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              Born in the Heart<br />of Sasan Gir
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-4">
              Founded in 2013, Sasan Gir Travel Cars was started by Ramesh Bhai — a local resident who saw the need for reliable, comfortable transportation for the tourists visiting Gir National Park and surrounding holy sites.
            </p>
            <p className="text-gray-500 text-base leading-relaxed mb-4">
              What began as a single Innova has grown into a trusted fleet of four vehicle types serving hundreds of families every year across Gujarat.
            </p>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              We specialize in Gir Safari, Somnath Temple, Diu Beach, and Junagadh Girnar tours — with pickup available from Rajkot, Ahmedabad, Veraval, and Gir.
            </p>
           
          </motion.div>

          {/* Timeline */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <div className="flex flex-col">
              {milestones.map((m, i) => (
                <motion.div key={m.year} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className={`relative flex gap-6 items-start ${i < milestones.length - 1 ? "pb-8" : ""}`}>
                  {/* Vertical line */}
                  {i < milestones.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-[#C9A84C] to-transparent" />
                  )}
                  {/* Dot */}
                  <div className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#F0D080] flex items-center justify-center text-xs font-extrabold text-[#0f0f1a] mt-1 z-10">
                    {m.year.slice(2)}
                  </div>
                  <div className="pt-2">
                    <div className="font-bold text-base text-[#1a1a2e] mb-1">{m.title}</div>
                    <div className="text-gray-500 text-sm leading-relaxed">{m.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24 px-6 bg-[#f8f8fc]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14">
            <span className="inline-block bg-[#fff8e6] border border-[rgba(201,168,76,0.3)] text-[#C9A84C] text-xs font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-3">
              Our Values
            </span>
            <h2 className="text-[clamp(32px,5vw,52px)] font-bold leading-[1.15]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why Choose Us?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="bg-[#f8f8fc] rounded-2xl p-7 border border-[#e8e8f0] hover:border-[#C9A84C] hover:shadow-[0_8px_32px_rgba(201,168,76,0.1)] transition-all duration-300">
                <div className="w-12 h-12 bg-[#fff8e6] border border-[rgba(201,168,76,0.2)] rounded-xl flex items-center justify-center text-xl mb-4">
                  {v.icon}
                </div>
                <div className="font-bold text-base mb-2">{v.title}</div>
                <div className="text-gray-500 text-sm leading-relaxed">{v.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14">
            <span className="inline-block bg-[#fff8e6] border border-[rgba(201,168,76,0.3)] text-[#C9A84C] text-xs font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-3">
              Our Team
            </span>
            <h2 className="text-[clamp(32px,5vw,52px)] font-bold leading-[1.15]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Meet the People<br />Behind Every Journey
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div key={member.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="bg-white rounded-2xl border border-[#e8e8f0] p-8 text-center hover:-translate-y-2 hover:shadow-[0_24px_64px_rgba(15,15,26,0.12)] hover:border-[#C9A84C] transition-all duration-400">
                <div className="w-16 h-16 rounded-full bg-[#fff8e6] border-2 border-[rgba(201,168,76,0.3)] flex items-center justify-center text-3xl mx-auto mb-4">
                  {member.icon}
                </div>
                <span className="inline-block bg-[#fff8e6] border border-[rgba(201,168,76,0.3)] text-[#C9A84C] text-[10px] font-bold px-3 py-1 rounded-full mb-3">
                  {member.exp}
                </span>
                <h3 className="text-base font-bold mb-1">{member.name}</h3>
                <p className="text-[#C9A84C] text-xs font-semibold mb-3">{member.role}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREA ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#0f0f1a] to-[#1a1a3e]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14">
            <span className="inline-block bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.4)] text-[#C9A84C] text-xs font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-3">
              Coverage
            </span>
            <h2 className="text-[clamp(32px,5vw,52px)] font-bold text-white leading-[1.15]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Where We Operate
            </h2>
            <p className="text-white/50 text-base mt-3">
              Pickup & drop available across major Gujarat cities and destinations
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[
              ["🦁", "Sasan Gir", "Home Base"],
              ["🕌", "Somnath", "Temple Tours"],
              ["🏖️", "Diu", "Beach Trips"],
              ["⛰️", "Junagadh", "Girnar Trek"],
              ["🏙️", "Rajkot", "City Pickup"],
              ["✈️", "Ahmedabad", "Airport Pickup"],
              ["⚓", "Veraval", "Port Pickup"],
              ["🌊", "Porbandar", "Coastal Tours"],
            ].map(([icon, city, type], i) => (
              <motion.div key={city} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="bg-white/5 border border-white/10 hover:border-[rgba(201,168,76,0.5)] hover:bg-[rgba(201,168,76,0.08)] rounded-2xl p-6 text-center transition-all duration-300 cursor-default">
                <div className="text-3xl mb-2.5">{icon}</div>
                <div className="text-white font-bold text-sm mb-1">{city}</div>
                <div className="text-white/40 text-xs">{type}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 bg-white text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="max-w-lg mx-auto">
          <span className="inline-block bg-[#fff8e6] border border-[rgba(201,168,76,0.3)] text-[#C9A84C] text-xs font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-4">
            Ready to Travel?
          </span>
          <h2 className="text-[clamp(32px,5vw,52px)] font-bold leading-[1.15] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Book Your Ride Today
          </h2>
          <p className="text-gray-500 text-base mb-9">Available 24/7 · Pickup from anywhere in Gujarat</p>
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