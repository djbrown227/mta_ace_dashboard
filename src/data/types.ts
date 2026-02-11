// data/types.ts

export type Borough = "Manhattan" | "Brooklyn" | "Queens" | "Bronx" | "Staten Island";

export interface Route {
  routeId: string;
  borough: Borough;
  aceStartDate: string; // ISO date
  ridership: number;
}

export interface ProgramImpactPoint {
  month: number; // months since ACE
  group: "ACE" | "Control";
  value: number; // percent change
}

export interface RouteSummary {
  routeId: string;
  speedChangePct: number;
  reliabilityChangePct: number;
  borough: Borough;
}

export type HourlyProfile = {
  routeId: string;        // could be `routeName` or `route_id`
  period: "Pre" | "Post";
  hour: number;
  avg_speed: number;
};

