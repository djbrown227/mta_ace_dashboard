// data/mock/routeSpeedTimeSeries.ts

export type RouteSpeedPoint = {
    routeId: string;
    date: string; // ISO date
    avg_speed: number;
  };
  
  export const routeSpeedTimeSeries: RouteSpeedPoint[] = [
    { routeId: "M15", date: "2024-10-01", avg_speed: 7.2 },
    { routeId: "M15", date: "2024-11-01", avg_speed: 7.4 },
    { routeId: "M15", date: "2024-12-01", avg_speed: 7.5 },
    { routeId: "M15", date: "2025-01-01", avg_speed: 7.9 },
    { routeId: "M15", date: "2025-02-01", avg_speed: 8.1 },
  
    { routeId: "B46", date: "2024-10-01", avg_speed: 6.5 },
    { routeId: "B46", date: "2024-11-01", avg_speed: 6.6 },
    { routeId: "B46", date: "2024-12-01", avg_speed: 6.7 },
    { routeId: "B46", date: "2025-01-01", avg_speed: 7.0 },
  ];
  