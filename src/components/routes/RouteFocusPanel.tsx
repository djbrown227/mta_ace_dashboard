"use client";

import { useDashboardStore } from "@/store/dashboardStore";
import { routeSummary } from "@/data/mock/route_summary";
//import { hourlyProfiles } from "@/data/mock/hourlyProfiles";
import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* -----------------------------
   Small reusable stat card
------------------------------ */
function StatCard({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
}) {
  const trendColor =
    trend === "up"
      ? "text-green-600"
      : trend === "down"
      ? "text-red-600"
      : "text-foreground";

  return (
    <Card className="p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`text-lg font-semibold ${trendColor}`}>{value}</div>
    </Card>
  );
}

/* -----------------------------
   Main component
------------------------------ */
export function RouteFocusPanel() {
  const selectedRouteId = useDashboardStore(
    (state) => state.selectedRouteId
  );
  const chartRef = useRef<HTMLDivElement>(null);

  const routeData = selectedRouteId
    ? routeSummary.find((r) => r.routeId === selectedRouteId)
    : undefined;

  //const hourlyData = selectedRouteId
  //  ? hourlyProfiles.filter((h) => h.routeId === selectedRouteId)
  //  : [];

  /* -----------------------------
     Render
  ------------------------------ */
  return (
    <Card className="mt-6 w-full">
      <CardHeader className="space-y-2">
        <CardTitle>
          {routeData
            ? `Route Details: ${routeData.routeName}`
            : "Select a Route"}
        </CardTitle>

        {routeData ? (
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{routeData.borough}</Badge>
            <Badge variant="outline">
              ACE start: {routeData.aceStartDate}
            </Badge>
            <Badge variant="outline">
              Route ID: {routeData.routeId}
            </Badge>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            Click a route in the table to see details.
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {routeData && (
          <>
            {/* KPI grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                label="Baseline Speed"
                value={`${routeData.baselineSpeed} mph`}
              />

              <StatCard
                label="Post Speed"
                value={`${routeData.postSpeed} mph`}
              />

              <StatCard
                label="% Speed Change"
                value={`${routeData.speedChangePct?.toFixed(1) ?? 0}%`}
                trend={
                  routeData.speedChangePct && routeData.speedChangePct > 0
                    ? "up"
                    : routeData.speedChangePct &&
                      routeData.speedChangePct < 0
                    ? "down"
                    : "neutral"
                }
              />

              <StatCard
                label="Reliability Δ"
                value={`${routeData.reliabilityChangePct?.toFixed(1) ?? 0}%`}
                trend={
                  routeData.reliabilityChangePct &&
                  routeData.reliabilityChangePct > 0
                    ? "up"
                    : routeData.reliabilityChangePct &&
                      routeData.reliabilityChangePct < 0
                    ? "down"
                    : "neutral"
                }
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
