# FlowSphere AI

> **AI-powered smart venue assistant for large-scale stadiums** - Real-time crowd intelligence, predictive navigation, and autonomous event logistics.

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)](https://vercel.com)
[![Google Cloud Run](https://img.shields.io/badge/Run-GCP-blue)](https://cloud.google.com/run)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.0-cyan)](https://tailwindcss.com)

---

## Problem Statement

Large-scale sporting events and concerts regularly pack 50,000 to 100,000 attendees into confined spaces. The result is dangerous crowd bottlenecks, 20-minute queues at food stalls, security incidents from poor crowd flow, and a degraded attendee experience.

**97% of venues still use static signage and walkie-talkies** for crowd management.

---

## Solution

FlowSphere AI transforms massive venue telemetry into actionable real-time decisions through a layered AI intelligence stack:

```
Sensor Data (IoT) --> Crowd Density Engine --> Rule-Based AI --> Smart Routing
                                           |
                                Predictive Heatmaps --> Alert System
                                           |
                             Attendee App <--> Admin Dashboard
```

**Key AI Principles:**
- **Density > 85%** triggers a CRITICAL alert and automatic rerouting recommendations
- **Wait time > 15 min** suggests an alternate facility and notifies staff
- **Prediction horizon** provides a 20-minute lookahead using temporal patterns
- **Personalization** contextualizes responses to real-time zone data

---

## Features

| Feature | Description |
|---|---|
| **Live Heatmap** | SVG stadium map with color-coded density zones (green / yellow / orange / red) |
| **Smart Navigation** | Turn-by-turn routing with automatic crowd avoidance |
| **Wait Time Prediction** | Dynamic wait estimates across all facilities, updated every 3 seconds |
| **AI Chat Assistant** | Rule-based NLP engine handling 9 intent types (directions, food, emergency, etc.) |
| **Emergency Alerts** | Real-time push alerts for overcrowding with safe-route suggestions |
| **Admin Panel** | Full analytics dashboard with Recharts, node configuration, and alert management |
| **Real-Time Simulation** | Live data simulation engine updating all zones every 3 seconds |

---

## Tech Stack

### Frontend & Framework
- **[Next.js 14](https://nextjs.org/)** - App Router, Server Components, file-based routing
- **[React 19](https://react.dev/)** - State management via Context and useReducer
- **[TypeScript](https://typescriptlang.org/)** - Strict type safety across the entire application

### Styling & UI
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Modern utility-first CSS
- **[Recharts](https://recharts.org/)** - Area charts for temporal flow analytics
- **[Framer Motion](https://motion.dev/)** - Spring physics and page transitions
- **[Lucide React](https://lucide.dev/)** - Scalable vector icon system

### Deployment & DevOps
- **[Google Cloud Run](https://cloud.google.com/run)** - Serverless containerized production deployment
- **[Docker](https://www.docker.com/)** - Multi-stage minimal footprint Next.js standalone container
- **[Vercel](https://vercel.com/)** - Zero-config Edge-network deployments

---

## Project Structure

```
flowsphere-ai/
├── src/app/                    # Next.js 14 App Router
│   ├── page.tsx                # Hero Landing Page
│   ├── dashboard/              # Live user dashboard (occupancy & status)
│   ├── map/                    # SVG Interactive Heatmap
│   ├── navigate/               # Turn-by-turn routing layer
│   ├── chat/                   # AI Chat interface
│   └── admin/                  # Telemetry charts and active alerts
│
├── src/components/
│   ├── layout/                 # Global UI (Sidebar, Navbar)
│   ├── map/                    # SVG stadium map rendering logic
│   ├── chat/                   # Typing indicators and message bubbles
│   └── ui/                     # Primitives (Glass Cards, Badges, TimeAgo)
│
├── src/context/
│   └── VenueContext.tsx        # Central state: React Context + Interval Simulator
│
└── src/lib/
    ├── types.ts                # TypeScript interfaces (Zone, Alert, ChatMessage)
    ├── mockData.ts             # Deterministic initial data state
    └── aiEngine.ts             # Regex-driven Intent Parser and Responder
```

### How the Simulation Engine Works

Because real venue hardware (IoT BLE Beacons) is not physically connected, **FlowSphere AI runs a self-contained simulation engine**:

- In `VenueContext.tsx`, a `setInterval` fires every **3000ms**
- It dynamically oscillates zone occupancy using seed-based timing logic
- This creates realistic "breathing" data across the entire app - map colors shift, charts update live, and AI responses adapt to the simulated conditions in real time

---

## Local Setup

### Prerequisites
- Node.js 18 or higher (Node 20 recommended)
- npm 9 or higher

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/mrigeshkoyande/Navix-AI.git
cd Navix-AI/flowsphere-ai

# 2. Install dependencies
npm install

# 3. Set up environment variables (optional)
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment

### Option A: Google Cloud Run (Docker)

This repository includes an optimized multi-stage `Dockerfile` using Next.js `standalone` output.

```bash
# Set your active Google Cloud project
gcloud config set project your-project-id

# Submit the build via Cloud Build
gcloud builds submit --config cloudbuild.yaml

# Or deploy directly from source
gcloud run deploy flowsphere-ai --source . --region us-central1 --allow-unauthenticated
```

### Option B: Vercel

Zero configuration required. The `vercel.json` file is already included.

```bash
npx vercel
# Follow the CLI prompts to deploy to the Edge network
```

---

## Roadmap

- [ ] **Firestore Integration** - Replace the simulation engine with `onSnapshot` real-time listeners
- [ ] **LLM Upgrade** - Swap the regex AI engine with GPT-4o or Gemini for natural language understanding
- [ ] **Multi-language Support** - Add Next.js i18n routing for global attendees
- [ ] **Vision AI** - Integrate IP camera feeds to automatically measure crowd density
- [ ] **Mobile App** - React Native companion app for attendees

---

## License

Developed under the **Navix AI** ecosystem.  
MIT License - Copyright 2026 FlowSphere AI by Mrigesh Koyande.
