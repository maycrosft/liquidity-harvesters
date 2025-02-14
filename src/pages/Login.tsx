
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { LogIn } from "lucide-react";

const Login = () => {
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { publicKey } = useWallet();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!publicKey) {
      toast({
        variant: "destructive",
        title: "Carteira não conectada",
        description: "Por favor, conecte sua carteira Solana primeiro.",
      });
      return;
    }

    if (!senha) {
      toast({
        variant: "destructive",
        title: "Senha obrigatória",
        description: "Por favor, digite sua senha.",
      });
      return;
    }

    // Buscar usuário do localStorage
    const userData = localStorage.getItem("user");
    if (!userData) {
      toast({
        variant: "destructive",
        title: "Usuário não encontrado",
        description: "Por favor, faça o cadastro primeiro.",
      });
      navigate("/");
      return;
    }

    const user = JSON.parse(userData);
    
    if (user.address !== publicKey.toString()) {
      toast({
        variant: "destructive",
        title: "Carteira incorreta",
        description: "A carteira conectada não corresponde à cadastrada.",
      });
      return;
    }

    if (user.senha !== senha) {
      toast({
        variant: "destructive",
        title: "Senha incorreta",
        description: "Por favor, verifique sua senha.",
      });
      return;
    }

    // Login bem sucedido
    localStorage.setItem("isLoggedIn", "true");
    toast({
      title: "Login realizado com sucesso!",
      description: "Bem-vindo de volta ao Green Cash.",
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
            Faça login para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-center">
              <WalletMultiButton className="bg-green-600 hover:bg-green-700" />
            </div>

            {publicKey && (
              <div className="p-3 bg-green-50 rounded-md border border-green-200">
                <p className="text-sm text-green-800 text-center break-all">
                  Carteira: {publicKey.toString()}
                </p>
              </div>
            )}

            {publicKey && (
              <form onSubmit={handleLogin} className="space-y-4">
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
                  <LogIn className="mr-2 h-4 w-4" />
                  Entrar
                </Button>
                <p className="text-center text-sm text-gray-600">
                  Não tem uma conta?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="text-green-600 hover:underline"
                  >
                    Cadastre-se
                  </button>
                </p>
              </form>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
