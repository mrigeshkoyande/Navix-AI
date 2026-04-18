'use client';

// FlowSphere AI — VenueContext
// Dual-mode data source:
//   1. Firebase Firestore onSnapshot (when env vars configured)
//   2. Built-in simulation engine (fallback, zero config required)

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { Zone, Alert, Node, ChatMessage, VenueStats } from '@/lib/types';
import {
  initialZones,
  initialAlerts,
  initialNodes,
  initialChat,
  ALERT_OFFSETS_MS,
} from '@/lib/mockData';
import { useFirestoreZones } from '@/hooks/useFirestoreZones';
import { useFirestoreChat } from '@/hooks/useFirestoreChat';
import { useFirestoreAlerts } from '@/hooks/useFirestoreAlerts';

interface VenueState {
  zones: Zone[];
  alerts: Alert[];
  nodes: Node[];
  messages: ChatMessage[];
  stats: VenueStats;
  selectedZone: Zone | null;
  hydrated: boolean;
  isLive: boolean; // true = Firestore, false = simulation
}

type VenueAction =
  | { type: 'UPDATE_ZONES'; payload: Zone[] }
  | { type: 'ADD_ALERT'; payload: Alert }
  | { type: 'ACKNOWLEDGE_ALERT'; payload: string }
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'SELECT_ZONE'; payload: Zone | null }
  | { type: 'UPDATE_STATS'; payload: Partial<VenueStats> }
  | { type: 'UPDATE_NODES'; payload: Node[] }
  | { type: 'HYDRATE_TIMESTAMPS' }
  | { type: 'SET_LIVE'; payload: boolean }
  | { type: 'UPDATE_ALERTS'; payload: Alert[] }
  | { type: 'UPDATE_MESSAGES'; payload: ChatMessage[] };

function computeStats(zones: Zone[], alerts: Alert[], nodes: Node[]): VenueStats {
  const totalCapacity = zones.reduce((s, z) => s + z.capacity, 0);
  const liveOccupancy = zones.reduce((s, z) => s + z.current, 0);
  const activeAlerts = alerts.filter((a) => !a.acknowledged).length;
  const avgWaitTime =
    zones.length > 0
      ? Math.round(zones.reduce((s, z) => s + z.waitTime, 0) / zones.length)
      : 0;
  const activeNodes = nodes.filter((n) => n.status === 'optimal').length;
  return { totalCapacity, liveOccupancy, aiEfficiency: 94.2, activeAlerts, avgWaitTime, activeNodes };
}

function venueReducer(state: VenueState, action: VenueAction): VenueState {
  switch (action.type) {
    case 'HYDRATE_TIMESTAMPS': {
      const now = Date.now();
      return {
        ...state,
        hydrated: true,
        alerts: state.alerts.map((a, i) => ({
          ...a,
          timestamp: new Date(now - (ALERT_OFFSETS_MS[i] ?? 0)),
        })),
        messages: state.messages.map((m) => ({
          ...m,
          timestamp: new Date(now - 180000),
        })),
      };
    }
    case 'SET_LIVE':
      return { ...state, isLive: action.payload };
    case 'UPDATE_ZONES':
      return {
        ...state,
        zones: action.payload,
        stats: computeStats(action.payload, state.alerts, state.nodes),
      };
    case 'ADD_ALERT':
      return { ...state, alerts: [action.payload, ...state.alerts].slice(0, 20) };
    case 'ACKNOWLEDGE_ALERT':
      return {
        ...state,
        alerts: state.alerts.map((a) =>
          a.id === action.payload ? { ...a, acknowledged: true } : a
        ),
      };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SELECT_ZONE':
      return { ...state, selectedZone: action.payload };
    case 'UPDATE_STATS':
      return { ...state, stats: { ...state.stats, ...action.payload } };
    case 'UPDATE_NODES':
      return { ...state, nodes: action.payload };
    case 'UPDATE_ALERTS':
      return { ...state, alerts: action.payload };
    case 'UPDATE_MESSAGES':
      return { ...state, messages: action.payload };
    default:
      return state;
  }
}

const initialStats = computeStats(initialZones, initialAlerts, initialNodes);

const initialState: VenueState = {
  zones: initialZones,
  alerts: initialAlerts,
  nodes: initialNodes,
  messages: initialChat,
  stats: initialStats,
  selectedZone: null,
  hydrated: false,
  isLive: false,
};

interface VenueContextValue {
  state: VenueState;
  dispatch: React.Dispatch<VenueAction>;
}

const VenueContext = createContext<VenueContextValue | null>(null);

export function VenueProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(venueReducer, initialState);

  // Real-time Firestore zones (null = not configured → use simulation)
  const firestoreZones = useFirestoreZones();
  const firestoreMessages = useFirestoreChat();
  const firestoreAlerts = useFirestoreAlerts();

  // Hydrate timestamps on client mount (avoids SSR/CSR mismatch)
  useEffect(() => {
    dispatch({ type: 'HYDRATE_TIMESTAMPS' });
  }, []);

  // ── Firebase path: sync Firestore zones ──────────────────────
  useEffect(() => {
    if (firestoreZones !== null) {
      dispatch({ type: 'SET_LIVE', payload: true });
      dispatch({ type: 'UPDATE_ZONES', payload: firestoreZones });
    }
  }, [firestoreZones]);

  useEffect(() => {
    if (firestoreMessages) dispatch({ type: 'UPDATE_MESSAGES', payload: firestoreMessages });
  }, [firestoreMessages]);

  useEffect(() => {
    if (firestoreAlerts) dispatch({ type: 'UPDATE_ALERTS', payload: firestoreAlerts });
  }, [firestoreAlerts]);

  // ── Simulation engine (fallback when Firestore not configured) ─
  const simulate = useCallback(() => {
    // Only run simulation if Firebase is not active
    if (firestoreZones !== null) return;

    dispatch({
      type: 'UPDATE_ZONES',
      payload: state.zones.map((zone) => {
        const seed = (Date.now() / 1000 + zone.id.charCodeAt(1)) % 1;
        const delta = Math.floor(seed * 120) - 60;
        const newCurrent = Math.max(0, Math.min(zone.capacity, zone.current + delta));
        const ratio = newCurrent / zone.capacity;
        const density =
          ratio > 0.85 ? 'critical' : ratio > 0.65 ? 'high' : ratio > 0.40 ? 'moderate' : 'optimal';
        const waitTime = Math.max(1, Math.round(ratio * 20));
        return { ...zone, current: newCurrent, density, waitTime };
      }),
    });
  }, [state.zones, firestoreZones]);

  useEffect(() => {
    if (firestoreZones !== null) return; // Firebase is active, no simulation needed
    const interval = setInterval(simulate, 3000);
    return () => clearInterval(interval);
  }, [simulate, firestoreZones]);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <VenueContext.Provider value={value}>{children}</VenueContext.Provider>
  );
}

export function useVenue() {
  const ctx = useContext(VenueContext);
  if (!ctx) throw new Error('useVenue must be used within VenueProvider');
  return ctx;
}
