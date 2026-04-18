// FlowSphere AI — Alert Logic Tests
import { Alert } from '@/lib/types';
import { initialAlerts } from '@/lib/mockData';

// Re-implement the reducer logic locally to test it in isolation
type AlertAction =
  | { type: 'ADD_ALERT'; payload: Alert }
  | { type: 'ACKNOWLEDGE_ALERT'; payload: string };

function alertReducer(alerts: Alert[], action: AlertAction): Alert[] {
  switch (action.type) {
    case 'ADD_ALERT':
      return [action.payload, ...alerts].slice(0, 20);
    case 'ACKNOWLEDGE_ALERT':
      return alerts.map((a) =>
        a.id === action.payload ? { ...a, acknowledged: true } : a
      );
    default:
      return alerts;
  }
}

// Density threshold logic (mirrors VenueContext)
function computeDensity(current: number, capacity: number) {
  const ratio = current / capacity;
  if (ratio > 0.85) return 'critical';
  if (ratio > 0.65) return 'high';
  if (ratio > 0.40) return 'moderate';
  return 'optimal';
}

describe('Alert Trigger Logic', () => {
  test('density > 85% capacity triggers critical', () => {
    expect(computeDensity(1290, 1500)).toBe('critical'); // 86%
  });

  test('density between 65-85% triggers high', () => {
    expect(computeDensity(700, 1000)).toBe('high'); // 70%
  });

  test('density between 40-65% triggers moderate', () => {
    expect(computeDensity(500, 1000)).toBe('moderate'); // 50%
  });

  test('density < 40% triggers optimal', () => {
    expect(computeDensity(300, 1000)).toBe('optimal'); // 30%
  });

  test('exactly 85% capacity is critical boundary', () => {
    expect(computeDensity(851, 1000)).toBe('critical');
    expect(computeDensity(850, 1000)).toBe('high');
  });
});

describe('Alert Reducer', () => {
  const now = new Date();

  const newAlert: Alert = {
    id: 'test-alert',
    type: 'critical',
    title: 'Test Alert',
    message: 'Test message',
    timestamp: now,
    acknowledged: false,
  };

  test('ADD_ALERT prepends to the list', () => {
    const result = alertReducer(initialAlerts, {
      type: 'ADD_ALERT',
      payload: newAlert,
    });
    expect(result[0].id).toBe('test-alert');
    expect(result.length).toBe(initialAlerts.length + 1);
  });

  test('ADD_ALERT caps list at 20 items', () => {
    const bigList: Alert[] = Array.from({ length: 20 }, (_, i) => ({
      ...newAlert,
      id: `a${i}`,
    }));
    const result = alertReducer(bigList, {
      type: 'ADD_ALERT',
      payload: newAlert,
    });
    expect(result.length).toBe(20);
  });

  test('ACKNOWLEDGE_ALERT marks correct alert as acknowledged', () => {
    const alerts = [
      { ...newAlert, id: 'ack-me', acknowledged: false },
      { ...newAlert, id: 'keep-me', acknowledged: false },
    ];
    const result = alertReducer(alerts, {
      type: 'ACKNOWLEDGE_ALERT',
      payload: 'ack-me',
    });
    expect(result.find((a) => a.id === 'ack-me')?.acknowledged).toBe(true);
    expect(result.find((a) => a.id === 'keep-me')?.acknowledged).toBe(false);
  });

  test('unacknowledged critical alerts counted correctly', () => {
    const alerts: Alert[] = [
      { ...newAlert, id: 'c1', type: 'critical', acknowledged: false },
      { ...newAlert, id: 'c2', type: 'critical', acknowledged: true },
      { ...newAlert, id: 'w1', type: 'warning', acknowledged: false },
    ];
    const unackCritical = alerts.filter(
      (a) => !a.acknowledged && a.type === 'critical'
    );
    expect(unackCritical.length).toBe(1);
  });
});
