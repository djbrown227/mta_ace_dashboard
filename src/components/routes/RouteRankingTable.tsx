"use client";

import { routeSummary } from "@/data/mock/route_summary";
import { useDashboardStore } from "@/store/dashboardStore";

export function RouteRankingTable() {
  const { selectedRouteId, setSelectedRouteId } = useDashboardStore();

  const sortedRoutes = [...routeSummary].sort(
    (a, b) => b.speedChangePct - a.speedChangePct
  );

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-3 py-2 text-left">Route</th>
            <th className="px-3 py-2 text-right">Speed Δ%</th>
            <th className="px-3 py-2 text-right">Reliability Δ%</th>
            <th className="px-3 py-2 text-left">Borough</th>
            <th className="px-3 py-2 text-left">ACE Start</th>
          </tr>
        </thead>
        <tbody>
          {sortedRoutes.map(route => {
            const isSelected = route.routeId === selectedRouteId;

            return (
              <tr
                key={route.routeId}
                onClick={() => setSelectedRouteId(route.routeId)} // ✅ updates Zustand
                className={`cursor-pointer hover:bg-muted/50 ${
                  isSelected ? "bg-muted" : ""
                }`}
              >
                <td className="px-3 py-2 font-medium">{route.routeName}</td>
                <td className="px-3 py-2 text-right">{route.speedChangePct.toFixed(1)}%</td>
                <td className="px-3 py-2 text-right">{route.reliabilityChangePct.toFixed(1)}%</td>
                <td className="px-3 py-2">{route.borough}</td>
                <td className="px-3 py-2">{route.aceStartDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
