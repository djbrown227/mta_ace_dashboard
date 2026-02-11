"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import {
  speedCustScatter,
  speedCustScatterRow,
} from "@/data/processed/speedCustScatter";

/* -----------------------------
   Types
----------------------------- */

type NonNullRow = {
  routeId: string;
  speedEffectPct: number;
  custJrnyEffectPct: number;
};

type Outcome =
  | "win-win"
  | "speed-only"
  | "reliability-only"
  | "lose-lose";

type PieDatum = {
  outcome: Outcome;
  count: number;
};

/* -----------------------------
   Outcome classification
----------------------------- */

function classifyOutcome(d: NonNullRow): Outcome {
  if (d.speedEffectPct >= 0 && d.custJrnyEffectPct >= 0) return "win-win";
  if (d.speedEffectPct >= 0 && d.custJrnyEffectPct < 0) return "speed-only";
  if (d.speedEffectPct < 0 && d.custJrnyEffectPct >= 0) return "reliability-only";
  return "lose-lose";
}

/* -----------------------------
   Component
----------------------------- */

export function SpeedReliabilityPie() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const width = 360;
    const height = 360;
    const radius = Math.min(width, height) / 2;

    ref.current.innerHTML = "";
    const container = d3.select(ref.current);

    const svg = container
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const rows: NonNullRow[] = speedCustScatter
      .filter(
        (d): d is speedCustScatterRow =>
          d.speedEffectPct !== null && d.custJrnyEffectPct !== null
      )
      .map((d) => ({
        routeId: d.routeId,
        speedEffectPct: d.speedEffectPct!,
        custJrnyEffectPct: d.custJrnyEffectPct!,
      }));

    const pieData: PieDatum[] = d3
      .rollups(
        rows,
        (v) => v.length,
        (d) => classifyOutcome(d)
      )
      .map(([outcome, count]) => ({ outcome, count }));

    const total = d3.sum(pieData, (d) => d.count);

    const color = d3
      .scaleOrdinal<Outcome, string>()
      .domain(["win-win", "speed-only", "reliability-only", "lose-lose"])
      .range(["#0d9488", "#d97706", "#4338ca", "#b91c1c"]);

    const pie = d3.pie<PieDatum>().value((d) => d.count).sort(null);

    const arc = d3
      .arc<d3.PieArcDatum<PieDatum>>()
      .innerRadius(0)
      .outerRadius(radius - 8);

    const labelArc = d3
      .arc<d3.PieArcDatum<PieDatum>>()
      .innerRadius(radius * 0.55)
      .outerRadius(radius * 0.55);

    const arcs = pie(pieData);

    const tooltip = container
      .append("div")
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("background", "white")
      .style("border", "1px solid #d1d5db")
      .style("border-radius", "4px")
      .style("padding", "6px 8px")
      .style("font-size", "12px")
      .style("opacity", 0);

    const outcomeLabel: Record<Outcome, string> = {
      "win-win": "improvements in both speed and reliability",
      "speed-only": "speed gains but reliability losses",
      "reliability-only": "reliability gains but slower speeds",
      "lose-lose": "declines in both speed and reliability",
    };

    // Draw pie slices
    g.selectAll("path")
      .data(arcs)
      .join("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.outcome))
      .attr("stroke", "white")
      .attr("stroke-width", 1.5)
      .on("mouseover", function (event, d) {
        d3.select(this).attr("opacity", 0.85);

        const [x, y] = d3.pointer(event, ref.current!);
        tooltip
          .style("opacity", 1)
          .html(
            `<strong>${d.data.count}</strong> routes experienced ${outcomeLabel[d.data.outcome]} after ACE implementation.`
          )
          .style("left", `${x + 12}px`)
          .style("top", `${y - 12}px`);
      })
      .on("mousemove", (event) => {
        const [x, y] = d3.pointer(event, ref.current!);
        tooltip.style("left", `${x + 12}px`).style("top", `${y - 12}px`);
      })
      .on("mouseout", function () {
        d3.select(this).attr("opacity", 1);
        tooltip.style("opacity", 0);
      });

    // Percentage labels inside slices
    g.selectAll("text.pct-label")
      .data(arcs)
      .join("text")
      .attr("class", "pct-label")
      .attr("transform", (d) => `translate(${labelArc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .style("fill", "white")
      .style("font-family", "Arial, sans-serif")
      .style("font-size", "13px")
      .style("font-weight", "600")
      .style("pointer-events", "none")
      .text((d) => {
        const pct = (d.data.count / total) * 100;
        return pct >= 6 ? `${pct.toFixed(0)}%` : "";
      });
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div ref={ref} className="relative" />
    </div>
  );
}
