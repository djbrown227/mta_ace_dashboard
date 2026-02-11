"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { speedOverall } from "@/data/processed/speedOverall";

export function SpeedImpactHistogram() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = "";

    const width = 700;
    const height = 500;
    const margin = { top: 20, right: 20, bottom: 60, left: 60 };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // -----------------------------
    // SVG
    // -----------------------------
    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // -----------------------------
    // Tooltip (HTML)
    // -----------------------------
    const tooltip = d3
      .select(container)
      .append("div")
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("background", "white")
      .style("border", "1px solid #e5e7eb")
      .style("border-radius", "6px")
      .style("padding", "8px 10px")
      .style("font-size", "12px")
      .style("line-height", "1.4")
      .style("box-shadow", "0 6px 16px rgba(0,0,0,0.12)");

    // -----------------------------
    // Data
    // -----------------------------
    const values = speedOverall.map((d) => d.totalEffectPct);

    const thresholds = [-Infinity, -5, 0, 5, 10, 15, Infinity];

    const bins = thresholds.slice(0, -1).map((x0, i) => {
      const x1 = thresholds[i + 1];
      return {
        x0,
        x1,
        count: values.filter((v) => v >= x0 && v < x1).length,
      };
    });

    // -----------------------------
    // Color helpers (DISCRETE + MUTED)
    // -----------------------------
// -----------------------------
// Color helpers (DISCRETE + STRONGER)
// -----------------------------
    const binColor = (d: any) => {
      if (d.x1 <= 0) return "#c2410c"; // warm brick (slower)
      if (d.x0 < 0 && d.x1 > 0) return "#e5e7eb"; // neutral
      if (d.x1 <= 10) return "#3b82f6"; // confident blue
      return "#1d4ed8"; // strong improvement
    };

    const binHoverColor = (d: any) => {
      if (d.x1 <= 0) return "#9a3412"; // deeper brick
      if (d.x0 < 0 && d.x1 > 0) return "#d1d5db";
      if (d.x1 <= 10) return "#2563eb";
      return "#1e40af";
    };


    // -----------------------------
    // Text helpers
    // -----------------------------
    const binText = (d: any) => {
      if (d.x0 === -Infinity) return "more than 5% slower";
      if (d.x1 === Infinity) return "more than 15% faster";
      if (d.x0 < 0 && d.x1 <= 0)
        return `${Math.abs(d.x1)}%–${Math.abs(d.x0)}% slower`;
      if (d.x0 < 0 && d.x1 > 0) return "little to no change";
      return `${d.x0}%–${d.x1}% faster`;
    };

    const interpretation = (d: any) => {
      if (d.x1 <= -10) return "substantial speed declines";
      if (d.x1 < 0) return "modest speed declines";
      if (d.x0 < 0 && d.x1 === 0) return "modest speed declines"; // <- add this
      if (d.x0 < 0 && d.x1 > 0) return "no meaningful change in speed";
      if (d.x1 <= 10) return "moderate speed improvements";
      return "large speed improvements";
    };
    

    // -----------------------------
    // Scales
    // -----------------------------
    const x = d3
      .scaleBand()
      .domain(bins.map((_, i) => i.toString()))
      .range([0, innerWidth])
      .padding(0.15);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(bins, (d) => d.count)!])
      .nice()
      .range([innerHeight, 0]);

    // -----------------------------
    // Bars
    // -----------------------------
    g.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
      .attr("x", (_, i) => x(i.toString())!)
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => innerHeight - y(d.count))
      .attr("fill", (d) => binColor(d))
      .on("mouseenter", function (event, d) {
        d3.select(this).attr("fill", binHoverColor(d));

        tooltip
          .style("opacity", 1)
          .html(
            `<strong>${d.count} route${d.count === 1 ? "" : "s"}</strong> fall in the 
             <strong>${binText(d)}</strong> range.<br/>
             This suggests <strong>${interpretation(d)}</strong> following ACE implementation.`
          );
      })
      .on("mousemove", function (event) {
        const [xPos, yPos] = d3.pointer(event, container);
        tooltip
          .style("left", `${xPos + 12}px`)
          .style("top", `${yPos - 28}px`);
      })
      .on("mouseleave", function (event, d) {
        d3.select(this).attr("fill", binColor(d));
        tooltip.style("opacity", 0);
      });

    // -----------------------------
    // Axes
    // -----------------------------
    g.append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(
      d3.axisBottom(x).tickFormat((_, i) => {
        const d = bins[i];
        if (d.x0 === -Infinity) return "-5%+";
        if (d.x1 === Infinity) return "15%+";
        return `${d.x0}–${d.x1}%`;
      })
    )
    .selectAll("text")
    .style("font-size", "14px")   // tick label font size
    .style("font-family", "Arial, sans-serif") // tick label font
    .style("fill", "#111827")     // tick label color
    .attr("dy", "0.8em");         // vertical offset

    g.append("g").call(d3.axisLeft(y));

    // -----------------------------
    // Labels
    // -----------------------------
    svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 10)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")   // x axis title font size
    .style("font-family", "Arial, sans-serif") // x axis title font
    .style("fill", "#111827")     // color
      .text("Average Speed Change (%)");

      svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 18)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")   // y axis title font size
      .style("font-family", "Arial, sans-serif") // y axis title font
      .style("fill", "#111827")     // color
      .text("Number of Routes");
  }, []);


  return (
    <div
      ref={containerRef}
      className="relative w-full flex justify-center"
    />
  );
}
