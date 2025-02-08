
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";

export const AffiliateSystem = () => {
  const { toast } = useToast();
  const [position, setPosition] = useState<"left" | "right" | null>(null);
  
  const affiliateLink = `https://greencash.com/ref/${Math.random().toString(36).substring(7)}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(affiliateLink);
      toast({
        title: "Link copiado!",
        description: "Seu link de afiliado foi copiado para a área de transferência.",
      });
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handlePositionSelect = (selectedPosition: "left" | "right") => {
    setPosition(selectedPosition);
    toast({
      title: "Posição selecionada!",
      description: `Você selecionou a posição ${selectedPosition === "left" ? "esquerda" : "direita"}.`,
    });
  };

  return (
    <Card className="p-6 space-y-6 bg-white border-green-200 border">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-green-800">Crescimento da Comunidade</h3>
        <p className="text-sm text-green-600">
          Compartilhe seu link para os novos membros da comunidade
        </p>
      </div>

      <div className="flex items-center gap-4 p-3 bg-green-50 rounded">
        <input
          type="text"
          value={affiliateLink}
          readOnly
          className="flex-1 bg-transparent border-none text-green-800 text-sm focus:outline-none"
        />
        <Button
          variant="ghost"
          size="sm"
          className="text-green-600 hover:text-green-700"
          onClick={copyToClipboard}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-green-700">Selecione a posição do membro:</p>
        <div className="flex gap-4">
          <Button
            variant={position === "left" ? "default" : "outline"}
            className="flex-1"
            onClick={() => handlePositionSelect("left")}
          >
            Esquerda
          </Button>
          <Button
            variant={position === "right" ? "default" : "outline"}
            className="flex-1"
            onClick={() => handlePositionSelect("right")}
          >
            Direita
          </Button>
        </div>
      </div>
    </Card>
  );
};
