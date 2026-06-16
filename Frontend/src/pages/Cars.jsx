import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IndianRupee, Car, ArrowRight } from "lucide-react";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cars");

      if (Array.isArray(res.data)) {
        setCars(res.data);
      } else if (res.data.cars) {
        setCars(res.data.cars);
      } else {
        setCars([]);
      }
    } catch (err) {
      console.log(err);
      setCars([]);
    }
  };

return (
  <div className="min-h-screen bg-[#f0f4ff] px-6 py-14 relative overflow-hidden">

    {/* Background glow blobs */}
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />

    <div className="max-w-8xl mx-auto relative z-10">

      {/* Heading Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-500/40 text-yellow-600 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          Premium Fleet
        </span>

        <h1 className="text-5xl md:text-6xl font-black text-[#0a0f2e] leading-tight tracking-tight">
          Drive in{" "}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
              Style
            </span>
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
              <path d="M0 6 Q100 0 200 6" stroke="url(#u)" strokeWidth="2.5" strokeLinecap="round"/>
              <defs>
                <linearGradient id="u" x1="0" x2="200" y1="0" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#eab308"/>
                  <stop offset="1" stopColor="#f97316"/>
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>
        <p className="mt-4 text-gray-500 text-base max-w-md mx-auto">
          Choose from our curated selection of luxury vehicles — comfort meets performance.
        </p>
      </motion.div>

      {/* Cards Grid */}
     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
  {Array.isArray(cars) &&
    cars.map((car, index) => (
      <motion.div
        key={car._id}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.12, duration: 0.5 }}
        whileHover={{ y: -6 }}
        className="group relative rounded-2xl overflow-hidden 
                   bg-[#0f1630]
                   shadow-[0_8px_30px_rgba(0,0,0,0.5)]
                   hover:shadow-[0_16px_50px_rgba(0,0,0,0.7)]
                   transition-all duration-500 w-[85%] mx-auto"
      >
     

        {/* Image - zoom only on image hover */}
        <div className="overflow-hidden h-44">
          <div className="absolute inset-0  z-10 h-44" />
          <img
            src={`http://localhost:5000${car.image}`}
            alt={car.name}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Content */}
        <div className="p-5 text-white">

          {/* Car name */}
          <h2 className="text-lg font-bold tracking-wide text-white group-hover:text-yellow-300 transition-colors duration-300">
            {car.name}
          </h2>

          {/* Specs row */}
          <div className="mt-2.5 flex items-center gap-4 text-gray-400 text-xs">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20H7m10 0a2 2 0 002-2v-1a4 4 0 00-4-4H9a4 4 0 00-4 4v1a2 2 0 002 2m10 0H7M12 4a4 4 0 110 8 4 4 0 010-8z"/>
              </svg>
              {car.seats} Seats
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.22 4.22l.7.7m13.86 13.86.7.7M3 12h1m16 0h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7M12 6a6 6 0 100 12A6 6 0 0012 6z"/>
              </svg>
              AC
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              GPS
            </span>
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-white/[0.07]" />

          {/* Price + Button row */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="flex items-end gap-0.5">
                <span className="text-[10px] text-gray-400 mb-0.5">₹</span>
                <span className="text-2xl font-black text-yellow-400 leading-none">
                  {car.price}
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-gray-500 text-[9px] uppercase tracking-wider">
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
                per km
              </div>
            </div>

            <button
              onClick={() => navigate(`/enquiry/${car._id}`, { state: car })}
              className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 
                         text-black text-xs font-bold px-4 py-2.5 rounded-xl 
                         shadow-[0_0_15px_rgba(250,204,21,0.25)]
                         hover:shadow-[0_0_25px_rgba(250,204,21,0.45)]
                         transition-all duration-300 group/btn"
            >
              Book Now
              <svg
                className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-200"
                fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    ))}
</div>
    </div>
  </div>
);
}