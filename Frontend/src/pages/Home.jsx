import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const cars = [
    { name: "Innova", img: "/Innova.webp", seats: "7 Seater", tag: "Most Popular" },
    { name: "Ertiga", img: "/Ertiga.webp", seats: "7 Seater", tag: "Comfortable" },
    { name: "Swift Dzire", img: "/Dezire.webp", seats: "4 Seater", tag: "Economical" },
    { name: "Etios", img: "/etios.jpeg", seats: "4 Seater", tag: "Economical" },
    { name: "Tempo Traveller", img: "/Urbania.webp", seats: "12 Seater", tag: "Group Travel" },
  ];

  const places = [
    { name: "Gir Safari", img: "/Girforestnatinalpark.webp", desc: "Explore the wild with expert guides" },
    { name: "Somnath Temple", img: "/somnathmandir.webp", desc: "Sacred pilgrimage at the sea coast" },
    { name: "Diu Beach", img: "/DiuFort.webp", desc: "Sun, sand & serenity await you" },
    { name: "Junagadh Girnar", img: "/girnar.webp", desc: "Trek the holy Girnar hills" },
  ];

  const testimonials = [
    { name: "Rajesh Patel", city: "Ahmedabad", text: "Excellent service! The Innova was spotless and the driver was very professional. Perfect for our Gir Safari trip.", rating: 5, initial: "R" },
    { name: "Meena Shah", city: "Surat", text: "Very reliable and punctual. We booked for Somnath and Diu trip. Highly recommend Sasan Gir Travel Cars!", rating: 5, initial: "M" },
    { name: "Vikram Joshi", city: "Rajkot", text: "Best taxi service in Gir region. Clean car, AC was perfect, driver knew all the routes very well.", rating: 5, initial: "V" },
    { name: "Priya Desai", city: "Mumbai", text: "Booked Tempo Traveller for family of 10. Outstanding experience throughout the entire Saurashtra tour!", rating: 5, initial: "P" },
    { name: "Amit Kumar", city: "Baroda", text: "Professional, affordable and comfortable. The driver was very helpful and guided us at every stop.", rating: 5, initial: "A" },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const message = encodeURIComponent(
  "Hello, I want to book a ride with Apexa Travels."
);
  const navigate = useNavigate()

  const handleclick = () => {
    navigate("/cars")
  }

  const handleclick2 = () => {
    navigate("tours")
  }

  const handleclick3 = () => {
    navigate("contact")
  }
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (idx) => {
    setCurrentTestimonial(idx);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 3500);
  };

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
      <section className="min-h-screen bg-[#0f0f1a] flex items-center justify-center text-center px-6 pt-24 pb-16 relative overflow-hidden">
        {/* Glows */}
        <div className="absolute top-[15%] left-[10%] w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[8%] w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.04)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-2xl w-full">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-block bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.4)] text-[#C9A84C] text-xs font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-5">
              🦁 Sasan Gir, Gujarat
            </span>
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-[clamp(40px,8vw,80px)] font-bold text-white leading-[1.1] mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Travel Sasan Gir<br />
            <span className="text-[#C9A84C] italic">in Style & Comfort</span>
          </motion.h1>

          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-white/60 text-[clamp(15px,2vw,18px)] mb-3">
            Innova • Ertiga • Swift Dzire • Tempo Traveller
          </motion.p>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="text-white/40 text-sm mb-11">
            Best cab service for Gir Safari, Somnath, Diu & Junagadh tours.
          </motion.p>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}
            className="flex gap-3 justify-center flex-wrap">
            <button onClick={handleclick} className="bg-[#C9A84C] hover:bg-[#F0D080] text-[#0f0f1a] font-bold px-8 py-3.5 rounded-full text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(201,168,76,0.35)] inline-flex items-center gap-2">
              📱 Book Now
            </button>
            <button onClick={handleclick2} className="bg-transparent border-2 border-white/30 hover:border-[#C9A84C] hover:text-[#C9A84C] text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-all duration-300 inline-flex items-center gap-2">
              🗺️ View Tours
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={5}
            className="flex gap-10 justify-center mt-16 flex-wrap">
            {[["500+", "Happy Trips"], ["10+", "Years Experience"], ["24/7", "Available"]].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-[clamp(28px,4vw,36px)] font-extrabold text-[#C9A84C] leading-none">{num}</div>
                <div className="text-white/50 text-xs mt-1 tracking-wide">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="inline-block bg-[#fff8e6] border border-[rgba(201,168,76,0.3)] text-[#C9A84C] text-xs font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-4">
              About Us
            </span>
            <h2 className="text-[clamp(32px,5vw,52px)] font-bold leading-[1.15] text-[#1a1a2e] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
              Trusted Taxi Service<br />in Sasan Gir
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-4">
              We provide comfortable and affordable car rental for Gir Safari, Somnath Temple, Diu beach and Junagadh tours. Our professional drivers and clean vehicles are available 24/7.
            </p>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Pickup & drop available from Rajkot, Ahmedabad, Veraval and Gir — we make every journey smooth and memorable.
            </p>
            <button onClick={handleclick3} className="bg-[#0f0f1a] hover:opacity-90 text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all duration-300 inline-flex items-center gap-2">
              Get in Touch →
            </button>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {[
              ["🦁", "Safari Expert", "Licensed guides for Gir forest safari"],
              ["🚗", "Clean Vehicles", "Sanitized, AC cars every trip"],
              ["⏰", "Always On Time", "Punctual pickups guaranteed"],
              ["💰", "Best Rates", "Transparent, no hidden charges"],
            ].map(([icon, title, desc], i) => (
              <motion.div key={title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="bg-[#f8f8fc] rounded-2xl p-6 border border-[#e8e8f0]">
                <div className="w-12 h-12 bg-[#fff8e6] border border-[rgba(201,168,76,0.2)] rounded-xl flex items-center justify-center text-xl mb-4">
                  {icon}
                </div>
                <div className="font-bold text-sm mb-1.5">{title}</div>
                <div className="text-gray-500 text-xs leading-relaxed">{desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CARS ── */}
      <section className="py-24 px-6 bg-[#f8f8fc]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14">
            <span className="inline-block bg-[#fff8e6] border border-[rgba(201,168,76,0.3)] text-[#C9A84C] text-xs font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-3">
              Fleet
            </span>
            <h2 className="text-[clamp(32px,5vw,52px)] font-bold leading-[1.15]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Our Premium Cars
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car, i) => (
              <motion.div key={car.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="group bg-white rounded-2xl border border-[#e8e8f0] overflow-hidden relative hover:-translate-y-2 hover:shadow-[0_24px_64px_rgba(15,15,26,0.12)] hover:border-[#C9A84C] transition-all duration-400">
                <div className="absolute top-4 right-4 bg-[#C9A84C] text-[#0f0f1a] text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide z-10">
                  {car.tag}
                </div>
                <div className="h-50 w-full bg-gradient-to-br from-[#f0f0f8] to-[#e8e8f4] flex items-center justify-center overflow-hidden">
                  <img
                    src={car.img}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentNode.innerHTML = `<div class="text-5xl">🚗</div>`;
                    }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-1">{car.name}</h3>
                  <p className="text-gray-500 text-xs mb-4">👥 {car.seats}</p>
                  <button onClick={handleclick} className="w-full bg-[#C9A84C] hover:bg-[#F0D080] text-[#0f0f1a] font-bold py-2.5 rounded-full text-sm transition-all duration-300">
                    Book This Car
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOURS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-14">
            <span className="inline-block bg-[#fff8e6] border border-[rgba(201,168,76,0.3)] text-[#C9A84C] text-xs font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-3">
              Destinations
            </span>
            <h2 className="text-[clamp(32px,5vw,52px)] font-bold leading-[1.15]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Popular Tour Packages
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {places.map((p, i) => (
              <motion.div key={p.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="group relative rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-400"
                style={{ aspectRatio: "4/5" }}>
                <img
                  src={p.img} alt={p.name}
                  className="w-full h-full object-center group-hover:scale-[1.08] transition-transform duration-600"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,15,26,0.85)] via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="text-[#C9A84C] text-[10px] font-bold tracking-[2px] uppercase mb-1.5">Tour Package</div>
                  <h3 className="text-lg font-bold mb-1.5">{p.name}</h3>
                  <p className="text-white/70 text-xs mb-4">{p.desc}</p>
                  <button onClick={handleclick2} className="bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-[#C9A84C] hover:text-[#0f0f1a] hover:border-[#C9A84C] px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 w-fit">
                    View Package →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#0f0f1a] to-[#1a1a3e]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="inline-block bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.4)] text-[#C9A84C] text-xs font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-4">
              Reviews
            </span>
            <h2 className="text-[clamp(32px,5vw,52px)] font-bold text-white leading-[1.15] mb-14" style={{ fontFamily: "'Playfair Display', serif" }}>
              What Our Customers Say
            </h2>
          </motion.div>

          <div className="relative min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div key={currentTestimonial}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                <div className="bg-white rounded-3xl p-10 border border-[#e8e8f0] shadow-[0_4px_24px_rgba(0,0,0,0.06)] max-w-xl mx-auto text-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#F0D080] flex items-center justify-center text-xl font-bold text-[#0f0f1a] mx-auto mb-4">
                    {testimonials[currentTestimonial].initial}
                  </div>
                  <div className="mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <span key={i} className="text-[#C9A84C] text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-[clamp(15px,2vw,17px)] text-[#1a1a2e] leading-relaxed mb-6 italic">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  <div className="font-bold text-base">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-500 text-xs mt-1">📍 {testimonials[currentTestimonial].city}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex gap-2 justify-center mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${i === currentTestimonial
                  ? "w-6 bg-[#C9A84C]"
                  : "w-2 bg-[#e8e8f0]"
                  }`}
              />
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
          <p className="text-gray-500 mb-9 text-base">Available 24/7 · Pickup from anywhere in Gujarat</p>
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