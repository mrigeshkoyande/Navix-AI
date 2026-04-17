# FlowSphere AI 🏟️

> **AI-powered smart venue assistant for large-scale stadiums** — Real-time crowd intelligence, predictive navigation, and autonomous event logistics.

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)](https://vercel.com)
[![Google Cloud Run](https://img.shields.io/badge/Run-GCP-blue)](https://cloud.google.com/run)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.0-cyan)](https://tailwindcss.com)

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
                            Attendee App ↔ Admin Dashboard
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
| 🔥 **Live Heatmap** | SVG stadium map with color-coded density zones (green / yellow / orange / red) |
| 🧭 **Smart Navigation** | Turn-by-turn routing with automatic crowd avoidance rerouting |
| ⏱️ **Wait Time Prediction** | Dynamic wait estimates across all facilities, updated every 3 seconds |
| 🤖 **AI Chat Assistant** | Rule-based NLP engine handling 9 intent types (directions, food, emergency, etc.) |
| 🚨 **Emergency Alerts** | Real-time push alerts for overcrowding with safe-route suggestions |
| 📊 **Admin Panel** | Full analytics dashboard with Recharts, node configuration, and alert management |
| 🔄 **Real-Time Simulation** | Live data simulation engine updating all zones every 3 seconds |

---

## 🛠️ Tech Stack

**Frontend & Framework**
- **[Next.js 14](https://nextjs.org/)** — App Router, Server Components, file-based routing
- **[React 19](https://react.dev/)** — State management (Context, useReducer)
- **[TypeScript](https://typescriptlang.org/)** — Strict type safety across the application

**Styling & UI**
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Modern utility-first CSS using `@import "tailwindcss"`
- **[Recharts](https://recharts.org/)** — Area charts for temporal flow dynamics
- **[Framer Motion](https://motion.dev/)** — Spring physics and page transitions
- **[Lucide React](https://lucide.dev/)** — Scalable vector icon system

**Deployment & DevOps**
- **[Google Cloud Run](https://cloud.google.com/run)** — Configured for serverless containerized production deployment
- **[Docker](https://www.docker.com/)** — Multi-stage minimal footprint Next.js standalone container
- **[Vercel](https://vercel.com/)** — Ready for Edge-network automatic deployments

---

## 🏗️ Architecture Deep Dive

```text
flowsphere-ai/
├── src/app/                    # Next.js 14 App Router
│   ├── page.tsx                # Hero Landing Page
│   ├── dashboard/              # Live user dashboard (occupancy & status)
│   ├── map/                    # SVG Interactive Heatmap
│   ├── navigate/               # SVG Turn-by-turn logic layer
│   ├── chat/                   # Neural Link AI interface
│   └── admin/                  # Telemetry charts and active alerts
│
├── src/components/
│   ├── layout/                 # Global UI (Sidebar, Navbar)
│   ├── map/                    # Complex SVG component rendering logic
│   ├── chat/                   # Typing indicators and message bubbles
│   └── ui/                     # Primitives (Glass Cards, Badges, TimeAgo)
│
├── src/context/
│   └── VenueContext.tsx        # Central Brain: React Context + Interval Simulator
│
└── src/lib/
    ├── types.ts                # App interfaces (Zone, Alert, ChatMessage)
    ├── mockData.ts             # Deterministic data state initialization
    └── aiEngine.ts             # Regex-driven Intent Parser & Responder
```

### The Data Simulation Layer

Because real venue hardware (IoT BLE Beacons) is not physically connected to this repo, **FlowSphere AI runs a self-contained simulation engine**.

- In `VenueContext.tsx`, an interval runs every `3000ms`
- It dynamically oscillates zone occupancy logic based on seed timing
- This creates realistic "breathing" data across the app — map colors change, charts update, and AI responses shift based on simulated real-time conditions

---

## 🚀 Local Setup Instructions

### Prerequisites
- Node.js 18+ (Node 20 recommended)
- npm 9+

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/mrigeshkoyande/Navix-AI.git
cd Navix-AI

# 2. Install dependencies
npm install

# 3. Set up environment variables (optional)
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deployment Guide

### Option A: Google Cloud Run (Docker)

This repository is pre-configured with a highly optimized, multi-stage `Dockerfile` leveraging Next.js `standalone` output.

```bash
# Set your active Google Cloud Project
gcloud config set project your-project-id

# Submit the build and trigger the pipeline via Cloud Build
gcloud builds submit --config cloudbuild.yaml

# OR manually deploy from source
gcloud run deploy flowsphere-ai --source . --region us-central1 --allow-unauthenticated
```

### Option B: Vercel

Deployment to Vercel requires zero configuration thanks to the included `vercel.json`.

```bash
npx vercel
# Follow the CLI prompts to deploy directly to the Edge network
```

---

## 🔮 Future Improvements Roadmap

- [ ] **Real Firestore Integration** — Replace the simulation engine in `VenueContext` with `onSnapshot` real-time listeners
- [ ] **Large Language Model Upgrade** — Swap `aiEngine.ts`'s regex logic with `gpt-4o-mini` or `gemini-1.5-flash` for fluid conversational AI
- [ ] **Multi-language Support** — Add Next.js i18n routing for global attendees
- [ ] **Vision AI** — Integrate IP camera feed endpoints to automatically count crowd density

---

## 📄 License & Ownership

Developed under the **Navix AI** ecosystem.
MIT © 2026 FlowSphere AI by Mrigesh Koyande.
