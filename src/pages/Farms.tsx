import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { InvestmentForm } from "@/components/InvestmentForm";
import { Database, DollarSign, CheckSquare, ArrowUp, ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

const Farms = () => {
  const [progress, setProgress] = useState(0);
  const [solanaBalance, setSolanaBalance] = useState<number>(0);
  const { publicKey } = useWallet();
  const [stats] = useState({
    fundsReceived: "234.567",
    availableFunds: "45.678",
    totalFarms: "89",
    completedFarms: "34"
  });

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const getBalance = async () => {
      if (publicKey) {
        try {
          const connection = new Connection('https://api.devnet.solana.com');
          const balance = await connection.getBalance(publicKey);
          setSolanaBalance(balance / LAMPORTS_PER_SOL);
        } catch (err) {
          console.error('Error fetching balance:', err);
        }
      }
    };

    getBalance();
  }, [publicKey]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 pt-16 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-800 mb-6">Gerenciamento de Farms</h1>
          <WalletMultiButton className="bg-green-600 hover:bg-green-700" />
        </div>

        {publicKey && (
          <Card className="p-6 bg-white border-green-200 border">
            <h2 className="text-lg font-semibold mb-2">Sua Carteira Solana</h2>
            <p className="text-sm text-gray-600">Endereço: {publicKey.toString()}</p>
            <p className="text-sm text-gray-600">Saldo: {solanaBalance.toFixed(4)} SOL</p>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow duration-300 bg-white border-green-200 border">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <ArrowUp className="h-5 w-5" />
              Fundos Recebidos
            </div>
            <div className="text-2xl font-bold text-green-800">R${stats.fundsReceived}</div>
            <Progress value={75} className="bg-green-100" indicatorColor="bg-green-500" />
          </Card>

          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow duration-300 bg-white border-green-200 border">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <ArrowDown className="h-5 w-5" />
              Fundos Disponíveis
            </div>
            <div className="text-2xl font-bold text-green-800">R${stats.availableFunds}</div>
            <Progress value={45} className="bg-green-100" indicatorColor="bg-green-500" />
          </Card>

          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow duration-300 bg-white border-green-200 border">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Database className="h-5 w-5" />
              Total de Farms
            </div>
            <div className="text-2xl font-bold text-green-800">{stats.totalFarms}</div>
            <Progress value={80} className="bg-green-100" indicatorColor="bg-green-500" />
          </Card>

          <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow duration-300 bg-white border-green-200 border">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckSquare className="h-5 w-5" />
              Farms Concluídos
            </div>
            <div className="text-2xl font-bold text-green-800">{stats.completedFarms}</div>
            <Progress value={progress} className="bg-green-100" indicatorColor="bg-green-500" />
          </Card>
        </div>

        <div className="mt-8">
          <InvestmentForm />
        </div>
      </div>
    </div>
  );
};

export default Farms;
