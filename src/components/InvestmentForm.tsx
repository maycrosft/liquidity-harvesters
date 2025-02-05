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
    <Card className="p-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">Make an Investment</h3>
      <form onSubmit={handleInvest} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="amount" className="text-sm font-medium">
            Investment Amount (USD)
          </label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full"
            min="0"
            step="0.01"
          />
        </div>
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            Expected Daily Return: {amount ? `$${(parseFloat(amount) * 0.01).toFixed(2)}` : "$0.00"}
          </div>
          <div className="text-sm text-muted-foreground">
            Maximum Return: {amount ? `$${(parseFloat(amount) * 2).toFixed(2)}` : "$0.00"}
          </div>
        </div>
        <Button type="submit" className="w-full">
          Invest Now
        </Button>
      </form>
    </Card>
  );
};