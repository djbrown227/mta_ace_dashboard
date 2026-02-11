// viz/ProgramImpactChart.tsx
"use client";

import { useEffect, useRef } from "react";
import * as Plot from "@observablehq/plot";
import { programTimeSeries } from "@/data/mock/programTimeSeries";

export function ProgramImpactChart() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // clear previous chart
    ref.current.innerHTML = "";

    const chart = Plot.plot({
      height: ref.current.clientHeight,  // <-- fill parent height
      width: ref.current.clientWidth,    // <-- optional, can also let it auto
      marks: [
        Plot.line(programTimeSeries, { x: "month", y: "value", stroke: "group" }),
        Plot.dot(programTimeSeries, { x: "month", y: "value", fill: "group" }),
      ],
      x: { label: "Months Since ACE" },
      y: { label: "Percent Speed Change" },
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
