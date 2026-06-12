"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Zap, Shield, Database, BarChart3, Clock, ArrowRight, CheckCircle2, ChevronRight, Star, Activity, Server, Lock } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden selection:bg-primary/30">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8 relative z-10"
            >
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-slate-200">Version 4 Edition Live — Free Tier Introduced</span>
              </motion.div>

              <motion.h1 variants={fadeIn} className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
                <span className="text-white">Next-Gen</span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-400 to-blue-400 drop-shadow-sm">
                  Lead Generation
                </span>
              </motion.h1>

              <motion.p variants={fadeIn} className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl">
                Extract high-quality <span className="text-slate-200 font-medium">Carrier & Broker data</span> from FMCSA with zero IP blocks. Experience the industry's most reliable and undetectable scraping engine.
              </motion.p>

              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/login" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transition-all duration-300 transform hover:-translate-y-1">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                  <span className="relative">Start For Free</span>
                  <ArrowRight size={20} className="relative group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="https://mcscrap.eptasky.com/download" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 backdrop-blur-md transition-all duration-300">
                  <Download size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                  Download Software
                </Link>
              </motion.div>

              <motion.div variants={fadeIn} className="flex items-center gap-6 pt-6 border-t border-white/10">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#0f172a] bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center shadow-lg z-${10-i}`}>
                      <Star size={14} className="text-yellow-500" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="text-white font-bold">Trusted by 500+</div>
                  <div className="text-slate-400">Logistics Professionals</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Dashboard Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative lg:h-[600px] hidden lg:flex items-center justify-center perspective-1000"
            >
              <div className="relative w-full max-w-lg aspect-square rounded-full bg-gradient-to-tr from-primary/20 to-violet-500/20 blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
              
              {/* Main App Mockup */}
              <div className="relative w-full z-20 rounded-2xl border border-white/10 bg-[#1e293b]/80 backdrop-blur-xl shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-500">
                {/* Mac Window Controls */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-4 text-xs font-medium text-slate-400">MC Scrapper Pro v4</div>
                </div>
                {/* Mockup Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 text-primary">
                        <Activity size={24} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">4,289</div>
                        <div className="text-xs text-slate-400 font-medium">Scraped Today</div>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold">
                      System Online
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-xs font-mono text-slate-400">MC</div>
                          <div className="w-24 h-2 rounded bg-slate-700"></div>
                        </div>
                        <div className="w-16 h-2 rounded bg-green-500/30"></div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 h-32 rounded-xl bg-gradient-to-t from-primary/10 to-transparent border border-primary/20 relative overflow-hidden">
                    <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path d="M0,100 L0,50 Q25,30 50,60 T100,40 L100,100 Z" fill="rgba(99,102,241,0.2)" />
                      <path d="M0,100 L0,70 Q25,50 50,80 T100,60 L100,100 Z" fill="rgba(99,102,241,0.4)" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 top-20 z-30 p-4 rounded-xl bg-slate-800/90 backdrop-blur-md border border-white/10 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <Shield className="text-green-400" size={24} />
                  <div>
                    <div className="text-sm font-bold text-white">Anti-Ban Active</div>
                    <div className="text-xs text-slate-400">Human emulation</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-12 bottom-32 z-30 p-4 rounded-xl bg-slate-800/90 backdrop-blur-md border border-white/10 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <Zap className="text-amber-400" size={24} />
                  <div>
                    <div className="text-sm font-bold text-white">Dual-Threaded</div>
                    <div className="text-xs text-slate-400">Ultra fast speed</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative z-10 border-t border-white/5 bg-[#0f172a]/50 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Engineered for <span className="text-primary">Excellence</span></h2>
            <p className="text-slate-400 text-lg">Stop worrying about captchas and IP blocks. Our intelligent engine handles the heavy lifting so you can focus on closing deals.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Safe Scraping Mode", desc: "Advanced human-emulation algorithms to bypass sophisticated bot detection.", color: "text-green-400", bg: "bg-green-400/10", border: "group-hover:border-green-400/50" },
              { icon: Zap, title: "Dual-Thread Engine", desc: "Process multiple records simultaneously without triggering rate limits.", color: "text-amber-400", bg: "bg-amber-400/10", border: "group-hover:border-amber-400/50" },
              { icon: Database, title: "Smart Data Sorting", desc: "Filter by Entity, Power Units, USDOT, and 10+ other vital data points.", color: "text-blue-400", bg: "bg-blue-400/10", border: "group-hover:border-blue-400/50" },
              { icon: Server, title: "Cloud Synchronization", desc: "Your limits, history, and active devices sync instantly across the cloud.", color: "text-violet-400", bg: "bg-violet-400/10", border: "group-hover:border-violet-400/50" },
              { icon: Activity, title: "Live Usage Tracking", desc: "Monitor your scraping capacity in real-time straight from your dashboard.", color: "text-rose-400", bg: "bg-rose-400/10", border: "group-hover:border-rose-400/50" },
              { icon: Lock, title: "Secure Authentication", desc: "Enterprise-grade security powered by Supabase with remote device wipe.", color: "text-teal-400", bg: "bg-teal-400/10", border: "group-hover:border-teal-400/50" }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl ${f.border}`}
              >
                <div className={`w-14 h-14 rounded-xl ${f.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <f.icon className={f.color} size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="py-8 border-t border-white/5 mt-auto relative z-10 bg-[#0f172a]">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2026 MC Scrapper Pro. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
