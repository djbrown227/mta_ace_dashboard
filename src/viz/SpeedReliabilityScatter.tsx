"use client";

import { useEffect, useRef, useState } from "react";
import * as Plot from "@observablehq/plot";
import { routeSummary } from "@/data/mock/routeSummary";
import { useDashboardStore } from "@/store/dashboardStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const ALL_BOROUGHS = ["Manhattan", "Brooklyn", "Queens", "Bronx"];

export function SpeedReliabilityScatter() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Borough filter state
  const [selectedBoroughs, setSelectedBoroughs] = useState<string[]>(ALL_BOROUGHS);

  // Route selection from global store
  const selectedRouteId = useDashboardStore(state => state.selectedRouteId);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const render = () => {
      container.innerHTML = "";

      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;

      // Filter by borough
      const filteredData = routeSummary.filter(d => selectedBoroughs.includes(d.borough));

      const chart = Plot.plot({
        width,
        height,
        marginLeft: 60,
        marginBottom: 50,
        marginRight: 20,
        marginTop: 20,
        grid: true,

        x: { label: "Speed change (%)", zero: true },
        y: { label: "Reliability change (%)", zero: true },
        color: { legend: true },

        marks: [
          // Reference lines
          Plot.ruleX([0], { strokeOpacity: 0.4 }),
          Plot.ruleY([0], { strokeOpacity: 0.4 }),

          // Scatter points with selection highlight
          Plot.dot(filteredData, {
            x: "speedChangePct",
            y: "reliabilityChangePct",
            fill: d => (d.routeId === selectedRouteId ? "red" : d.borough),
            stroke: d => (d.routeId === selectedRouteId ? "red" : d.borough),
            r: d => (d.routeId === selectedRouteId ? 8 : 4),
            opacity: d => (selectedRouteId && d.routeId !== selectedRouteId ? 0.4 : 1),
            title: d =>
              `${d.routeId}\nSpeed: ${d.speedChangePct}%\nReliability: ${d.reliabilityChangePct}%`,
          }),
        ],
      });

      container.appendChild(chart);
    };

    render();

    const resizeObserver = new ResizeObserver(render);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [selectedBoroughs, selectedRouteId]); // re-render on both

  return (
    <div className="flex flex-col h-full gap-3">
      {/* Borough toggle controls */}
      <ToggleGroup
        type="multiple"
        value={selectedBoroughs}
        onValueChange={setSelectedBoroughs}
        className="justify-start"
      >
        {ALL_BOROUGHS.map(borough => (
          <ToggleGroupItem key={borough} value={borough} className="text-xs">
            {borough}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {/* Scatter plot */}
      <div ref={containerRef} className="flex-1 w-full" />
    </div>
  );
}
