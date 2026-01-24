import Link from "next/link";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="glass border-t border-white/10 mt-auto">
            <div className="w-full max-w-7xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                            MC Scrapper <span className="text-primary">Pro</span>
                        </span>
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-400 sm:mb-0">
                        <li>
                            <Link href="/privacy-policy" className="hover:text-primary me-4 md:me-6 transition-colors">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-primary me-4 md:me-6 transition-colors">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link href="/pricing" className="hover:text-primary transition-colors">
                                Pricing
                            </Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-white/10 sm:mx-auto lg:my-8" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <span className="block text-sm text-gray-400 sm:text-center">
                        © {new Date().getFullYear()} <a href="https://eptasky.com" className="hover:underline text-primary">Eptasky™</a>. All Rights Reserved.
                    </span>

                    <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-400">
                        <a href="mailto:contact@eptasky.com" className="flex items-center gap-2 hover:text-white transition-colors">
                            <Mail size={16} /> contact@eptasky.com
                        </a>
                        <a href="https://wa.me/923070467687" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-400 transition-colors">
                            <Phone size={16} /> +92 307 0467687
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
