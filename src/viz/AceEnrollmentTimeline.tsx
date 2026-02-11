// viz/AceEnrollmentTimeline.tsx
"use client";

import { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import { aceTimeline } from "@/data/mock/aceTimeline";

export function AceEnrollmentTimeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.innerHTML = "";

    const chart = Plot.plot({
      height: ref.current.clientHeight,   // fill parent
      width: ref.current.clientWidth,     // fill parent width
      marks: [
        Plot.dot(
          aceTimeline.map(d => ({ ...d, ace_start_date: new Date(d.ace_start_date) })),
          {
            x: "ace_start_date",
            y: "route_id",
            fill: "borough",
          }
        ),
      ],      
      x: {
        label: "ACE Start Date",
        tickFormat: (d: Date) =>
          d.toLocaleDateString("en-US", { year: "numeric", month: "short" }),
      },
      y: { label: "Route ID" },
      marginLeft: 60,
      marginBottom: 40,
    });

    ref.current.appendChild(chart);

    return () => {
      ref.current?.removeChild(chart);
    };
  }, []);

  return <div ref={ref} className="w-full h-full" />;
}
