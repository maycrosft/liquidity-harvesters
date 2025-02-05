import { PoolStats } from "@/components/PoolStats";
import { InvestmentForm } from "@/components/InvestmentForm";
import { RewardsChart } from "@/components/RewardsChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <main className="container mx-auto py-8 space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <img 
              src="/green-cash-logo.png" 
              alt="Green Cash Logo" 
              className="w-12 h-12 object-contain"
            />
            <h1 className="text-4xl font-bold tracking-tight text-green-800">Green Cash</h1>
          </div>
          <p className="text-lg text-green-700">
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