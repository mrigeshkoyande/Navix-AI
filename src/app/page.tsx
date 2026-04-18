'use client';

import Link from 'next/link';
import { ArrowRight, Activity, Zap, Navigation, BarChart3, MessageSquareText, Globe } from 'lucide-react';

const stats = [
  { value: '150%', label: 'EFFICIENCY INCREASE' },
  { value: '12ms', label: 'DECISION LATENCY', color: 'text-cyan-400' },
  { value: '40k+', label: 'LIVE SENSORS TRACKED' },
];

const features = [
  {
    icon: BarChart3,
    title: 'Predictive Heatmaps',
    desc: 'Visualize future density. Our AI models the aspects of scenarios to prevent congestion at exits, concourses, and corridors.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: MessageSquareText,
    title: 'AI Assistant',
    desc: 'Natural language queries — "Where is the nearest low-wait restroom?" answered in <12 ms by our Neural Core.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    icon: Navigation,
    title: 'Smart Nav',
    desc: 'Suggest fastest routes that update in real-time based on crowd density and avoid bottlenecks automatically.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: Globe,
    title: 'Real-time Multi-Venue Sync',
    desc: 'Manage an entire sports district from a single dashboard. Synchronize parking, transit, and venue elements.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/20',
  },
];



export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 inset-x-0 z-50 h-14 border-b border-gray-800/60 bg-[#0a0a0f]/80 backdrop-blur-md flex items-center px-8 gap-6">
        <div className="flex items-center gap-2 mr-auto">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <span className="font-bold text-sm tracking-wider">FlowSphere <span className="text-cyan-400">AI</span></span>
          <span className="ml-3 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-[9px] font-bold tracking-widest border border-cyan-500/30">LIVE</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          {['Dashboard', 'Real-top', 'Events'].map((l) => (
            <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/60 border border-gray-700/60">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-gray-300 text-xs font-mono tracking-widest">FS_▸RKLE</span>
          </div>
          <Link href="/dashboard" className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold tracking-wider transition-all">
            Admin Panel
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center grid-bg pt-14">
        {/* Background glows */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-mono tracking-widest">LIVE SYSTEM ONLINE</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
              Orchestrate the{' '}
              <span className="text-gradient-cyan">Flow</span>
              <br />of Crowds.
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
              FlowSphere AI transforms massive venue data into predictive human experiences. Elevate stadium operations with real-time neural mapping and autonomous logistics.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all duration-200 hover:scale-105">
                Enter Sphere <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/map" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white transition-all duration-200">
                View Live Demo
              </Link>
            </div>
          </div>

          {/* Right — Core Thesis card */}
          <div className="space-y-4">
            <div className="text-[10px] text-gray-600 tracking-widest uppercase mb-3">CORE THESIS</div>
            <div className="bg-gray-900/60 border border-gray-800/60 rounded-2xl p-6 backdrop-blur-sm">
              <h2 className="text-white font-bold text-lg mb-3">The Future of Stadium Experiences</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                AI-first instead of digital-first. Attendees are guided by autonomously listening AI (v2.1) which learns their behavioral patterns and anticipates through &quot;Fluid Navigation&quot; protocols.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Navigation, label: 'Predictive Mappers', sub: 'Route optimization active' },
                  { icon: Zap, label: 'Autonomous in Dispatch', sub: 'Security Architecture live' },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-center gap-3 bg-gray-800/50 rounded-xl p-3 border border-gray-700/40">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">{label}</div>
                      <div className="text-gray-500 text-xs">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black mb-3">Neural Intelligence Modules</h2>
        <p className="text-gray-500 mb-12">Four core AI systems working in concert to deliver venue intelligence</p>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className={`rounded-2xl border p-6 ${bg} hover:scale-[1.01] transition-transform duration-200`}>
              <div className={`w-10 h-10 rounded-xl bg-current/10 flex items-center justify-center mb-4 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-white font-bold text-base mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 border-y border-gray-800/60">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center px-8">
          {stats.map(({ value, label, color }) => (
            <div key={label}>
              <div className={`text-5xl font-black mb-2 ${color || 'text-white'}`}>{value}</div>
              <div className="text-gray-600 text-xs tracking-widest uppercase">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* GLOBE SECTION */}
      <section className="py-24 px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-black mb-4">Built for Global Scale.</h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            From local arenas to International Olympic clusters, FlowSphere provides an AI-first intelligence layer for the world&apos;s most complex event environments.
          </p>
          <div className="flex gap-3">
            {['NY · LOI · TRI · +6', 'ACTIVE DEPLOYMENTS'].map((t) => (
              <div key={t} className="px-3 py-1.5 rounded-full border border-gray-700 text-gray-400 text-xs tracking-wider">
                {t}
              </div>
            ))}
          </div>
        </div>
        {/* Globe placeholder */}
        <div className="relative flex items-center justify-center h-64">
          <div className="w-48 h-48 rounded-full border border-cyan-500/20 flex items-center justify-center animate-spin-slow">
            <div className="w-32 h-32 rounded-full border border-purple-500/20 flex items-center justify-center">
              <Globe className="w-12 h-12 text-cyan-400/40" />
            </div>
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/5 to-purple-500/5 blur-2xl" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800/60 py-12 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="font-bold">FlowSphere AI</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Redefining human flow in the digital age. Our mission is to ensure the world&apos;s largest gathering spaces flow and reach more trust.
            </p>
          </div>
          <div>
            <div className="text-[10px] text-gray-600 tracking-widest uppercase mb-4">ECOSYSTEM</div>
            {['Neural Hub', 'AI Data', 'Security Architecture', 'Sensor Networks'].map((l) => (
              <div key={l} className="text-gray-500 text-sm mb-2 hover:text-gray-300 cursor-pointer transition-colors">{l}</div>
            ))}
          </div>
          <div>
            <div className="text-[10px] text-gray-600 tracking-widest uppercase mb-4">COMPANY</div>
            {['Our Vision', 'Careers', 'Case Studies', 'Partnerships'].map((l) => (
              <div key={l} className="text-gray-500 text-sm mb-2 hover:text-gray-300 cursor-pointer transition-colors">{l}</div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-gray-800/60 flex items-center justify-between text-gray-700 text-xs">
          <span>© 2026 FlowSphere AI. All systems operational.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-500 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
