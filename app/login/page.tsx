"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ShieldCheck,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setStatus("idle");
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const token = await user.getIdToken();

            // Try to send back to local app
            try {
                await fetch('http://127.0.0.1:54321/callback', {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: user.email, token: token })
                });
                setStatus("success");
            } catch (appError) {
                console.warn("Could not reach local app server. Are you running MC Scrapper?", appError);
                setStatus("error");
                setErrorMessage("Login successful, but could not connect to your MC Scrapper software. Please make sure the app is open.");
            }
        } catch (error: any) {
            console.error("Google Login Failed", error);
            setStatus("error");
            setErrorMessage(error.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Traditional login disabled in favor of Google
        setTimeout(() => {
            setIsLoading(false);
            setStatus("error");
            setErrorMessage("Traditional email/password login is temporarily disabled. Please use Google Login.");
        }, 1000);
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
                    <p className="text-gray-400 mt-2">Sign in to sync your MC Scrapper Pro license</p>
                </div>

                {/* Login Form */}
                <div className="glass-card p-8 rounded-2xl border border-white/10 shadow-2xl relative">
                    {status === "success" ? (
                        <div className="text-center space-y-4 py-4 animate-in fade-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-500">
                                <CheckCircle2 size={32} />
                            </div>
                            <h2 className="text-xl font-bold text-white">Login Successful!</h2>
                            <p className="text-gray-400 text-sm">
                                You have successfully authenticated. You can now close this window and return to your MC Scrapper software.
                            </p>
                            <button
                                onClick={() => window.close()}
                                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all"
                            >
                                Close Window
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Google Login Button (Primary) */}
                            <button
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                className="w-full bg-white hover:bg-gray-100 text-gray-900 py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 group"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-gray-300 border-t-primary rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                                        Continue with Google
                                    </>
                                )}
                            </button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/10"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-[#0f172a] px-2 text-gray-500">Or use email</span>
                                </div>
                            </div>

                            {status === "error" && (
                                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs p-3 rounded-lg flex gap-2 items-start">
                                    <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                                    <span>{errorMessage}</span>
                                </div>
                            )}

                            <form className="space-y-6 opacity-60 pointer-events-none" onSubmit={handleSubmit}>
                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            disabled
                                            placeholder="name@example.com"
                                            className="w-full bg-white/5 border border-white/10 text-white pl-11 pr-4 py-3 rounded-xl focus:outline-none placeholder:text-gray-600"
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-sm font-medium text-gray-300">Password</label>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            type="password"
                                            disabled
                                            placeholder="••••••••"
                                            className="w-full bg-white/5 border border-white/10 text-white pl-11 pr-12 py-3 rounded-xl focus:outline-none placeholder:text-gray-600"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled
                                    className="w-full bg-white/5 border border-white/10 text-gray-500 py-3.5 rounded-xl font-bold"
                                >
                                    Login with Email
                                </button>
                            </form>
                        </div>
                    )}

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
