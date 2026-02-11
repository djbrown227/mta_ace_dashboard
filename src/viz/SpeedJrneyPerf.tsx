"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import {
  speedCustScatter,
  speedCustScatterRow,
} from "@/data/processed/speedCustScatter";

type NonNullRow = {
  routeId: string;
  speedEffectPct: number;
  custJrnyEffectPct: number;
};

/* -----------------------------
   Component
----------------------------- */

export function SpeedJrneyPerf() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const width = 800;
    const height = 500;
    const margin = { top: 40, right: 10, bottom: 80, left: 80 };

    ref.current.innerHTML = "";
    const container = d3.select(ref.current);

    const svg = container
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const data: NonNullRow[] = speedCustScatter
      .filter(
        (d): d is speedCustScatterRow =>
          d.speedEffectPct !== null && d.custJrnyEffectPct !== null
      )
      .map((d) => ({
        routeId: d.routeId,
        speedEffectPct: d.speedEffectPct!,
        custJrnyEffectPct: d.custJrnyEffectPct!,
      }));

    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.speedEffectPct) as [number, number])
      .nice()
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.custJrnyEffectPct) as [number, number])
      .nice()
      .range([innerHeight, 0]);

    // -----------------------------
    // Zero lines
    g.append("line")
      .attr("x1", x(0))
      .attr("x2", x(0))
      .attr("y1", 0)
      .attr("y2", innerHeight)
      .attr("stroke", "#d1d5db")
      .attr("stroke-dasharray", "3,3");

    g.append("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", y(0))
      .attr("y2", y(0))
      .attr("stroke", "#d1d5db")
      .attr("stroke-dasharray", "3,3");

    // -----------------------------
    // Muted quadrant colors
    const colorForPoint = (d: NonNullRow) => {
      if (d.speedEffectPct >= 0 && d.custJrnyEffectPct >= 0) return "#0d9488"; // win-win
      if (d.speedEffectPct >= 0 && d.custJrnyEffectPct < 0) return "#d97706"; // speed-only
      if (d.speedEffectPct < 0 && d.custJrnyEffectPct >= 0) return "#4338ca"; // reliability-only
      if (d.speedEffectPct < 0 && d.custJrnyEffectPct < 0) return "#b91c1c"; // lose-lose
      return "#6b7280";
    };

    // -----------------------------
    // Tooltip
    const tooltip = container
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("pointer-events", "none")
      .style("background", "white")
      .style("padding", "6px 8px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("opacity", 0);

    // -----------------------------
    // Scatter points
    const circles = g
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", (d) => x(d.speedEffectPct))
      .attr("cy", (d) => y(d.custJrnyEffectPct))
      .attr("r", 5)
      .attr("fill", colorForPoint)
      .attr("opacity", 0.8);

    circles
      .on("mouseover", function (event, d) {
        circles.attr("opacity", 0.2);
        d3.select(this)
          .attr("opacity", 1)
          .attr("r", 8)
          .attr("stroke", "#374151")
          .attr("stroke-width", 1.2)
          .attr("fill", () => {
            if (d.speedEffectPct >= 0 && d.custJrnyEffectPct >= 0) return "#115e59";
            if (d.speedEffectPct >= 0 && d.custJrnyEffectPct < 0) return "#78350f";
            if (d.speedEffectPct < 0 && d.custJrnyEffectPct >= 0) return "#312e81";
            if (d.speedEffectPct < 0 && d.custJrnyEffectPct < 0) return "#7f1d1d";
            return "#4b5563";
          });

        const [xPos, yPos] = d3.pointer(event, ref.current!);
        tooltip
          .style("opacity", 1)
          .html(
            `Route <strong>${d.routeId}</strong> experienced a <strong>${d.speedEffectPct.toFixed(
              2
            )}%</strong> change in speed and a <strong>${d.custJrnyEffectPct.toFixed(
              2
            )}%</strong> effect on the customer journey.`
          )
          .style("left", `${xPos + 12}px`)
          .style("top", `${yPos - 12}px`);
      })
      .on("mousemove", (event) => {
        const [xPos, yPos] = d3.pointer(event, ref.current!);
        tooltip.style("left", `${xPos + 12}px`).style("top", `${yPos - 12}px`);
      })
      .on("mouseout", function () {
        circles
          .attr("opacity", 0.8)
          .attr("r", 5)
          .attr("stroke", "none")
          .attr("fill", colorForPoint);
        tooltip.style("opacity", 0);
      });

    // -----------------------------
    // Axes
    const xAxis = g
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).tickFormat((d) => `${d}%`));

    const yAxis = g.append("g").call(d3.axisLeft(y).tickFormat((d) => `${d}%`));

    // Customize font and size of axis labels
    xAxis.selectAll("text").style("font-size", "14px").style("font-family", "Arial");
    yAxis.selectAll("text").style("font-size", "14px").style("font-family", "Arial");

    // -----------------------------
    // Axis titles
    svg
      .append("text")
      .attr(
        "transform",
        `translate(${margin.left + innerWidth / 2},${height - margin.bottom / 3})`
      )
      .style("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-family", "Arial")
      .style("font-weight", "600")
      .text("Speed Effect (%)");

    svg
      .append("text")
      .attr(
        "transform",
        `translate(${margin.left / 3},${margin.top + innerHeight / 2}) rotate(-90)`
      )
      .style("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-family", "Arial")
      .style("font-weight", "600")
      .text("Customer Journey Effect (%)");

    // -----------------------------
// -----------------------------
// Legend
const legendData = [
  { label: "Speed & reliability improved", color: "#0d9488" },
  { label: "Speed improved only", color: "#d97706" },
  { label: "Reliability improved only", color: "#4338ca" },
  { label: "Both worsened", color: "#b91c1c" },
];

// Legend container (styled once here)
const legend = svg
  .append("g")
  .attr("transform", `translate(${width - 250}, 15)`)

  .style("font-family", "Inter, Arial, sans-serif")
  .style("font-size", "14px")
  .style("font-weight", "700")
  .style("fill", "#374151");

// Data join instead of forEach
const legendRows = legend
  .selectAll(".legend-row")
  .data(legendData)
  .enter()
  .append("g")
  .attr("class", "legend-row")
  .attr("transform", (d, i) => `translate(0, ${i * 22})`); // vertical spacing

// Color squares
legendRows
  .append("rect")
  .attr("width", 12)
  .attr("height", 12)
  .attr("fill", (d) => d.color)
  .attr("y", -9);

// Labels (NO font styling here — inherits from parent)
legendRows
  .append("text")
  .attr("x", 18)
  .attr("y", 0)
  .attr("dominant-baseline", "middle")
  .text((d) => d.label);

  }, []);

  return <div ref={ref} className="relative w-full h-full" />;
}
