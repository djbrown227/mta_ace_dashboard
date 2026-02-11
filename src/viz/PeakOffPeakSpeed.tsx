"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { speedPeakOffPeak } from "@/data/processed/speedPeakOffPeak";

export function PeakOffPeakBoxD3() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;
    container.innerHTML = "";

    const width = 400;
    const height = 500;
    const margin = { top: 40, right: 40, bottom: 60, left: 80 };
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

    const g = svg.append("g").attr(
      "transform",
      `translate(${margin.left},${margin.top})`
    );

    // -----------------------------
    // Prepare data: long format
    // -----------------------------
    const data = speedPeakOffPeak.flatMap((d) => [
      { routeId: d.routeId, period: "Peak" as const, value: d.peakEffectPct ?? 0 },
      {
        routeId: d.routeId,
        period: "Off Peak" as const,
        value: d.offPeakEffectPct ?? 0,
      },
    ]);

    // -----------------------------
    // Tooltip
    // -----------------------------
    const tooltip = d3
      .select(container)
      .append("div")
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("background", "white")
      .style("border", "1px solid #e5e7eb")
      .style("border-radius", "6px")
      .style("padding", "8px 10px")
      .style("font-size", "12px")
      .style("line-height", "1.4")
      .style("opacity", 0)
      .style("box-shadow", "0 6px 16px rgba(0,0,0,0.12)");

    // -----------------------------
    // Color helpers (MUTED, DIVERGING)
    // -----------------------------
    // -----------------------------
    // Color helpers (ALIGNED WITH HISTOGRAM)
    // -----------------------------
    //const jitterColor = (v: number) => {
    //  if (v < -1) return "#c2410c"; // brick (slower)
    //  if (v > 1) return "#3b82f6"; // blue (faster)
    //  return "#e5e7eb"; // near zero
    //};

    //const jitterHoverColor = (v: number) => {
    //  if (v < -1) return "#9a3412"; // deeper brick
    //  if (v > 1) return "#1d4ed8"; // deeper blue
    //  return "#d1d5db";
    //};

    const jitterColor = (v: number) => {
      return v >= 0 ? "#3b82f6" : "#c2410c"; // positive = green, negative = red
    };
    
    const jitterHoverColor = (v: number) => {
      return v >= 0 ? "#1d4ed8" : "#9a3412"; // darker on hover
    };


    // -----------------------------
    // X scale
    // -----------------------------
    const x = d3
      .scaleBand<"Peak" | "Off Peak">()
      .domain(["Peak", "Off Peak"])
      .range([0, innerWidth])
      .padding(0.5);

    // -----------------------------
    // Y scale (symlog)
    // -----------------------------
    const y = d3
      .scaleSymlog()
      .domain([
        d3.min(data, (d) => d.value)! - 5,
        d3.max(data, (d) => d.value)! + 5,
      ])
      .range([innerHeight, 0])
      .constant(0.5);

    // -----------------------------
    // Axes
    // -----------------------------
    const xAxis = g
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    xAxis
      .selectAll("text")
      .style("font-size", "16px")
      .style("font-weight", "100")
      .style("fill", "#374151")
      .style("font-family", "Arial, sans-serif"); // x axis title font

    g.append("g").call(d3.axisLeft(y));

    g.append("text")
      .attr("x", -margin.left / 2)
      .attr("y", innerHeight / 2)
      .attr(
        "transform",
        `rotate(-90, ${-margin.left / 2}, ${innerHeight / 2})`
      )
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("fill", "#111827")
      .style("font-family", "Arial, sans-serif") // x axis title font
      .text("Average Speed Change (%)");

    // -----------------------------
    // Boxplots + jitter
    // -----------------------------
    (["Peak", "Off Peak"] as const).forEach((period) => {
      const periodData = data.filter((d) => d.period === period);
      const values = periodData.map((d) => d.value);

      const median = d3.median(values)!;
      const q1 = d3.quantile(values, 0.25)!;
      const q3 = d3.quantile(values, 0.75)!;
      const iqr = q3 - q1;
      const min = d3.min(values.filter((v) => v >= q1 - 1.5 * iqr))!;
      const max = d3.max(values.filter((v) => v <= q3 + 1.5 * iqr))!;
      const centerX = x(period)! + x.bandwidth() / 2;

      // IQR box (neutral)
      g.append("rect")
        .attr("x", centerX - 22)
        .attr("width", 44)
        .attr("y", y(q3))
        .attr("height", y(q1) - y(q3))
        .attr("fill", "#e5e7eb");

      // Median
      g.append("line")
        .attr("x1", centerX - 22)
        .attr("x2", centerX + 22)
        .attr("y1", y(median))
        .attr("y2", y(median))
        .attr("stroke", "#111827")
        .attr("stroke-width", 2);

      // Whiskers
      g.append("line")
        .attr("x1", centerX)
        .attr("x2", centerX)
        .attr("y1", y(min))
        .attr("y2", y(max))
        .attr("stroke", "#6b7280");

      g.append("line")
        .attr("x1", centerX - 10)
        .attr("x2", centerX + 10)
        .attr("y1", y(min))
        .attr("y2", y(min))
        .attr("stroke", "#6b7280");

      g.append("line")
        .attr("x1", centerX - 10)
        .attr("x2", centerX + 10)
        .attr("y1", y(max))
        .attr("y2", y(max))
        .attr("stroke", "#6b7280");

      // -----------------------------
      // Jitter points (DIVERGING)
      // -----------------------------
      const jitterWidth = 44;

      g.selectAll(`circle.${period}`)
        .data(periodData)
        .join("circle")
        .attr(
          "cx",
          () =>
            centerX -
            jitterWidth / 2 +
            Math.random() * jitterWidth
        )
        .attr("cy", (d) => y(d.value))
        .attr("r", 4)
        .attr("fill", (d) => jitterColor(d.value))
        .attr("fill-opacity", 0.7)
        .attr("stroke", "#374151")
        .attr("stroke-opacity", 0.6)
        .on("mouseenter", function (event, d) {
          d3.select(this)
            .transition()
            .duration(100)
            .attr("r", 7)
            .attr("fill", jitterHoverColor(d.value))
            .attr("stroke-width", 2);

          tooltip
            .style("opacity", 1)
            .html(
              `Route <strong>${d.routeId}</strong> changed by 
               <strong>${d.value.toFixed(1)}%</strong> during 
               <strong>${period}</strong>, which is 
               ${d.value > median ? "above" : "below"} the median 
               (${median.toFixed(1)}%).`
            );
        })
        .on("mousemove", function (event) {
          const [xPos, yPos] = d3.pointer(event, container);
          tooltip
            .style("left", `${xPos + 12}px`)
            .style("top", `${yPos - 28}px`);
        })
        .on("mouseleave", function () {
          d3.select(this)
            .transition()
            .duration(100)
            .attr("r", 4)
            .attr("stroke-width", 1);
          tooltip.style("opacity", 0);
        });
    });
  }, []);

  return <div ref={ref} className="relative w-full flex justify-center" />;
}
