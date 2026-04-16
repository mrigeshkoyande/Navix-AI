'use client';

import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import ChatWindow from '@/components/chat/ChatWindow';
import { useVenue } from '@/context/VenueContext';
import { AlertTriangle, Wifi, Camera, Bot, MoreVertical } from 'lucide-react';

export default function ChatPage() {
  const { state } = useVenue();
  const { alerts } = state;
  const activeAlerts = alerts.filter((a) => !a.acknowledged);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0f]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-hidden flex gap-0">
          {/* Chat panel */}
          <div className="flex-1 flex flex-col border-r border-gray-800/60">
            {/* Chat header */}
            <div className="px-6 py-4 border-b border-gray-800/60 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-cyan-500/30 flex items-center justify-center">
                <Bot className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="text-white font-bold">AI Assistant</div>
                <div className="text-gray-500 text-[10px] tracking-widest uppercase">Real-time Venue Neural Link</div>
              </div>
              <button className="ml-auto text-gray-600 hover:text-gray-300 transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <ChatWindow />
          </div>

          {/* Right sidebar */}
          <div className="w-72 flex flex-col gap-4 p-4 overflow-y-auto custom-scrollbar">
            {/* Live Venue Pulse */}
            <div>
              <div className="text-[10px] text-gray-600 tracking-widest uppercase mb-3">Live Venue Pulse</div>
              <div className="bg-gray-900/70 border border-gray-800/60 rounded-2xl overflow-hidden">
                {/* Thumbnail */}
                <div className="relative h-28 bg-gradient-to-br from-cyan-900/30 to-purple-900/30 flex items-center justify-center">
                  <div className="absolute inset-0 grid-bg opacity-30" />
                  <div className="w-16 h-16 rounded-full border border-cyan-500/20 animate-spin-slow flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30" />
                  </div>
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-[9px] font-bold tracking-widest uppercase">Main Entrance</span>
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-white font-bold text-sm">Stable Flow</div>
                  <div className="text-gray-500 text-xs mt-1">Main entrance operating at optimal capacity</div>
                </div>
              </div>
            </div>

            {/* Active Alerts */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="text-[10px] text-gray-600 tracking-widest uppercase">Active Alerts</div>
                {activeAlerts.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[9px] font-bold border border-red-500/30">
                    {activeAlerts.length} New
                  </span>
                )}
              </div>
              <div className="space-y-2">
                {activeAlerts.slice(0, 3).map((alert) => (
                  <div key={alert.id} className="bg-gray-900/70 border border-gray-800/60 rounded-xl p-3 flex gap-3">
                    <div className="w-7 h-7 rounded-lg bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-white text-xs font-semibold">{alert.title}</div>
                      <div className="text-gray-500 text-[10px] mt-0.5">{alert.message.slice(0, 60)}...</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Connected Systems */}
            <div>
              <div className="text-[10px] text-gray-600 tracking-widest uppercase mb-3">Connected Systems</div>
              <div className="space-y-2">
                {[
                  { icon: Wifi, label: 'IoT Hub', status: 'ONLINE', color: 'text-green-400' },
                  { icon: Camera, label: 'Vision AI', status: 'ACTIVE', color: 'text-cyan-400' },
                ].map(({ icon: Icon, label, status, color }) => (
                  <div key={label} className="bg-gray-900/70 border border-gray-800/60 rounded-xl p-3 flex items-center gap-3">
                    <Icon className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-300 text-xs flex-1">{label}</span>
                    <span className={`text-[10px] font-bold tracking-wider ${color}`}>{status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Zone summary */}
            <div>
              <div className="text-[10px] text-gray-600 tracking-widest uppercase mb-3">Zone Summary</div>
              <div className="space-y-1">
                {state.zones.slice(0, 4).map((zone) => (
                  <div key={zone.id} className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-900/50 border border-gray-800/40">
                    <span className="text-gray-400 text-xs truncate">{zone.name}</span>
                    <span className={`text-[10px] font-bold ml-2 ${
                      zone.density === 'critical' ? 'text-red-400' :
                      zone.density === 'high' ? 'text-orange-400' :
                      zone.density === 'moderate' ? 'text-yellow-400' : 'text-green-400'
                    }`}>{zone.waitTime}m</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
