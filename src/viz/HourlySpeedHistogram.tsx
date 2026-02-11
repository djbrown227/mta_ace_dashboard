"use client";

import { useState } from "react";
import * as Plot from "@observablehq/plot";
import { hourlyProfiles } from "@/data/mock/hourlyProfiles";
import { useEffect, useRef } from "react";

export function HourlySpeedHistogram() {
  const ref = useRef<HTMLDivElement>(null);
  const [period, setPeriod] = useState<"Pre" | "Post">("Pre");

  useEffect(() => {
    if (!ref.current) return;

    ref.current.innerHTML = "";

    const data = hourlyProfiles.filter((d) => d.period === period);

    const chart = Plot.plot({
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
      marginLeft: 50,
      marginBottom: 40,
      x: {
        label: "Hour of Day",
        tickFormat: (d: number) => `${d}:00`,
      },
      y: {
        label: "Avg Speed",
        nice: true,
      },
      marks: [
        Plot.barY(data, { x: "hour", y: "speed", fill: "#4f46e5" }),
      ],
    });

    ref.current.appendChild(chart);

    return () => {
      ref.current?.removeChild(chart);
    };
  }, [period]);

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <button
          onClick={() => setPeriod("Pre")}
          className={`px-3 py-1 text-sm font-medium rounded-md border ${
            period === "Pre" ? "bg-blue-600 text-white" : "border-gray-300"
          }`}
        >
          Pre-ACE
        </button>
        <button
          onClick={() => setPeriod("Post")}
          className={`px-3 py-1 text-sm font-medium rounded-md border ${
            period === "Post" ? "bg-blue-600 text-white" : "border-gray-300"
          }`}
        >
          Post-ACE
        </button>
      </div>

      <div ref={ref} className="w-full h-80" />
    </div>
  );
}
