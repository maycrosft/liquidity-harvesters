
import { PoolStats } from "@/components/PoolStats";
import { InvestmentForm } from "@/components/InvestmentForm";
import { RewardsChart } from "@/components/RewardsChart";
import { AffiliateSystem } from "@/components/AffiliateSystem";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <main className="container mx-auto py-8 space-y-8">
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

        <PoolStats />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InvestmentForm />
          <AffiliateSystem />
        </div>

        <RewardsChart />
      </main>
    </div>
  );
};

export default Index;
