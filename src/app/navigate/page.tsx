'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useVenue } from '@/context/VenueContext';
import { ArrowRight, Check, Navigation, AlertCircle, RotateCcw } from 'lucide-react';
import clsx from 'clsx';

const DESTINATIONS = [
  { id: 'd1', name: 'Gate A', sub: 'International Departures • Level 2', distance: 320, eta: 252 },
  { id: 'd2', name: 'East Food Court', sub: 'Level 1 • Station B', distance: 180, eta: 108 },
  { id: 'd3', name: 'VIP Lounge', sub: 'Level 3 • Executive Wing', distance: 450, eta: 324 },
  { id: 'd4', name: 'Exit Gate 4', sub: 'North East • Emergency', distance: 220, eta: 132 },
];

const WAYPOINTS = [
  { step: 1, instruction: 'Turn slight right at', highlight: 'Concourse B', detail: 'Then continue straight for 150m towards the Escalators.', distance: '40m', pct: 30 },
  { step: 2, instruction: 'Take escalator up to', highlight: 'Level 2', detail: 'Follow the blue wayfinding strip to Gate A security.', distance: '80m', pct: 55 },
  { step: 3, instruction: 'Proceed through', highlight: 'Security Gate A', detail: 'AI priority lane active — expect <2 min wait.', distance: '200m', pct: 100 },
];

function RouteMapSVG({ hasCongestion }: { hasCongestion: boolean }) {
  return (
    <svg viewBox="0 0 600 400" className="w-full h-full">
      {/* Background */}
      <rect width="600" height="400" fill="#0a0a0f" />
      {/* Grid */}
      {Array.from({ length: 15 }, (_, i) => (
        <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="400" stroke="#111827" strokeWidth="1" />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 40} x2="600" y2={i * 40} stroke="#111827" strokeWidth="1" />
      ))}

      {/* Zone blocks */}
      <rect x="60" y="80" width="160" height="100" rx="8" fill="#111827" stroke="#1e293b" />
      <rect x="320" y="80" width="220" height="120" rx="8" fill="#111827" stroke="#1e293b" />
      <rect x="200" y="240" width="200" height="100" rx="8" fill="#1a1a2e" stroke="#1e293b" />

      {/* Congestion zone */}
      {hasCongestion && (
        <circle cx="340" cy="210" r="40" fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.4)" strokeWidth="2" />
      )}

      {/* Route path */}
      <path
        d="M 130 310 C 200 300, 200 200, 340 200 C 440 200, 480 150, 540 140"
        fill="none"
        stroke="url(#routeGrad)"
        strokeWidth="4"
        strokeLinecap="round"
        className="route-path"
      />
      <defs>
        <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>

      {/* Glow overlay */}
      <path
        d="M 130 310 C 200 300, 200 200, 340 200 C 440 200, 480 150, 540 140"
        fill="none"
        stroke="rgba(0,212,255,0.15)"
        strokeWidth="16"
        strokeLinecap="round"
      />

      {/* Start dot */}
      <circle cx="130" cy="310" r="8" fill="#00d4ff" />
      <circle cx="130" cy="310" r="16" fill="rgba(0,212,255,0.2)" />

      {/* End dot */}
      <circle cx="540" cy="140" r="8" fill="#7c3aed" />
      <circle cx="540" cy="140" r="16" fill="rgba(124,58,237,0.2)" />

      {/* Congestion label */}
      {hasCongestion && (
        <>
          <rect x="260" y="190" width="180" height="24" rx="4" fill="#1a0a0a" stroke="#ef4444" strokeWidth="1" />
          <text x="350" y="206" textAnchor="middle" fill="#ef4444" fontSize="10" fontFamily="monospace" fontWeight="bold">
            HIGH CROWD DENSITY DETECT
          </text>
        </>
      )}
    </svg>
  );
}

export default function NavigatePage() {
  const { state } = useVenue();
  const [selected, setSelected] = useState(DESTINATIONS[0]);
  const [rerouted, setRerouted] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const congestionZone = state.zones.find((z) => z.density === 'critical');

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0f]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-hidden flex gap-4 p-4">
          {/* Map */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Destination header */}
            <div className="bg-gray-900/70 border border-gray-800/60 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                <Navigation className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-white font-bold text-base">{selected.name}</div>
                <div className="text-gray-500 text-xs">{selected.sub}</div>
              </div>
              <div className="ml-auto grid grid-cols-2 gap-4 text-right">
                <div>
                  <div className="text-[10px] text-gray-600 uppercase tracking-widest">ETA</div>
                  <div className="text-white font-bold">{Math.floor(selected.eta / 60)}m {selected.eta % 60}s</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-600 uppercase tracking-widest">Distance</div>
                  <div className="text-white font-bold">{selected.distance}m</div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="flex-1 rounded-2xl overflow-hidden border border-gray-800/60 relative">
              <RouteMapSVG hasCongestion={!!congestionZone && !accepted} />
            </div>

            {/* Crowd avoidance banner */}
            {congestionZone && !accepted && (
              <div className="bg-red-950/60 border border-red-500/30 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                </div>
                <div className="flex-1">
                  <div className="text-red-300 font-bold text-sm">Crowd Avoidance Active</div>
                  <div className="text-red-400/70 text-xs">AI has found a 45s faster route avoiding the Central Hub bottleneck.</div>
                </div>
                <button
                  onClick={() => setAccepted(true)}
                  className="px-4 py-2 rounded-lg bg-red-500/30 border border-red-500/50 text-red-300 text-xs font-bold hover:bg-red-500/40 transition-colors"
                >
                  Accept
                </button>
              </div>
            )}

            {/* Waypoint instructions */}
            <div className="bg-gray-900/70 border border-gray-800/60 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[10px] text-gray-600 uppercase tracking-widest">NEXT MANEUVER</div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[10px] text-cyan-400 font-bold">Real-time Optimization</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-gray-600 uppercase tracking-widest">FASTEST</div>
                  <div className="text-white font-bold">100%</div>
                  <div className="w-16 h-1 rounded-full bg-cyan-500 mt-1" />
                </div>
              </div>
              {WAYPOINTS[activeStep] && (
                <div className="flex gap-4 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-gray-800 border border-gray-700 flex flex-col items-center justify-center flex-shrink-0">
                    <ArrowRight className="w-5 h-5 text-white" style={{ transform: 'rotate(-45deg)' }} />
                    <div className="text-[10px] text-gray-500 font-bold mt-1">{WAYPOINTS[activeStep].distance}</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">
                      {WAYPOINTS[activeStep].instruction}{' '}
                      <span className="text-cyan-400">{WAYPOINTS[activeStep].highlight}</span>
                    </div>
                    <div className="text-gray-400 text-sm mt-1">{WAYPOINTS[activeStep].detail}</div>
                  </div>
                </div>
              )}
              {/* Progress dots */}
              <div className="flex gap-2 mt-4">
                {WAYPOINTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={clsx('h-1 rounded-full transition-all', i === activeStep ? 'w-8 bg-cyan-500' : 'w-4 bg-gray-700')}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Destination picker */}
          <div className="w-60 flex flex-col gap-3">
            <div className="text-[10px] text-gray-600 tracking-widest uppercase">Select Destination</div>
            {DESTINATIONS.map((dest) => (
              <button
                key={dest.id}
                onClick={() => setSelected(dest)}
                className={clsx(
                  'text-left rounded-xl border p-3 transition-all',
                  selected.id === dest.id
                    ? 'border-cyan-500/40 bg-cyan-500/10'
                    : 'border-gray-800/60 bg-gray-900/50 hover:border-gray-600/60'
                )}
              >
                <div className="text-white text-sm font-semibold">{dest.name}</div>
                <div className="text-gray-500 text-[10px] mt-0.5">{dest.sub}</div>
                <div className="flex gap-3 mt-2 text-[10px] text-gray-500">
                  <span>{dest.distance}m</span>
                  <span>{Math.floor(dest.eta / 60)}m {dest.eta % 60}s</span>
                </div>
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
