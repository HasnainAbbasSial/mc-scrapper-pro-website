import { Cloud, HardDrive, FileBox } from "lucide-react";

export default function DownloadPage() {
    return (
        <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen flex flex-col items-center">
            <div className="text-center mb-12 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Download MC Scrapper Pro</h1>
                <p className="text-xl text-gray-400">
                    Get the latest version of the most powerful FMCSA scraping tool on the market.
                </p>
            </div>

            <div className="w-full max-w-3xl glass-card p-10 rounded-3xl border border-white/10 text-center">
                <div className="mb-8">
                    <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 text-green-400 font-mono text-sm mb-4 border border-green-500/20">
                        Latest Version: 2.0.1 (Stable)
                    </span>
                    <p className="text-gray-400 text-sm">
                        Compatible with Windows 10/11 (64-bit)
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <DownloadButton
                        icon={<Cloud size={24} />}
                        name="Mega Drive"
                        href="https://mega.nz/file/gh5RFB6b#h7Ok_hgjO2im5Bf8Y3Fn9Lc6hD93n3YwTUK6mFt3gNo"
                        color="text-red-400"
                    />
                    <DownloadButton
                        icon={<HardDrive size={24} />}
                        name="Google Drive"
                        href="https://drive.google.com/file/d/1KpVg38Zat-7ZF4jug_ZrW5KAj4GpamU5/view?usp=drive_link"
                        color="text-blue-400"
                    />
                    <DownloadButton
                        icon={<FileBox size={24} />}
                        name="MediaFire"
                        href="https://www.mediafire.com/file/idfr3svi18tsffu/MC_Scrapper_Pro.exe/file"
                        color="text-cyan-400"
                    />
                </div>

                <div className="mt-10 border-t border-white/10 pt-8 text-left text-sm text-gray-400">
                    <p className="mb-2 font-semibold text-white">Installation Instructions:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                        <li>Download the installer from one of the mirrors above.</li>
                        <li>Run the setup file (you may need to allow it in Windows Defender).</li>
                        <li>Launch MC Scrapper Pro and enter your license key.</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}

function DownloadButton({ icon, name, href, color }: { icon: React.ReactNode, name: string, href: string, color: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all group"
        >
            <div className={`mb-3 ${color} group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <span className="font-semibold">{name}</span>
            <span className="text-xs text-gray-500 mt-1">Mirror Link</span>
        </a>
    );
}
