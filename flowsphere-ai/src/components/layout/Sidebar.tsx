'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Map, LayoutDashboard, Navigation, MessageSquare, Settings, HelpCircle, Clock, ShieldAlert } from 'lucide-react';
import { useVenue } from '@/context/VenueContext';
import clsx from 'clsx';

const navItems = [
  { label: 'OVERVIEW', href: '/dashboard', icon: LayoutDashboard },
  { label: 'LIVE INSIGHTS', href: '/map', icon: Map },
  { label: 'VENUE MAP', href: '/map', icon: ShieldAlert },
  { label: 'AI ASSISTANT', href: '/chat', icon: MessageSquare },
  { label: 'SETTINGS', href: '#', icon: Settings },
];

const bottomItems = [
  { label: 'SUPPORT', href: '#', icon: HelpCircle },
  { label: 'LOGS', href: '#', icon: Clock },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { state } = useVenue();
  const unreads = state.alerts.filter((a) => !a.acknowledged).length;

  return (
    <aside className="w-[230px] min-h-screen bg-[#0d0d12] border-r border-gray-800/60 flex flex-col">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-gray-800/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="text-cyan-400 font-bold text-sm tracking-wider">FLOWSPHERE</div>
            <div className="text-gray-500 text-[10px] tracking-widest uppercase">Live Monitoring</div>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive =
            pathname === href ||
            (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link
              key={label}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold tracking-widest transition-all duration-200',
                isActive
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                  : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
              {label === 'AI ASSISTANT' && unreads > 0 && (
                <span className="ml-auto w-4 h-4 rounded-full bg-cyan-500 text-black text-[9px] font-bold flex items-center justify-center">
                  {unreads}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* New Event Button */}
      <div className="px-3 pb-4">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold tracking-wider transition-all duration-200">
          + New Event
        </button>
      </div>

      {/* Bottom Items */}
      <div className="px-3 pb-4 border-t border-gray-800/60 pt-4 space-y-1">
        {bottomItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold tracking-widest text-gray-600 hover:text-gray-300 hover:bg-white/5 transition-all"
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
