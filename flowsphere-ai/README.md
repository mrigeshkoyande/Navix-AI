# FlowSphere AI 🏟️

> **AI-powered smart venue assistant for large-scale stadiums** — Real-time crowd intelligence, predictive navigation, and autonomous event logistics.

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.0-cyan)](https://tailwindcss.com)

---

## 🎯 Problem Statement

Large-scale sporting events and concerts regularly pack 50,000–100,000 attendees into confined spaces. The result: dangerous crowd bottlenecks, 20-minute queues at food stalls, security incidents from poor crowd flow, and a degraded attendee experience.

**97% of venues still use static signage and walkie-talkies** for crowd management.

---

## 💡 Solution Approach

FlowSphere AI transforms massive venue telemetry into actionable real-time decisions through a layered AI intelligence stack:

```
Sensor Data (IoT) → Crowd Density Engine → Rule-Based AI → Smart Routing
                                         ↓
                              Predictive Heatmaps → Alert System
                                         ↓
                            Attendee App ← → Admin Dashboard
```

**Key AI Principles:**
- **Density > 85%** → CRITICAL alert + automatic rerouting recommendations
- **Wait time > 15 min** → Suggest alternate facility + notify staff
- **Prediction horizon** → 20-minute lookahead using temporal patterns
- **Personalization** → Responses contextualized to real-time zone data

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔥 **Live Heatmap** | SVG stadium map with color-coded density zones (green/yellow/orange/red) |
| 🧭 **Smart Navigation** | Turn-by-turn routing with automatic crowd avoidance rerouting |
| ⏱️ **Wait Time Prediction** | Dynamic wait estimates across all facilities, updated every 3 seconds |
| 🤖 **AI Chat Assistant** | Rule-based NLP engine handling 9 intent types (directions, food, emergency, etc.) |
| 🚨 **Emergency Alerts** | Real-time push alerts for overcrowding with safe-route suggestions |
| 📊 **Admin Panel** | Full analytics dashboard with Recharts, node configuration, and alert management |
| 🔄 **Real-Time Simulation** | Live data simulation engine updating all zones every 3 seconds |

---

## 🛠️ Tech Stack

**Frontend**
- [Next.js 14](https://nextjs.org/) — App Router, RSC, file-based routing
- [TypeScript](https://typescriptlang.org/) — Full type safety
- [Tailwind CSS v3](https://tailwindcss.com/) — Utility-first styling
- [Recharts](https://recharts.org/) — Data visualization charts
- [Lucide React](https://lucide.dev/) — Icon system
- [clsx](https://github.com/lukeed/clsx) — Conditional class merging

**State & Logic**
- React Context + useReducer — Global venue state
- Custom simulation engine — 3-second real-time updates
- Rule-based AI engine — Intent detection + contextual responses

**Deployment**
- [Vercel](https://vercel.com/) — Zero-config Next.js hosting
- Environment variables — Firebase/Google Maps ready

---

## 🏗️ Architecture

```
src/
├── app/                    # Next.js 14 App Router pages
│   ├── page.tsx            # Landing Page
│   ├── dashboard/          # User Dashboard
│   ├── map/                # Live Heatmap View
│   ├── navigate/           # Smart Navigation
│   ├── chat/               # AI Chat Assistant
│   └── admin/              # Admin Panel
├── components/
│   ├── layout/             # Navbar, Sidebar
│   ├── map/                # StadiumMap SVG component
│   ├── chat/               # ChatWindow, MessageBubble
│   └── ui/                 # Badge, Card, Button primitives
├── context/
│   └── VenueContext.tsx    # Global state + simulation engine
└── lib/
    ├── types.ts            # TypeScript interfaces
    ├── mockData.ts         # Simulated zones, alerts, nodes
    └── aiEngine.ts         # Rule-based AI intent engine
```

**Data Flow:**
```
VenueContext (global store)
    ↓ setInterval 3s
Simulation Engine → updates Zone density, waitTime, occupancy
    ↓ React Context
All Pages & Components → re-render with live data
    ↓ User Query
aiEngine.ts → intent detection → contextual response with live zone data
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/flowsphere-ai.git
cd flowsphere-ai

# Install dependencies
npm install

# (Optional) Copy environment variables
cp .env.example .env.local
# Edit .env.local with your API keys if using Firebase/Google Maps

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
# Using Vercel CLI
npx vercel

# Or connect your GitHub repo at vercel.com/new
```

---

## 🗺️ Pages

| Route | Page | Description |
|---|---|---|
| `/` | Landing | Hero, features, stats, globe section |
| `/dashboard` | Dashboard | Live occupancy, zone cards, alert feed |
| `/map` | Heatmap | Interactive stadium map with zone selection |
| `/navigate` | Navigation | Route planning with crowd avoidance |
| `/chat` | AI Assistant | Conversational venue assistant |
| `/admin` | Admin Panel | Full analytics, charts, node management |

---

## 🔮 Future Improvements

- [ ] **Real Firebase Integration** — Replace simulation with Firestore real-time updates
- [ ] **Google Maps Embed** — Real indoor maps via Maps JavaScript API
- [ ] **LLM Chatbot** — Upgrade rule-based engine to GPT-4o/Gemini for natural language
- [ ] **Mobile App** — React Native companion app for attendees
- [ ] **IoT Integration** — Connect real sensor streams (BLE beacons, LiDAR)
- [ ] **Multi-language Support** — i18n for global venue deployments
- [ ] **Computer Vision** — Camera feed analysis for real density measurement
- [ ] **Staff Mobile App** — Field worker app for alert response

---

## 📄 License

MIT © 2026 FlowSphere AI
