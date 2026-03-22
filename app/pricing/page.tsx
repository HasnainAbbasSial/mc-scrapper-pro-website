import Link from "next/link";
import { Check, Info } from "lucide-react";

export default function PricingPage() {
    return (
        <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Choose the plan that best fits your business needs.
                    <span className="block text-primary mt-2 text-sm font-semibold tracking-wide uppercase">
                        Start scraping in minutes
                    </span>
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {/* Free Plan */}
                <PricingCard
                    title="Free Version"
                    price="$0"
                    period="/mo"
                    badge="NEW!"
                    features={[
                        "100 MC Numbers / day",
                        "Up to 4 bulk files / day",
                        "Basic data extraction",
                        "Standard Cooldowns",
                        "Instant Access on Login",
                        "No Credit Card Required"
                    ]}
                    buttonText="Start Scraping"
                    href="/login"
                />

                {/* Monthly Plan */}
                <PricingCard
                    title="Monthly"
                    price="$7"
                    period="/mo"
                    isPopular
                    features={[
                        "Unlimited Daily Scraping",
                        "Unlimited Bulk Imports",
                        "Access to Advanced Fields",
                        "Advanced OA Filters",
                        "VIP Priority Support",
                        "Continuous Free Updates"
                    ]}
                    buttonText="Get Started"
                    href="/contact"
                />

                {/* Yearly Plan */}
                <PricingCard
                    title="Yearly"
                    price="$70"
                    period="/yr"
                    badge="BEST VALUE"
                    features={[
                        "All Monthly Features",
                        "Unlimited Scraping & Imports",
                        "Save 2 Months Free",
                        "Discounted Annual Rate",
                        "Priority Support",
                        "Early Access to Updates"
                    ]}
                    buttonText="Get Started"
                    href="/contact"
                />

                {/* Lifetime Plan */}
                <div className="relative p-6 lg:p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-purple-900/10 border border-white/5 flex flex-col hover:border-white/20 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4">
                        <span className="bg-gray-800 border border-gray-600 text-gray-300 text-xs font-bold px-3 py-1 rounded-full">
                            LIMITED SLOTS
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white">Lifetime License</h3>
                    <div className="mb-6 flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-white">Contact Us</span>
                    </div>

                    <p className="text-gray-400 mb-8 text-sm">
                        One-time payment. We recommend Monthly/Yearly for guaranteed continuous updates.
                    </p>

                    <div className="space-y-4 mb-8 flex-grow">
                        <FeatureItem text="Unlimited Scraping" />
                        <FeatureItem text="One-Time Payment" />
                        <FeatureItem text="Premium Option" />
                    </div>

                    <Link
                        href="/contact"
                        className="w-full py-4 rounded-xl border border-white/20 text-gray-300 hover:bg-white/10 font-semibold transition-all text-center flex items-center justify-center gap-2"
                    >
                        Contact to Buy <Info size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

function PricingCard({ title, price, period, features, buttonText, href, isPopular = false, badge }:
    { title: string, price: string, period: string, features: string[], buttonText: string, href: string, isPopular?: boolean, badge?: string }) {
    return (
        <div className={`relative p-6 lg:p-8 rounded-3xl border flex flex-col transition-all duration-300 ${isPopular ? 'bg-white/5 border-primary shadow-lg shadow-primary/10 scale-105 z-10' : 'bg-transparent border-white/10 hover:border-white/20'}`}>
            {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-full text-center">
                    <span className="bg-primary text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg">
                        RECOMMENDED 🔥
                    </span>
                </div>
            )}
            
            {!isPopular && badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-full text-center">
                    <span className="bg-blue-500 text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg">
                        {badge}
                    </span>
                </div>
            )}

            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">{price}</span>
                <span className="text-gray-400">{period}</span>
            </div>

            <div className="space-y-4 mb-8 flex-grow">
                {features.map((feature, i) => (
                    <FeatureItem key={i} text={feature} />
                ))}
            </div>

            <Link
                href={href}
                className={`w-full py-4 rounded-xl font-semibold transition-all text-center ${isPopular ? 'bg-primary hover:bg-primary-hover text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
            >
                {buttonText}
            </Link>
        </div>
    );
}

function FeatureItem({ text }: { text: string }) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-1 p-0.5 rounded-full bg-green-500/20 text-green-400">
                <Check size={12} strokeWidth={3} />
            </div>
            <span className="text-gray-300 text-sm">{text}</span>
        </div>
    );
}
