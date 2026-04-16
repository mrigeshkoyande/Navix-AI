import { Zone, ChatMessage } from './types';

interface Intent {
  name: string;
  keywords: string[];
}

const intents: Intent[] = [
  { name: 'directions', keywords: ['where', 'gate', 'exit', 'seat', 'location', 'find', 'go', 'get to', 'how do i', 'navigate'] },
  { name: 'wait_time', keywords: ['wait', 'queue', 'line', 'long', 'how long', 'time'] },
  { name: 'food', keywords: ['food', 'coffee', 'eat', 'drink', 'restaurant', 'snack', 'water', 'bar', 'concession'] },
  { name: 'emergency', keywords: ['emergency', 'lost', 'help', 'accident', 'medical', 'security', 'danger', 'fire'] },
  { name: 'heatmap', keywords: ['crowd', 'busy', 'congested', 'heatmap', 'density', 'packed', 'empty', 'quiet'] },
  { name: 'parking', keywords: ['park', 'parking', 'car', 'vehicle', 'lot'] },
  { name: 'restroom', keywords: ['bathroom', 'restroom', 'toilet', 'washroom', 'wc'] },
  { name: 'event', keywords: ['event', 'schedule', 'game', 'match', 'show', 'concert', 'start', 'when'] },
  { name: 'staff', keywords: ['staff', 'security', 'help', 'officer', 'worker', 'employee', 'assist'] },
];

function detectIntent(message: string): string {
  const lower = message.toLowerCase();
  for (const intent of intents) {
    if (intent.keywords.some((kw) => lower.includes(kw))) {
      return intent.name;
    }
  }
  return 'general';
}

interface AIResponse {
  content: string;
  metrics?: { label: string; value: string; color?: string }[];
}

export function generateAIResponse(userMessage: string, zones: Zone[]): AIResponse {
  const intent = detectIntent(userMessage);
  const criticalZones = zones.filter((z) => z.density === 'critical');
  const optimalFoodZones = zones.filter((z) => z.type === 'food' && z.density === 'optimal');
  const leastBusyExit = zones.filter((z) => z.type === 'exit').sort((a, b) => a.waitTime - b.waitTime)[0];

  switch (intent) {
    case 'directions':
      return {
        content: `Based on current crowd density analysis, I recommend using Gate 4 (North East) as your primary route. Current ETA from your location is approximately 4 minutes. I've detected high density at Concourse B — the alternate route via East Corridor saves you ~45 seconds and avoids the bottleneck.`,
        metrics: [
          { label: 'ETA via Gate 4', value: '4m 12s', color: 'cyan' },
          { label: 'Crowd Level', value: 'MODERATE', color: 'yellow' },
        ],
      };

    case 'wait_time':
      return {
        content: `Current estimated wait times across the venue:\n• North Concourse B: **14 minutes** (Critical — recommend avoiding)\n• South Gate: **6 minutes** (Moderate)\n• East Food Court: **3 minutes** (Optimal ✓)\n• VIP Lounge: **2 minutes** (Optimal ✓)\n\nFor fastest access, head to the East side of the venue.`,
        metrics: [
          { label: 'Best Area', value: 'East Wing', color: 'cyan' },
          { label: 'Avg Wait', value: '6.1 min', color: 'green' },
        ],
      };

    case 'food':
      return {
        content: optimalFoodZones.length > 0
          ? `I've located ${optimalFoodZones.length} food outlet(s) with minimal wait times. The ${optimalFoodZones[0].name} is currently at ${optimalFoodZones[0].current} occupancy with only a ${optimalFoodZones[0].waitTime}-minute wait. I recommend heading there now before the post-halftime rush begins in approximately 8 minutes.`
          : `All food courts are currently busy. The East Food Court has the shortest wait at 3 minutes. I recommend heading there via the East Corridor to avoid congestion near the Central Hub.`,
        metrics: [
          { label: 'Nearest Option', value: 'East Food Court', color: 'cyan' },
          { label: 'Wait Time', value: '3 min', color: 'green' },
        ],
      };

    case 'restroom':
      return {
        content: `Restroom Block A (South Wing) currently has the shortest wait at 2 minutes with optimal capacity. Restroom Block C (North) is at critical density — estimated 18-minute wait. I strongly recommend using the South Wing facilities or Level 2 amenities via the East Elevator.`,
        metrics: [
          { label: 'Best Option', value: 'Block A South', color: 'cyan' },
          { label: 'Wait Time', value: '2 min', color: 'green' },
        ],
      };

    case 'emergency':
      return {
        content: `🚨 EMERGENCY PROTOCOL ACTIVATED.\n\nI am alerting venue security to your location now. Please remain calm and follow these steps:\n1. Move to the nearest green emergency exit (highlighted on map)\n2. Follow the illuminated floor strips\n3. A staff member has been dispatched to your zone\n\nEmergency services have been notified. Stay on this channel for updates.`,
        metrics: [
          { label: 'Security ETA', value: '< 2 min', color: 'red' },
          { label: 'Status', value: 'ACTIVE', color: 'red' },
        ],
      };

    case 'heatmap':
      return {
        content: `Current crowd density across the venue:\n• **Critical zones:** ${criticalZones.map((z) => z.name).join(', ') || 'None'}\n• **North Concourse B** is at 83% capacity — AI recommends re-routing flow to Gate 4\n• **VIP Lounge + East Food Court** are at optimal density\n\nOverall venue is at 64% capacity. Predictive models show peak congestion at the North exits in approximately 22 minutes.`,
        metrics: [
          { label: 'Venue Capacity', value: '64%', color: 'yellow' },
          { label: 'Peak in', value: '22 min', color: 'orange' },
        ],
      };

    case 'parking':
      return {
        content: `Parking Lot B (East) has 230 available spaces — the most in the venue. Lot A (North) is at 95% capacity. AI suggests using Lot B and entering via the East Pedestrian Bridge to reach your section fastest. Estimated walk time: 6 minutes.`,
        metrics: [
          { label: 'Best Lot', value: 'Lot B East', color: 'cyan' },
          { label: 'Available', value: '230 spaces', color: 'green' },
        ],
      };

    case 'event':
      return {
        content: `Today's main event begins at **19:00 UTC**. Gates open at 17:30. Based on historical patterns, I predict peak crowd arrival between 18:15–18:45. I recommend arriving before 18:00 to avoid the rush. Pre-event show starts at 18:30 in the South Arena.`,
        metrics: [
          { label: 'Event Start', value: '19:00 UTC', color: 'cyan' },
          { label: 'Peak Arrival', value: '18:15–18:45', color: 'yellow' },
        ],
      };

    default:
      return {
        content: `I'm your FlowSphere AI assistant with real-time access to all venue sensors and crowd analytics. I can help you with:\n\n• **Directions** to any gate, seat, or facility\n• **Wait times** for entrances, food courts, restrooms\n• **Crowd density** and safe route recommendations\n• **Emergency assistance** and staff dispatch\n\nWhat would you like to know?`,
      };
  }
}

export function generateAIId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
