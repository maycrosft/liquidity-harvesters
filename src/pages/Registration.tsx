
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Wallet } from "lucide-react";

const Registration = () => {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        setWalletAddress(address);
        localStorage.setItem("walletAddress", address);
        toast({
          title: "Carteira conectada com sucesso!",
          description: "Agora complete seu cadastro com nome e senha.",
        });
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
    if (!walletAddress) {
      toast({
        variant: "destructive",
        title: "Carteira não conectada",
        description: "Por favor, conecte sua carteira primeiro.",
      });
      return;
    }
    
    if (!nome || !senha) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
      });
      return;
    }

    // Aqui você pode adicionar a lógica para salvar os dados do usuário
    localStorage.setItem("user", JSON.stringify({ 
      address: walletAddress,
      nome,
      senha 
    }));

    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Bem-vindo ao Green Cash.",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img 
              src="/lovable-uploads/2f3117ea-e5c1-4642-9bbb-f20e00dcc5a4.png" 
              alt="Green Cash Logo" 
              className="h-12 w-12 object-contain"
            />
            <CardTitle className="text-2xl text-center text-green-700">Green Cash</CardTitle>
          </div>
          <CardDescription className="text-center">
            Conecte sua carteira para começar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              type="button"
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={connectWallet}
              disabled={!!walletAddress || isConnecting}
            >
              <Wallet className="mr-2 h-4 w-4" />
              {isConnecting ? "Conectando..." : walletAddress ? "Carteira Conectada" : "Conectar Carteira"}
            </Button>

            {walletAddress && (
              <div className="p-3 bg-green-50 rounded-md border border-green-200">
                <p className="text-sm text-green-800 text-center break-all">
                  Carteira: {walletAddress}
                </p>
              </div>
            )}

            {walletAddress && (
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
                >
                  Cadastrar
                </Button>
              </form>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Registration;
