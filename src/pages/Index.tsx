
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, Shield, Zap, Sparkles, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen animated-gradient relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16 space-y-6">
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-7xl font-bold gradient-text mb-6 float-animation">
              Sistema de Suporte
            </h1>
            <div className="absolute -top-4 -right-4">
              <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-white/90 mb-4">
            Inteligente
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Conecte-se com nossa equipe de suporte através de um chat inteligente
            que utiliza IA para classificar e resolver seus problemas rapidamente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          <Card className="glass-effect floating-card border-0 group">
            <CardHeader className="text-center pb-8 relative">
              <div className="relative mx-auto mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-2xl w-24 h-24 mx-auto flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="h-12 w-12 text-white" />
                </div>
                <div className="absolute inset-0 pulse-ring opacity-0 group-hover:opacity-100"></div>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-800 mb-3">
                Usuário
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Obtenha suporte técnico através do nosso chat inteligente
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <Link to="/auth">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg font-semibold transition-all duration-300 btn-glow group">
                  Acessar Chat de Suporte
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="glass-effect floating-card border-0 group">
            <CardHeader className="text-center pb-8 relative">
              <div className="relative mx-auto mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6 rounded-2xl w-24 h-24 mx-auto flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <div className="absolute inset-0 pulse-ring opacity-0 group-hover:opacity-100"></div>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-800 mb-3">
                Atendente
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Gerencie chamados e atenda clientes de forma eficiente
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <Link to="/support/login">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 text-lg font-semibold transition-all duration-300 btn-glow group">
                  Painel do Atendente
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center group">
            <div className="relative mx-auto mb-6 w-20 h-20">
              <div className="bg-blue-100/80 backdrop-blur-sm p-5 rounded-2xl w-full h-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Zap className="h-10 w-10 text-blue-600" />
              </div>
              <div className="absolute inset-0 bg-blue-400/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">IA Integrada</h3>
            <p className="text-white/80 text-lg leading-relaxed">
              Nossa IA classifica automaticamente seus problemas para um atendimento mais eficiente
            </p>
          </div>

          <div className="text-center group">
            <div className="relative mx-auto mb-6 w-20 h-20">
              <div className="bg-purple-100/80 backdrop-blur-sm p-5 rounded-2xl w-full h-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                <MessageSquare className="h-10 w-10 text-purple-600" />
              </div>
              <div className="absolute inset-0 bg-purple-400/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">Chat em Tempo Real</h3>
            <p className="text-white/80 text-lg leading-relaxed">
              Comunicação instantânea entre usuários e equipe de suporte
            </p>
          </div>

          <div className="text-center group">
            <div className="relative mx-auto mb-6 w-20 h-20">
              <div className="bg-indigo-100/80 backdrop-blur-sm p-5 rounded-2xl w-full h-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Shield className="h-10 w-10 text-indigo-600" />
              </div>
              <div className="absolute inset-0 bg-indigo-400/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">Segurança Total</h3>
            <p className="text-white/80 text-lg leading-relaxed">
              Seus dados são protegidos com criptografia de ponta e autenticação segura
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
