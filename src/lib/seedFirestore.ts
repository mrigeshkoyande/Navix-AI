// FlowSphere AI — Firestore Seed Script
// Run via: npx ts-node src/lib/seedFirestore.ts
// Seeds the 'zones' collection with initial data from mockData.

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { initialZones } from './mockData';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

async function seed() {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.error('Firebase env vars not set. Copy .env.example to .env.local and fill in values.');
    process.exit(1);
  }

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  console.log('Seeding Firestore with zone data...');

  for (const zone of initialZones) {
    await setDoc(doc(db, 'zones', zone.id), {
      name: zone.name,
      section: zone.section,
      capacity: zone.capacity,
      current: zone.current,
      density: zone.density,
      waitTime: zone.waitTime,
      x: zone.x,
      y: zone.y,
      type: zone.type,
    });
    console.log(`  ✓ ${zone.id} — ${zone.name}`);
  }

  console.log('Done! All zones seeded.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
