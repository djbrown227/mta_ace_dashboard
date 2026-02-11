// viz/RouteTierBreakdown.tsx
"use client";

import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";
import { routeSummary } from "@/data/mock/routeSummary";

export function RouteTierBreakdown() {
  const ref = useRef<HTMLDivElement>(null);

  const boroughs = Array.from(new Set(routeSummary.map(r => r.borough)));
  const aggregated = boroughs.map(b => {
    const routes = routeSummary.filter(r => r.borough === b);
    const avgSpeed = routes.reduce((sum, r) => sum + r.speedChangePct, 0) / routes.length;
    return { borough: b, avgSpeed };
  });

  useEffect(() => {
    if (!ref.current) return;

    const chart = Plot.plot({
      marks: [
        Plot.barY(aggregated, {
          x: "borough",
          y: "avgSpeed",
          fill: "orange",
        }),
      ],
      x: { label: "Borough" },
      y: { label: "Avg % Speed Change" },
      marginBottom: 100,
      marginLeft: 50,
    });

    ref.current.innerHTML = "";
    ref.current.appendChild(chart);
  }, []);

  return <div ref={ref} className="w-full h-64" />;
}
