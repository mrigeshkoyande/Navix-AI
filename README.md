# FlowSphere AI 🏟️

> **AI-powered smart venue assistant for large-scale stadiums** — Real-time crowd intelligence, predictive navigation, and autonomous event logistics.

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)](https://vercel.com)
[![Google Cloud Run](https://img.shields.io/badge/Run-GCP-blue)](https://cloud.google.com/run)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.0-cyan)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange)](https://firebase.google.com)
[![Tests](https://img.shields.io/badge/Tests-Jest%20%2B%20RTL-green)](#testing-strategy)

---

## 🎯 Problem Statement

Large-scale sporting events and concerts regularly pack 50,000–100,000 attendees into confined spaces. The result: dangerous crowd bottlenecks, 20-minute queues at food stalls, security incidents from poor crowd flow, and a degraded attendee experience.

**97% of venues still use static signage and walkie-talkies** for crowd management.

---

## 💡 Solution Approach

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

## ✨ Features

| Feature | Description |
|---|---|
| 🔥 **Live Heatmap** | SVG stadium map with color-coded density zones (green / yellow / orange / red) |
| 🧭 **Smart Navigation** | Turn-by-turn routing with automatic crowd avoidance |
| ⏱️ **Wait Time Prediction** | Dynamic wait estimates across all facilities, updated every 3 seconds |
| 🤖 **AI Chat Assistant** | Rule-based NLP engine handling 9 intent types (directions, food, emergency, etc.) |
| 🚨 **Emergency Alerts** | Real-time push alerts for overcrowding with safe-route suggestions |
| 📊 **Admin Panel** | Full analytics dashboard with Recharts, node configuration, and alert management |
| 🔄 **Real-Time Simulation** | Live data simulation engine with Firebase Firestore fallback |

---

## 🛠️ Tech Stack

**Frontend & Framework**
- **[Next.js 16](https://nextjs.org/)** — App Router, Server Components, file-based routing
- **[React 19](https://react.dev/)** — State management via Context and useReducer
- **[TypeScript](https://typescriptlang.org/)** — Strict type safety across the entire application

**Styling & UI**
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Modern utility-first CSS
- **[Recharts](https://recharts.org/)** — Lazy-loaded area charts for temporal flow analytics
- **[Framer Motion](https://motion.dev/)** — Spring physics and page transitions
- **[Lucide React](https://lucide.dev/)** — Scalable vector icon system

**Google Services**
- **[Firebase Firestore](https://firebase.google.com/docs/firestore)** — Real-time crowd data via `onSnapshot`
- **[Google Cloud Run](https://cloud.google.com/run)** — Serverless containerized production deployment
- **[Docker](https://www.docker.com/)** — Multi-stage minimal footprint Next.js standalone container
- **[Vercel](https://vercel.com/)** — Zero-config Edge-network deployments

**Testing**
- **[Jest](https://jestjs.io/)** — Test runner with jsdom environment
- **[React Testing Library](https://testing-library.com/react)** — Component and interaction testing

---

## 🔥 Google Services Integration

### Firebase Firestore (Real-Time Data)

FlowSphere AI uses a **dual-mode architecture** for maximum reliability:

| Mode | When | How |
|---|---|---|
| **Firebase Live** | When `NEXT_PUBLIC_FIREBASE_*` env vars are set | `onSnapshot` listens to the `zones` collection in real time |
| **Simulation Fallback** | When Firebase is not configured | Built-in 3-second interval simulation engine |

The switch is **automatic** — the app works out of the box without any Firebase credentials, and upgrades to live data instantly once credentials are added.

**Firestore Collection Schema (`zones`):**
```json
{
  "id": "z1",
  "name": "North Concourse B",
  "section": "North Wing",
  "capacity": 1500,
  "current": 1248,
  "density": "critical",
  "waitTime": 14,
  "x": 50,
  "y": 20,
  "type": "entrance"
}
```

**Setting up Firebase:**
```bash
# 1. Copy environment template
cp .env.example .env.local

# 2. Fill in your Firebase project credentials in .env.local

# 3. Seed Firestore with initial data
npm run seed

# 4. Start the app — it will now use live Firestore data
npm run dev
```

### Google Cloud Run Deployment
```bash
gcloud config set project your-project-id
gcloud builds submit --config cloudbuild.yaml
```

---

## 🧪 Testing Strategy

### Stack
- **Jest 29** — Test runner with Next.js integration via `next/jest`
- **React Testing Library 16** — User-centric component tests
- **@testing-library/jest-dom** — Extended DOM matchers

### Test Suites (5+)

| Suite | File | What it tests |
|---|---|---|
| AI Engine | `aiEngine.test.ts` | All 9 intent types, contextual zone data, response shape |
| Alert Logic | `alertLogic.test.ts` | Density thresholds, reducer (add/acknowledge), boundary conditions |
| Navigation Logic | `navigationLogic.test.ts` | Crowd avoidance, exit selection, ETA calculation |
| Input Sanitization | `sanitize.test.ts` | XSS vectors, HTML stripping, length limits |
| (Chat UI) | `ChatWindow.test.tsx` | Message submission, typing indicator, quick actions |

### Running Tests
```bash
npm test                  # Run all test suites
npm run test:coverage     # Generate coverage report
npm run test:watch        # Watch mode for development
```

---

## ♿ Accessibility Improvements

FlowSphere AI targets **WCAG 2.1 AA** compliance across all pages:

| Area | Implementation |
|---|---|
| **Skip Navigation** | Skip-to-content link at top of every page for keyboard users |
| **ARIA Labels** | All buttons, interactive elements, and icons have descriptive `aria-label` attributes |
| **Semantic HTML** | `<header>`, `<nav>`, `<main>`, `<aside>`, `<section>` used throughout |
| **Heading Hierarchy** | Single `h1` per page, proper `h2`/`h3` nesting |
| **Keyboard Navigation** | All interactive elements reachable via Tab, visible focus ring (cyan outline) |
| **Live Regions** | Chat log uses `role="log"` + `aria-live="polite"`, errors use `aria-live="assertive"` |
| **Screen Reader** | `.sr-only` utility for visually hidden but accessible text |
| **Active State** | `aria-current="page"` on active nav links |
| **Status Roles** | Loading skeletons have `role="status"` and `aria-label` |

---

## 🔒 Security Practices

| Practice | Implementation |
|---|---|
| **Input Sanitization** | All user chat input is sanitized (HTML tags, `javascript:` URIs, event handlers stripped) before processing — both in `ChatWindow` and in `aiEngine` (defence in depth) |
| **No HTML Injection** | All content rendered as plain text — zero `dangerouslySetInnerHTML` usage |
| **Environment Secrets** | All API keys stored in `.env.local` — never hardcoded, never committed |
| **Security Headers** | CSP, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`, `Referrer-Policy` applied via Next.js middleware and `next.config.ts` |
| **Max Input Length** | Chat inputs capped at 500 characters — validated client and engine side |
| **X-Powered-By** | Disabled via `poweredByHeader: false` — prevents framework fingerprinting |
| **Docker Security** | Non-root user (`nextjs`) in production container |

---

## ⚡ Performance Optimization

| Optimization | Details |
|---|---|
| **Lazy Loading** | Recharts (heaviest dependency, ~150KB) dynamically imported with `ssr: false` |
| **Route Loading States** | Next.js `loading.tsx` files on all routes — instant skeleton UI during page transitions |
| **React.memo** | `Hotspot` map components memoized to prevent re-renders from unrelated state changes |
| **useMemo** | Zone stats computed with `useMemo` in context; `useZoneStats` hook for reusable memoized calculations |
| **Memoized Context** | `VenueContext` value wrapped in `useMemo` — prevents cascading re-renders on every state update |
| **Static Font** | Google Fonts loaded via `next/font` — no render-blocking font request |
| **Standalone Output** | Next.js `standalone` mode for minimal Docker image footprint |
| **Image Format** | WebP format configured in `next.config.ts` |

---

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Hero Landing Page
│   ├── dashboard/          # Live user dashboard + loading.tsx
│   ├── map/                # SVG Interactive Heatmap + loading.tsx
│   ├── navigate/           # Turn-by-turn routing
│   ├── chat/               # AI Chat interface
│   └── admin/              # Admin panel + loading.tsx
│
├── components/
│   ├── layout/             # Navbar, Sidebar (with full ARIA)
│   ├── map/                # StadiumMap SVG component
│   ├── chat/               # ChatWindow with sanitized input
│   └── ui/                 # Card, Badge, TimeAgo, LoadingSkeleton
│
├── context/
│   └── VenueContext.tsx    # Dual-mode: Firebase + Simulation
│
├── hooks/
│   ├── useFirestoreZones.ts # Real-time Firestore subscription
│   └── useZoneStats.ts      # Memoized zone statistics
│
└── lib/
    ├── types.ts             # TypeScript interfaces
    ├── mockData.ts          # Deterministic initial state
    ├── aiEngine.ts          # Intent parser + sanitized responses
    ├── firebase.ts          # Conditional Firebase init
    ├── sanitize.ts          # Input sanitization utilities
    ├── seedFirestore.ts     # One-time Firestore seed script
    └── __tests__/           # 5+ Jest test suites
```

---

## 🚀 Local Setup

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

# 3. Set up environment variables (optional — app works without Firebase)
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

```env
# Firebase (optional — app falls back to simulation without these)
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# App Config
NEXT_PUBLIC_APP_NAME=FlowSphere AI
NEXT_PUBLIC_APP_VERSION=1.0.0
```

---

## ☁️ Deployment

### Google Cloud Run (Docker)
```bash
gcloud config set project your-project-id
gcloud builds submit --config cloudbuild.yaml

# Or deploy directly from source
gcloud run deploy flowsphere-ai --source . --region us-central1 --allow-unauthenticated
```

### Vercel
```bash
npx vercel
```

---

## 🔮 Future Roadmap

- [ ] **Full Firestore Sync** — Sync alerts, nodes, and chat messages to Firestore
- [ ] **LLM Upgrade** — Replace regex AI with Gemini 1.5 Flash for natural language
- [ ] **Google Maps** — Real indoor navigation using Maps JavaScript API
- [ ] **Vision AI** — IP camera feeds for automatic crowd density measurement
- [ ] **Multi-language** — Next.js i18n routing for global attendees
- [ ] **PWA** — Offline support and push notifications via service workers

---

## 📄 License

Developed under the **Navix AI** ecosystem.
MIT License — Copyright 2026 FlowSphere AI by Mrigesh Koyande.
