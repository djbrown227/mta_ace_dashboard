// src/store/dashboardStore.ts
"use client";

import { create } from "zustand";

type DashboardState = {
  selectedRouteId: string | null;
  setSelectedRouteId: (id: string | null) => void;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  selectedRouteId: null,
  setSelectedRouteId: (id) => set({ selectedRouteId: id }),
}));
