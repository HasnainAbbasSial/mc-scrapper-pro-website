"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Add login logic here
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
            </div>

            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8 text-center">
                    <Link href="/" className="flex items-center space-x-3 mb-4 group">
                        <div className="bg-primary/20 p-2.5 rounded-xl text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                            <ShieldCheck size={32} />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">
                            MC Scrapper <span className="text-primary">Pro</span>
                        </span>
                    </Link>
                    <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                    <p className="text-gray-400 mt-2">Enter your credentials to access your account</p>
                </div>

                {/* Login Form */}
                <div className="glass-card p-8 rounded-2xl border border-white/10 shadow-2xl relative">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full bg-white/5 border border-white/10 text-white pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-600"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-medium text-gray-300">Password</label>
                                <Link href="#" className="text-xs text-primary hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 text-white pl-11 pr-12 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-600"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center space-x-2 ml-1">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 rounded bg-white/5 border border-white/10 text-primary focus:ring-primary focus:ring-offset-background"
                            />
                            <label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer">
                                Remember this device
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Login to Pro Account
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-8 text-center text-sm text-gray-400">
                        Don&apos;t have an account?{" "}
                        <Link href="/pricing" className="text-primary font-semibold hover:underline">
                            View Pricing
                        </Link>
                    </div>
                </div>

                {/* Support Info */}
                <div className="mt-8 text-center text-gray-500 text-sm">
                    Having trouble? <Link href="/contact" className="hover:text-gray-300 underline underline-offset-4">Contact Support</Link>
                </div>
            </div>
        </div>
    );
}
