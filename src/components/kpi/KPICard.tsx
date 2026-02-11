// components/kpi/KPICard.tsx
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface KPICardProps {
  title: string;
  value: string;
  delta?: string; // always % vs pre-ACE baseline
  subtitle?: string;
  loading?: boolean;
}

export function KPICard({
  title,
  value,
  delta,
  subtitle,
  loading = false,
}: KPICardProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <div className="h-4 w-32 bg-muted animate-pulse rounded" />
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="h-8 w-24 bg-muted animate-pulse rounded" />
          <div className="h-3 w-40 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  const isPositive = delta && parseFloat(delta) > 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="space-y-1">
        <div className="text-3xl font-semibold tabular-nums">
          {value}
        </div>

        {delta && (
          <div
            className={`text-sm font-medium ${
              isPositive ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {delta} vs pre-ACE baseline
          </div>
        )}

        {subtitle && (
          <p className="text-xs text-muted-foreground">
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
