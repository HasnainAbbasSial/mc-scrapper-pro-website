import { Cloud, HardDrive, FileBox, CheckCircle2, Download, Shield, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DownloadPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute top-40 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
                </div>

                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-primary border border-primary/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            v3.0.0 Pro Edition Released
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                            Download <span className="text-primary">MC Scrapper Pro</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                            Get the industry&apos;s most reliable FMCSA scraping tool. Now with optimized safe mode and advanced filtering.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Shield size={16} className="text-green-400" />
                                <span>Virus-Free Checked</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Zap size={16} className="text-yellow-400" />
                                <span>v3.0.0 Stability Patch</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Download Mirror Section */}
            <section className="pb-24 relative">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="glass-card p-8 md:p-12 rounded-[2rem] border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 -rotate-12 translate-x-1/4 -translate-y-1/4">
                            <Download size={200} />
                        </div>

                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Select Download Mirror</h2>
                                    <p className="text-gray-400">Choose a host to download the installer (approx. 24MB)</p>
                                </div>
                                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-sm font-mono self-start md:self-center">
                                    <span className="text-gray-500">Latest Version: </span>
                                    <span className="text-primary">3.0.0 (Recommended)</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <DownloadMirror
                                    icon={<Cloud size={28} />}
                                    name="Mega Drive"
                                    href="https://mega.nz/folder/54ZjzJrA#PqLvZBZ8tMMZLvIWXjPwMg"
                                    description="Fastest download speeds"
                                    color="text-red-400"
                                />
                                <DownloadMirror
                                    icon={<HardDrive size={28} />}
                                    name="Google Drive"
                                    href="https://drive.google.com/drive/folders/12P7n0x5XDbs-5S4jYexhwEWl0gfPIxVk?usp=drive_link"
                                    description="Secured by Google"
                                    color="text-blue-400"
                                />
                                <DownloadMirror
                                    icon={<FileBox size={28} />}
                                    name="MediaFire"
                                    href="https://www.mediafire.com/folder/di5mgq9knj4uo/MC+Scrapper+Pro"
                                    description="Direct mirror link"
                                    color="text-cyan-400"
                                />
                            </div>

                            <div className="mt-16 pt-12 border-t border-white/5">
                                <div className="grid md:grid-cols-2 gap-12">
                                    <div>
                                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                            <Zap size={20} className="text-primary" />
                                            What&apos;s New in v3.0.0
                                        </h3>
                                        <ul className="space-y-4">
                                            {[
                                                "Free Tier with 100 daily scrapes",
                                                "Advanced Smart OA Filters",
                                                "Human-like randomized delay system",
                                                "Live usage tracker on dashboard",
                                                "Extended field extraction support"
                                            ].map((text, i) => (
                                                <li key={i} className="flex items-center gap-3 text-gray-400 text-sm">
                                                    <CheckCircle2 size={16} className="text-green-500" />
                                                    {text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-surface/50 border border-white/5">
                                        <h3 className="text-lg font-bold mb-4">Installation Steps</h3>
                                        <div className="space-y-4">
                                            <Step number="01" text="Download the installer from any mirror above." />
                                            <Step number="02" text="Run the setup.exe and follow instructions." />
                                            <Step number="03" text="Launch the app and login to start scraping." />
                                        </div>
                                        <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10 text-xs text-gray-400">
                                            <span className="text-primary font-bold">Note:</span> If Windows Defender blocks the app, click &quot;More Info&quot; then &quot;Run Anyway&quot; to proceed.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter/Support Section */}
            <section className="py-20 border-t border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold mb-4">Need help with installation?</h2>
                    <p className="text-gray-400 mb-8">Our support team is available to help you get started.</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold transition-all hover:border-primary/50"
                    >
                        Contact Support <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </div>
    );
}

function DownloadMirror({ icon, name, href, description, color }: { icon: React.ReactNode, name: string, href: string, description: string, color: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 hover:bg-white/10 transition-all duration-300"
        >
            <div className={`mb-4 p-3 rounded-xl bg-white/5 w-fit group-hover:scale-110 transition-transform ${color}`}>
                {icon}
            </div>
            <h4 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{name}</h4>
            <p className="text-xs text-gray-500 mb-6">{description}</p>
            <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-white group-hover:text-primary transition-colors">
                Download Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
        </a>
    );
}

function Step({ number, text }: { number: string, text: string }) {
    return (
        <div className="flex gap-4">
            <span className="text-primary font-mono font-bold text-sm tracking-tighter">{number}</span>
            <p className="text-sm text-gray-400">{text}</p>
        </div>
    );
}
