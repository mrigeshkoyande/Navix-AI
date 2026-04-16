// FlowSphere AI — Type Definitions

export type DensityLevel = 'optimal' | 'moderate' | 'high' | 'critical';

export interface Zone {
  id: string;
  name: string;
  section: string;
  capacity: number;
  current: number;
  density: DensityLevel;
  waitTime: number; // minutes
  x: number; // SVG position %
  y: number; // SVG position %
  type: 'entrance' | 'exit' | 'food' | 'restroom' | 'seating' | 'vip';
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  zone?: string;
  timestamp: Date;
  acknowledged: boolean;
}

export interface NavigationRoute {
  id: string;
  from: string;
  to: string;
  distance: number; // meters
  eta: number; // seconds
  waypoints: string[];
  crowdAvoidance: boolean;
  isFastest: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  metrics?: {
    label: string;
    value: string;
    color?: string;
  }[];
}

export interface Node {
  id: string;
  location: string;
  status: 'optimal' | 'calibrating' | 'offline';
  throughput: number; // per minute
  uptime: number; // percentage
}

export interface VenueStats {
  totalCapacity: number;
  liveOccupancy: number;
  aiEfficiency: number;
  activeAlerts: number;
  avgWaitTime: number;
  activeNodes: number;
}
