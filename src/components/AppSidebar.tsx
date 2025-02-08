
import { Home, Users, Wheat, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const menuItems = [
  {
    title: "Início",
    icon: Home,
    path: "/dashboard",
    requiresAuth: true
  },
  {
    title: "Comunidade",
    icon: Users,
    path: "/comunidade",
    requiresAuth: true
  },
  {
    title: "Farms",
    icon: Wheat,
    path: "/farms",
    requiresAuth: true
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const isLoggedIn = location.pathname !== "/";

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logout realizado com sucesso",
      description: "Você foi desconectado da sua conta",
    });
    navigate("/");
  };

  return (
    <Sidebar className="absolute top-0 right-0 z-50">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                (!item.requiresAuth || isLoggedIn) && (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.path)}
                      className="w-full flex items-center justify-end gap-2"
                    >
                      {!isMobile && <span>{item.title}</span>}
                      <item.icon className="h-5 w-5" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              ))}
              {isLoggedIn && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={handleLogout}
                    className="w-full flex items-center justify-end gap-2 text-red-600 hover:text-red-700"
                  >
                    {!isMobile && <span>Sair</span>}
                    <LogOut className="h-5 w-5" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
