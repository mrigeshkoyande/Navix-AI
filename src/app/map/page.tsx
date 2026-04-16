'use client';

import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import StadiumMap from '@/components/map/StadiumMap';
import { useVenue } from '@/context/VenueContext';
import { Card } from '@/components/ui/Card';
import { Layers, Locate } from 'lucide-react';

export default function MapPage() {
  const { state } = useVenue();
  const { stats } = state;

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0f]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-hidden p-4 flex gap-4">
          {/* Map area */}
          <div className="flex-1 relative">
            <StadiumMap />
            {/* Top-right controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <button className="w-9 h-9 rounded-xl bg-gray-900/80 border border-gray-700/60 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/40 transition-all backdrop-blur-sm">
                <Layers className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-xl bg-gray-900/80 border border-gray-700/60 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/40 transition-all backdrop-blur-sm">
                <Locate className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Side panel with zone stats */}
          <div className="w-64 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
            <Card className="p-4">
              <div className="text-[10px] text-gray-500 tracking-widest uppercase mb-3">Venue Pulse</div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Total Occupancy</span>
                    <span className="text-white font-bold">{stats.liveOccupancy.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-800">
                    <div className="h-1.5 rounded-full bg-cyan-500 transition-all duration-700" style={{ width: `${Math.round((stats.liveOccupancy / stats.totalCapacity) * 100)}%` }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-gray-800/50 rounded-lg p-2">
                    <div className="text-[10px] text-gray-500">Active Zones</div>
                    <div className="text-white font-bold text-lg">{state.zones.length}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-2">
                    <div className="text-[10px] text-gray-500">Critical</div>
                    <div className="text-red-400 font-bold text-lg">{state.zones.filter(z => z.density === 'critical').length}</div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="text-[10px] text-gray-500 tracking-widest uppercase px-1">All Zones</div>
            {state.zones.map((zone) => {
              const pct = Math.round((zone.current / zone.capacity) * 100);
              const dotColor = {
                optimal: 'bg-green-400',
                moderate: 'bg-yellow-400',
                high: 'bg-orange-400',
                critical: 'bg-red-400',
              }[zone.density];
              return (
                <button
                  key={zone.id}
                  onClick={() => {}}
                  className="text-left bg-gray-900/50 border border-gray-800/60 rounded-xl p-3 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                    <span className="text-white text-xs font-semibold truncate">{zone.name}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500 mb-1.5">
                    <span>{zone.current.toLocaleString()} people</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="w-full h-1 rounded-full bg-gray-800">
                    <div
                      className={`h-1 rounded-full ${dotColor} transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
