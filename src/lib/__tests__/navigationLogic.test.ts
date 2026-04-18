// FlowSphere AI — Navigation Logic Tests
import { Zone } from '@/lib/types';

const mockZones: Zone[] = [
  {
    id: 'z1', name: 'North Concourse B', section: 'North Wing',
    capacity: 1500, current: 1290, density: 'critical', waitTime: 14,
    x: 50, y: 20, type: 'entrance',
  },
  {
    id: 'z7', name: 'Gate 4 Exit', section: 'North East',
    capacity: 600, current: 145, density: 'optimal', waitTime: 1,
    x: 72, y: 25, type: 'exit',
  },
  {
    id: 'z2', name: 'South Gate Entrance', section: 'South Wing',
    capacity: 1200, current: 510, density: 'moderate', waitTime: 6,
    x: 50, y: 80, type: 'entrance',
  },
];

// Helper functions that mirror navigation page logic
function findCongestionZone(zones: Zone[]) {
  return zones.find((z) => z.density === 'critical');
}

function getLeastBusyExit(zones: Zone[]) {
  return zones
    .filter((z) => z.type === 'exit')
    .sort((a, b) => a.waitTime - b.waitTime)[0];
}

function computeETA(distanceMeters: number, speedMps = 1.2): number {
  return Math.round(distanceMeters / speedMps);
}

function formatETA(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

describe('Navigation Logic — Crowd Avoidance', () => {
  test('detects critical zone for congestion avoidance', () => {
    const congestion = findCongestionZone(mockZones);
    expect(congestion).toBeDefined();
    expect(congestion?.id).toBe('z1');
  });

  test('returns undefined when no critical zones', () => {
    const optimalZones = mockZones.map((z) => ({ ...z, density: 'optimal' as const }));
    expect(findCongestionZone(optimalZones)).toBeUndefined();
  });
});

describe('Navigation Logic — Exit Selection', () => {
  test('selects exit with lowest wait time', () => {
    const best = getLeastBusyExit(mockZones);
    expect(best).toBeDefined();
    expect(best?.id).toBe('z7'); // Gate 4, wait 1m
    expect(best?.waitTime).toBe(1);
  });

  test('returns undefined when no exits exist', () => {
    const noExits = mockZones.filter((z) => z.type !== 'exit');
    expect(getLeastBusyExit(noExits)).toBeUndefined();
  });
});

describe('Navigation Logic — ETA Calculation', () => {
  test('computes ETA from distance at walking speed', () => {
    const eta = computeETA(180); // 180m at 1.2 m/s
    expect(eta).toBe(150); // 2m 30s
  });

  test('formats ETA into minutes and seconds', () => {
    expect(formatETA(252)).toBe('4m 12s');
    expect(formatETA(108)).toBe('1m 48s');
    expect(formatETA(60)).toBe('1m 0s');
  });

  test('ETA is 0 for zero distance', () => {
    expect(computeETA(0)).toBe(0);
  });
});

describe('Navigation Logic — Route Destinations', () => {
  const DESTINATIONS = [
    { id: 'd1', name: 'Gate A', distance: 320, eta: 252 },
    { id: 'd2', name: 'East Food Court', distance: 180, eta: 108 },
    { id: 'd3', name: 'VIP Lounge', distance: 450, eta: 324 },
    { id: 'd4', name: 'Exit Gate 4', distance: 220, eta: 132 },
  ];

  test('all destinations have valid ETA and distance', () => {
    DESTINATIONS.forEach((dest) => {
      expect(dest.eta).toBeGreaterThan(0);
      expect(dest.distance).toBeGreaterThan(0);
    });
  });

  test('shortest destination has lowest ETA', () => {
    const sorted = [...DESTINATIONS].sort((a, b) => a.eta - b.eta);
    expect(sorted[0].name).toBe('East Food Court');
  });
});
