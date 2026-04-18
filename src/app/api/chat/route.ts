import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Zone } from '@/lib/types';
import { sanitizeInput } from '@/lib/sanitize';

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

// We define the system prompt dynamically based on the venue's live zone stats
function getSystemPrompt(zones: Zone[]) {
  const criticalZones = zones.filter((z) => z.density === 'critical');
  const optimalFoodZones = zones.filter((z) => z.type === 'food' && z.density === 'optimal');
  
  return `You are FlowSphere AI, an intelligent venue assistant with real-time access to stadium telemetry.
You must help the user navigate the venue, find food, avoid crowds, and handle emergencies.
Keep answers concise, direct, under 3 sentences, and highly actionable. No fluff.

CURRENT VENUE STATE:
- Total Zones: ${zones.length}
- Critical Zones (>85% full): ${criticalZones.map(z => z.name).join(', ') || 'None'}
- Optimal Food Zones: ${optimalFoodZones.map(z => z.name).join(', ') || 'None'}

Provide your response in JSON format matching exactly this schema:
{
  "content": "Your string response to the user",
  "metrics": [
    { "label": "Key Metric (e.g. ETA, Status)", "value": "Metric Value (e.g. 5 min)", "color": "cyan" | "green" | "yellow" | "orange" | "red" }
  ]
}
If no metrics are applicable, "metrics" can be an empty array or omitted.`;
}

export async function POST(req: NextRequest) {
  try {
    if (!apiKey) {
      return NextResponse.json({
        content: 'Gemini API key is missing. Please configure GEMINI_API_KEY in .env.local to enable natural language processing.',
        metrics: [{ label: 'Status', value: 'API Key Required', color: 'red' }]
      });
    }

    const { messages, zones } = await req.json();
    
    // Sanitize user input (last message)
    if (messages && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'user') {
        const safeText = sanitizeInput(lastMessage.content);
        if (!safeText) {
          return NextResponse.json({ content: 'Invalid input detected.' });
        }
        lastMessage.content = safeText;
      }
    }

    const promptContext = getSystemPrompt(zones || []);

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: promptContext,
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const formattedHistory = messages.slice(0, -1).map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));
    
    const chat = model.startChat({ history: formattedHistory });
    const lastUserMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastUserMessage);
    const text = result.response.text();
    
    // Parse the JSON output requested from Gemini
    const parsedData = JSON.parse(text);
    
    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json({
      content: 'I am experiencing connection issues. Please rely on static venue signs or locate a staff member.',
      metrics: [{ label: 'Status', value: 'Offline', color: 'red' }]
    }, { status: 500 });
  }
}
