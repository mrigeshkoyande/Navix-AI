import { Zone, Alert, Node, ChatMessage } from './types';

// Seeded deterministic data (no Math.random() to avoid SSR/CSR hydration mismatch)
export const initialZones: Zone[] = [
  {
    id: 'z1',
    name: 'North Concourse B',
    section: 'North Wing',
    capacity: 1500,
    current: 1248,
    density: 'critical',
    waitTime: 14,
    x: 50,
    y: 20,
    type: 'entrance',
  },
  {
    id: 'z2',
    name: 'South Gate Entrance',
    section: 'South Wing',
    capacity: 1200,
    current: 510,
    density: 'moderate',
    waitTime: 6,
    x: 50,
    y: 80,
    type: 'entrance',
  },
  {
    id: 'z3',
    name: 'East Food Court',
    section: 'East Wing',
    capacity: 800,
    current: 290,
    density: 'optimal',
    waitTime: 3,
    x: 82,
    y: 50,
    type: 'food',
  },
  {
    id: 'z4',
    name: 'West Food Court',
    section: 'West Wing',
    capacity: 800,
    current: 640,
    density: 'high',
    waitTime: 11,
    x: 18,
    y: 50,
    type: 'food',
  },
  {
    id: 'z5',
    name: 'VIP Lounge Access',
    section: 'Level 3',
    capacity: 300,
    current: 156,
    density: 'optimal',
    waitTime: 2,
    x: 50,
    y: 50,
    type: 'vip',
  },
  {
    id: 'z6',
    name: 'Main Concourse A',
    section: 'Central Hub',
    capacity: 2000,
    current: 1320,
    density: 'high',
    waitTime: 9,
    x: 35,
    y: 35,
    type: 'seating',
  },
  {
    id: 'z7',
    name: 'Gate 4 Exit',
    section: 'North East',
    capacity: 600,
    current: 145,
    density: 'optimal',
    waitTime: 1,
    x: 72,
    y: 25,
    type: 'exit',
  },
  {
    id: 'z8',
    name: 'Restroom Block C',
    section: 'North',
    capacity: 200,
    current: 178,
    density: 'critical',
    waitTime: 18,
    x: 30,
    y: 20,
    type: 'restroom',
  },
];

// Static alert timestamps as fixed offsets (no Date.now() at module level)
export const ALERT_OFFSETS_MS = [2 * 60000, 14 * 60000, 45 * 60000, 5 * 60000];

export const initialAlerts: Alert[] = [
  {
    id: 'a1',
    type: 'critical',
    title: 'Queue Bottleneck: North Gate Entrance',
    message: 'Wait time exceeded 15 mins. AI recommends opening Sector 4.',
    zone: 'z1',
    timestamp: new Date(0), // placeholder — replaced on client mount
    acknowledged: false,
  },
  {
    id: 'a2',
    type: 'info',
    title: 'Energy Saving: Zone B',
    message: 'Low occupancy detected. Dimming non-essential lighting.',
    zone: 'z3',
    timestamp: new Date(0),
    acknowledged: false,
  },
  {
    id: 'a3',
    type: 'success',
    title: 'System Backup Complete',
    message: 'All cloud nodes synchronized successfully.',
    timestamp: new Date(0),
    acknowledged: true,
  },
  {
    id: 'a4',
    type: 'warning',
    title: 'South Gate Processing Delay',
    message: 'Scanner throughput reduced by 22%. Technical team notified.',
    zone: 'z2',
    timestamp: new Date(0),
    acknowledged: false,
  },
];

export const initialNodes: Node[] = [
  { id: 'FS-NODE-01', location: 'North Entrance Wing', status: 'optimal', throughput: 842, uptime: 99.9 },
  { id: 'FS-NODE-02', location: 'VIP Lounge Access', status: 'optimal', throughput: 156, uptime: 100.0 },
  { id: 'FS-NODE-03', location: 'Food Court B', status: 'calibrating', throughput: 0, uptime: 94.2 },
  { id: 'FS-NODE-04', location: 'South Gate Main', status: 'optimal', throughput: 510, uptime: 98.7 },
  { id: 'FS-NODE-05', location: 'West Concourse', status: 'optimal', throughput: 640, uptime: 99.1 },
];

export const initialChat: ChatMessage[] = [
  {
    id: 'c1',
    role: 'ai',
    content:
      'Greetings. I am monitoring the North Wing density. Crowd levels are currently at 64% capacity. How can I assist with venue logistics or visitor flow today?',
    timestamp: new Date(0),
  },
];

// Deterministic chart data — no Math.random()
const occupancyCurve = [
  320, 290, 260, 240, 230, 250, 310, 520, 780, 1020, 1180, 1240,
  1290, 1310, 1280, 1250, 1220, 1300, 1380, 1200, 980, 750, 560, 400,
];
const predictedCurve = [
  310, 280, 255, 235, 225, 260, 330, 540, 800, 1040, 1200, 1260,
  1305, 1325, 1295, 1265, 1235, 1315, 1395, 1215, 995, 765, 575, 415,
];

export const flowChartData = Array.from({ length: 24 }, (_, i) => ({
  time: `${String(i).padStart(2, '0')}:00`,
  occupancy: occupancyCurve[i],
  predicted: predictedCurve[i],
}));
