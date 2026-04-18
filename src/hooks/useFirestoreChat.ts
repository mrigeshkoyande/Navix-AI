'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, addDoc, orderBy } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { ChatMessage } from '@/lib/types';

/**
 * Hook that subscribes to the Firestore 'chat_messages' collection in real time.
 * Returns null if Firebase is not configured.
 */
export function useFirestoreChat(): ChatMessage[] | null {
  const [messages, setMessages] = useState<ChatMessage[] | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured() || !db) return;

    const messagesRef = collection(db, 'chat_messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const liveMessages: ChatMessage[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            role: data.role,
            content: data.content,
            timestamp: data.timestamp?.toDate ? data.timestamp.toDate() : new Date(data.timestamp),
            metrics: data.metrics,
          } as ChatMessage;
        });
        setMessages(liveMessages);
      },
      (error) => {
        console.error('[FlowSphere] Firestore chat listener error:', error);
        setMessages(null);
      }
    );

    return () => unsubscribe();
  }, []);

  return messages;
}

export async function addFirestoreMessage(msg: ChatMessage) {
  if (!isFirebaseConfigured() || !db) return;
  const messagesRef = collection(db, 'chat_messages');
  await addDoc(messagesRef, { ...msg });
}
