'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, addDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { Alert } from '@/lib/types';

/**
 * Hook that subscribes to the Firestore 'alerts' collection in real time.
 * Returns null if Firebase is not configured.
 */
export function useFirestoreAlerts(): Alert[] | null {
  const [alerts, setAlerts] = useState<Alert[] | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured() || !db) return;

    const alertsRef = collection(db, 'alerts');
    const q = query(alertsRef, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const liveAlerts: Alert[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id, // using Firebase's auto ID
            type: data.type,
            title: data.title,
            message: data.message,
            timestamp: data.timestamp?.toDate ? data.timestamp.toDate() : new Date(data.timestamp),
            acknowledged: data.acknowledged || false,
          } as Alert;
        });
        setAlerts(liveAlerts);
      },
      (error) => {
        console.error('[FlowSphere] Firestore alerts listener error:', error);
        setAlerts(null);
      }
    );

    return () => unsubscribe();
  }, []);

  return alerts;
}

export async function addFirestoreAlert(alert: Alert) {
  if (!isFirebaseConfigured() || !db) return;
  const alertsRef = collection(db, 'alerts');
  await addDoc(alertsRef, { ...alert });
}

export async function acknowledgeFirestoreAlert(alertId: string) {
  if (!isFirebaseConfigured() || !db) return;
  const alertDoc = doc(db, 'alerts', alertId);
  await updateDoc(alertDoc, { acknowledged: true });
}
