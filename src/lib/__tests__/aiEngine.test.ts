// FlowSphere AI — AI Engine Tests
import { generateAIResponse } from '@/lib/aiEngine';
import { Zone } from '@/lib/types';

const mockZones: Zone[] = [
  {
    id: 'z1', name: 'North Concourse B', section: 'North Wing',
    capacity: 1500, current: 1290, density: 'critical', waitTime: 14,
    x: 50, y: 20, type: 'entrance',
  },
];

describe('AI Engine — Async Gemini Processing', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          content: 'I recommend using Gate 4.',
          metrics: [{ label: 'ETA', value: '4m' }]
        }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('calls the /api/chat endpoint securely', async () => {
    const result = await generateAIResponse('Where to enter?', mockZones);
    expect(global.fetch).toHaveBeenCalledWith('/api/chat', expect.any(Object));
    expect(result.content).toBe('I recommend using Gate 4.');
    expect(result.metrics).toBeDefined();
  });

  test('returns fallback error if API fails', async () => {
    // Mock the fetch failure
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error('Network error'))
    );

    const result = await generateAIResponse('emergency!', mockZones);
    expect(result.content).toContain('connection issues');
    expect(result.metrics![0].value).toBe('Offline');
  });

  test('blocks malicious inputs before fetching', async () => {
    const malicious = '<script>alert(1)</script>';
    const result = await generateAIResponse(malicious, mockZones);
    expect(global.fetch).not.toHaveBeenCalled();
    expect(result.content).toContain('valid message');
  });
});
