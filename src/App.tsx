
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SolanaProvider } from "@/components/SolanaProvider";
import { AppHeader } from "@/components/AppHeader";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import Farms from "./pages/Farms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Componente para proteger rotas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SolanaProvider>
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full flex-col">
              <AppHeader />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Registration />} />
                  <Route path="/login" element={<Login />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/comunidade" 
                    element={
                      <ProtectedRoute>
                        <Community />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/farms" 
                    element={
                      <ProtectedRoute>
                        <Farms />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </SolanaProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
