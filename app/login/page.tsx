"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    ShieldCheck,
    Mail,
    Lock,
    Eye,
    EyeOff,
    CheckCircle2,
    AlertCircle,
    RefreshCw
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dexiwfvgpknjrqoyrqsy.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_U6x3Rhe7p-YxidTGIPWl9w_CUQlKwpd";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function LoginPage() {
    const [authMode, setAuthMode] = useState<"signin" | "signup" | "forgot" | "reset">("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error" | "info">("idle");
    const [message, setMessage] = useState("");

    // Handle Password Recovery Mode trigger from Supabase
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "PASSWORD_RECOVERY") {
                 setAuthMode("reset");
            }
        });
        
        return () => subscription.unsubscribe();
    }, []);

    // Broadcast Supabase session to NEW APP (Port 51010)
    const broadcastSupabaseSession = async (session: any) => {
        const token = session.access_token;
        const userEmail = session.user.email;
        
        try {
            await fetch('http://127.0.0.1:51010/callback', {
                method: 'POST', mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail, token: token })
            });
            setStatus("success");
            setMessage("Login successful for the New Version!");
        } catch(e) {
            setStatus("error");
            setMessage("Login successful, but could not connect to the New MC Scrapper software. Please make sure the app is open.");
        }
        setIsLoading(false);
    };

    // Google Login handles OLD APP via Firebase (Port 54321)
    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setStatus("idle");
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const token = await user.getIdToken();

            try {
                await fetch('http://127.0.0.1:54321/callback', {
                    method: 'POST', mode: 'cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: user.email, token: token })
                });
                setStatus("success");
                setMessage("Login successful for the Old Version!");
            } catch (appError) {
                console.warn("Could not reach old app server", appError);
                setStatus("error");
                setMessage("Login successful, but could not connect to your Old MC Scrapper software.");
            }
        } catch (error: any) {
            console.error("Google Login Failed", error);
            setStatus("error");
            setMessage(error.message || "Google Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // 1. Forgot Password Mode
        if (authMode === "forgot") {
            if (!email || !email.includes("@")) {
                setStatus("error");
                setMessage("Please enter a valid email address.");
                return;
            }
            setIsLoading(true);
            try {
                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: window.location.origin + '/login'
                });
                if (error) throw error;
                setStatus("info");
                setMessage(`Password reset link sent to ${email}. Please check your inbox.`);
            } catch (error: any) {
                setStatus("error");
                setMessage(error.message || "Failed to send reset link.");
            } finally {
                setIsLoading(false);
            }
            return;
        }

        // 2. Reset Password Mode
        if (authMode === "reset") {
            if (!password || password.length < 6) {
                setStatus("error");
                setMessage("Password must be at least 6 characters.");
                return;
            }
            if (password !== confirmPassword) {
                setStatus("error");
                setMessage("Passwords do not match.");
                return;
            }
            setIsLoading(true);
            try {
                const { error } = await supabase.auth.updateUser({ password });
                if (error) throw error;
                setStatus("info");
                setMessage("Password updated successfully! You can now sign in.");
                setAuthMode("signin");
                setPassword("");
                setConfirmPassword("");
            } catch (error: any) {
                setStatus("error");
                setMessage(error.message || "Failed to update password.");
            } finally {
                setIsLoading(false);
            }
            return;
        }

        // 3. Sign In / Sign Up Mode (Supabase)
        if (!email || !email.includes("@")) {
            setStatus("error");
            setMessage("Please enter a valid email address.");
            return;
        }
        if (!password || password.length < 6) {
            setStatus("error");
            setMessage("Password must be at least 6 characters.");
            return;
        }
        if (authMode === "signup" && password !== confirmPassword) {
            setStatus("error");
            setMessage("Passwords do not match.");
            return;
        }

        setIsLoading(true);
        setStatus("idle");

        try {
            if (authMode === "signin") {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                if (data.session) {
                    await supabase.from('shared_users').upsert({ email: data.session.user.email, id: data.session.user.id });
                    await broadcastSupabaseSession(data.session);
                }
            } else {
                const { data, error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                if (data.session) {
                    await supabase.from('shared_users').upsert({ email: data.session.user.email, id: data.session.user.id });
                    await broadcastSupabaseSession(data.session);
                } else {
                    setStatus("info");
                    setMessage("Account created! Please check your email to verify.");
                    setIsLoading(false);
                }
            }
        } catch (error: any) {
            setStatus("error");
            setMessage(error.message || "Authentication failed. Please try again.");
            setIsLoading(false);
        }
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
                    <h1 className="text-2xl font-bold text-white">
                        {authMode === "signin" && "Welcome Back"}
                        {authMode === "signup" && "Create Account"}
                        {authMode === "forgot" && "Reset Password"}
                        {authMode === "reset" && "Create New Password"}
                    </h1>
                    <p className="text-gray-400 mt-2">
                        {authMode === "signin" && "Sign in to sync your MC Scrapper Pro license"}
                        {authMode === "signup" && "Sign up to get your MC Scrapper Pro license"}
                        {authMode === "forgot" && "Enter your email to receive a reset link"}
                        {authMode === "reset" && "Enter a new secure password for your account"}
                    </p>
                </div>

                {/* Login Form */}
                <div className="glass-card p-8 rounded-2xl border border-white/10 shadow-2xl relative bg-slate-900/50 backdrop-blur-xl">
                    {status === "success" ? (
                        <div className="text-center space-y-4 py-4 animate-in fade-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-500">
                                <CheckCircle2 size={32} />
                            </div>
                            <h2 className="text-xl font-bold text-white">Authentication Successful!</h2>
                            <p className="text-gray-400 text-sm">
                                {message} You can now close this window and return to your MC Scrapper software.
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
                            {/* Google Login Button (Old Version via Firebase) */}
                            {authMode !== "reset" && authMode !== "forgot" && (
                                <>
                                    <button
                                        onClick={handleGoogleLogin}
                                        disabled={isLoading}
                                        className="w-full bg-white hover:bg-gray-100 text-gray-900 py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg active:scale-[0.98] disabled:opacity-50"
                                    >
                                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                                        Old Version (Google Login)
                                    </button>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-white/10"></div>
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-slate-900/80 px-2 text-gray-400">New Version (Email/Password)</span>
                                        </div>
                                    </div>
                                </>
                            )}

                            {status === "error" && (
                                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs p-3 rounded-lg flex gap-2 items-start">
                                    <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                                    <span>{message}</span>
                                </div>
                            )}

                            {status === "info" && (
                                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs p-3 rounded-lg flex gap-2 items-start">
                                    <CheckCircle2 size={14} className="flex-shrink-0 mt-0.5" />
                                    <span>{message}</span>
                                </div>
                            )}

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                {/* Email Field */}
                                {authMode !== "reset" && (
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                                                <Mail size={18} />
                                            </div>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="name@example.com"
                                                className="w-full bg-white/5 border border-white/10 text-white pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 placeholder:text-gray-600 transition-all"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Password Field */}
                                {authMode !== "forgot" && (
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between items-center ml-1">
                                            <label className="text-sm font-medium text-gray-300">
                                                {authMode === "reset" ? "New Password" : "Password"}
                                            </label>
                                            {authMode === "signin" && (
                                                <button
                                                    type="button"
                                                    onClick={() => setAuthMode("forgot")}
                                                    className="text-xs text-primary hover:underline"
                                                >
                                                    Forgot Password?
                                                </button>
                                            )}
                                        </div>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                                                <Lock size={18} />
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full bg-white/5 border border-white/10 text-white pl-11 pr-12 py-3 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 placeholder:text-gray-600 transition-all"
                                            />
                                            <button 
                                                type="button" 
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Confirm Password Field */}
                                {(authMode === "signup" || authMode === "reset") && (
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-300 ml-1">Confirm Password</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                                                <Lock size={18} />
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                required
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full bg-white/5 border border-white/10 text-white pl-11 pr-12 py-3 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 placeholder:text-gray-600 transition-all"
                                            />
                                        </div>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-primary hover:bg-primary/90 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(var(--primary),0.3)] disabled:opacity-50 mt-2"
                                >
                                    {isLoading ? (
                                        <RefreshCw className="h-5 w-5 animate-spin" />
                                    ) : (
                                        authMode === "signin" ? "Sign In" : 
                                        authMode === "signup" ? "Create Account" :
                                        authMode === "forgot" ? "Send Reset Link" :
                                        "Update Password"
                                    )}
                                </button>
                            </form>

                            {/* Toggle Auth Mode */}
                            <div className="text-center text-sm text-gray-400 mt-4">
                                {authMode === "signin" && (
                                    <span>
                                        Don&apos;t have an account?{" "}
                                        <button onClick={() => setAuthMode("signup")} className="text-primary font-semibold hover:underline">
                                            Sign Up
                                        </button>
                                    </span>
                                )}
                                {authMode === "signup" && (
                                    <span>
                                        Already have an account?{" "}
                                        <button onClick={() => setAuthMode("signin")} className="text-primary font-semibold hover:underline">
                                            Sign In
                                        </button>
                                    </span>
                                )}
                                {(authMode === "forgot" || authMode === "reset") && (
                                    <button onClick={() => setAuthMode("signin")} className="text-gray-400 hover:text-white transition-colors">
                                        Back to Sign In
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Support Info */}
                <div className="mt-8 text-center text-gray-500 text-sm">
                    Having trouble? <Link href="/contact" className="hover:text-gray-300 underline underline-offset-4">Contact Support</Link>
                </div>
            </div>
        </div>
    );
}
