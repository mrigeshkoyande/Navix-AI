// FlowSphere AI — Dashboard Loading State
import { SkeletonCard, SkeletonZoneGrid } from '@/components/ui/LoadingSkeleton';
import Sidebar from '@/components/layout/Sidebar';

export default function DashboardLoading() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0f]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-14 border-b border-gray-800/60 bg-[#0a0a0f]/90" />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <SkeletonZoneGrid count={8} />
        </main>
      </div>
    </div>
  );
}
