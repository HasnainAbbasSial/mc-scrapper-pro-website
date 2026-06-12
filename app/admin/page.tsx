"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { ShieldCheck, Users, Search, CheckCircle2, XCircle, RefreshCw, LogOut } from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dexiwfvgpknjrqoyrqsy.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_U6x3Rhe7p-YxidTGIPWl9w_CUQlKwpd";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AdminPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [users, setUsers] = useState<any[]>([]);
    const [subscriptions, setSubscriptions] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [processingId, setProcessingId] = useState<string | null>(null);

    useEffect(() => {
        checkAdminAccess();
    }, []);

    const checkAdminAccess = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/login');
                return;
            }

            const userId = session.user.id;
            
            // Check admin status in Outreach Pro's profiles table
            const { data: userData, error: userError } = await supabase
                .from('profiles')
                .select('is_admin')
                .eq('id', userId)
                .single();

            if (userError || !userData || userData.is_admin !== true) {
                setIsAdmin(false);
                setIsLoading(false);
                return;
            }

            setIsAdmin(true);
            fetchData();
        } catch (error) {
            console.error(error);
            setIsAdmin(false);
            setIsLoading(false);
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            // Fetch all users
            const { data: usersData, error: usersError } = await supabase
                .from('shared_users')
                .select('*')
                .order('created_at', { ascending: false });
                
            if (!usersError && usersData) {
                setUsers(usersData);
            }

            // Fetch MC Scrapper subscriptions
            const { data: subsData, error: subsError } = await supabase
                .from('shared_subscriptions')
                .select('*')
                .eq('app_id', 'mc_scrapper');

            if (!subsError && subsData) {
                setSubscriptions(subsData);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleSubscription = async (email: string, currentStatus: string) => {
        setProcessingId(email);
        try {
            if (currentStatus === 'Premium') {
                // Revoke -> Update status to Free
                await supabase
                    .from('shared_subscriptions')
                    .upsert({ email: email, app_id: 'mc_scrapper', status: 'Free' });
            } else {
                // Grant -> Update status to Premium
                const nextYear = new Date();
                nextYear.setFullYear(nextYear.getFullYear() + 1);
                
                await supabase
                    .from('shared_subscriptions')
                    .upsert({ 
                        email: email, 
                        app_id: 'mc_scrapper', 
                        status: 'Premium', 
                        expiry: nextYear.toISOString() 
                    });
            }
            // Refresh data
            await fetchData();
        } catch (error) {
            console.error("Failed to toggle subscription", error);
            alert("Failed to update subscription. Make sure RLS is disabled or you have permissions.");
        } finally {
            setProcessingId(null);
        }
    };

    const filteredUsers = users.filter(u => u.email.toLowerCase().includes(searchQuery.toLowerCase()));

    if (isLoading && !isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-4 relative overflow-hidden font-outfit">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="glass-card p-8 rounded-2xl border border-white/10 shadow-2xl relative bg-slate-900/80 backdrop-blur-xl flex flex-col items-center text-center max-w-md w-full">
                    <XCircle className="h-16 w-16 text-rose-500 mb-4" />
                    <h1 className="text-2xl font-bold mb-2 tracking-wider">Access Denied</h1>
                    <p className="text-slate-400 mb-6 text-sm">
                        You do not have administrator privileges. Please make sure your 'is_admin' is set to TRUE in the 'profiles' table.
                    </p>
                    <button 
                        onClick={() => router.push('/login')}
                        className="w-full px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl transition-all font-bold"
                    >
                        Return to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 font-outfit relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
            
            <div className="max-w-6xl mx-auto space-y-8 relative z-10">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-xl shadow-2xl">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-violet-600 p-[1px] shadow-lg">
                            <div className="h-full w-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                                <ShieldCheck className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-white">Admin Portal</h1>
                            <p className="text-sm text-slate-400 font-mono">MC Scrapper Subscriptions Manager</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={async () => { await supabase.auth.signOut(); router.push('/login'); }}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white border border-rose-500/20 rounded-xl transition-all text-sm font-bold shadow-lg"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>

                {/* Main Content */}
                <div className="bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-2xl shadow-2xl">
                    <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900/80">
                        <div className="flex items-center gap-3 text-slate-200">
                            <Users className="h-5 w-5 text-primary" />
                            <h2 className="text-lg font-bold tracking-wider">User Management</h2>
                            <span className="bg-primary/20 text-primary border border-primary/20 text-xs px-2.5 py-1 rounded-full font-bold ml-2">
                                {users.length} Total
                            </span>
                        </div>
                        
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                            <input 
                                type="text"
                                placeholder="Search users by email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-white placeholder:text-slate-600"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-slate-950 text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-white/5">
                                <tr>
                                    <th className="px-6 py-5">User Email</th>
                                    <th className="px-6 py-5">Joined Date</th>
                                    <th className="px-6 py-5">App Access</th>
                                    <th className="px-6 py-5">Expiry Date</th>
                                    <th className="px-6 py-5 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center text-slate-500">
                                            <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-3 text-primary" />
                                            <span className="font-mono text-xs">Fetching users...</span>
                                        </td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center text-slate-500 font-mono text-xs">
                                            No users found matching your search.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => {
                                        const sub = subscriptions.find(s => s.email === user.email);
                                        const isPremium = sub?.status === 'Premium';
                                        const isProcessing = processingId === user.email;
                                        
                                        return (
                                            <tr key={user.email} className="hover:bg-white/[0.03] transition-colors group">
                                                <td className="px-6 py-4.5">
                                                    <div className="font-semibold text-slate-200">{user.email}</div>
                                                </td>
                                                <td className="px-6 py-4.5 text-slate-500 font-mono text-xs">
                                                    {new Date(user.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4.5">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                                                        isPremium 
                                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                                            : 'bg-slate-800 text-slate-400 border-slate-700'
                                                    }`}>
                                                        {isPremium && <CheckCircle2 className="h-3 w-3" />}
                                                        {isPremium ? 'Premium' : 'Free'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4.5 text-slate-400 font-mono text-xs">
                                                    {isPremium && sub?.expiry ? new Date(sub.expiry).toLocaleDateString() : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4.5 text-right">
                                                    <button
                                                        onClick={() => toggleSubscription(user.email, isPremium ? 'Premium' : 'Free')}
                                                        disabled={isProcessing}
                                                        className={`inline-flex items-center justify-center min-w-[130px] px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50 ${
                                                            isPremium 
                                                                ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white border border-rose-500/20' 
                                                                : 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30'
                                                        }`}
                                                    >
                                                        {isProcessing ? (
                                                            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                                        ) : (
                                                            isPremium ? 'Revoke Access' : 'Grant Premium'
                                                        )}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
