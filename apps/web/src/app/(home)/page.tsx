import Logo from "@/components/logo";
import { Cpu } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="h-screen bg-gray-950 text-gray-100 font-sans overflow-hidden">
      {/* Subtle grid background */}

      {/* Glow effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl -translate-y-1/2" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl translate-y-1/2" />

      <main className="relative z-10 h-full flex flex-col justify-between p-8 max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center">
          <Logo />
        </header>

        {/* Footer */}
        <footer className="text-gray-500 text-xs flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span>Nexus Technologies</span>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-300 transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">
              Privacy
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
