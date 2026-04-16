import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: 'cyan' | 'purple' | 'red' | 'none';
}

export function Card({ children, className, glow = 'none' }: CardProps) {
  const glowClass = {
    cyan: 'border-cyan-500/30 shadow-[0_0_20px_rgba(0,212,255,0.05)]',
    purple: 'border-purple-500/30 shadow-[0_0_20px_rgba(124,58,237,0.05)]',
    red: 'border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.05)]',
    none: 'border-gray-800/60',
  }[glow];

  return (
    <div className={clsx('bg-gray-900/50 backdrop-blur-sm border rounded-xl', glowClass, className)}>
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  sub,
  color = 'white',
}: {
  label: string;
  value: string | number;
  sub?: string;
  color?: 'white' | 'cyan' | 'purple' | 'red' | 'green';
}) {
  const colorClass = {
    white: 'text-white',
    cyan: 'text-cyan-400',
    purple: 'text-purple-400',
    red: 'text-red-400',
    green: 'text-green-400',
  }[color];

  return (
    <Card className="p-5">
      <div className="text-gray-400 text-xs tracking-widest uppercase mb-2">{label}</div>
      <div className={clsx('text-3xl font-bold', colorClass)}>{value}</div>
      {sub && <div className="text-gray-500 text-xs mt-1">{sub}</div>}
    </Card>
  );
}
