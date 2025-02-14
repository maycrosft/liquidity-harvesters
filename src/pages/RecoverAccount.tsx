
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { Key, RefreshCw } from "lucide-react";

const RecoverAccount = () => {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { publicKey } = useWallet();

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!publicKey) {
      toast({
        variant: "destructive",
        title: "Carteira não conectada",
        description: "Por favor, conecte sua carteira Solana primeiro.",
      });
      return;
    }

    if (!novaSenha || !confirmarSenha) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
      });
      return;
    }

    if (novaSenha !== confirmarSenha) {
      toast({
        variant: "destructive",
        title: "Senhas diferentes",
        description: "As senhas não coincidem.",
      });
      return;
    }

    // Buscar usuário do localStorage
    const userData = localStorage.getItem("user");
    if (!userData) {
      toast({
        variant: "destructive",
        title: "Usuário não encontrado",
        description: "Não foi encontrada uma conta com esta carteira.",
      });
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

    // Atualizar senha
    user.senha = novaSenha;
    localStorage.setItem("user", JSON.stringify(user));

    toast({
      title: "Senha atualizada com sucesso!",
      description: "Você já pode fazer login com sua nova senha.",
    });
    navigate("/login");
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
            <CardTitle className="text-2xl text-center text-green-700">Recuperar Conta</CardTitle>
          </div>
          <CardDescription className="text-center">
            Conecte sua carteira para redefinir sua senha
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
              <form onSubmit={handleRecover} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="novaSenha">Nova Senha</Label>
                  <Input
                    id="novaSenha"
                    type="password"
                    placeholder="Digite sua nova senha"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmarSenha"
                    type="password"
                    placeholder="Confirme sua nova senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Redefinir Senha
                </Button>
                <p className="text-center text-sm text-gray-600">
                  Lembrou sua senha?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-green-600 hover:underline"
                  >
                    Fazer login
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

export default RecoverAccount;
