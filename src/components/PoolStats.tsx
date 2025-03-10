
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Wallet, Users, TrendingUp, Clock } from "lucide-react";

export const PoolStats = () => {
  const [progress, setProgress] = useState(0);
  const [poolStats] = useState({
    totalLiquidity: "1.234.567",
    activeInvestors: "456",
    averageReturn: "156%",
    timeRemaining: "44",
    leftTeam: "223",
    rightTeam: "233",
  });

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow duration-300 bg-white border-green-200 border">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-green-600" />
          <div className="text-sm text-green-600">Fundos Recebidos</div>
        </div>
        <div className="text-2xl font-bold text-green-800">R${poolStats.totalLiquidity}</div>
        <Progress value={progress} className="bg-green-100" indicatorColor="bg-green-500" />
      </Card>

      <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow duration-300 bg-white border-green-200 border">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-green-600" />
          <div className="text-sm text-green-600">Fundos Disponíveis</div>
        </div>
        <div className="text-2xl font-bold text-green-800">{poolStats.activeInvestors}</div>
        <Progress value={78} className="bg-green-100" indicatorColor="bg-green-500" />
      </Card>

      <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow duration-300 bg-white border-green-200 border">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <div className="text-sm text-green-600">Retorno Médio</div>
        </div>
        <div className="text-2xl font-bold text-green-800">{poolStats.averageReturn}</div>
        <Progress value={82} className="bg-green-100" indicatorColor="bg-green-500" />
      </Card>

      <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow duration-300 bg-white border-green-200 border">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-green-600" />
          <div className="text-sm text-green-600">Comunidade</div>
        </div>
        <div className="text-2xl font-bold text-green-800">{poolStats.timeRemaining}</div>
        <Progress value={45} className="bg-green-100" indicatorColor="bg-green-500" />
      </Card>
    </div>
  );
};
