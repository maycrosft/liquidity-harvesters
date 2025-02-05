import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Registration = () => {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // Verifica se o MetaMask está instalado
      if (typeof window.ethereum !== 'undefined') {
        // Solicita acesso à conta
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        toast({
          title: "Carteira conectada com sucesso!",
          description: "Sua carteira MetaMask foi conectada.",
        });
        // Redireciona para a página principal
        navigate("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "MetaMask não encontrado",
          description: "Por favor, instale o MetaMask para continuar.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao conectar carteira",
        description: "Ocorreu um erro ao tentar conectar sua carteira.",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !senha) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
      });
      return;
    }
    await connectWallet();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="/green-cash-logo.png" alt="Green Cash Logo" className="h-12 w-12" />
            <CardTitle className="text-2xl text-center text-green-700">Green Cash</CardTitle>
          </div>
          <CardDescription className="text-center">
            Cadastre-se para começar a investir
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isConnecting}
            >
              {isConnecting ? "Conectando..." : "Cadastrar e Conectar Carteira"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Registration;