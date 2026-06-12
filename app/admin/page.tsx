"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Users, Search, RefreshCw, AlertTriangle, CheckCircle2, Shield, Edit2, ShieldAlert, Trash2, Calendar, Monitor, Key, ServerCrash, Loader2, LogOut } from "lucide-react";

interface Profile {
  id: string;
  created_at: string;
  email: string | null;
  plan_type: string | null;
  is_banned: boolean;
  scraped_today: number;
  imported_today: number;
  max_devices: number;
  expiry_date: string | null;
  is_admin: boolean;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dexiwfvgpknjrqoyrqsy.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_U6x3Rhe7p-YxidTGIPWl9w_CUQlKwpd";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AdminDashboard() {
  const router = useRouter();
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  
  // Edit modal state
  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  const [editPlanType, setEditPlanType] = useState("Free");
  const [editExpiryDate, setEditExpiryDate] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

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
          
          const { data: userData, error: userError } = await supabase
              .from('profiles')
              .select('is_admin')
              .eq('id', userId)
              .single();

          if (userError || !userData || userData.is_admin !== true) {
              setIsAdmin(false);
              setCheckingAuth(false);
              return;
          }

          setIsAdmin(true);
          setCheckingAuth(false);
          fetchUsers();
      } catch (error) {
          console.error(error);
          setIsAdmin(false);
          setCheckingAuth(false);
      }
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.success) {
        setUsers(data.profiles);
      } else {
        setError(data.error || "Failed to fetch users");
      }
    } catch (err: any) {
      setError(err.message || "Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePlan = async () => {
    if (!editingUser) return;
    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_plan",
          email: editingUser.email,
          userId: editingUser.id,
          planType: editPlanType,
          expiryDate: editExpiryDate ? new Date(editExpiryDate).toISOString() : null
        })
      });
      const data = await res.json();
      if (data.success) {
        setEditingUser(null);
        fetchUsers();
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Error updating user plan.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleBan = async (user: Profile) => {
    if (!confirm(`Are you sure you want to ${user.is_banned ? "unban" : "ban"} this user?`)) return;
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "toggle_ban",
          email: user.email,
          userId: user.id
        })
      });
      const data = await res.json();
      if (data.success) {
        fetchUsers();
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Error toggling ban status.");
    }
  };

  const handleDeleteUser = async (user: Profile) => {
    if (!confirm(`CRITICAL WARNING:\nAre you absolutely sure you want to PERMANENTLY DELETE the user ${user.email || user.id}?\n\nThis will destroy their account, profile, stats, and all associated data. This action cannot be undone.`)) return;
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete_user",
          email: user.email,
          userId: user.id
        })
      });
      const data = await res.json();
      if (data.success) {
        fetchUsers();
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Error deleting user.");
    }
  };

  const handleClearDevices = async (user: Profile) => {
    if (!confirm(`Are you sure you want to clear all connected devices for ${user.email || user.id}? They will have to log in again on their computers.`)) return;
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "clear_devices",
          email: user.email,
          userId: user.id
        })
      });
      const data = await res.json();
      if (data.success) {
        alert("Devices cleared successfully!");
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Error clearing devices.");
    }
  };

  const handlePasswordReset = async (user: Profile) => {
    if (!confirm(`Send a password reset email to ${user.email}?`)) return;
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send_password_reset",
          email: user.email,
          userId: user.id
        })
      });
      const data = await res.json();
      if (data.success) {
        alert("Password reset email sent successfully!");
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Error sending password reset.");
    }
  };

  const filteredUsers = users.filter(u => 
    (u.email || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.id.includes(searchQuery)
  );

  if (checkingAuth) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
      );
  }

  if (!isAdmin) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-4 relative overflow-hidden font-outfit">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
              <div className="glass-card p-8 rounded-2xl border border-white/10 shadow-2xl relative bg-slate-900/80 backdrop-blur-xl flex flex-col items-center text-center max-w-md w-full">
                  <ShieldAlert className="h-16 w-16 text-rose-500 mb-4" />
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
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 font-outfit relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-violet-600 p-[1px] shadow-lg">
                    <div className="h-full w-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                        <Shield className="h-6 w-6 text-primary" />
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

        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-white/5 bg-surface-container/30 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono tracking-wider uppercase mb-1">Total Users</p>
                <h3 className="text-2xl font-bold text-white">{users.length}</h3>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl border border-white/5 bg-surface-container/30 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono tracking-wider uppercase mb-1">Premium Users</p>
                <h3 className="text-2xl font-bold text-white">
                  {users.filter(u => u.plan_type && u.plan_type.toLowerCase() !== "free").length}
                </h3>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl border border-white/5 bg-surface-container/30 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                <ShieldAlert className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono tracking-wider uppercase mb-1">Banned Users</p>
                <h3 className="text-2xl font-bold text-white">
                  {users.filter(u => u.is_banned).length}
                </h3>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl border border-white/5 bg-surface-container/30 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-electric-cyan/10 flex items-center justify-center border border-electric-cyan/20">
                <RefreshCw className="h-6 w-6 text-electric-cyan" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono tracking-wider uppercase mb-1">Scraped Today</p>
                <h3 className="text-2xl font-bold text-white">
                  {users.reduce((acc, u) => acc + (u.scraped_today || 0), 0)}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Main Table Area */}
        <div className="rounded-2xl border border-white/5 bg-slate-900/50 backdrop-blur-md overflow-hidden flex flex-col h-[600px]">
          {/* Toolbar */}
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-slate-950/50">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search by Email..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900 border border-white/5 focus:border-primary/50 focus:outline-none text-sm text-slate-200 placeholder-slate-500 transition-colors"
              />
            </div>
            <button 
              onClick={fetchUsers}
              disabled={loading}
              className="p-2.5 rounded-lg border border-white/5 hover:bg-white/5 text-slate-400 hover:text-white transition-all disabled:opacity-50"
              title="Refresh Data"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Error State */}
          {error && (
            <div className="p-4 m-4 bg-red-950/50 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <div>
                <p className="font-bold">Error loading user data</p>
                <p className="opacity-80 text-xs mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {/* Data Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-slate-950/90 backdrop-blur-md z-10 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-mono">User ID / Email</th>
                  <th className="px-6 py-4 font-mono">Plan Status</th>
                  <th className="px-6 py-4 font-mono">Restrictions</th>
                  <th className="px-6 py-4 font-mono">Today Usage</th>
                  <th className="px-6 py-4 font-mono">Status</th>
                  <th className="px-6 py-4 font-mono text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading && users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-3 text-primary" />
                      Loading database records...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">No users found.</td>
                  </tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr key={user.email} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                            {user.email || "No Email"}
                            {user.is_admin && <span title="Admin User"><Shield className="h-3.5 w-3.5 text-primary" /></span>}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono mt-0.5">{user.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded w-max ${
                            (!user.plan_type || user.plan_type.toLowerCase() === 'free')
                              ? 'bg-slate-800 text-slate-300'
                              : 'bg-primary/20 text-primary'
                          }`}>
                            {user.plan_type || "Free"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                            <Monitor className="h-3 w-3" /> Devices: {user.max_devices || "N/A"}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                            <Calendar className="h-3 w-3" /> Expiry: {user.expiry_date ? new Date(user.expiry_date).toLocaleDateString() : 'None'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                            <span>Scraped:</span>
                            <span className="text-electric-cyan font-bold">{user.scraped_today || 0}</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                            <span>Imported:</span>
                            <span className="text-slate-300 font-bold">{user.imported_today || 0}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {user.is_banned ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 bg-red-400/10 px-2 py-1 rounded">
                            <ShieldAlert className="h-3.5 w-3.5" /> Banned
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Active
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => {
                              setEditingUser(user);
                              setEditPlanType(user.plan_type || "Free");
                              setEditExpiryDate(user.expiry_date ? new Date(user.expiry_date).toISOString().split('T')[0] : "");
                            }}
                            className="p-1.5 bg-slate-800 hover:bg-primary hover:text-white rounded text-slate-400 transition-all"
                            title="Edit Plan"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handlePasswordReset(user)}
                            className="p-1.5 bg-slate-800 text-slate-400 hover:bg-emerald-500 hover:text-white rounded transition-all"
                            title="Send Password Reset Email"
                          >
                            <Key className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleClearDevices(user)}
                            className="p-1.5 bg-slate-800 text-slate-400 hover:bg-orange-500 hover:text-white rounded transition-all"
                            title="Clear Connected Devices"
                          >
                            <ServerCrash className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleToggleBan(user)}
                            className={`p-1.5 rounded transition-all ${user.is_banned ? 'bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white' : 'bg-slate-800 text-slate-400 hover:bg-red-500 hover:text-white'}`}
                            title={user.is_banned ? "Unban User" : "Ban User"}
                          >
                            <ShieldAlert className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user)}
                            className="p-1.5 bg-slate-800 text-slate-400 hover:bg-red-600 hover:text-white rounded transition-all"
                            title="Delete User Permanently"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit User Modal */}
        {editingUser && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl relative">
              <h3 className="text-xl font-bold text-white mb-1">Edit Subscription</h3>
              <p className="text-xs text-slate-400 font-mono mb-6">{editingUser.email}</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Plan Type</label>
                  <select 
                    value={editPlanType} 
                    onChange={(e) => setEditPlanType(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                  >
                    <option value="Free">Free Plan</option>
                    <option value="Premium">Premium Plan</option>
                    <option value="Lifetime">Lifetime Plan</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subscription Expiry Date</label>
                  <input 
                    type="date" 
                    value={editExpiryDate}
                    onChange={(e) => setEditExpiryDate(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-primary"
                  />
                  <span className="text-[10px] text-slate-500">Clear the date to remove expiry.</span>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:bg-white/5 transition-colors border border-transparent"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleUpdatePlan}
                  disabled={isUpdating}
                  className="px-6 py-2 rounded-lg text-sm font-bold bg-primary text-white hover:brightness-110 transition-all flex items-center gap-2"
                >
                  {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
