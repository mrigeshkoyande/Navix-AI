import { DensityLevel } from '@/lib/types';
import clsx from 'clsx';

const densityConfig: Record<DensityLevel, { label: string; className: string; dot: string }> = {
  optimal: { label: 'OPTIMAL', className: 'bg-green-500/15 text-green-400 border-green-500/30', dot: 'bg-green-400' },
  moderate: { label: 'MODERATE', className: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30', dot: 'bg-yellow-400' },
  high: { label: 'HIGH', className: 'bg-orange-500/15 text-orange-400 border-orange-500/30', dot: 'bg-orange-400' },
  critical: { label: 'CRITICAL', className: 'bg-red-500/15 text-red-400 border-red-500/30', dot: 'bg-red-400' },
};

interface BadgeProps {
  density: DensityLevel;
  className?: string;
}

export function DensityBadge({ density, className }: BadgeProps) {
  const config = densityConfig[density];
  return (
    <span className={clsx('inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest border', config.className, className)}>
      <span className={clsx('w-1.5 h-1.5 rounded-full', config.dot)} />
      {config.label}
    </span>
  );
}

interface AlertBadgeProps {
  type: 'critical' | 'warning' | 'info' | 'success';
  children: React.ReactNode;
}

const alertConfig = {
  critical: 'bg-red-500/15 text-red-400 border-red-500/30',
  warning: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  info: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  success: 'bg-green-500/15 text-green-400 border-green-500/30',
};

export function AlertBadge({ type, children }: AlertBadgeProps) {
  return (
    <span className={clsx('inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-widest border uppercase', alertConfig[type])}>
      {children}
    </span>
  );
}
