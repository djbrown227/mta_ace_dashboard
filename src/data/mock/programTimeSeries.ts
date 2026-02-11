import { ProgramImpactPoint } from "../types";

export const programTimeSeries: ProgramImpactPoint[] = [
  { month: -6, group: "ACE", value: 0 },
  { month: -3, group: "ACE", value: 0.4 },
  { month: 0, group: "ACE", value: 0 },
  { month: 3, group: "ACE", value: 4.2 },
  { month: 6, group: "ACE", value: 8.1 },

  { month: -6, group: "Control", value: 0 },
  { month: 0, group: "Control", value: 0.3 },
  { month: 6, group: "Control", value: 1.5 },
];
