// FlowSphere AI — Map Loading State
import Sidebar from '@/components/layout/Sidebar';
import { SkeletonCard } from '@/components/ui/LoadingSkeleton';

export default function MapLoading() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0f]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-14 border-b border-gray-800/60 bg-[#0a0a0f]/90" />
        <main className="flex-1 flex gap-4 p-4">
          <div className="flex-1 rounded-2xl bg-gray-900/50 border border-gray-800/60 animate-pulse" />
          <div className="w-64 flex flex-col gap-4">
            <SkeletonCard />
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="h-16 rounded-xl bg-gray-900/50 border border-gray-800/60 animate-pulse" />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
