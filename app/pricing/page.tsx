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

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Monthly Plan */}
                <PricingCard
                    title="Monthly"
                    price="$7"
                    period="/mo"
                    features={[
                        "Unlimited Scraping",
                        "Real-time SaferWeb Data",
                        "Export to CSV/Excel",
                        "Multiple Search Filters",
                        "Basic Support"
                    ]}
                    buttonText="Get Started"
                    href="/contact"
                />

                {/* Yearly Plan */}
                <PricingCard
                    title="Yearly"
                    price="$70"
                    period="/yr"
                    isPopular
                    features={[
                        "All Monthly Features",
                        "2 Months Extra Bonus Free",
                        "Priority Support",
                        "Early Access to Updates",
                        "Advanced Filtering Options"
                    ]}
                    buttonText="Get Started"
                    href="/contact"
                />

                {/* Lifetime Plan */}
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-purple-900/20 border border-primary/30 flex flex-col hover:border-primary/50 transition-all duration-300">
                    <div className="absolute top-0 right-0 p-4">
                        <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                            LIMITED
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white">Lifetime License</h3>
                    <div className="mb-6 flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-white">Contact Us</span>
                    </div>

                    <p className="text-gray-400 mb-8 text-sm">
                        One-time payment for lifetime access. No recurring fees. Perfect for established agencies.
                    </p>

                    <div className="space-y-4 mb-8 flex-grow">
                        <FeatureItem text="One-Time Payment" />
                        <FeatureItem text="Lifetime Updates" />
                        <FeatureItem text="VIP Support 24/7" />
                        <FeatureItem text="White-label Options" />
                    </div>

                    <Link
                        href="/contact"
                        className="w-full py-4 rounded-xl border border-primary text-primary hover:bg-primary hover:text-white font-semibold transition-all text-center flex items-center justify-center gap-2"
                    >
                        Contact to Buy <Info size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

function PricingCard({ title, price, period, features, buttonText, href, isPopular = false }:
    { title: string, price: string, period: string, features: string[], buttonText: string, href: string, isPopular?: boolean }) {
    return (
        <div className={`relative p-8 rounded-3xl border flex flex-col transition-all duration-300 ${isPopular ? 'bg-white/5 border-primary shadow-lg shadow-primary/10' : 'bg-transparent border-white/10 hover:border-white/20'}`}>
            {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg">
                        MOST POPULAR
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
