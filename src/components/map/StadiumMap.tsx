'use client';

import { useVenue } from '@/context/VenueContext';
import { Zone } from '@/lib/types';
import { DensityBadge } from '@/components/ui/Badge';
import { X, Navigation, Clock, Users } from 'lucide-react';

const densityColor: Record<string, string> = {
  optimal: 'rgba(34,197,94,0.35)',
  moderate: 'rgba(234,179,8,0.35)',
  high: 'rgba(249,115,22,0.4)',
  critical: 'rgba(239,68,68,0.45)',
};

const zoneTypeIcon: Record<string, string> = {
  entrance: '🚪',
  exit: '🚪',
  food: '🍔',
  restroom: '🚻',
  seating: '💺',
  vip: '⭐',
};

interface HotspotProps {
  zone: Zone;
  onClick: (z: Zone) => void;
}

function Hotspot({ zone, onClick }: HotspotProps) {
  const color = densityColor[zone.density];
  const pulseColor =
    zone.density === 'critical'
      ? 'bg-red-500'
      : zone.density === 'high'
      ? 'bg-orange-500'
      : zone.density === 'moderate'
      ? 'bg-yellow-500'
      : 'bg-green-500';

  return (
    <button
      onClick={() => onClick(zone)}
      className="absolute -translate-x-1/2 -translate-y-1/2 group"
      style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
    >
      {/* Pulse ring */}
      {zone.density === 'critical' && (
        <span className="absolute inset-0 rounded-full bg-red-500/30 animate-ping scale-150" />
      )}
      {/* Dot */}
      <span
        className={`relative block w-4 h-4 rounded-full ${pulseColor} shadow-lg border-2 border-white/20 group-hover:scale-150 transition-transform duration-200`}
      />
      {/* Glow */}
      <span
        className="absolute inset-0 rounded-full scale-[3] opacity-60 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }}
      />
    </button>
  );
}

function ZoneDetailPanel({ zone, onClose }: { zone: Zone; onClose: () => void }) {
  const occupancyPct = Math.round((zone.current / zone.capacity) * 100);
  const aiRec =
    zone.density === 'critical'
      ? `Redirect crowd flow to Gate 4. Deploy additional staff to ${zone.name} restroom facilities.`
      : zone.density === 'high'
      ? `Monitor closely. Consider opening alternate entrance to reduce load by ~20%.`
      : `Zone operating normally. Maintain current staffing levels.`;

  return (
    <div className="absolute top-4 right-4 w-[300px] bg-[#111118]/95 backdrop-blur-lg border border-gray-700/60 rounded-2xl shadow-2xl z-20">
      <div className="p-4 border-b border-gray-800/60">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[10px] text-gray-500 tracking-widest uppercase mb-1">Selected Area</div>
            <div className="text-white font-bold text-base">{zone.name}</div>
          </div>
          <div className="flex items-center gap-2">
            <DensityBadge density={zone.density} />
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 grid grid-cols-2 gap-3">
        <div className="bg-gray-800/50 rounded-xl p-3">
          <div className="flex items-center gap-1 text-[10px] text-gray-500 tracking-widest uppercase mb-1">
            <Users className="w-3 h-3" /> Current Occupancy
          </div>
          <div className="text-white font-bold text-xl">{zone.current.toLocaleString()}</div>
          <div className="text-green-400 text-[10px]">▲ {occupancyPct}% of capacity</div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-3">
          <div className="flex items-center gap-1 text-[10px] text-gray-500 tracking-widest uppercase mb-1">
            <Clock className="w-3 h-3" /> Wait Time (avg)
          </div>
          <div className="text-white font-bold text-xl">{zone.waitTime}m</div>
          <div className="text-gray-500 text-[10px]">Predicted peak: {zone.waitTime + 8}m</div>
        </div>
      </div>

      <div className="px-4 pb-2">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-gray-400">AI Recommendation</span>
          <span className="text-cyan-400 font-semibold">Priority 1</span>
        </div>
        <div className="bg-cyan-950/40 border border-cyan-500/20 rounded-xl p-3 text-cyan-300 text-xs leading-relaxed">
          {aiRec}
        </div>
      </div>

      <div className="p-4">
        <button className="w-full py-2.5 rounded-xl bg-white text-black text-sm font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
          <Navigation className="w-4 h-4" />
          Deploy Protocol
        </button>
      </div>
    </div>
  );
}

export default function StadiumMap() {
  const { state, dispatch } = useVenue();

  const selectZone = (zone: Zone) => dispatch({ type: 'SELECT_ZONE', payload: zone });
  const clearZone = () => dispatch({ type: 'SELECT_ZONE', payload: null });

  return (
    <div className="relative w-full h-full bg-[#0a0a0f] rounded-2xl overflow-hidden border border-gray-800/60">
      {/* Stadium SVG */}
      <svg viewBox="0 0 600 600" className="w-full h-full opacity-30 pointer-events-none select-none">
        {/* Outer stadium ring */}
        <ellipse cx="300" cy="300" rx="280" ry="260" fill="none" stroke="#334155" strokeWidth="2" />
        <ellipse cx="300" cy="300" rx="240" ry="220" fill="none" stroke="#1e293b" strokeWidth="1.5" />
        <ellipse cx="300" cy="300" rx="200" ry="180" fill="none" stroke="#334155" strokeWidth="1" />
        <ellipse cx="300" cy="300" rx="160" ry="140" fill="none" stroke="#1e293b" strokeWidth="1" />
        {/* Field */}
        <ellipse cx="300" cy="300" rx="110" ry="90" fill="#0f1a0f" stroke="#1d3a1d" strokeWidth="1.5" />
        <ellipse cx="300" cy="300" rx="80" ry="60" fill="none" stroke="#1d3a1d" strokeWidth="1" />
        {/* Center circle */}
        <circle cx="300" cy="300" r="20" fill="none" stroke="#1d3a1d" strokeWidth="1" />
        {/* Seating sections */}
        {Array.from({ length: 16 }, (_, i) => {
          const angle = (i / 16) * 2 * Math.PI;
          const x1 = 300 + 160 * Math.cos(angle);
          const y1 = 300 + 140 * Math.sin(angle);
          const x2 = 300 + 240 * Math.cos(angle);
          const y2 = 300 + 220 * Math.sin(angle);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1e293b" strokeWidth="1" />;
        })}
        {/* Gate markers */}
        {[0, 90, 180, 270].map((deg, i) => {
          const r = (deg * Math.PI) / 180;
          const x = 300 + 275 * Math.cos(r);
          const y = 300 + 255 * Math.sin(r);
          return (
            <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="#475569" fontSize="11" fontFamily="monospace">
              {['N', 'E', 'S', 'W'][i]}
            </text>
          );
        })}
      </svg>

      {/* Hotspots */}
      <div className="absolute inset-0">
        {state.zones.map((zone) => (
          <Hotspot key={zone.id} zone={zone} onClick={selectZone} />
        ))}
      </div>

      {/* Zone Detail Panel */}
      {state.selectedZone && (
        <ZoneDetailPanel zone={state.selectedZone} onClose={clearZone} />
      )}

      {/* Search bar */}
      <div className="absolute top-4 left-4 right-[320px]">
        <input
          placeholder="Search Location..."
          className="w-full max-w-xs px-4 py-2.5 rounded-xl bg-gray-900/80 border border-gray-700/60 text-gray-300 text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 backdrop-blur-sm"
        />
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex items-center gap-3">
        {[
          { color: 'bg-red-500', label: 'Congested' },
          { color: 'bg-orange-500', label: 'Moderate' },
          { color: 'bg-green-500', label: 'Optimal' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5 bg-gray-900/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-700/60">
            <span className={`w-2 h-2 rounded-full ${color}`} />
            <span className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">{label}</span>
          </div>
        ))}
        {['Food', 'Amenities', 'Exits'].map((tab) => (
          <button key={tab} className="flex items-center gap-1.5 bg-cyan-500/20 border border-cyan-500/40 px-3 py-1.5 rounded-full text-cyan-300 text-[10px] font-bold tracking-wider hover:bg-cyan-500/30 transition-colors">
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
