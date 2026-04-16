'use client';

import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useVenue } from '@/context/VenueContext';
import { DensityBadge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { TimeAgo } from '@/components/ui/TimeAgo';
import { Users, Zap, AlertTriangle, Clock, TrendingUp } from 'lucide-react';
import clsx from 'clsx';

function LiveCounter({ value }: { value: number }) {
  return <span className="tabular-nums text-3xl font-bold text-white">{value.toLocaleString()}</span>;
}

export default function DashboardPage() {
  const { state } = useVenue();
  const { zones, alerts, stats } = state;
  const unack = alerts.filter((a) => !a.acknowledged);

  const topStats = [
    {
      label: 'LIVE OCCUPANCY',
      value: <LiveCounter value={stats.liveOccupancy} />,
      sub: <span className="text-green-400 flex items-center gap-1 text-xs"><TrendingUp className="w-3 h-3" /> +12% from last hour</span>,
      icon: Users,
    },
    {
      label: 'AI EFFICIENCY',
      value: <span className="text-3xl font-bold text-purple-400">{stats.aiEfficiency}%</span>,
      sub: <span className="text-cyan-400 flex items-center gap-1 text-xs"><Zap className="w-3 h-3" /> Optimized Flow</span>,
      icon: Zap,
    },
    {
      label: 'ACTIVE ALERTS',
      value: <span className="text-3xl font-bold text-red-400">{String(stats.activeAlerts).padStart(2, '0')}</span>,
      sub: (
        <div className="flex gap-2 mt-1">
          <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-bold border border-red-500/30">
            CRIT {unack.filter(a => a.type === 'critical').length}
          </span>
          <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 text-[10px] font-bold border border-purple-500/30">AI</span>
        </div>
      ),
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0f]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          {/* Top stat cards */}
          <div className="grid grid-cols-3 gap-4">
            {topStats.map(({ label, value, sub, icon: Icon }) => (
              <Card key={label} className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[10px] text-gray-500 tracking-widest uppercase">{label}</div>
                  <Icon className="w-4 h-4 text-gray-600" />
                </div>
                {value}
                <div className="mt-2">{sub}</div>
              </Card>
            ))}
          </div>

          {/* Zone cards */}
          <div>
            <h2 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Zone Status — Live</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {zones.map((zone) => {
                const pct = Math.round((zone.current / zone.capacity) * 100);
                return (
                  <Card key={zone.id} className="p-4 hover:border-cyan-500/30 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-white text-sm font-semibold leading-tight">{zone.name}</div>
                      <DensityBadge density={zone.density} />
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-gray-800 mb-2">
                      <div
                        className={clsx('h-1.5 rounded-full transition-all duration-700', {
                          'bg-green-500': zone.density === 'optimal',
                          'bg-yellow-500': zone.density === 'moderate',
                          'bg-orange-500': zone.density === 'high',
                          'bg-red-500': zone.density === 'critical',
                        })}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">{pct}% full</span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <Clock className="w-3 h-3" /> {zone.waitTime}m
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Alerts */}
          <div>
            <h2 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Operational Alerts</h2>
            <div className="space-y-3">
              {alerts.slice(0, 5).map((alert) => {
                const colorMap = {
                  critical: 'border-l-red-500 bg-red-500/5',
                  warning: 'border-l-yellow-500 bg-yellow-500/5',
                  info: 'border-l-blue-500 bg-blue-500/5',
                  success: 'border-l-green-500 bg-green-500/5',
                };
                const labelMap = {
                  critical: 'text-red-400',
                  warning: 'text-yellow-400',
                  info: 'text-blue-400',
                  success: 'text-green-400',
                };
                return (
                  <div key={alert.id} className={clsx('border border-gray-800/60 border-l-4 rounded-xl p-4', colorMap[alert.type])}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className={clsx('text-[10px] font-bold tracking-widest uppercase mb-1', labelMap[alert.type])}>
                          {alert.type}
                        </div>
                        <div className="text-white text-sm font-semibold">{alert.title}</div>
                        <div className="text-gray-400 text-xs mt-1">{alert.message}</div>
                      </div>
                      <div className="text-gray-600 text-[10px] ml-4 shrink-0">
                        <TimeAgo date={alert.timestamp} />
                      </div>
                    </div>
                    {alert.type === 'critical' && !alert.acknowledged && (
                      <div className="flex gap-2 mt-3">
                        <button className="px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold hover:bg-red-500/30 transition-colors">
                          DEPLOY STAFF
                        </button>
                        <button className="px-3 py-1.5 rounded-lg bg-gray-800/60 border border-gray-700/60 text-gray-400 text-xs font-bold hover:text-white transition-colors">
                          DISMISS
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
