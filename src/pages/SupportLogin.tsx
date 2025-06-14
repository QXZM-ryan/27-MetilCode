
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, Lock, Mail, Sparkles } from "lucide-react";
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
    <div className="min-h-screen animated-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <Link to="/" className="inline-flex items-center text-white/90 hover:text-white mb-8 transition-colors group">
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Voltar ao início
        </Link>
        
        <Card className="glass-effect border-0 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="relative mx-auto mb-6 w-20 h-20">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-5 rounded-2xl w-full h-full flex items-center justify-center shadow-xl">
                <Users className="h-10 w-10 text-white" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 h-6 w-6 text-yellow-400 animate-pulse" />
            </div>
            <CardTitle className="text-3xl font-bold gradient-text mb-3">
              Painel do Atendente
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              Acesse o sistema de gerenciamento de suporte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="suporte@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 h-12 bg-white/50 backdrop-blur-sm border-white/30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Senha</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="suporte123"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 h-12 bg-white/50 backdrop-blur-sm border-white/30 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold transition-all duration-300 btn-glow shadow-lg"
              >
                Entrar no Painel
              </Button>
            </form>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-50/80 to-indigo-50/80 backdrop-blur-sm rounded-xl border border-purple-200/30">
              <p className="text-sm text-purple-800 font-semibold mb-2">🔑 Credenciais de demonstração:</p>
              <div className="space-y-1">
                <p className="text-sm text-purple-700">📧 Email: suporte@empresa.com</p>
                <p className="text-sm text-purple-700">🔒 Senha: suporte123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportLogin;
