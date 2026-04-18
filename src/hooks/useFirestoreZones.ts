'use client';

// FlowSphere AI — Real-time Firestore Zone Listener
// Subscribes to the 'zones' collection via onSnapshot.
// Returns null if Firebase is not configured (triggers simulation fallback).

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { Zone, DensityLevel } from '@/lib/types';

/**
 * Hook that subscribes to the Firestore 'zones' collection in real time.
 * Returns `null` when Firebase is not configured, signaling the caller
 * to use the built-in simulation engine instead.
 */
export function useFirestoreZones(): Zone[] | null {
  const [zones, setZones] = useState<Zone[] | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured() || !db) return;

    const zonesRef = collection(db, 'zones');
    const q = query(zonesRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const liveZones: Zone[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name ?? '',
            section: data.section ?? '',
            capacity: data.capacity ?? 0,
            current: data.current ?? 0,
            density: (data.density as DensityLevel) ?? 'optimal',
            waitTime: data.waitTime ?? 0,
            x: data.x ?? 50,
            y: data.y ?? 50,
            type: data.type ?? 'seating',
          };
        });
        setZones(liveZones);
      },
      (error) => {
        console.error('[FlowSphere] Firestore listener error:', error);
        // On error, return null so simulation fallback kicks in
        setZones(null);
      }
    );

    return () => unsubscribe();
  }, []);

  return zones;
}
