import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dexiwfvgpknjrqoyrqsy.supabase.co";

const getAdminClient = () => {
    // Try to get service role key
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) {
        throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing in environment variables.");
    }
    return createClient(SUPABASE_URL, serviceKey);
};

export async function GET(request: Request) {
    try {
        const supabaseAdmin = getAdminClient();
        
        // Fetch users from shared_users table
        const { data: users, error: usersError } = await supabaseAdmin
            .from('shared_users')
            .select('*')
            .order('created_at', { ascending: false });

        if (usersError) throw usersError;

        // Fetch subscriptions
        const { data: subscriptions, error: subsError } = await supabaseAdmin
            .from('shared_subscriptions')
            .select('*')
            .eq('app_id', 'mc_scrapper');

        if (subsError) throw subsError;

        return NextResponse.json({ success: true, users, subscriptions });
    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const supabaseAdmin = getAdminClient();
        const body = await request.json();
        const { action, email, status, expiry } = body;

        if (action === 'toggle_subscription') {
            const { error } = await supabaseAdmin
                .from('shared_subscriptions')
                .upsert({ 
                    email: email, 
                    app_id: 'mc_scrapper', 
                    status: status, 
                    ...(expiry ? { expiry: expiry } : {})
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
