
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/components/AppHeader";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import Farms from "./pages/Farms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full flex-col">
            <AppHeader />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Registration />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/comunidade" element={<Community />} />
                <Route path="/farms" element={<Farms />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
