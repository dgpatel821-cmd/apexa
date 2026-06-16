import { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("/contact");
      setContacts(res.data);
    } finally {
      setLoading(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <div className="min-h-screen px-2 py-1 relative overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#C9A84C]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          
          <div className="flex items-center justify-between gap-4">
  
  <h1 className="text-3xl max-sm:text-[16px] sm:text-4xl font-black text-white flex items-center gap-3">
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)]">
      <svg
        className="w-5 h-5 text-[#C9A84C]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    </span>

    Contact Enquiries
  </h1>

  <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] px-4 py-2 rounded-xl shrink-0">
    <svg
      className="w-4 h-4 text-[#C9A84C]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>

    <span className="text-white font-bold text-sm">{contacts.length}</span>
    <span className="text-gray-500 text-xs">Total</span>
  </div>

</div>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-4">
              <svg className="w-8 h-8 text-[#C9A84C] animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              <p className="text-gray-500 text-sm">Loading enquiries...</p>
            </div>
          </div>
        )}

        {/* Empty */}
        {!loading && contacts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-[rgba(201,168,76,0.1)] rounded-2xl flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#C9A84C]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <p className="text-white font-semibold text-lg">No enquiries yet</p>
            <p className="text-gray-500 text-sm mt-1">Contact form submissions will appear here.</p>
          </motion.div>
        )}

        {/* Cards */}
        <div className="space-y-4">
          {contacts.map((c, index) => (
            <motion.div
              key={c._id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="bg-[#0f1630] rounded-2xl border border-white/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:border-[#C9A84C]/20 transition-all duration-300 overflow-hidden"
            >
              {/* Card Top Bar */}
              <div className="bg-[rgba(201,168,76,0.05)] border-b border-white/[0.06] px-6 py-3 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center shrink-0">
                    <span className="text-[#C9A84C] font-black text-sm">
                      {c.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm leading-tight">{c.name}</p>
                    <p className="text-gray-500 text-[10px]">Customer</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold text-gray-500 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-full uppercase tracking-widest">
                    #{String(index + 1).padStart(3, "0")}
                  </span>
                  <span className="text-[10px] text-gray-500 bg-white/[0.04] border border-white/[0.06] px-3 py-1 rounded-full">
                    {new Date(c.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

                {/* Phone */}
                <div className="flex items-center gap-3 bg-white/[0.03] rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-0.5">Phone</p>
                    <p className="text-white text-sm font-semibold truncate">{c.phone}</p>
                  </div>
                </div>

                {/* From */}
                <div className="flex items-center gap-3 bg-white/[0.03] rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-0.5">From</p>
                    <p className="text-white text-sm font-semibold truncate">{c.from}</p>
                  </div>
                </div>

                {/* Tour */}
                <div className="flex items-center gap-3 bg-[rgba(201,168,76,0.06)] rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(201,168,76,0.1)] flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-[#C9A84C]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-0.5">Tour</p>
                    <p className="text-[#C9A84C] text-sm font-bold truncate">{c.tour}</p>
                  </div>
                </div>

                {/* Message */}
                <div className="flex items-start gap-3 bg-white/[0.03] rounded-xl px-4 py-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-0.5">Message</p>
                    <p className="text-white text-sm leading-relaxed line-clamp-2">{c.message || "—"}</p>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}