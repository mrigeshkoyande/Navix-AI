'use client';

import { useState, useEffect } from 'react';

export function TimeAgo({ date }: { date: Date }) {
  const [label, setLabel] = useState('');

  useEffect(() => {
    const update = () => {
      const diff = Date.now() - date.getTime();
      if (diff < 0 || date.getTime() === 0) {
        setLabel('just now');
        return;
      }
      const mins = Math.round(diff / 60000);
      if (mins < 1) setLabel('just now');
      else if (mins < 60) setLabel(`${mins}m ago`);
      else setLabel(`${Math.round(mins / 60)}h ago`);
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, [date]);

  // Render nothing on server — avoids hydration mismatch
  return <span suppressHydrationWarning>{label}</span>;
}

export function ClientTime({ date }: { date: Date }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  let label = '';
  if (mounted) {
    if (date.getTime() === 0) {
      label = '--:--';
    } else {
      label = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }

  return <span suppressHydrationWarning>{label}</span>;
}
