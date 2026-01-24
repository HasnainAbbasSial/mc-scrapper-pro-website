export default function PrivacyPolicy() {
    return (
        <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
            <div className="max-w-3xl mx-auto prose prose-invert">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <p className="lead text-xl text-gray-400 mb-8">
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-white">1. Introduction</h2>
                    <p className="text-gray-300">
                        Welcome to MC Scrapper Pro (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy.
                        This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you use our software application MC Scrapper Pro and the website mcscrap.eptasky.com.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-white">2. Information We Collect</h2>
                    <p className="text-gray-300 mb-4">
                        We collect information that you provide solely for the purpose of licensing and functionality.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                        <li><strong>Personal Data:</strong> Email address for license activation.</li>
                        <li><strong>Usage Data:</strong> We do NOT collect data on what you scrape. Your scraping activity is local to your machine.</li>
                        <li><strong>Payment Data:</strong> We do not store credit card details. Payments are processed by third-party secure gateways.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-white">3. How We Use Your Information</h2>
                    <p className="text-gray-300">
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300 mt-2">
                        <li>Activate and manage your software license.</li>
                        <li>Send you technical notices, updates, and support messages.</li>
                        <li>Respond to your comments and customer service requests.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-white">4. Data Security</h2>
                    <p className="text-gray-300">
                        We use administrative, technical, and physical security measures to help protect your personal information.
                        However, please remember that no transmission over the internet or method of electronic storage is 100% secure.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-white">5. Contact Us</h2>
                    <p className="text-gray-300">
                        If you have questions or comments about this policy, you may email us at <a href="mailto:contact@eptasky.com" className="text-primary hover:underline">contact@eptasky.com</a>.
                    </p>
                </section>
            </div>
        </div>
    );
}
