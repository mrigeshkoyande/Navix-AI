// FlowSphere AI — Admin Loading State
import { SkeletonCard, SkeletonChart, SkeletonTable } from '@/components/ui/LoadingSkeleton';
import Sidebar from '@/components/layout/Sidebar';

export default function AdminLoading() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0f]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-14 border-b border-gray-800/60 bg-[#0a0a0f]/90" />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <div className="grid grid-cols-[1fr,360px] gap-6 mb-6">
            <SkeletonChart />
            <SkeletonCard className="min-h-[300px]" />
          </div>
          <SkeletonTable rows={5} />
        </main>
      </div>
    </div>
  );
}
