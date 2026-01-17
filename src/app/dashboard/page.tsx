import { AnalyticsCharts } from "@/components/dashboard/AnalyticsCharts";
import { AttendanceSummary } from "@/components/dashboard/AttendanceSummary";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { UpcomingDeadlines } from "@/components/dashboard/UpcomingDeadlines";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <WelcomeHeader />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
            <AnalyticsCharts />
          </Suspense>
        </div>
        <div className="space-y-6">
          <UpcomingDeadlines />
          <AttendanceSummary />
        </div>
      </div>
      <div>
        <RecentActivity />
      </div>
    </div>
  );
}
