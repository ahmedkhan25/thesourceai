"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  Home,
  Globe,
  AlertTriangle,
  Target,
  Play,
  FileSearch,
  Layers,
  FlaskConical,
  Terminal,
  User,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/landscape", label: "AI Landscape", icon: Globe },
  { href: "/problems", label: "AI Problems", icon: AlertTriangle },
  { href: "/strategy", label: "Agent Strategy", icon: Target },
  { href: "/demos", label: "Interactive Demos", icon: Play },
  { href: "/bid-review", label: "Bid Review", icon: FileSearch },
  { href: "/architecture", label: "Architecture", icon: Layers },
  { href: "/evals", label: "Evals", icon: FlaskConical },
  { href: "/ai-coding", label: "AI Coding", icon: Terminal },
  { href: "/about", label: "About", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col bg-[#1A1A1A] h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6">
        <Image
          src="/source-logo.png"
          alt="The Source logo"
          width={32}
          height={32}
        />
        <div>
          <div className="text-sm font-semibold text-white">The Source</div>
          <div className="text-xs text-white/50">AI Explorer</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 text-xs text-white/40">
        Built by Ahmed Khan
      </div>
    </aside>
  );
}
