// components/layout/Header.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

/**
 * Service context indicator
 * Shows whether current time falls in peak bus service hours
 */
function ServiceContext() {
  const [context, setContext] = useState<"peak" | "offpeak">("offpeak");

  useEffect(() => {
    const checkServiceContext = () => {
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay();

      // NYC peak service assumptions (simplified but defensible)
      const isWeekday = day >= 1 && day <= 5;
      const isAMPeak = hour >= 7 && hour < 10;
      const isPMPeak = hour >= 16 && hour < 19;

      setContext(isWeekday && (isAMPeak || isPMPeak) ? "peak" : "offpeak");
    };

    checkServiceContext();
    const interval = setInterval(checkServiceContext, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Badge
      variant={context === "peak" ? "default" : "secondary"}
      className={`
        font-mono text-xs tracking-wider
        ${context === "peak"
          ? "bg-warning/10 text-warning border-warning/20"
          : "bg-muted text-muted-foreground border-border"
        }
      `}
    >
      <span
        className={`
          inline-block w-1.5 h-1.5 rounded-full mr-1.5
          ${context === "peak" ? "bg-warning animate-pulse" : "bg-muted-foreground"}
        `}
      />
      {context === "peak" ? "PEAK SERVICE" : "OFF-PEAK SERVICE"}
    </Badge>
  );
}

/**
 * Last updated timestamp
 */
function LastUpdated() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "America/New_York",
    }).format(date);

  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
      <span className="hidden sm:inline">Last updated:</span>
      <span className="tabular-nums">{formatTime(time)} ET</span>
    </div>
  );
}

/**
 * Main header
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4 py-4 lg:py-5">
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                MTA Bus — ACE Program
              </h1>
              <ServiceContext />
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Evaluating bus speed, reliability, and corridor performance across ACE routes
            </p>
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-4">
            <LastUpdated />
            <Separator orientation="vertical" className="h-8" />
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs font-medium rounded-md border border-border hover:bg-accent transition-colors">
                Refresh
              </button>
              <button className="px-3 py-1.5 text-xs font-medium rounded-md border border-border hover:bg-accent transition-colors">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Mobile row */}
        <div className="lg:hidden pb-3 flex items-center justify-between">
          <LastUpdated />
          <div className="flex gap-2">
            <button className="px-2.5 py-1 text-xs font-medium rounded border border-border hover:bg-accent">
              ↻
            </button>
            <button className="px-2.5 py-1 text-xs font-medium rounded border border-border hover:bg-accent">
              ⤓
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
