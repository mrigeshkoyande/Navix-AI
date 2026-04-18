// FlowSphere AI — AI Engine Tests
import { generateAIResponse } from '@/lib/aiEngine';
import { Zone } from '@/lib/types';

const mockZones: Zone[] = [
  {
    id: 'z1', name: 'North Concourse B', section: 'North Wing',
    capacity: 1500, current: 1290, density: 'critical', waitTime: 14,
    x: 50, y: 20, type: 'entrance',
  },
  {
    id: 'z3', name: 'East Food Court', section: 'East Wing',
    capacity: 800, current: 290, density: 'optimal', waitTime: 3,
    x: 82, y: 50, type: 'food',
  },
  {
    id: 'z7', name: 'Gate 4 Exit', section: 'North East',
    capacity: 600, current: 145, density: 'optimal', waitTime: 1,
    x: 72, y: 25, type: 'exit',
  },
];

describe('AI Engine — Intent Detection', () => {
  test('detects "directions" intent', () => {
    const result = generateAIResponse('Where is the nearest exit?', mockZones);
    expect(result.content).toContain('Gate 4');
    expect(result.metrics).toBeDefined();
    expect(result.metrics!.length).toBeGreaterThan(0);
  });

  test('detects "food" intent and references optimal food zone', () => {
    const result = generateAIResponse('I want to eat something', mockZones);
    expect(result.content.toLowerCase()).toContain('food');
    expect(result.content).toContain('East Food Court');
  });

  test('detects "emergency" intent and activates protocol', () => {
    const result = generateAIResponse('emergency! I need help', mockZones);
    expect(result.content).toContain('EMERGENCY');
    expect(result.metrics).toBeDefined();
    const statusMetric = result.metrics!.find((m) => m.label === 'Status');
    expect(statusMetric?.value).toBe('ACTIVE');
  });

  test('detects "heatmap" / crowd density intent', () => {
    const result = generateAIResponse('How busy is the venue?', mockZones);
    expect(result.content).toContain('North Concourse B');
    expect(result.metrics).toBeDefined();
  });

  test('detects "restroom" intent', () => {
    const result = generateAIResponse('Where is the bathroom?', mockZones);
    expect(result.content.toLowerCase()).toContain('restroom');
    expect(result.metrics).toBeDefined();
  });

  test('detects "wait_time" intent', () => {
    const result = generateAIResponse('How long is the queue?', mockZones);
    expect(result.content.toLowerCase()).toContain('wait');
  });

  test('detects "parking" intent', () => {
    const result = generateAIResponse('Where can I park my car?', mockZones);
    expect(result.content.toLowerCase()).toContain('parking');
  });

  test('detects "event" intent', () => {
    const result = generateAIResponse('When does the game start?', mockZones);
    expect(result.content.toLowerCase()).toContain('event');
  });

  test('returns general help for unknown intent', () => {
    const result = generateAIResponse('xyz123 unknown query blah', mockZones);
    expect(result.content).toContain('FlowSphere AI');
    expect(result.metrics).toBeUndefined();
  });
});

describe('AI Engine — Response Shape', () => {
  test('all responses have non-empty content string', () => {
    const queries = [
      'directions please',
      'find food',
      'emergency',
      'restroom',
      'crowd density',
      'parking',
      'schedule',
      'wait time',
    ];
    queries.forEach((q) => {
      const result = generateAIResponse(q, mockZones);
      expect(typeof result.content).toBe('string');
      expect(result.content.length).toBeGreaterThan(10);
    });
  });
});
