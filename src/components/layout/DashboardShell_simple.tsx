// This component defines the main dashboard layout container
// Handles spacing, padding, and overall layout of the dashboard
export function DashboardShell({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen bg-muted/40">
        {/* Centers content and sets max width, spacing between sections */}
        <main className="mx-auto max-w-7xl p-6 space-y-6">
          {children} {/* Render all child components (header, KPIs, charts) */}
        </main>
      </div>
    );
  }