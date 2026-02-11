  "use client";

  import { ReactNode, useState } from "react";
  import Link from "next/link";
  import { usePathname } from "next/navigation";
  
  interface DashboardShellProps {
    children: ReactNode;
  }
  
  // This component defines the main dashboard layout container
  // Handles spacing, padding, sidebar navigation, and overall layout of the dashboard
  export function DashboardShell({ children }: DashboardShellProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();
  
    // List of dashboards for sidebar navigation
    const dashboards = [
      { title: "ACE Overview", path: "/" },
      { title: "Route Analysis", path: "/route-analysis" },
      { title: "Hourly Speeds", path: "/hourly-speeds" },
      { title: "Program Metrics", path: "/program-metrics" },
    ];
  
    return (
      <div className="flex min-h-screen bg-muted/40">
        {/* Sidebar */}
        <aside
          className={`bg-gray-50 border-r border-gray-200 transition-all duration-300 ${
            isCollapsed ? "w-16" : "w-64"
          } flex flex-col`}
        >
          <div className="p-4 flex justify-between items-center border-b border-gray-200">
            {!isCollapsed && <span className="font-bold text-lg">Dashboards</span>}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded hover:bg-gray-200"
            >
              {isCollapsed ? "→" : "←"}
            </button>
          </div>
  
          <nav className="flex-1 mt-4">
            {dashboards.map((d) => (
              <Link
                key={d.path}
                href={d.path}
                className={`block p-3 rounded transition-colors hover:bg-gray-200 ${
                  pathname === d.path ? "bg-gray-300 font-bold" : ""
                } ${isCollapsed ? "text-center" : ""}`}
              >
                {isCollapsed ? d.title.charAt(0) : d.title}
              </Link>
            ))}
          </nav>
        </aside>
  
        {/* Main content */}
        <main className="flex-1 mx-auto max-w-7xl p-6 space-y-6">
          {children} {/* Render header, KPIs, charts, etc. */}
        </main>
      </div>
    );
  }
  