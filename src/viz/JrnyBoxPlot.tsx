"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { jrnyBoxPlot } from "@/data/processed/jrnyBoxPlot";

export function JourneyBoxPlot() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;
    container.innerHTML = "";

    const width = 420;
    const height = 520;
    const margin = { top: 40, right: 40, bottom: 60, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const data = jrnyBoxPlot.flatMap((d) => {
      const rows: {
        routeId: string;
        period: "Peak" | "Off Peak";
        value: number;
      }[] = [];

      if (d.jrnyPeak !== null) rows.push({ routeId: d.routeId, period: "Peak", value: d.jrnyPeak });
      if (d.jrnyOffPeak !== null) rows.push({ routeId: d.routeId, period: "Off Peak", value: d.jrnyOffPeak });

      return rows;
    });

    const tooltip = d3
      .select(container)
      .append("div")
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("background", "white")
      .style("border", "1px solid #ddd")
      .style("border-radius", "6px")
      .style("padding", "8px 10px")
      .style("font-size", "12px")
      .style("line-height", "1.4")
      .style("opacity", 0)
      .style("box-shadow", "0 4px 12px rgba(0,0,0,0.15)");

    const x = d3
      .scaleBand<"Peak" | "Off Peak">()
      .domain(["Peak", "Off Peak"])
      .range([0, innerWidth])
      .padding(0.55);

    const C = 0.5;
    const y = d3
      .scaleSymlog()
      .domain([d3.min(data, (d) => d.value)! - 5, d3.max(data, (d) => d.value)! + 5])
      .range([innerHeight, 0])
      .constant(C);

    const xAxis = g.append("g").attr("transform", `translate(0,${innerHeight})`).call(d3.axisBottom(x));
    xAxis.selectAll("text")
      .style("font-family", "Arial, sans-serif")
      .style("font-size", "16px")
      .style("font-weight", "100")
      .style("fill", "#111827");

    g.append("g").call(d3.axisLeft(y));

    g.append("text")
      .attr("x", -margin.left / 2)
      .attr("y", innerHeight / 2)
      .attr("transform", `rotate(-90, ${-margin.left / 2}, ${innerHeight / 2})`)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-family", "Arial, sans-serif") // x axis title font
      .style("fill", "#111827")
      .text("Customer Journey Effect (%)");

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

      // IQR box → light neutral
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
        .attr("stroke", "#1f2937")
        .attr("stroke-width", 2);

      // Whiskers
      g.append("line").attr("x1", centerX).attr("x2", centerX).attr("y1", y(min)).attr("y2", y(max)).attr("stroke", "#1f2937");
      g.append("line").attr("x1", centerX - 10).attr("x2", centerX + 10).attr("y1", y(min)).attr("y2", y(min)).attr("stroke", "#1f2937");
      g.append("line").attr("x1", centerX - 10).attr("x2", centerX + 10).attr("y1", y(max)).attr("y2", y(max)).attr("stroke", "#1f2937");

      const jitterWidth = 44;
      g.selectAll(`circle.${period}`)
        .data(periodData)
        .join("circle")
        .attr("cx", () => centerX - jitterWidth / 2 + Math.random() * jitterWidth)
        .attr("cy", (d) => y(d.value))
        .attr("r", 4)
        .attr("fill", (d) => (d.value < 0 ? "#c2410c" : d.value > 0 ? "#0d9488" : "#d1d5db"))
        .attr("stroke", "#1f2937")
        .attr("stroke-opacity", 0.7)
        .on("mouseenter", function (event, d) {
          d3.select(this)
            .transition()
            .duration(100)
            .attr("r", 7)
            .attr("fill", d.value < 0 ? "#9a3412" : d.value > 0 ? "#115e59" : "#d1d5db");

          tooltip
            .style("opacity", 1)
            .html(
              `Route <strong>${d.routeId}</strong> experienced a
               <strong>${d.value.toFixed(1)}%</strong> journey effect during
               <strong>${period}</strong>, which is
               <strong>${d.value > median ? " above " : " below "}</strong>
               the median (${median.toFixed(1)}%).`
            );
        })
        .on("mousemove", function (event) {
          const [xPos, yPos] = d3.pointer(event, container);
          tooltip.style("left", `${xPos + 12}px`).style("top", `${yPos - 28}px`);
        })
        .on("mouseleave", function (event, d) {
          d3.select(this)
            .transition()
            .duration(100)
            .attr("r", 4)
            .attr("fill", d.value < 0 ? "#c2410c" : d.value > 0 ? "#0d9488" : "#d1d5db");

          tooltip.style("opacity", 0);
        });
    });
  }, []);

  return <div ref={ref} className="relative w-full flex justify-center" />;
}
