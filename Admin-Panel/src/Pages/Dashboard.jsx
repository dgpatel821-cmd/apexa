import { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const res = await axios.get("/dashboard");
    setData(res.data);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  if (!data) return (
    <div className="min-h-screen bg-[#080c1a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <svg className="w-8 h-8 text-[#C9A84C] animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <p className="text-gray-500 text-sm">Loading dashboard...</p>
      </div>
    </div>
  );

  const barData = {
    labels: ["Total Cars", "Bookings", "Contacts"],
    datasets: [{
      label: "Overview",
      data: [data.totalCars, data.totalBookings, data.totalContacts],
      backgroundColor: ["rgba(201,168,76,0.8)", "rgba(139,92,246,0.8)", "rgba(34,197,94,0.8)"],
      borderColor: ["#C9A84C", "#8B5CF6", "#22C55E"],
      borderWidth: 2,
      borderRadius: 8,
    }],
  };

  const doughnutData = {
    labels: ["Bookings", "Contacts"],
    datasets: [{
      data: [data.totalBookings, data.totalContacts],
      backgroundColor: ["rgba(201,168,76,0.85)", "rgba(139,92,246,0.85)"],
      borderColor: ["#C9A84C", "#8B5CF6"],
      borderWidth: 2,
    }],
  };

  const chartOptions = {
    plugins: {
      legend: { labels: { color: "#9ca3af", font: { size: 12 } } },
      tooltip: { backgroundColor: "#0f1630", titleColor: "#fff", bodyColor: "#9ca3af", borderColor: "rgba(201,168,76,0.3)", borderWidth: 1 },
    },
    scales: {
      x: { ticks: { color: "#9ca3af" }, grid: { color: "rgba(255,255,255,0.04)" } },
      y: { ticks: { color: "#9ca3af" }, grid: { color: "rgba(255,255,255,0.04)" } },
    },
  };

  const doughnutOptions = {
    plugins: {
      legend: { labels: { color: "#9ca3af", font: { size: 12 } } },
      tooltip: { backgroundColor: "#0f1630", titleColor: "#fff", bodyColor: "#9ca3af", borderColor: "rgba(201,168,76,0.3)", borderWidth: 1 },
    },
  };

  const stats = [
    { label: "Total Cars", value: data.totalCars, icon: "M8 17l4 4 4-4m0-5H4m16 0H4m16 0a9 9 0 11-18 0 9 9 0 0118 0z", color: "text-[#C9A84C]", bg: "bg-[rgba(201,168,76,0.1)]", border: "border-[rgba(201,168,76,0.2)]", glow: "bg-[rgba(201,168,76,0.06)]" },
    { label: "Total Bookings", value: data.totalBookings, icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", glow: "bg-purple-500/[0.06]" },
    { label: "Contact Enquiries", value: data.totalContacts, icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20", glow: "bg-green-500/[0.06]" },
  ];

  return (
    <div className="w-full px-4 max-sm:px-2 py-4 relative overflow-x-hidden">

      {/* Ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
         
          <h1 className="text-3xl max-sm:text-4xl font-black text-white flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)]">
              <svg className="w-5 h-5 text-[#C9A84C]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </span>
            Dashboard
          </h1>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {stats.map((s, i) => (
            <motion.div key={s.label} custom={i} initial="hidden" animate="visible" variants={fadeUp}
              className={`${s.glow} rounded-2xl border ${s.border} p-6 max-sm:p-4 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${s.bg} border ${s.border} flex items-center justify-center`}>
                  <svg className={`w-5 h-5 ${s.color}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.icon}/>
                  </svg>
                </div>
                <span className="text-[10px] font-bold text-gray-500 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-full uppercase tracking-widest">
                  Total
                </span>
              </div>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">{s.label}</p>
              <p className={`text-4xl font-black ${s.color}`}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Bookings */}
        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp} className="mb-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)]">
              <svg className="w-4 h-4 text-[#C9A84C]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </span>
            <h2 className="text-xl font-black text-white">Recent Bookings</h2>
            <span className="text-[10px] font-bold text-gray-500 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-full uppercase tracking-widest ml-auto">
              {data.recentBookings.length} Records
            </span>
          </div>

          <div className="bg-[#0f1630] rounded-2xl border border-white/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden">
            {data.recentBookings.map((b, index) => (
              <div key={b._id}
                className={`flex items-center gap-3 max-sm:gap-2 px-6 max-sm:px-3 py-4 hover:bg-white/[0.02] transition-colors duration-200 ${index < data.recentBookings.length - 1 ? "border-b border-white/[0.05]" : ""}`}>
                <div className="w-9 h-9 rounded-xl bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center shrink-0">
                  <span className="text-[#C9A84C] font-black text-sm">{b.name?.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm truncate">{b.name}</p>
                  <p className="text-gray-500 text-xs">Customer</p>
                </div>
                <div className="flex items-center gap-1 bg-white/[0.03] rounded-xl px-4 max-sm:px-2 py-2 shrink-0 max-sm:text-xs">
                  <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span className="text-white text-sm font-semibold">{b.phone}</span>
                </div>
                <span className="text-[10px] font-bold text-gray-500 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-full uppercase tracking-widest shrink-0">
                  #{String(index + 1).padStart(3, "0")}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Contacts */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-green-500/10 border border-green-500/20">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </span>
            <h2 className="text-xl font-black text-white">Recent Contact Enquiries</h2>
            <span className="text-[10px] font-bold text-gray-500 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-full uppercase tracking-widest ml-auto">
              {data.recentContacts.length} Records
            </span>
          </div>

          <div className="bg-[#0f1630] rounded-2xl border border-white/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden">
            {data.recentContacts.map((c, index) => (
              <div key={c._id}
                className={`flex items-center gap-3 max-sm:gap-2 px-6 max-sm:px-3 py-4 hover:bg-white/[0.02] transition-colors duration-200 ${index < data.recentContacts.length - 1 ? "border-b border-white/[0.05]" : ""}`}>
                <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                  <span className="text-green-400 font-black text-sm">{c.name?.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm truncate">{c.name}</p>
                  <p className="text-gray-500 text-xs">Customer</p>
                </div>
                <div className="flex items-center gap-2 bg-white/[0.03] rounded-xl px-4 py-2 shrink-0">
                  <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span className="text-white text-sm font-semibold">{c.phone}</span>
                </div>
                <span className="text-[10px] font-bold text-gray-500 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-full uppercase tracking-widest shrink-0">
                  #{String(index + 1).padStart(3, "0")}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Charts — at the bottom */}
        <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp}>
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </span>
            <h2 className="text-xl font-black text-white">Analytics Overview</h2>
          </div>

          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5">
            <div className="bg-[#0f1630] rounded-2xl border border-white/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.4)] p-6">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C9A84C] inline-block" />
                Bar Chart — Total Overview
              </p>
              <Bar data={barData} options={chartOptions} />
            </div>
            <div className="bg-[#0f1630] rounded-2xl border border-white/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.4)] p-6 flex flex-col">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" />
                Doughnut — Bookings vs Contacts
              </p>
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-[280px] max-sm:max-w-[260px] h-[280px] max-sm:h-[260px] mx-auto">
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}