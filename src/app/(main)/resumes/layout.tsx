import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/features/dashboard/components/DashboardSidebar";
import Navbar from "@/features/dashboard/components/Navbar";
import { ReactNode } from "react";

interface SidebarStyles extends React.CSSProperties {
  "--sidebar-width"?: string;
  "--sidebar-width-mobile"?: string;
  "--sidebar-width-icon"?: string;
}

const layout = async ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width-icon": "4rem",
        } as SidebarStyles
      }
    >
      <DashboardSidebar />
      <main className="w-full bg-background-muted ps-0 lg:p-4 lg:ps-0">
        <div className="h-full overflow-hidden bg-background lg:rounded-lg">
          <Navbar />
          <div className="min-h-[calc(100vh - 64px)] mx-auto max-w-screen-2xl px-4 py-4 md:px-8 md:py-8 lg:px-16">
            {children}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default layout;
