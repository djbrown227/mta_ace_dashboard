"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for market share
const data = [
  { name: "ExxonMobil", value: 25 },
  { name: "Chevron", value: 20 },
  { name: "BP", value: 15 },
  { name: "Shell", value: 10 },
  { name: "Others", value: 30 },
];

export function MarketSharePie() {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Clear previous SVG if it exists
    ref.current.innerHTML = "";

    // Chart dimensions
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    // Color scale
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.name))
      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

    // Pie layout
    const pie = d3.pie<{ name: string; value: number }>()
      .sort(null)
      .value(d => d.value);

    const arcs = pie(data);

    // Arc generator
    const arc = d3.arc<d3.PieArcDatum<{ name: string; value: number }>>()
      .innerRadius(0)       // Pie chart (not donut)
      .outerRadius(radius - 1);

    // Arc generator for labels
    const labelRadius = radius * 0.8;
    const arcLabel = d3.arc<d3.PieArcDatum<{ name: string; value: number }>>()
      .innerRadius(labelRadius)
      .outerRadius(labelRadius);

    // Create SVG container
    const svg = d3.select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height] as any)
      .style("max-width", "100%")
      .style("height", "auto")
      .style("font", "10px sans-serif");

    // Draw pie slices
    svg.append("g")
      .attr("stroke", "white")
      .selectAll("path")
      .data(arcs)
      .join("path")
        .attr("fill", d => color(d.data.name) as string)
        .attr("d", arc)
      .append("title")
        .text(d => `${d.data.name}: ${d.data.value}`);

    // Draw labels
    svg.append("g")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .join("text")
        .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
        .call(text => text.append("tspan")
            .attr("y", "-0.4em")
            .attr("font-weight", "bold")
            .text(d => d.data.name))
        .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25)
            .append("tspan")
            .attr("x", 0)
            .attr("y", "0.7em")
            .attr("fill-opacity", 0.7)
            .text(d => d.data.value));

  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Share of Top Oil Companies (Mock)</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Attach D3 SVG here */}
        <svg ref={ref}></svg>
      </CardContent>
    </Card>
  );
}
