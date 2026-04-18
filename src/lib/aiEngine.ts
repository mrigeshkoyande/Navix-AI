import { Zone, ChatMessage } from './types';
import { sanitizeInput } from './sanitize';

interface AIResponse {
  content: string;
  metrics?: { label: string; value: string; color?: string }[];
}

export async function generateAIResponse(userMessage: string, zones: Zone[], history: ChatMessage[] = []): Promise<AIResponse> {
  // Sanitize at engine level — defence in depth
  const safe = sanitizeInput(userMessage);
  if (!safe) {
    return { content: 'I did not receive a valid message. Please try again.' };
  }

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [...history, { role: 'user', content: safe }],
        zones
      })
    });

    if (!res.ok) {
      throw new Error(`API returned status: ${res.status}`);
    }

    const data = await res.json() as AIResponse;
    return {
      content: sanitizeInput(data.content) || data.content,
      metrics: data.metrics
    };
  } catch (error) {
    console.error('generateAIResponse failed:', error);
    return {
      content: 'I am experiencing connection issues with the venue mainframe. Please rely on static venue signs or locate a staff member for assistance.',
      metrics: [{ label: 'Status', value: 'Offline', color: 'red' }]
    };
  }
}

export function generateAIId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}
