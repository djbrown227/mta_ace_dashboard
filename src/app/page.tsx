"use client";

import { useState, useEffect } from "react";
import TypingText from "@/components/TypingText";

// import { DashboardShell } from "@/components/layout/DashboardShell";
import { Header } from "@/components/layout/Header";
import { KPICard } from "@/components/kpi/KPICard";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DashboardShell } from "@/components/layout/DashboardShell_simple";


import { ProgramImpactChart } from "@/viz/ProgramImpactChart";
import { RouteImpactHistogram } from "@/viz/RouteImpactHistogram";
import { RouteTierBreakdown } from "@/viz/RouteTierBreakdown";
//import { HourlySpeedHistogram } from "@/viz/HourlySpeedHistogram";
import { SpeedReliabilityScatter } from "@/viz/SpeedReliabilityScatter";
import { RouteRankingTable } from "@/components/routes/RouteRankingTable";
import { RouteFocusPanel } from "@/components/routes/RouteFocusPanel";
import { RouteImpactViolinD3 } from "@/viz/PeakSpeedViolin";
import { SpeedImpactHistogram } from "@/viz/OverallSpeedHistogram";
import { RouteImpactBoxPlotD3 } from "@/viz/PeakSpeedBoxPlot";
import { PeakOffPeakBoxD3 } from "@/viz/PeakOffPeakSpeed";
import { SpeedJrneyPerf } from "@/viz/SpeedJrneyPerf";
import { JrnyHistogram } from "@/viz/CJTPHistogram";
import { JourneyBoxPlot } from "@/viz/JrnyBoxPlot";
import { SpeedReliabilityPie } from "@/viz/Pie";


export default function DashboardPage() {
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    // Show intro for 4 seconds on initial mount
    const timer = setTimeout(() => setShowDashboard(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  if (!showDashboard) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-black text-2xl px-4 text-center">
        <TypingText
          text={[
            "Welcome to the MTA ACE Bus Dashboard",
            ""
          ]}
          typingSpeed={70}
          pauseDuration={900}
          loop={false}
          showCursor
          cursorCharacter="|"
          textColors={["#000000", "#000000"]} // black text
        />
      </div>
    );
  }

  return (
    <DashboardShell>
      <Header />

      <div className="space-y-8 pb-10">
        {/* KPI SUMMARY */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
            ACE Program Summary
          </h2>

          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <KPICard title="Average Speed Improvement" value="+1.50%" subtitle="Across all time periods" />
            <KPICard title="Peak Hour Speed Improvement" value="+1.64%" subtitle="AM & PM peak periods" />
            <KPICard title="Reliability Change" value="+2.35%" subtitle="On-time performance proxy" />
            <KPICard title="Routes Enrolled" value="53" subtitle="As of latest rollout" />
          </div>
        </section>

        <Separator />

        <div className="grid grid-cols-[1.5fr_1fr] gap-4">
          <Card>
            <CardHeader className="text-2xl font-bold">
              <CardTitle>ACE Program’s Impact on Bus Speed</CardTitle>
            </CardHeader>
            <CardContent className="w-full h-120">
              <SpeedImpactHistogram />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-2xl font-bold">
              <CardTitle>Peak and Off-Peak Speed Change Post ACE</CardTitle>
            </CardHeader>
            <CardContent>
            <PeakOffPeakBoxD3 />
            </CardContent>
          </Card>
        </div>


        <Separator />

        <div className="grid grid-cols-[1.5fr_1fr] gap-4">
          <Card>
            <CardHeader className="text-2xl font-bold">
              <CardTitle>ACE Program’s Impact on Journey Quality</CardTitle>
            </CardHeader>
            <CardContent className="w-full h-120">
              <JrnyHistogram />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-2xl font-bold">
              <CardTitle>Peak and Off-Peak Reliability Change Post ACE</CardTitle>
            </CardHeader>
            <CardContent>
            <JourneyBoxPlot />
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div className="grid grid-cols-[1.5fr_1fr] gap-4">
          <Card>
            <CardHeader className="text-2xl font-bold">
              <CardTitle>Speed and Reliability Changes Post ACE</CardTitle>
            </CardHeader>
            <CardContent className="w-full h-120">
              <SpeedJrneyPerf />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-2xl font-bold">
              <CardTitle>Half Improving, a Quarter Declining: What’s Happening Across Bus Routes?</CardTitle>
            </CardHeader>
            <CardContent>
            <SpeedReliabilityPie />
            </CardContent>
          </Card>
        </div>


        <Separator />

      </div>
    </DashboardShell>
  );
}
