import { renderHook } from '@testing-library/react';
import { useZoneStats } from '../useZoneStats';
import { Zone } from '@/lib/types';

describe('useZoneStats', () => {
  const mockZones: Zone[] = [
    { id: '1', name: 'Z1', section: 'S1', capacity: 100, current: 90, density: 'critical', waitTime: 15, x: 0, y: 0, type: 'entrance' },
    { id: '2', name: 'Z2', section: 'S2', capacity: 200, current: 150, density: 'high', waitTime: 10, x: 0, y: 0, type: 'food' },
    { id: '3', name: 'Z3', section: 'S3', capacity: 100, current: 50, density: 'moderate', waitTime: 5, x: 0, y: 0, type: 'exit' },
    { id: '4', name: 'Z4', section: 'S4', capacity: 100, current: 20, density: 'optimal', waitTime: 2, x: 0, y: 0, type: 'restroom' },
  ];

  test('calculates counts correctly', () => {
    const { result } = renderHook(() => useZoneStats(mockZones));
    expect(result.current.criticalCount).toBe(1);
    expect(result.current.highCount).toBe(1);
    expect(result.current.moderateCount).toBe(1);
    expect(result.current.optimalCount).toBe(1);
    expect(result.current.criticalZones.length).toBe(1);
    expect(result.current.criticalZones[0].id).toBe('1');
  });

  test('calculates totals correctly', () => {
    const { result } = renderHook(() => useZoneStats(mockZones));
    expect(result.current.totalCapacity).toBe(500);
    expect(result.current.totalOccupancy).toBe(310);
    expect(result.current.occupancyPercent).toBe(62); // (310 / 500) * 100
  });

  test('calculates average wait time correctly', () => {
    const { result } = renderHook(() => useZoneStats(mockZones));
    // 15 + 10 + 5 + 2 = 32. Average = 32 / 4 = 8
    expect(result.current.avgWaitTime).toBe(8);
  });

  test('handles empty array safely', () => {
    const { result } = renderHook(() => useZoneStats([]));
    expect(result.current.totalCapacity).toBe(0);
    expect(result.current.totalOccupancy).toBe(0);
    expect(result.current.occupancyPercent).toBe(0);
    expect(result.current.avgWaitTime).toBe(0);
  });
});
