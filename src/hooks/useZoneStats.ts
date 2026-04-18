'use client';

// FlowSphere AI — Reusable Zone Statistics Hook
// Extracts common zone calculations used across Dashboard, Map, and Admin.

import { useMemo } from 'react';
import { Zone } from '@/lib/types';

interface ZoneStats {
  criticalCount: number;
  highCount: number;
  moderateCount: number;
  optimalCount: number;
  criticalZones: Zone[];
  totalOccupancy: number;
  totalCapacity: number;
  occupancyPercent: number;
  avgWaitTime: number;
}

export function useZoneStats(zones: Zone[]): ZoneStats {
  return useMemo(() => {
    const criticalZones = zones.filter((z) => z.density === 'critical');
    const totalOccupancy = zones.reduce((s, z) => s + z.current, 0);
    const totalCapacity = zones.reduce((s, z) => s + z.capacity, 0);
    const avgWaitTime =
      zones.length > 0
        ? Math.round(zones.reduce((s, z) => s + z.waitTime, 0) / zones.length)
        : 0;

    return {
      criticalCount: criticalZones.length,
      highCount: zones.filter((z) => z.density === 'high').length,
      moderateCount: zones.filter((z) => z.density === 'moderate').length,
      optimalCount: zones.filter((z) => z.density === 'optimal').length,
      criticalZones,
      totalOccupancy,
      totalCapacity,
      occupancyPercent: totalCapacity > 0 ? Math.round((totalOccupancy / totalCapacity) * 100) : 0,
      avgWaitTime,
    };
  }, [zones]);
}
