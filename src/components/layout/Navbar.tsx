'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, User, Activity } from 'lucide-react';
import { useVenue } from '@/context/VenueContext';

export default function Navbar() {
  const { state } = useVenue();
  const unreads = state.alerts.filter((a) => !a.acknowledged).length;
  const pathname = usePathname();

  return (
    <header
      className="h-14 border-b border-gray-800/60 bg-[#0a0a0f]/90 backdrop-blur-md flex items-center px-6 gap-6 sticky top-0 z-50"
      role="banner"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mr-4" aria-label="FlowSphere AI — Home">
        <div
          className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center"
          aria-hidden="true"
        >
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
        </div>
        <span className="text-white font-bold text-sm tracking-wider">
          FlowSphere <span className="text-cyan-400">AI</span>
        </span>
      </Link>

      {/* Nav Links */}
      <nav className="flex items-center gap-5" aria-label="Main navigation">
        <NavLink href="/dashboard" pathname={pathname}>Dashboard</NavLink>
        <NavLink href="/map" pathname={pathname}>Heatmap</NavLink>
        <NavLink href="/navigate" pathname={pathname}>Navigate</NavLink>
        <NavLink href="/chat" pathname={pathname}>Assistant</NavLink>
        <NavLink href="/admin" pathname={pathname}>Events</NavLink>
      </nav>

      {/* Right side controls */}
      <div className="ml-auto flex items-center gap-4">
        {/* Alert bell */}
        <button
          className="relative p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          aria-label={`Notifications — ${unreads} unread alert${unreads !== 1 ? 's' : ''}`}
        >
          <Bell className="w-4 h-4 text-gray-400" aria-hidden="true" />
          {unreads > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 text-[8px] font-bold text-white flex items-center justify-center"
              aria-hidden="true"
            >
              {unreads}
            </span>
          )}
        </button>

        {/* Live status */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/60 border border-gray-700/60"
          aria-label="System status: live"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
          <span className="text-gray-300 text-xs font-mono tracking-widest">FS_▸RKLE</span>
        </div>

        {/* Admin Panel */}
        <Link
          href="/admin"
          className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold tracking-wider transition-all duration-200"
          aria-label="Open Admin Panel"
        >
          Admin Panel
        </Link>

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center"
          aria-label="User profile"
          role="img"
        >
          <User className="w-4 h-4 text-white" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  pathname,
  children,
}: {
  href: string;
  pathname: string;
  children: React.ReactNode;
}) {
  const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={`text-sm font-medium transition-colors ${
        isActive ? 'text-white border-b-2 border-cyan-400 pb-0.5' : 'text-gray-400 hover:text-gray-200'
      }`}
    >
      {children}
    </Link>
  );
}
