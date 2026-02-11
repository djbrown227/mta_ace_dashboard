
export type speedJrnyRow = {
  routeId: string;
  speedOverall: number | null;
  speedPeak: number | null;
  speedOffPeak: number | null;
  jrnyOverall: number | null; 
  jrnyPeak: number | null;
  jrnyOffPeak: number | null;
};

export const speedJrny: speedJrnyRow[] = [
  {
    routeId: "B11",
    speedOverall: 1.63,
    speedPeak: 0.34,
    speedOffPeak: 2.03,
    jrnyOverall: 4.91,
    jrnyPeak: 5.98,
    jrnyOffPeak: 3.95
  },
  {
    routeId: "B25",
    speedOverall: 1.06,
    speedPeak: 0.95,
    speedOffPeak: -0.44,
    jrnyOverall: 1.21,
    jrnyPeak: 2.75,
    jrnyOffPeak: 0.1
  },
  {
    routeId: "B26",
    speedOverall: 5.94,
    speedPeak: 4.96,
    speedOffPeak: 7.09,
    jrnyOverall: 7.93,
    jrnyPeak: 10.94,
    jrnyOffPeak: 4.98
  },
  {
    routeId: "B35",
    speedOverall: 0.46,
    speedPeak: 0.91,
    speedOffPeak: 0.25,
    jrnyOverall: -0.83,
    jrnyPeak: -1.14,
    jrnyOffPeak: -0.8
  },
  {
    routeId: "B41",
    speedOverall: 3.07,
    speedPeak: 3.23,
    speedOffPeak: 2.99,
    jrnyOverall: 2.5,
    jrnyPeak: 1.77,
    jrnyOffPeak: 3.1
  },
  {
    routeId: "B42",
    speedOverall: -8.63,
    speedPeak: -9.25,
    speedOffPeak: -7.67,
    jrnyOverall: 0.25,
    jrnyPeak: 2.25,
    jrnyOffPeak: -1.33
  },
  {
    routeId: "B44+",
    speedOverall: 8.52,
    speedPeak: 8.84,
    speedOffPeak: 8.45,
    jrnyOverall: 2.72,
    jrnyPeak: 6.2,
    jrnyOffPeak: -0.35
  },
  {
    routeId: "B46+",
    speedOverall: -5.73,
    speedPeak: -5.5,
    speedOffPeak: -5.22,
    jrnyOverall: -4.95,
    jrnyPeak: -16.56,
    jrnyOffPeak: -3.73
  },
  {
    routeId: "B60",
    speedOverall: -0.14,
    speedPeak: -1.0,
    speedOffPeak: 0.33,
    jrnyOverall: 7.25,
    jrnyPeak: 4.64,
    jrnyOffPeak: 9.74
  },
  {
    routeId: "B62",
    speedOverall: -1.66,
    speedPeak: -5.23,
    speedOffPeak: -1.08,
    jrnyOverall: -12.05,
    jrnyPeak: -11.67,
    jrnyOffPeak: -12.57
  },
  {
    routeId: "B63",
    speedOverall: -0.41,
    speedPeak: -1.3,
    speedOffPeak: 0.03,
    jrnyOverall: -1.91,
    jrnyPeak: -1.07,
    jrnyOffPeak: -1.85
  },
  {
    routeId: "B68",
    speedOverall: -1.02,
    speedPeak: -1.47,
    speedOffPeak: -0.7,
    jrnyOverall: 0.54,
    jrnyPeak: 1.81,
    jrnyOffPeak: 5.21
  },
  {
    routeId: "B82+",
    speedOverall: 2.92,
    speedPeak: 2.01,
    speedOffPeak: 2.68,
    jrnyOverall: 0.27,
    jrnyPeak: -4.8,
    jrnyOffPeak: 3.62
  },
  {
    routeId: "BX12+",
    speedOverall: 0.27,
    speedPeak: -0.8,
    speedOffPeak: 0.42,
    jrnyOverall: -8.96,
    jrnyPeak: -15.21,
    jrnyOffPeak: -5.01
  },
  {
    routeId: "BX15",
    speedOverall: 0.74,
    speedPeak: 0.43,
    speedOffPeak: 0.9,
    jrnyOverall: 5.35,
    jrnyPeak: 7.06,
    jrnyOffPeak: 4.54
  },
  {
    routeId: "BX19",
    speedOverall: -0.67,
    speedPeak: -0.47,
    speedOffPeak: -0.76,
    jrnyOverall: -2.27,
    jrnyPeak: -0.17,
    jrnyOffPeak: -4.58
  },
  {
    routeId: "BX2",
    speedOverall: -0.18,
    speedPeak: -0.15,
    speedOffPeak: -0.17,
    jrnyOverall: 1.2,
    jrnyPeak: 1.28,
    jrnyOffPeak: 1.93
  },
  {
    routeId: "BX20",
    speedOverall: -1.62,
    speedPeak: -2.45,
    speedOffPeak: 2.18,
    jrnyOverall: 9.01,
    jrnyPeak: -0.54,
    jrnyOffPeak: 18.59
  },
  {
    routeId: "BX22",
    speedOverall: 1.5,
    speedPeak: 1.22,
    speedOffPeak: 1.65,
    jrnyOverall: 2.19,
    jrnyPeak: 0.6,
    jrnyOffPeak: 3.41
  },
  {
    routeId: "BX28",
    speedOverall: -1.1,
    speedPeak: -0.02,
    speedOffPeak: -1.24,
    jrnyOverall: -5.55,
    jrnyPeak: -4.93,
    jrnyOffPeak: -5.49
  },
  {
    routeId: "BX3",
    speedOverall: 0.41,
    speedPeak: 0.67,
    speedOffPeak: 0.42,
    jrnyOverall: -0.94,
    jrnyPeak: 1.02,
    jrnyOffPeak: -3.15
  },
  {
    routeId: "BX35",
    speedOverall: -2.06,
    speedPeak: -1.08,
    speedOffPeak: -2.73,
    jrnyOverall: -18.63,
    jrnyPeak: -21.25,
    jrnyOffPeak: -16.27
  },
  {
    routeId: "BX36",
    speedOverall: -3.63,
    speedPeak: -2.96,
    speedOffPeak: -3.86,
    jrnyOverall: -11.27,
    jrnyPeak: -10.0,
    jrnyOffPeak: -11.89
  },
  {
    routeId: "BX38",
    speedOverall: -0.44,
    speedPeak: 0.02,
    speedOffPeak: -0.67,
    jrnyOverall: -4.86,
    jrnyPeak: -5.03,
    jrnyOffPeak: -5.12
  },
  {
    routeId: "BX41+",
    speedOverall: -0.61,
    speedPeak: 1.3,
    speedOffPeak: -1.38,
    jrnyOverall: 53.76,
    jrnyPeak: 52.96,
    jrnyOffPeak: 54.35
  },
  {
    routeId: "BX5",
    speedOverall: 1.14,
    speedPeak: 0.33,
    speedOffPeak: 1.47,
    jrnyOverall: -0.23,
    jrnyPeak: -0.92,
    jrnyOffPeak: 1.24
  },
  {
    routeId: "BX6+",
    speedOverall: 1.43,
    speedPeak: 1.31,
    speedOffPeak: 1.36,
    jrnyOverall: 5.04,
    jrnyPeak: 4.36,
    jrnyOffPeak: 4.98
  },
  {
    routeId: "BX7",
    speedOverall: 0.33,
    speedPeak: -0.15,
    speedOffPeak: 0.45,
    jrnyOverall: -2.49,
    jrnyPeak: -4.69,
    jrnyOffPeak: -0.1
  },
  {
    routeId: "BX9",
    speedOverall: -0.18,
    speedPeak: -0.8,
    speedOffPeak: 0.14,
    jrnyOverall: -1.35,
    jrnyPeak: -1.92,
    jrnyOffPeak: -0.45
  },
  {
    routeId: "M100",
    speedOverall: -0.34,
    speedPeak: 0.3,
    speedOffPeak: -0.72,
    jrnyOverall: 2.07,
    jrnyPeak: 1.65,
    jrnyOffPeak: 2.67
  },
  {
    routeId: "M101",
    speedOverall: -0.18,
    speedPeak: 0.98,
    speedOffPeak: -0.17,
    jrnyOverall: 3.3,
    jrnyPeak: 1.51,
    jrnyOffPeak: 4.46
  },
  {
    routeId: "M116",
    speedOverall: 0.32,
    speedPeak: -0.64,
    speedOffPeak: 0.6,
    jrnyOverall: 1.17,
    jrnyPeak: -0.41,
    jrnyOffPeak: 2.34
  },
  {
    routeId: "M15+",
    speedOverall: 0.04,
    speedPeak: 0.52,
    speedOffPeak: -0.09,
    jrnyOverall: 11.2,
    jrnyPeak: 7.22,
    jrnyOffPeak: 12.95
  },
  {
    routeId: "M2",
    speedOverall: -0.89,
    speedPeak: -0.23,
    speedOffPeak: -1.02,
    jrnyOverall: -1.11,
    jrnyPeak: -1.73,
    jrnyOffPeak: -0.59
  },
  {
    routeId: "M23+",
    speedOverall: 18.21,
    speedPeak: 17.89,
    speedOffPeak: 24.99,
    jrnyOverall: 27.84,
    jrnyPeak: 25.43,
    jrnyOffPeak: 28.94
  },
  {
    routeId: "M34+",
    speedOverall: 36.18,
    speedPeak: 41.72,
    speedOffPeak: 35.56,
    jrnyOverall: 21.52,
    jrnyPeak: 25.78,
    jrnyOffPeak: 22.67
  },
  {
    routeId: "M4",
    speedOverall: 1.3,
    speedPeak: 1.64,
    speedOffPeak: 1.24,
    jrnyOverall: 0.02,
    jrnyPeak: -0.7,
    jrnyOffPeak: 0.32
  },
  {
    routeId: "M42",
    speedOverall: 1.86,
    speedPeak: 1.77,
    speedOffPeak: 2.04,
    jrnyOverall: 6.45,
    jrnyPeak: 5.2,
    jrnyOffPeak: 9.1
  },
  {
    routeId: "M57",
    speedOverall: -0.76,
    speedPeak: -0.47,
    speedOffPeak: -0.75,
    jrnyOverall: 0.73,
    jrnyPeak: 0.07,
    jrnyOffPeak: 1.21
  },
  {
    routeId: "M60+",
    speedOverall: -0.3,
    speedPeak: -0.61,
    speedOffPeak: -0.29,
    jrnyOverall: 7.55,
    jrnyPeak: 8.56,
    jrnyOffPeak: 6.69
  },
  {
    routeId: "M79+",
    speedOverall: 1.83,
    speedPeak: 1.99,
    speedOffPeak: 1.39,
    jrnyOverall: -1.02,
    jrnyPeak: -0.55,
    jrnyOffPeak: -1.91
  },
  {
    routeId: "M86+",
    speedOverall: 14.65,
    speedPeak: 21.87,
    speedOffPeak: 11.68,
    jrnyOverall: 18.54,
    jrnyPeak: 20.73,
    jrnyOffPeak: 15.9
  },
  {
    routeId: "M96",
    speedOverall: 0.62,
    speedPeak: 1.07,
    speedOffPeak: 0.43,
    jrnyOverall: 1.11,
    jrnyPeak: 1.35,
    jrnyOffPeak: 1.03
  },
  {
    routeId: "Q43",
    speedOverall: -3.07,
    speedPeak: -1.86,
    speedOffPeak: -4.2,
    jrnyOverall: -13.84,
    jrnyPeak: -12.31,
    jrnyOffPeak: -15.82
  },
  {
    routeId: "Q44+",
    speedOverall: 3.45,
    speedPeak: 2.5,
    speedOffPeak: 3.32,
    jrnyOverall: 5.25,
    jrnyPeak: 2.55,
    jrnyOffPeak: 4.74
  },
  {
    routeId: "Q5",
    speedOverall: 1.25,
    speedPeak: 1.27,
    speedOffPeak: 1.25,
    jrnyOverall: 7.87,
    jrnyPeak: 6.6,
    jrnyOffPeak: 9.18
  },
  {
    routeId: "Q53+",
    speedOverall: 0.37,
    speedPeak: 0.35,
    speedOffPeak: 0.4,
    jrnyOverall: -0.69,
    jrnyPeak: -0.27,
    jrnyOffPeak: -0.84
  },
  {
    routeId: "Q54",
    speedOverall: -5.21,
    speedPeak: -5.3,
    speedOffPeak: -5.23,
    jrnyOverall: -7.24,
    jrnyPeak: -5.35,
    jrnyOffPeak: -12.22
  },
  {
    routeId: "Q58",
    speedOverall: -1.45,
    speedPeak: -2.37,
    speedOffPeak: -1.43,
    jrnyOverall: -4.2,
    jrnyPeak: -4.31,
    jrnyOffPeak: -4.34
  },
  {
    routeId: "Q6",
    speedOverall: 6.99,
    speedPeak: 6.52,
    speedOffPeak: 7.63,
    jrnyOverall: 16.35,
    jrnyPeak: 18.02,
    jrnyOffPeak: 13.31
  },
  {
    routeId: "Q69",
    speedOverall: 2.37,
    speedPeak: 2.3,
    speedOffPeak: 2.31,
    jrnyOverall: 1.66,
    jrnyPeak: 0.28,
    jrnyOffPeak: 1.35
  },
  {
    routeId: "S46",
    speedOverall: 0.16,
    speedPeak: 1.21,
    speedOffPeak: -0.53,
    jrnyOverall: 1.95,
    jrnyPeak: -0.54,
    jrnyOffPeak: 5.25
  },
  {
    routeId: "S79+",
    speedOverall: 0.93,
    speedPeak: 0.92,
    speedOffPeak: 0.82,
    jrnyOverall: -9.55,
    jrnyPeak: -6.65,
    jrnyOffPeak: -10.19
  }
];
