
# FlowSphere AI ðŸŸï¸

> **AI-powered smart venue assistant for large-scale stadiums** â€” Real-time crowd intelligence, predictive navigation, and autonomous event logistics.

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)](https://vercel.com)
[![Google Cloud Run](https://img.shields.io/badge/Run-GCP-blue)](https://cloud.google.com/run)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.0-cyan)](https://tailwindcss.com)

---

## ðŸŽ¯ Problem Statement

Large-scale sporting events and concerts regularly pack 50,000â€“100,000 attendees into confined spaces. The result: dangerous crowd bottlenecks, 20-minute queues at food stalls, security incidents from poor crowd flow, and a degraded attendee experience.

**97% of venues still use static signage and walkie-talkies** for crowd management.

---

## ðŸ’¡ Solution Approach

FlowSphere AI transforms massive venue telemetry into actionable real-time decisions through a layered AI intelligence stack:

```
Sensor Data (IoT) â†’ Crowd Density Engine â†’ Rule-Based AI â†’ Smart Routing
                                         â†“
                              Predictive Heatmaps â†’ Alert System
                                         â†“
                            Attendee App â† â†’ Admin Dashboard
```

**Key AI Principles:**
- **Density > 85%** â†’ CRITICAL alert + automatic rerouting recommendations
- **Wait time > 15 min** â†’ Suggest alternate facility + notify staff
- **Prediction horizon** â†’ 20-minute lookahead using temporal patterns
- **Personalization** â†’ Responses contextualized to real-time zone data

---

## âœ¨ Features

| Feature | Description |
|---|---|
| ðŸ”¥ **Live Heatmap** | SVG stadium map with color-coded density zones (green/yellow/orange/red) |
| ðŸ§­ **Smart Navigation** | Turn-by-turn routing with automatic crowd avoidance rerouting |
| â±ï¸ **Wait Time Prediction** | Dynamic wait estimates across all facilities, updated every 3 seconds |
| ðŸ¤– **AI Chat Assistant** | Rule-based NLP engine handling 9 intent types (directions, food, emergency, etc.) |
| ðŸš¨ **Emergency Alerts** | Real-time push alerts for overcrowding with safe-route suggestions |
| ðŸ“Š **Admin Panel** | Full analytics dashboard with Recharts, node configuration, and alert management |
| ðŸ”„ **Real-Time Simulation** | Live data simulation engine updating all zones every 3 seconds |

---

## ðŸ› ï¸ Tech Stack

**Frontend & Framework**
- **[Next.js 14](https://nextjs.org/)** â€” App Router, Server Components, file-based routing
- **[React 19](https://react.dev/)** â€” State management (Context, useReducer)
- **[TypeScript](https://typescriptlang.org/)** â€” Strict type safety across the application

**Styling & UI**
- **[Tailwind CSS v4](https://tailwindcss.com/)** â€” Modern utility-first CSS using `@import "tailwindcss"`
- **[Recharts](https://recharts.org/)** â€” Area charts for temporal flow dynamics
- **[Framer Motion](https://motion.dev/)** â€” Spring physics and page transitions
- **[Lucide React](https://lucide.dev/)** â€” Scalable vector icon system

**Deployment & DevOps**
- **[Google Cloud Run](https://cloud.google.com/run)** â€” Configured for serverless containerized production deployment
- **[Docker](https://www.docker.com/)** â€” Multi-stage minimal footprint Next.js standalone container
- **[Vercel](https://vercel.com/)** â€” Ready for Edge-network automatic deployments

---

## ðŸ—ï¸ Architecture Deep Dive

```text
flowsphere-ai/
â”œâ”€â”€ src/app/                    # Next.js 14 App Router
â”‚   â”œâ”€â”€ page.tsx                # Hero Landing Page
â”‚   â”œâ”€â”€ dashboard/              # Live user dashboard (occupancy & status)
â”‚   â”œâ”€â”€ map/                    # SVG Interactive Heatmap
â”‚   â”œâ”€â”€ navigate/               # SVG Turn-by-turn logic layer
â”‚   â”œâ”€â”€ chat/                   # Neural Link AI interface
â”‚   â””â”€â”€ admin/                  # Telemetry charts and active alerts
â”‚
â”œâ”€â”€ src/components/             
â”‚   â”œâ”€â”€ layout/                 # Global UI (Sidebar, Navbar)
â”‚   â”œâ”€â”€ map/                    # Complex SVG component rendering logic
â”‚   â”œâ”€â”€ chat/                   # Typing indicators and message bubbles
â”‚   â””â”€â”€ ui/                     # Primitives (Glass Cards, Badges, TimeAgo)
â”‚
â”œâ”€â”€ src/context/                
â”‚   â””â”€â”€ VenueContext.tsx        # Central Brain: React Context + Interval Simulator
â”‚
â””â”€â”€ src/lib/                    
    â”œâ”€â”€ types.ts                # App interfaces (Zone, Alert, ChatMessage)
    â”œâ”€â”€ mockData.ts             # Deterministic data state initialization
    â””â”€â”€ aiEngine.ts             # Regex-driven Intent Parser & Responder
```

### The Data Simulation Layer
Because real venue hardware (IoT BLE Beacons) isn't physically connected to this repo, **FlowSphere AI runs a self-contained simulation engine**. 
- In `VenueContext.tsx`, an interval runs every `3000ms`.
- It dynamically oscillates zone occupancy logic based on seed timing.
- This creates incredibly realistic "breathing" data across the app â€” map colors change, charts update, and the AI responses dynamically shift based on the simulated exact-second conditions.
