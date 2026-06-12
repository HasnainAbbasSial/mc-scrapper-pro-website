import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dexiwfvgpknjrqoyrqsy.supabase.co";

const getAdminClient = () => {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) {
        throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing in environment variables.");
    }
    return createClient(SUPABASE_URL, serviceKey);
};

export async function GET(request: Request) {
    try {
        const supabaseAdmin = getAdminClient();
        
        // 1. Fetch Users
        const { data: users, error: usersError } = await supabaseAdmin
            .from('shared_users')
            .select('*')
            .order('created_at', { ascending: false });
        if (usersError) throw usersError;

        // 2. Fetch MC Scrapper Subscriptions
        const { data: subscriptions, error: subsError } = await supabaseAdmin
            .from('shared_subscriptions')
            .select('*')
            .eq('app_id', 'mc_scrapper');
        if (subsError) throw subsError;

        // 3. Fetch Auth Users (to map UUIDs for things like password resets if needed, or if shared_users has uuid. Wait, shared_users only has email in MC Scrapper, but let's try fetching Auth users for UUID mapping)
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.listUsers();
        const authUsers = authError ? [] : authData.users;

        // 4. Fetch MC Scrapper Usage (today)
        const today = new Date().toISOString().split('T')[0];
        const { data: usage, error: usageError } = await supabaseAdmin
            .from('shared_user_usage')
            .select('*')
            .eq('app_id', 'mc_scrapper')
            .eq('usage_date', today);
        const usageData = usageError ? [] : usage;

        // Assemble combined profile data
        const mergedProfiles = users.map(u => {
            const authUser = authUsers.find(au => au.email === u.email);
            const sub = subscriptions.find(s => s.email === u.email);
            const userUsage = usageData.find(us => us.email === u.email);

            return {
                id: authUser ? authUser.id : `legacy-${u.email}`,
                email: u.email,
                created_at: u.created_at,
                plan_type: sub?.status || 'Free',
                expiry_date: sub?.expiry || null,
                is_banned: sub?.status === 'Banned',
                scraped_today: userUsage?.scraped_count || 0,
                imported_today: userUsage?.import_count || 0,
                max_devices: 5, // Default for now
            };
        });

        return NextResponse.json({ success: true, profiles: mergedProfiles });
    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const supabaseAdmin = getAdminClient();
        const body = await request.json();
        const { action, email, planType, expiryDate, userId } = body;

        if (!action) return NextResponse.json({ success: false, error: "Action is required" }, { status: 400 });

        if (action === 'update_plan') {
            // Update subscription
            const { error } = await supabaseAdmin
                .from('shared_subscriptions')
                .upsert({ 
                    email: email, 
                    app_id: 'mc_scrapper', 
                    status: planType, 
                    expiry: expiryDate || null
                }, { onConflict: 'email,app_id' }); // Provide onConflict if constraint exists, else might error. 

            // If upsert fails due to missing constraint, fallback to fetch & update
            if (error) {
                // Check if exists
                const { data: existing } = await supabaseAdmin.from('shared_subscriptions').select('id').eq('email', email).eq('app_id', 'mc_scrapper').single();
                if (existing) {
                    await supabaseAdmin.from('shared_subscriptions').update({ status: planType, expiry: expiryDate || null }).eq('id', existing.id);
                } else {
                    await supabaseAdmin.from('shared_subscriptions').insert({ email: email, app_id: 'mc_scrapper', status: planType, expiry: expiryDate || null });
                }
            }
            return NextResponse.json({ success: true });
        }

        if (action === 'clear_devices') {
            const { error } = await supabaseAdmin
                .from('shared_devices')
                .delete()
                .eq('last_account', email);
            if (error) throw error;
            return NextResponse.json({ success: true });
        }

        if (action === 'toggle_ban') {
            // Check existing
            const { data: existing } = await supabaseAdmin.from('shared_subscriptions').select('status, id').eq('email', email).eq('app_id', 'mc_scrapper').single();
            const newStatus = (existing?.status === 'Banned') ? 'Free' : 'Banned';
            
            if (existing) {
                await supabaseAdmin.from('shared_subscriptions').update({ status: newStatus }).eq('id', existing.id);
            } else {
                await supabaseAdmin.from('shared_subscriptions').insert({ email: email, app_id: 'mc_scrapper', status: newStatus });
            }
            return NextResponse.json({ success: true });
        }

        if (action === 'delete_user') {
            if (userId && !userId.startsWith('legacy-')) {
                await supabaseAdmin.auth.admin.deleteUser(userId);
            }
            // Delete from shared_users
            await supabaseAdmin.from('shared_users').delete().eq('email', email);
            return NextResponse.json({ success: true });
        }

        if (action === 'send_password_reset') {
            const { error } = await supabaseAdmin.auth.admin.generateLink({
                type: 'recovery',
                email: email,
            });
            if (error) throw error;
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
