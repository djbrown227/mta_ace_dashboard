"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { speedPeak } from "@/data/processed/speedPeak";

export function RouteImpactViolinD3() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const data = speedPeak
      .map(d => d.totalEffectPct)
      .filter((v): v is number => typeof v === "number");

    const width = 300;
    const height = 400;
    const margin = { top: 40, right: 40, bottom: 40, left: 80 };

    const svg = d3.select(ref.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove(); // clear previous

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // -----------------------------
    // Y scale: symlog for negative and positive values
    // -----------------------------
    const C = 0.5; // linear region around zero
    const y = d3.scaleSymlog()
      .domain([d3.min(data)! - 20, d3.max(data)!+20])
      .range([innerHeight, 0])
      .constant(C);

    // -----------------------------
    // KDE function
    // -----------------------------
    const kde = kernelDensityEstimator(kernelEpanechnikov(0.5), y.ticks(50));
    const density = kde(data);

    const maxDensity = d3.max(density, d => d[1])!;

    // -----------------------------
    // X scale: mirror density horizontally
    // -----------------------------
    const x = d3.scaleLinear()
      .domain([-maxDensity, maxDensity])
      .range([0, innerWidth]);

    // -----------------------------
    // Violin path
    // -----------------------------
    const area = d3.area<[number, number]>()
      .y(d => y(d[0]))
      .x0(d => x(-d[1]))
      .x1(d => x(d[1]))
      .curve(d3.curveCatmullRom);

    g.append("path")
      .datum(density)
      .attr("d", area)
      .attr("fill", "steelblue")
      .attr("fill-opacity", 0.6)
      .attr("stroke", "steelblue");

    // -----------------------------
    // Add median + IQR (vertical)
    // -----------------------------
    const median = d3.median(data)!;
    const q1 = d3.quantile(data, 0.25)!;
    const q3 = d3.quantile(data, 0.75)!;

    // Median line
    g.append("line")
      .attr("x1", innerWidth / 2 - 5)
      .attr("x2", innerWidth / 2 + 5)
      .attr("y1", y(median))
      .attr("y2", y(median))
      .attr("stroke", "#000")
      .attr("stroke-width", 2);

    // IQR rectangle (vertical along Y)
    g.append("rect")
      .attr("x", innerWidth / 2 - 5)
      .attr("width", 10)
      .attr("y", y(q3))
      .attr("height", y(q1) - y(q3))
      .attr("fill", "#000")
      .attr("opacity", 0.5);

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

    // -----------------------------
    // KDE helpers
    // -----------------------------
    function kernelDensityEstimator(kernel: (v: number) => number, X: number[]) {
      return function(V: number[]) {
        return X.map(x => [x, d3.mean(V, v => kernel(x - v)) ?? 0] as [number, number]);
      };
    }

    function kernelEpanechnikov(k: number) {
      return function(v: number) {
        return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
      };
    }

  }, []);

  return <svg ref={ref}></svg>;
}
