"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { Header } from "@/components/layout/Header";
import { RouteRankingTable } from "@/components/routes/RouteRankingTable";
import { RouteFocusPanel } from "@/components/routes/RouteFocusPanel";
import { Separator } from "@/components/ui/separator";

export default function RouteAnalysisPage() {
  return (
    <DashboardShell>
      <Header />

      <div className="space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Route Analysis
        </h1>

        <p className="text-muted-foreground max-w-2xl">
          Explore performance changes for individual ACE routes. Select a route
          to see detailed hourly speed profiles and reliability metrics.
        </p>

        <Separator />

        <RouteRankingTable />

        <RouteFocusPanel />
      </div>
    </DashboardShell>
  );
}
