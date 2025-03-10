
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Users, Wheat, LogOut, Facebook, Instagram, Twitter, Clover, Wallet } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function AppHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { publicKey, disconnect } = useWallet();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = async () => {
    try {
      await disconnect();
      localStorage.removeItem("isLoggedIn");
      toast({
        title: "Logout realizado com sucesso",
        description: "Você foi desconectado da sua conta",
      });
      navigate("/login");
    } catch (error) {
      console.error('Erro ao desconectar:', error);
    }
  };

  const openSocialMedia = (url: string) => {
    window.open(url, '_blank');
  };

  if (!isLoggedIn) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-green-100 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
          <Clover className="w-8 h-8 text-green-600" />
          <h1 className="text-xl font-bold text-green-800">Green Cash</h1>
        </div>

        <div className="flex items-center gap-4">
          <WalletMultiButton className="bg-green-600 hover:bg-green-700" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                <span className="flex items-center gap-2">
                  <Clover className="h-4 w-4" /> Início
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/comunidade")}>
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" /> Comunidade
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/farms")}>
                <span className="flex items-center gap-2">
                  <Wheat className="h-4 w-4" /> Farms
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => openSocialMedia('https://facebook.com')}>
                <span className="flex items-center gap-2">
                  <Facebook className="h-4 w-4" /> Facebook
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openSocialMedia('https://instagram.com')}>
                <span className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" /> Instagram
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openSocialMedia('https://twitter.com')}>
                <span className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" /> Twitter
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                <span className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" /> Sair
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
