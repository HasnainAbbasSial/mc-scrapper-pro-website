import Image from "next/image";
import Link from "next/link";
import { Download, Zap, Shield, Database, BarChart3, Clock, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8 mb-12 lg:mb-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-primary border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                V2.0 Pro Edition Now Available
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                  Stable & Secure
                </span>
                <br />
                <span className="text-primary">Lead Generation</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl">
                Extract high-quality carrier and broker data from SaferWeb & FMCSA with our new
                <span className="text-primary font-semibold"> Safe Scraping Mode</span>.
                Built for professionals who prioritize data integrity.
              </p>

              {/* Key Benefits */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 size={20} className="text-green-400 flex-shrink-0" />
                  <span>Verified Stability (0.5s Optimized Delay)</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 size={20} className="text-green-400 flex-shrink-0" />
                  <span>Dual-Threaded Processing for Consistent Results</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 size={20} className="text-green-400 flex-shrink-0" />
                  <span>100% External Browser Auth for Data Safety</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/download"
                  className="group px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105"
                >
                  <Download size={20} />
                  Download V2.1.0
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/pricing"
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all backdrop-blur-sm hover:border-primary/30"
                >
                  View Pricing
                </Link>
              </div>

              {/* Trust Badge */}
              <div className="pt-8 flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-green-400" />
                  <span>Enterprise Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-yellow-400" />
                  <span>Optimized Speed</span>
                </div>
              </div>
            </div>

            {/* Right Column - Dashboard Preview */}
            <div className="relative lg:block">
              <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-violet-500 to-primary rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>

                {/* Main Image Container */}
                <div className="relative rounded-2xl border border-white/10 overflow-hidden glass-card shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 pointer-events-none"></div>
                  <Image
                    src="/dashboard-main.png"
                    alt="MC Scrapper Pro Dashboard Interface"
                    width={1920}
                    height={1080}
                    className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>

                {/* Floating Stats Cards */}
                <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-xl border border-white/10 shadow-xl hidden lg:block animate-float">
                  <div className="text-xs text-gray-400 mb-1">Status</div>
                  <div className="text-lg font-bold text-emerald-500 flex items-center gap-1">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    Connected
                  </div>
                  <div className="text-[10px] text-gray-500">Safe Scraping Mode</div>
                </div>

                <div className="absolute -top-6 -right-6 glass-card p-4 rounded-xl border border-white/10 shadow-xl hidden lg:block animate-float-delayed">
                  <div className="text-xs text-gray-400 mb-1">Threads</div>
                  <div className="text-2xl font-bold text-primary">02</div>
                  <div className="text-xs text-gray-500">Stable Limit</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-surface/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Built for <span className="text-primary">Reliability</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We've optimized our engine to provide the perfect balance between speed and server respect.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <FeatureCard
              icon={<Zap className="text-yellow-400" size={28} />}
              title="Safe Scraping Mode"
              desc="Automatic 0.5s delay between requests avoids IP bans and ensures 99.9% data accuracy."
            />
            <FeatureCard
              icon={<Database className="text-blue-400" size={28} />}
              title="Dual-Threaded Engine"
              desc="Optimized for stable, non-blocking performance without overwhelming target servers."
            />
            <FeatureCard
              icon={<Shield className="text-green-400" size={28} />}
              title="System Browser Auth"
              desc="High-security login via Google Chrome or Edge. Your credentials never touch the app."
            />
            <FeatureCard
              icon={<BarChart3 className="text-purple-400" size={28} />}
              title="Export to Excel/CSV"
              desc="One-click export to organized Excel or CSV files ready for your CRM or dialer."
            />
            <FeatureCard
              icon={<Clock className="text-red-400" size={28} />}
              title="Real-Time Updates"
              desc="Fetch the most recent data from FMCSA. No stale leads, only fresh opportunities."
            />
            <FeatureCard
              icon={<Zap className="text-cyan-400" size={28} />}
              title="User Friendly"
              desc="Modern, dark-themed UI that is easy on the eyes and simple to navigate."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-violet-500/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Supercharge Your Lead Generation?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join hundreds of dispatchers and brokers who are already saving hours every day.
          </p>
          <Link
            href="/download"
            className="inline-flex items-center gap-2 px-10 py-5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105"
          >
            <Download size={22} />
            Download MC Scrapper Pro
            <ArrowRight size={20} />
          </Link>
          <p className="text-sm text-gray-500 mt-6">Starting at just $7/month. No credit card required for trial.</p>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <div className="mb-4 p-3 bg-white/5 rounded-lg inline-block w-fit group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-gray-400 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
