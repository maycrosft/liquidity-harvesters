import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export const InvestmentForm = () => {
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const handleInvest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid investment amount.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Investment Successful",
      description: `You have successfully invested $${amount}. Your daily rewards will start accumulating soon.`,
    });
    setAmount("");
  };

  return (
    <Card className="p-6 max-w-md mx-auto bg-white shadow-lg border-green-200 border-2">
      <h3 className="text-lg font-semibold mb-4 text-green-800">Make an Investment</h3>
      <form onSubmit={handleInvest} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="amount" className="text-sm font-medium text-green-700">
            Investment Amount (USD)
          </label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border-green-200 focus:border-green-500 focus:ring-green-500"
            min="0"
            step="0.01"
          />
        </div>
        <div className="space-y-2">
          <div className="text-sm text-green-600">
            Expected Daily Return: {amount ? `$${(parseFloat(amount) * 0.01).toFixed(2)}` : "$0.00"}
          </div>
          <div className="text-sm text-green-600">
            Maximum Return: {amount ? `$${(parseFloat(amount) * 2).toFixed(2)}` : "$0.00"}
          </div>
        </div>
        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
          Invest Now
        </Button>
      </form>
    </Card>
  );
};