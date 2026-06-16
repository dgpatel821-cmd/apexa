import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TourPlaces() {
  const tours = [
    {
      id: 1,
      name: "Devaliya Safari",
      image: "Girforestnatinalpark.webp",
      tag: "Most Popular",
      tagColor: "#C9A84C",
      duration: "Half Day",
      distance: "12 km from Sasan",
      price: "Contact for Price",
      desc: "Experience the Gir Interpretation Zone at Devaliya — a fenced area where you're guaranteed to spot Asiatic lions, leopards, deer and birds in their natural habitat.",
      highlights: ["Guaranteed Lion Sighting", "Open Jeep Safari", "Expert Guide Included", "Best for Families"],
      bestTime: "Oct – June",
      category: "Safari",
    },
    {
      id: 2,
      name: "Sasan Gir Safari",
      image: "junglesafari.webp",
      tag: "Wilderness",
      tagColor: "#2d6a4f",
      duration: "3–4 Hours",
      distance: "Sasan Gir Forest",
      price: "Contact for Price",
      desc: "The only home of the Asiatic Lion. Explore deep into the Gir National Park forest with a licensed guide, spotting lions, leopards, hyenas, crocodiles and 300+ bird species.",
      highlights: ["Asiatic Lions", "Leopards & Hyenas", "Forest Jeep Track", "Crocodile Sighting"],
      bestTime: "Dec – April",
      category: "Safari",
    },
    {
      id: 3,
      name: "Somnath Temple",
      image: "somnathmandir.webp",
      tag: "Pilgrimage",
      tagColor: "#b5451b",
      duration: "Half Day",
      distance: "45 km from Sasan",
      price: "Contact for Price",
      desc: "One of the 12 Jyotirlingas of Lord Shiva, Somnath stands majestically on the Arabian Sea coast. Witness the breathtaking Sound & Light show and evening aarti ceremony.",
      highlights: ["12 Jyotirlinga", "Seaside Temple", "Light & Sound Show", "Evening Aarti"],
      bestTime: "All Year",
      category: "Pilgrimage",
    },
    {
      id: 4,
      name: "Junagadh Girnar",
      image: "girnar.webp",
      tag: "Trekking",
      tagColor: "#4a6fa5",
      duration: "Full Day",
      distance: "60 km from Sasan",
      price: "Contact for Price",
      desc: "Climb the 9,999 steps of the sacred Girnar mountain or take the modern ropeway to the summit. Visit ancient Jain temples and enjoy panoramic views of Junagadh city.",
      highlights: ["Girnar Ropeway", "9999 Steps Trek", "Jain Temples", "City Panorama Views"],
      bestTime: "Oct – March",
      category: "Trekking",
    },
    {
      id: 5,
      name: "Diu Sightseeing",
      image: "DiuSightSeen.jpeg",
      tag: "Beach & Heritage",
      tagColor: "#0096c7",
      duration: "Full Day",
      distance: "90 km from Sasan",
      price: "Contact for Price",
      desc: "Explore the charming Portuguese island of Diu — golden beaches, an imposing sea fort, ancient churches and a laid-back coastal vibe unlike anywhere in Gujarat.",
      highlights: ["Diu Fort", "Nagoa Beach", "Portuguese Churches", "Sunset Views"],
      bestTime: "Nov – Feb",
      category: "Beach",
    },
    {
      id: 6,
      name: "Jamjir Waterfall",
      image: "jamjir.jpeg",
      tag: "Nature",
      tagColor: "#52b788",
      duration: "Half Day",
      distance: "35 km from Sasan",
      price: "Contact for Price",
      desc: "A hidden gem tucked inside the Gir forest region. Jamjir Waterfall is a stunning natural cascade surrounded by lush greenery — perfect for a refreshing nature escape.",
      highlights: ["Natural Waterfall", "Forest Surroundings", "Photography Spot", "Peaceful Retreat"],
      bestTime: "July – Oct (Monsoon)",
      category: "Nature",
    },
    {
      id: 7,
      name: "Kankai Mandir",
      image: "kankai.jpeg",
      tag: "Pilgrimage",
      tagColor: "#b5451b",
      duration: "2–3 Hours",
      distance: "25 km from Sasan",
      price: "Contact for Price",
      desc: "A revered temple dedicated to Maa Kankai, nestled amidst natural surroundings. This sacred site draws pilgrims from across Gujarat seeking blessings and spiritual peace.",
      highlights: ["Ancient Temple", "Scenic Location", "Spiritual Significance", "Local Culture"],
      bestTime: "All Year",
      category: "Pilgrimage",
    },
    {
      id: 8,
      name: "Porbandar",
      image: "porbandar.jpeg",
      tag: "Heritage",
      tagColor: "#6d4c41",
      duration: "Full Day",
      distance: "100 km from Sasan",
      price: "Contact for Price",
      desc: "Visit the birthplace of Mahatma Gandhi — Kirti Mandir — and explore the charming coastal city of Porbandar. Discover its rich heritage, serene beaches, and historic temples along the Arabian Sea.",
      highlights: ["Kirti Mandir", "Gandhi Birthplace", "Sudama Temple", "Porbandar Beach"],
      bestTime: "Oct – March",
      category: "Pilgrimage",
    },
    {
      id: 9,
      name: "Dwarka",
      image: "Dwarkamandir.webp",
      tag: "Pilgrimage",
      tagColor: "#b5451b",
      duration: "Full Day",
      distance: "250 km from Sasan",
      price: "Contact for Price",
      desc: "One of the Char Dham pilgrimage sites, Dwarka is the sacred city of Lord Krishna. Visit the magnificent Dwarkadhish Temple, Bet Dwarka island, and Nageshwar Jyotirlinga on this divine journey.",
      highlights: ["Dwarkadhish Temple", "Bet Dwarka", "Nageshwar Jyotirlinga", "Rukmini Temple"],
      bestTime: "Oct – March",
      category: "Pilgrimage",
    },
  ];

  const categories = ["All", "Safari", "Pilgrimage", "Trekking", "Beach", "Nature"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTour, setSelectedTour] = useState(null);
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/cars")
  }
    const [showWhatsApp, setShowWhatsApp] = useState(false);
  const message = encodeURIComponent(
  "Hello, I want to book a ride with Apexa Travels."
);

  const filtered = activeCategory === "All" ? tours : tours.filter(t => t.category === activeCategory);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <div className="font-sans bg-white text-[#1a1a2e] overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="min-h-[58vh] bg-gradient-to-br from-[#0f0f1a] via-[#1a1a3e] to-[#0f1a2e] flex items-center justify-center text-center px-6 pt-28 pb-20 relative overflow-hidden">
        <div className="absolute top-[15%] left-[8%] w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-[5%] right-[8%] w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-2xl w-full">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span className="inline-block bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.4)] text-[#C9A84C] text-xs font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-5">
              🦁 Apexa Travels Gir
            </span>
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-[clamp(38px,7vw,72px)] font-bold text-white leading-[1.1] mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Tour<br />
            <span className="text-[#C9A84C] italic">Packages & Places</span>
          </motion.h1>

          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-white/60 text-[clamp(15px,2vw,18px)] mb-3">
            Safari · Pilgrimage · Trekking · Beach · Nature
          </motion.p>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="text-white/40 text-sm mb-10">
            Haresh Goswami · 93162 74668 · 73599 40299
          </motion.p>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}
            className="flex gap-3 justify-center flex-wrap">
            <button onClick={handleClick} className="bg-[#C9A84C] hover:bg-[#F0D080] text-[#0f0f1a] font-bold px-8 py-3.5 rounded-full text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(201,168,76,0.35)] inline-flex items-center gap-2">
              📱 Book a Tour
            </button>
            
                <a
              href="tel:+919316274668"
              className="bg-transparent border-2 border-white/30 hover:border-[#C9A84C] hover:text-[#C9A84C] text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-all duration-300 inline-flex items-center gap-2"
              
            >
              📞 Call Now
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── QUICK STATS ── */}
      <section className="bg-[#f8f8fc] border-b border-[#e8e8f0]">
        <div className="max-w-5xl mx-auto px-6 py-9">
          <div className="flex gap-4 justify-center flex-wrap">
            {[
              ["9", "Tour Destinations", "🗺️"],
              ["Innova", "Ertiga · Dzire · Tempo", "🚗"],
              ["24/7", "Booking Available", "📞"],
              ["Jay Somnath", "Trusted Since Years", "🙏"],
            ].map(([num, label, icon]) => (
              <div key={label} className="flex items-center gap-3 bg-white border border-[#e8e8f0] rounded-2xl px-5 py-3.5 min-w-[200px]">
                <div className="text-2xl">{icon}</div>
                <div>
                  <div className="font-extrabold text-base text-[#1a1a2e]">{num}</div>
                  <div className="text-gray-500 text-xs">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOURS GRID ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-10">
            <span className="inline-block bg-[#fff8e6] border border-[rgba(201,168,76,0.3)] text-[#C9A84C] text-xs font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-3">
              Destinations
            </span>
            <h2 className="text-[clamp(32px,5vw,52px)] font-bold leading-[1.15] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Explore All Tour Places
            </h2>
            <p className="text-gray-500 text-base">Click on any card to view full details & book your ride</p>
          </motion.div>

          {/* Filters */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="flex gap-2.5 justify-center flex-wrap mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-250 cursor-pointer
                  ${activeCategory === cat
                    ? "bg-[#C9A84C] text-[#0f0f1a] border-[#C9A84C] font-bold"
                    : "bg-white text-gray-500 border-[#e8e8f0] hover:border-[#C9A84C] hover:text-[#1a1a2e]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence>
              {filtered.map((tour, i) => (
                <motion.div
                  key={tour.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setSelectedTour(tour)}
                  className="bg-white rounded-3xl border border-[#e8e8f0] overflow-hidden flex flex-col cursor-pointer hover:-translate-y-2.5 hover:shadow-[0_32px_80px_rgba(15,15,26,0.14)] hover:border-[#C9A84C] transition-all duration-400"
                >
                  {/* Card Header */}
                  <motion.div
                    key={tour.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => setSelectedTour(tour)}
                    className="bg-white rounded-3xl overflow-hidden border border-[#e8e8f0] cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
                  >
                    {/* IMAGE SECTION */}
                    <div className="relative w-full h-64 overflow-hidden">

                      <img
                        src={tour.image}
                        alt={tour.name}
                        className="w-full h-full object-cover"
                      />

                      {/* DARK OVERLAY FOR TEXT VISIBILITY */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* TAG */}
                      <div
                        className="absolute top-4 left-4 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-[1px] uppercase"
                        style={{ background: tour.tagColor }}
                      >
                        {tour.tag}
                      </div>

                      {/* TEXT OVER IMAGE */}
                      <div className="absolute bottom-5 left-5 text-white">
                        <h3 className="text-2xl font-bold mb-2">
                          {tour.name}
                        </h3>
                        <div className="flex gap-4 text-xs text-white/90">
                          <span>⏱ {tour.duration}</span>
                          <span>📍 {tour.distance}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Card Body */}
                  <div className="px-7 pt-6 pb-7 flex-1 flex flex-col gap-4">
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {tour.desc.slice(0, 110)}...
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {tour.highlights.slice(0, 3).map(h => (
                        <span key={h} className="inline-flex items-center gap-1 bg-[#f8f8fc] border border-[#e8e8f0] rounded-full px-3 py-1 text-xs font-semibold text-[#1a1a2e]">
                          ✓ {h}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-[#e8e8f0]">
                      <div>
                        <div className="text-[11px] text-gray-500 mb-0.5">Best Time</div>
                        <div className="text-xs font-bold text-[#C9A84C]">🗓 {tour.bestTime}</div>
                      </div>
                      <button
                        onClick={e => { e.stopPropagation(); setSelectedTour(tour); }}
                        className="bg-[#C9A84C] hover:bg-[#F0D080] text-[#0f0f1a] font-bold px-5 py-2.5 rounded-full text-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(201,168,76,0.3)]"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── FLEET ── */}
      <section className="py-20 px-6 bg-[#f8f8fc]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-12">
            <span className="inline-block bg-[#fff8e6] border border-[rgba(201,168,76,0.3)] text-[#C9A84C] text-xs font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-3">
              Our Fleet
            </span>
            <h2 className="text-[clamp(32px,5vw,52px)] font-bold leading-[1.15]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Travel in Comfort
            </h2>
            <p className="text-gray-500 text-sm mt-2">Choose the vehicle that fits your group</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { name: "Innova", seats: "7 Seater", icon: "🚙", best: "Families & Groups" },
              { name: "Ertiga", seats: "7 Seater", icon: "🚗", best: "Comfortable Travel" },
              { name: "Swift Dzire", seats: "4 Seater", icon: "🚕", best: "Budget Friendly" },
              { name: "Etios", seats: "4 Seater", icon: "🚘", best: "Budget Friendly" },
              { name: "Tempo Traveller", seats: "12–15 Seater", icon: "🚌", best: "Large Groups" },
            ].map((car, i) => (
              <motion.div key={car.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="bg-white rounded-2xl border border-[#e8e8f0] p-7 text-center hover:-translate-y-1 hover:border-[#C9A84C] hover:shadow-[0_12px_40px_rgba(201,168,76,0.12)] transition-all duration-300">
                <div className="text-4xl mb-3">{car.icon}</div>
                <div className="font-extrabold text-base mb-2">{car.name}</div>
                <div className="inline-block bg-[#fff8e6] border border-[rgba(201,168,76,0.3)] text-[#C9A84C] text-xs font-bold px-3 py-1 rounded-full mb-2">
                  👥 {car.seats}
                </div>
                <div className="text-gray-500 text-xs">{car.best}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#0f0f1a] to-[#1a1a3e] text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="max-w-lg mx-auto">
          <span className="inline-block bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.4)] text-[#C9A84C] text-xs font-bold tracking-[2px] uppercase px-4 py-1.5 rounded-full mb-4">
            📞 Book Now
          </span>
          <h2 className="text-[clamp(32px,5vw,52px)] font-bold text-white leading-[1.15] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready for Your Next Adventure?
          </h2>
          <p className="text-white/50 text-base mb-5">Haresh Goswami · Sasan Gir, Gujarat</p>
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

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selectedTour && (
          <motion.div
            className="fixed inset-0 bg-[rgba(15,15,26,0.75)] backdrop-blur-[8px] z-[1000] flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTour(null)}
          >
            <motion.div
              className="bg-white rounded-[28px] max-w-xl w-full max-h-[90vh] overflow-y-auto relative [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedTour(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#f8f8fc] border border-[#e8e8f0] flex items-center justify-center text-base cursor-pointer hover:bg-red-50 transition-colors duration-200 z-10"
              >
                ✕
              </button>

              {/* Modal Header */}
              <div className="relative w-full h-64 overflow-hidden rounded-t-[28px]">

                {/* IMAGE */}
                <img
                  src={selectedTour.image}
                  alt={selectedTour.name}
                  className="w-full h-full object-cover"
                />

                {/* DARK OVERLAY FOR TEXT VISIBILITY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

                {/* CONTENT OVER IMAGE */}
                <div className="absolute bottom-6 left-6 right-6 text-white">

                  {/* TAG */}
                  <div
                    className="inline-block text-[10px] font-bold px-3 py-1 rounded-full tracking-[1px] uppercase mb-3"
                    style={{ background: selectedTour.tagColor }}
                  >
                    {selectedTour.tag}
                  </div>

                  {/* TITLE */}
                  <h2
                    className="text-3xl font-bold mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {selectedTour.name}
                  </h2>

                  {/* DETAILS */}
                  <div className="flex gap-5 flex-wrap text-xs text-white/90">
                    <span>⏱ {selectedTour.duration}</span>
                    <span>📍 {selectedTour.distance}</span>
                    <span className="text-[#C9A84C] font-semibold">
                      🗓 Best: {selectedTour.bestTime}
                    </span>
                  </div>

                </div>
              </div>

              {/* Modal Body */}
              <div className="px-8 py-7">
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{selectedTour.desc}</p>

                <div className="mb-6">
                  <div className="font-bold text-sm mb-3">✨ Tour Highlights</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedTour.highlights.map(h => (
                      <span key={h} className="inline-flex items-center gap-1 bg-[#fff8e6] border border-[rgba(201,168,76,0.3)] text-[#1a1a2e] rounded-full px-3 py-1 text-xs font-semibold">
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#f8f8fc] rounded-2xl p-5 mb-6 border border-[#e8e8f0]">
                  {[
                    ["⏱", "Duration", selectedTour.duration, false],
                    ["📍", "Distance", selectedTour.distance, false],
                    ["🗓", "Best Time", selectedTour.bestTime, true],
                    ["🚗", "Cars Available", "Innova · Ertiga · Dzire", false],
                  ].map(([icon, label, value, isGold], idx, arr) => (
                    <div key={label} className={`flex items-center gap-2.5 py-3.5 text-sm ${idx < arr.length - 1 ? "border-b border-[#e8e8f0]" : ""}`}>
                      <span className="text-lg">{icon}</span>
                      <span className="text-gray-500">{label}:</span>
                      <span className={`font-bold ml-auto ${isGold ? "text-[#C9A84C]" : "text-[#1a1a2e]"}`}>{value}</span>
                    </div>
                  ))}
                </div>

                
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}