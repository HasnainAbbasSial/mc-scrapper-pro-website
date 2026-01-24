"use client";

import { useEffect } from "react";
import { Mail, MessageCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    useEffect(() => {
        // Redirect logic
        const timer = setTimeout(() => {
            window.location.href = "https://eptasky.com/contact";
        }, 3000); // 3 second delay to read the message

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen flex items-center justify-center">
            <div className="text-center p-8 max-w-lg">
                <div className="mb-6 mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary animate-pulse">
                    <ExternalLink size={32} />
                </div>
                <h1 className="text-3xl font-bold mb-4">Redirecting you...</h1>
                <p className="text-gray-400 mb-8">
                    We are taking you to our main contact page at Eptasky.com.
                    If you are not redirected automatically, please click the link below.
                </p>

                <a
                    href="https://eptasky.com/contact"
                    className="inline-block px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-colors mb-12"
                >
                    Go to Contact Page
                </a>

                <div className="border-t border-white/10 pt-8">
                    <p className="text-sm text-gray-500 mb-4">Direct Contact Methods:</p>
                    <div className="flex flex-col gap-3 items-center">
                        <a href="mailto:contact@eptasky.com" className="flex items-center gap-2 text-gray-300 hover:text-white">
                            <Mail size={16} /> contact@eptasky.com
                        </a>
                        <a href="https://wa.me/923070467687" className="flex items-center gap-2 text-gray-300 hover:text-green-400">
                            <MessageCircle size={16} /> +92 307 0467687 (WhatsApp)
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
