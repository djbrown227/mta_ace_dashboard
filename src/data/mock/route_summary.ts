export type RouteSummary = {
    routeId: string;
    routeName: string;
    borough: "Manhattan" | "Brooklyn" | "Queens" | "The Bronx" | "Staten Island";
    aceStartDate: string;
    baselineSpeed: number;
    postSpeed: number;
    speedChangePct: number;
    baselineReliability: number;
    postReliability: number;
    reliabilityChangePct: number;
  };
  
  export const routeSummary: RouteSummary[] = [
    {
      routeId: "M15",
      routeName: "M15",
      borough: "Manhattan",
      aceStartDate: "2022-06-01",
      baselineSpeed: 6.8,
      postSpeed: 7.6,
      speedChangePct: 11.8,
      baselineReliability: 62,
      postReliability: 76,
      reliabilityChangePct: 22.6
    },
    {
      routeId: "Bx12",
      routeName: "Bx12",
      borough: "The Bronx",
      aceStartDate: "2023-01-15",
      baselineSpeed: 7.9,
      postSpeed: 8.5,
      speedChangePct: 7.6,
      baselineReliability: 58,
      postReliability: 69,
      reliabilityChangePct: 19.0
    },
    {
      routeId: "Q44",
      routeName: "Q44",
      borough: "Queens",
      aceStartDate: "2021-09-01",
      baselineSpeed: 8.2,
      postSpeed: 9.3,
      speedChangePct: 13.4,
      baselineReliability: 61,
      postReliability: 78,
      reliabilityChangePct: 27.9
    },
    {
      routeId: "B46",
      routeName: "B46",
      borough: "Brooklyn",
      aceStartDate: "2024-03-01",
      baselineSpeed: 6.1,
      postSpeed: 6.0,
      speedChangePct: -1.6,
      baselineReliability: 65,
      postReliability: 61,
      reliabilityChangePct: -6.2
    }
    // scale to ~60 routes
  ];
  