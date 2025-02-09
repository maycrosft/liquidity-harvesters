
import { PoolStats } from "@/components/PoolStats";
import { InvestmentForm } from "@/components/InvestmentForm";
import { RewardsChart } from "@/components/RewardsChart";
import { AffiliateSystem } from "@/components/AffiliateSystem";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Grid, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logout realizado com sucesso",
      description: "Você foi desconectado da sua conta",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <main className="container mx-auto py-8 space-y-8">
        {isMobile && (
          <div className="flex justify-end gap-2 px-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/comunidade")}
              className="bg-white"
            >
              <Users className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/farms")}
              className="bg-white"
            >
              <Grid className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleLogout}
              className="bg-white text-red-600 hover:text-red-700"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        )}

        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <img 
              src="/green-cash-logo.png" 
              alt="Logo Green Cash" 
              className="w-12 h-12 object-contain"
            />
            <h1 className="text-4xl font-bold tracking-tight text-green-800">Green Cash</h1>
          </div>
          <p className="text-lg text-green-700">
            A comunidade financeira que mais cresce
          </p>
        </div>

        <AffiliateSystem />
        <PoolStats />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InvestmentForm />
          <RewardsChart />
        </div>
      </main>
    </div>
  );
};

export default Index;
