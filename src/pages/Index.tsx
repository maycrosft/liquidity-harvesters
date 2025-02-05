import { PoolStats } from "@/components/PoolStats";
import { InvestmentForm } from "@/components/InvestmentForm";
import { RewardsChart } from "@/components/RewardsChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">DeFi Liquidity Pool</h1>
          <p className="text-lg text-muted-foreground">
            Earn up to 200% returns with 1% daily rewards
          </p>
        </div>

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