// FlowSphere AI — Skeleton Loading Components
// Reusable animated placeholders for async loading states.

import clsx from 'clsx';

function Pulse({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-lg bg-gray-800/60',
        className
      )}
    />
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'bg-gray-900/50 border border-gray-800/60 rounded-xl p-5',
        className
      )}
      role="status"
      aria-label="Loading content"
    >
      <Pulse className="h-3 w-24 mb-3" />
      <Pulse className="h-8 w-32 mb-2" />
      <Pulse className="h-3 w-20" />
    </div>
  );
}

export function SkeletonChart({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'bg-gray-900/50 border border-gray-800/60 rounded-xl p-5',
        className
      )}
      role="status"
      aria-label="Loading chart"
    >
      <div className="flex justify-between mb-4">
        <div>
          <Pulse className="h-4 w-40 mb-2" />
          <Pulse className="h-3 w-56" />
        </div>
        <div className="flex gap-2">
          <Pulse className="h-7 w-14 rounded-lg" />
          <Pulse className="h-7 w-14 rounded-lg" />
        </div>
      </div>
      <Pulse className="h-[220px] w-full rounded-lg" />
    </div>
  );
}

export function SkeletonTable({ rows = 5, className }: { rows?: number; className?: string }) {
  return (
    <div
      className={clsx(
        'bg-gray-900/50 border border-gray-800/60 rounded-xl p-5',
        className
      )}
      role="status"
      aria-label="Loading table"
    >
      <div className="flex justify-between mb-4">
        <Pulse className="h-5 w-40" />
        <Pulse className="h-8 w-32 rounded-lg" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="flex gap-4 items-center">
            <Pulse className="h-4 w-24" />
            <Pulse className="h-4 w-32" />
            <Pulse className="h-5 w-16 rounded-lg" />
            <Pulse className="h-4 w-16 ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonZoneGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="bg-gray-900/50 border border-gray-800/60 rounded-xl p-4"
          role="status"
          aria-label="Loading zone"
        >
          <div className="flex justify-between mb-3">
            <Pulse className="h-4 w-28" />
            <Pulse className="h-4 w-16 rounded" />
          </div>
          <Pulse className="h-1.5 w-full rounded-full mb-2" />
          <div className="flex justify-between">
            <Pulse className="h-3 w-12" />
            <Pulse className="h-3 w-10" />
          </div>
        </div>
      ))}
    </div>
  );
}
