
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SupportLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock support login (hardcoded credentials)
    if (formData.email === "suporte@empresa.com" && formData.password === "suporte123") {
      const supportUser = {
        id: "support1",
        name: "Atendente",
        email: formData.email,
        role: "support"
      };
      
      localStorage.setItem("currentSupport", JSON.stringify(supportUser));
      toast({
        title: "Login realizado!",
        description: "Bem-vindo ao painel de suporte."
      });
      navigate("/support/dashboard");
    } else {
      toast({
        title: "Erro no login",
        description: "Credenciais inválidas. Use: suporte@empresa.com / suporte123",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao início
        </Link>
        
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-8">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Painel do Atendente
            </CardTitle>
            <CardDescription>
              Acesse o sistema de gerenciamento de suporte
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="suporte@empresa.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="transition-all focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="suporte123"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="transition-all focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
              >
                Entrar no Painel
              </Button>
            </form>
            
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-700 font-medium">Credenciais de demonstração:</p>
              <p className="text-sm text-purple-600">Email: suporte@empresa.com</p>
              <p className="text-sm text-purple-600">Senha: suporte123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportLogin;
