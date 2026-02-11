"use client";

import * as Plot from "@observablehq/plot";
import { useEffect, useRef } from "react";
import { routeSummary } from "@/data/mock/routeSummary";

export function RouteImpactHistogram() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // 1️⃣ Sort routes by largest speed change (descending)
    const topRoutes = [...routeSummary]
      .sort((a, b) => b.speedChangePct - a.speedChangePct)
      .slice(0, 25);

    // 2️⃣ Explicitly define y-axis order (top = largest)
    const yDomain = topRoutes.map((d) => d.routeId);

    const chart = Plot.plot({
      height: 420,
      marginLeft: 100,
      marginBottom: 100,

      x: {
        label: "% Speed Change",
        grid: true,
        tickFormat: (d) => `${d}%`,
      },

      y: {
        label: null,
        tickSize: 0,
        domain: yDomain,
      },

      marks: [
        Plot.barX(topRoutes, {
          x: "speedChangePct",
          y: "routeId",
          fill: "steelblue",
        }),
      ],
    });

    ref.current.innerHTML = "";
    ref.current.appendChild(chart);

    return () => {
      chart.remove();
    };
  }, []);

  return <div ref={ref} className="w-full" />;
}
