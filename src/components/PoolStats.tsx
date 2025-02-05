import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export const PoolStats = () => {
  const [progress, setProgress] = useState(0);
  const [poolStats] = useState({
    totalLiquidity: "1,234,567",
    activeInvestors: "456",
    averageReturn: "156%",
    timeRemaining: "44",
  });

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
        <div className="text-sm text-muted-foreground">Total Liquidity</div>
        <div className="text-2xl font-bold">${poolStats.totalLiquidity}</div>
        <Progress value={progress} className="h-2" />
      </Card>

      <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
        <div className="text-sm text-muted-foreground">Active Investors</div>
        <div className="text-2xl font-bold">{poolStats.activeInvestors}</div>
        <Progress value={78} className="h-2" />
      </Card>

      <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
        <div className="text-sm text-muted-foreground">Average Return</div>
        <div className="text-2xl font-bold">{poolStats.averageReturn}</div>
        <Progress value={82} className="h-2" />
      </Card>

      <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow duration-300">
        <div className="text-sm text-muted-foreground">Days Until Max Return</div>
        <div className="text-2xl font-bold">{poolStats.timeRemaining}</div>
        <Progress value={45} className="h-2" />
      </Card>
    </div>
  );
};