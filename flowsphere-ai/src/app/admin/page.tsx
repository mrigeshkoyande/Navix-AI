'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useVenue } from '@/context/VenueContext';
import { Card } from '@/components/ui/Card';
import { TimeAgo } from '@/components/ui/TimeAgo';
import { Users, Zap, AlertTriangle, Activity, Radio, Shield, Plus, MoreVertical, TrendingUp } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { flowChartData } from '@/lib/mockData';
import clsx from 'clsx';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs">
        <p className="text-gray-400 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value.toLocaleString()}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminPage() {
  const { state, dispatch } = useVenue();
  const { stats, alerts, nodes } = state;
  const unack = alerts.filter((a) => !a.acknowledged);
  const [chartView, setChartView] = useState<'LIVE' | '24H'>('LIVE');

  const acknowledge = (id: string) => dispatch({ type: 'ACKNOWLEDGE_ALERT', payload: id });

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0f]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Admin header */}
        <div className="h-14 border-b border-gray-800/60 bg-[#0a0a0f]/90 backdrop-blur-md flex items-center px-6 gap-6 sticky top-0 z-50">
          <div className="text-cyan-400 font-bold text-lg tracking-wider">Admin Panel</div>
          <nav className="flex items-center gap-5 text-sm">
            {['Dashboard', 'Heatmap', 'Events'].map((l, i) => (
              <button key={l} className={clsx('transition-colors', i === 0 ? 'text-white border-b-2 border-cyan-400 pb-0.5' : 'text-gray-400 hover:text-gray-200')}>{l}</button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/60 border border-gray-700/60">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-gray-300 text-xs font-mono tracking-widest">FS_▸RK</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6">
          {/* Top stat cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div className="text-[10px] text-gray-500 tracking-widest uppercase">Live Occupancy</div>
                <Users className="w-4 h-4 text-gray-600" />
              </div>
              <div className="text-3xl font-bold text-white">{stats.liveOccupancy.toLocaleString()}</div>
              <div className="flex items-center gap-1 text-green-400 text-xs mt-1">
                <TrendingUp className="w-3 h-3" /> +12% from last hour
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div className="text-[10px] text-gray-500 tracking-widest uppercase">AI Efficiency</div>
                <Zap className="w-4 h-4 text-gray-600" />
              </div>
              <div className="text-3xl font-bold text-purple-400">{stats.aiEfficiency}%</div>
              <div className="flex items-center gap-1 text-cyan-400 text-xs mt-1">
                <Activity className="w-3 h-3" /> Optimized Flow
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div className="text-[10px] text-gray-500 tracking-widest uppercase">Active Alerts</div>
                <AlertTriangle className="w-4 h-4 text-gray-600" />
              </div>
              <div className="text-3xl font-bold text-red-400">{String(unack.length).padStart(2, '0')}</div>
              <div className="flex gap-2 mt-1">
                <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[9px] border border-red-500/20 font-bold">CRIT {unack.filter(a => a.type === 'critical').length}</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 text-[9px] border border-purple-500/20 font-bold">AI</span>
              </div>
              <div className="mt-2 h-1 rounded-full bg-gray-800">
                <div className="h-1 rounded-full bg-red-500" style={{ width: `${Math.min((unack.length / 10) * 100, 100)}%` }} />
              </div>
              <div className="text-[10px] text-gray-600 mt-1">Priority Queue</div>
            </Card>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-[1fr,360px] gap-6 mb-6">
            {/* Flow chart */}
            <Card className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-white font-bold">Venue Flow Dynamics</div>
                  <div className="text-gray-500 text-xs">Temporal crowd density analysis across Main Plaza</div>
                </div>
                <div className="flex gap-2">
                  {(['LIVE', '24H'] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setChartView(v)}
                      className={clsx('px-3 py-1 rounded-lg text-[10px] font-bold tracking-wider border transition-all', chartView === v ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400' : 'border-gray-700/60 text-gray-500 hover:text-gray-300')}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={flowChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="occupancyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="predictedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" tick={{ fontSize: 9, fill: '#64748b' }} interval={3} />
                  <YAxis tick={{ fontSize: 9, fill: '#64748b' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="occupancy" stroke="#00d4ff" strokeWidth={2} fill="url(#occupancyGrad)" name="Actual" />
                  <Area type="monotone" dataKey="predicted" stroke="#7c3aed" strokeWidth={1.5} strokeDasharray="5 3" fill="url(#predictedGrad)" name="Predicted" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Operational Alerts */}
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-white font-bold">Operational Alerts</div>
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              </div>
              <div className="space-y-3 overflow-y-auto max-h-[280px] custom-scrollbar">
                {alerts.map((alert) => {
                  const borderColor = { critical: 'border-l-red-500', warning: 'border-l-yellow-500', info: 'border-l-blue-500', success: 'border-l-green-500' }[alert.type];
                  const labelColor = { critical: 'text-red-400', warning: 'text-yellow-400', info: 'text-blue-400', success: 'text-green-400' }[alert.type];
                  return (
                    <div key={alert.id} className={clsx('border border-gray-800/60 border-l-4 rounded-xl p-3', borderColor)}>
                      <div className={clsx('text-[10px] font-bold tracking-widest uppercase mb-0.5 flex items-center gap-2', labelColor)}>
                        {alert.type} · <TimeAgo date={alert.timestamp} />
                      </div>
                      <div className="text-white text-xs font-semibold">{alert.title}</div>
                      <div className="text-gray-500 text-[10px] mt-0.5 leading-relaxed">{alert.message}</div>
                      {!alert.acknowledged && alert.type === 'critical' && (
                        <div className="flex gap-2 mt-2">
                          <button className="px-2 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-[9px] font-bold hover:bg-cyan-500/30 transition-colors">DEPLOY STAFF</button>
                          <button onClick={() => acknowledge(alert.id)} className="px-2 py-1 rounded-lg bg-gray-800/60 border border-gray-700/60 text-gray-400 text-[9px] font-bold hover:text-white transition-colors">DISMISS</button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <button className="w-full mt-3 text-gray-500 text-[10px] tracking-wider hover:text-gray-300 transition-colors">VIEW ALL LOGS</button>
            </Card>
          </div>

          {/* Middle row */}
          <div className="grid grid-cols-[1fr,1fr,360px] gap-6 mb-6">
            <Card className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Radio className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <div className="text-white font-bold">Sensor Network</div>
                <div className="text-gray-400 text-sm">{stats.activeNodes} Active / {nodes.filter(n => n.status === 'calibrating').length} Calibrating</div>
                <button className="text-cyan-400 text-[10px] font-bold tracking-wider mt-1 hover:text-cyan-300 transition-colors">MANAGE CLUSTER →</button>
              </div>
            </Card>
            <Card className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-white font-bold">Security Protocols</div>
                <div className="text-gray-400 text-sm">Level 2 - Optimized Monitoring</div>
                <button className="text-purple-400 text-[10px] font-bold tracking-wider mt-1 hover:text-purple-300 transition-colors">EDIT RULES →</button>
              </div>
            </Card>
            {/* Mini map thumb */}
            <Card className="overflow-hidden relative">
              <div className="h-full min-h-[100px] bg-gradient-to-br from-gray-900 to-gray-950 flex items-end p-4">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <svg viewBox="0 0 300 200" className="w-full h-full">
                    <ellipse cx="150" cy="100" rx="130" ry="90" fill="none" stroke="#334155" strokeWidth="2" />
                    <ellipse cx="150" cy="100" rx="90" ry="60" fill="none" stroke="#1e293b" strokeWidth="1" />
                    <ellipse cx="150" cy="100" rx="50" ry="30" fill="#0f1a0f" stroke="#1d3a1d" strokeWidth="1" />
                  </svg>
                </div>
                <div className="relative z-10">
                  <div className="text-[10px] text-cyan-400 tracking-widest uppercase mb-1">LIVE VENUE MAP</div>
                  <div className="text-white font-bold">Sphere One Plaza</div>
                </div>
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center hover:bg-cyan-400 transition-colors">
                  <Plus className="w-4 h-4 text-black" />
                </button>
              </div>
            </Card>
          </div>

          {/* Node table */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-white font-bold">Node Configuration</div>
              <button className="px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-700/60 text-white text-xs font-bold hover:bg-gray-700/60 transition-colors">
                ADD NEW NODE
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-[10px] text-gray-600 uppercase tracking-widest border-b border-gray-800/60">
                  <th className="text-left pb-3 font-medium">Node ID</th>
                  <th className="text-left pb-3 font-medium">Location</th>
                  <th className="text-left pb-3 font-medium">Status</th>
                  <th className="text-left pb-3 font-medium">Throughput</th>
                  <th className="text-left pb-3 font-medium">Uptime</th>
                  <th className="pb-3" />
                </tr>
              </thead>
              <tbody>
                {nodes.map((node) => (
                  <tr key={node.id} className="border-b border-gray-800/40 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 text-white font-mono text-sm font-semibold">{node.id}</td>
                    <td className="py-4 text-gray-300 text-sm">{node.location}</td>
                    <td className="py-4">
                      <span className={clsx('px-2.5 py-1 rounded-lg text-[10px] font-bold border', {
                        'bg-green-500/15 text-green-400 border-green-500/30': node.status === 'optimal',
                        'bg-cyan-500/15 text-cyan-400 border-cyan-500/30': node.status === 'calibrating',
                        'bg-gray-500/15 text-gray-400 border-gray-500/30': node.status === 'offline',
                      })}>
                        ● {node.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 text-gray-300 text-sm">{node.throughput > 0 ? `${node.throughput} p/min` : 'N/A'}</td>
                    <td className="py-4 text-gray-300 text-sm">{node.uptime}%</td>
                    <td className="py-4">
                      <button className="text-gray-600 hover:text-gray-300 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </main>
      </div>
    </div>
  );
}
