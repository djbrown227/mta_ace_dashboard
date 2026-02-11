"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { speedPeak } from "@/data/processed/speedPeak";

export function RouteImpactBoxPlotD3() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // -----------------------------
    // Prepare data
    // -----------------------------
    const data = speedPeak
      .map(d => d.totalEffectPct)
      .filter((v): v is number => typeof v === "number");

    const width = 300;
    const height = 600;
    const margin = { top: 20, right: 40, bottom: 20, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(ref.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove(); // clear previous

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // -----------------------------
    // Y scale: symlog for negative and positive values
    // -----------------------------
    const C = 0.9; // linear region around zero
    const y = d3.scaleSymlog()
      .domain([d3.min(data)! - 20, d3.max(data)! + 20])
      .range([innerHeight, 0])
      .constant(C);

    // -----------------------------
    // Box plot statistics
    // -----------------------------
    const median = d3.median(data)!;
    const q1 = d3.quantile(data, 0.25)!;
    const q3 = d3.quantile(data, 0.75)!;
    const iqr = q3 - q1;
    const min = d3.min(data.filter(d => d >= q1 - 1.5 * iqr))!;
    const max = d3.max(data.filter(d => d <= q3 + 1.5 * iqr))!;

    const boxWidth = 30;
    const centerX = innerWidth / 2;

    // -----------------------------
    // Draw IQR box
    // -----------------------------
    g.append("rect")
      .attr("x", centerX - boxWidth / 2)
      .attr("width", boxWidth)
      .attr("y", y(q3))
      .attr("height", y(q1) - y(q3))
      .attr("fill", "#0567")
      .attr("opacity", 0.7);

    // -----------------------------
    // Draw median line
    // -----------------------------
    g.append("line")
      .attr("x1", centerX - boxWidth / 2)
      .attr("x2", centerX + boxWidth / 2)
      .attr("y1", y(median))
      .attr("y2", y(median))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    // -----------------------------
    // Draw whiskers
    // -----------------------------
    g.append("line")
      .attr("x1", centerX)
      .attr("x2", centerX)
      .attr("y1", y(min))
      .attr("y2", y(q1))
      .attr("stroke", "#000");

    g.append("line")
      .attr("x1", centerX)
      .attr("x2", centerX)
      .attr("y1", y(q3))
      .attr("y2", y(max))
      .attr("stroke", "#000");

    // Whisker caps
    g.append("line")
      .attr("x1", centerX - boxWidth / 4)
      .attr("x2", centerX + boxWidth / 4)
      .attr("y1", y(min))
      .attr("y2", y(min))
      .attr("stroke", "#000");

    g.append("line")
      .attr("x1", centerX - boxWidth / 4)
      .attr("x2", centerX + boxWidth / 4)
      .attr("y1", y(max))
      .attr("y2", y(max))
      .attr("stroke", "#000");

    // -----------------------------
    // Add individual points with jitter
    // -----------------------------
    const jitterWidth = 50;

    g.selectAll("indPoints")
      .data(data)
      .join("circle")
      .attr("cx", () => centerX - jitterWidth / 2 + Math.random() * jitterWidth)
      .attr("cy", d => y(d))
      .attr("r", 4)
      .attr("fill", "white")
      .attr("stroke", "black")
      .attr("fill-opacity", 0.2)   // control fill transparency
      .attr("stroke-opacity", 0.4); // control stroke transparency

    // -----------------------------
    // Y Axis
    // -----------------------------
    g.append("g")
      .call(d3.axisLeft(y));

    g.append("text")
      .attr("x", -margin.left / 2)
      .attr("y", innerHeight / 2)
      .attr("text-anchor", "middle")
      .attr("transform", `rotate(-90, ${-margin.left / 2}, ${innerHeight / 2})`)
      .text("Total Effect (%)");

  }, []);

  return <svg ref={ref}></svg>;
}
