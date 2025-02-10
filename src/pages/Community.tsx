import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, ChevronRight, ChevronLeft } from "lucide-react";

const Community = () => {
  // Mock data - in a real app this would come from your backend
  const directMembers = [
    { id: 1, name: "João Silva", position: "left", date: "2024-02-08" },
    { id: 2, name: "Maria Santos", position: "right", date: "2024-02-08" },
  ];

  const networkStats = {
    leftPoints: 1200,
    rightPoints: 800,
    totalMembers: 24,
    directMembers: 2
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 pt-16 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center gap-2 mb-8">
          <Users className="h-6 w-6 text-green-600" />
          <h1 className="text-2xl font-bold text-green-800">Minha Comunidade</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Total de Membros</h3>
            <p className="text-3xl font-bold text-green-600">{networkStats.totalMembers}</p>
            <p className="text-sm text-green-600 mt-1">Na sua rede</p>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center gap-2">
              <ChevronLeft className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-green-800">Pontos Lado Esquerdo</h3>
            </div>
            <p className="text-3xl font-bold text-green-600">{networkStats.leftPoints}</p>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center gap-2">
              <ChevronRight className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-green-800">Pontos Lado Direito</h3>
            </div>
            <p className="text-3xl font-bold text-green-600">{networkStats.rightPoints}</p>
          </Card>
        </div>

        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-green-800 mb-4">Membros Diretos</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Posição</TableHead>
                <TableHead>Data de Cadastro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {directMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>
                    {member.position === 'left' ? (
                      <span className="flex items-center gap-1">
                        <ChevronLeft className="h-4 w-4 text-green-600" />
                        Esquerda
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <ChevronRight className="h-4 w-4 text-green-600" />
                        Direita
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{new Date(member.date).toLocaleDateString('pt-BR')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Community;
