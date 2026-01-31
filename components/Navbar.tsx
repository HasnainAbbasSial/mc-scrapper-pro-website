"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Download, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Features", href: "/#features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Contact", href: "/contact" },
        { name: "Login", href: "/login" },
    ];

    return (
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 glass">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="bg-primary/20 p-2 rounded-lg text-primary">
                        <ShieldCheck size={28} />
                    </div>
                    <span className="self-center text-xl font-bold whitespace-nowrap text-white font-sans tracking-tight">
                        MC Scrapper <span className="text-primary">Pro</span>
                    </span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <Link
                        href="/download"
                        className="text-white bg-primary hover:bg-primary-hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 transition-all"
                    >
                        <Download size={18} />
                        Download Now
                    </Link>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        aria-controls="navbar-sticky"
                        aria-expanded={isOpen ? "true" : "false"}
                    >
                        <span className="sr-only">Open main menu</span>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                <div
                    className={clsx(
                        "items-center justify-between w-full md:flex md:w-auto md:order-1 transition-all duration-300 ease-in-out",
                        {
                            hidden: !isOpen,
                            block: isOpen,
                        }
                    )}
                    id="navbar-sticky"
                >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-white/10 rounded-lg bg-surface/80 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent backdrop-blur-md md:backdrop-blur-none">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={clsx(
                                        "block py-2 px-3 rounded md:p-0 transition-colors",
                                        pathname === link.href
                                            ? "text-primary bg-white/10 md:bg-transparent md:text-primary"
                                            : "text-gray-300 hover:bg-white/10 md:hover:bg-transparent md:hover:text-primary"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
