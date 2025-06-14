
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, Shield, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Sistema de Suporte Inteligente
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conecte-se com nossa equipe de suporte através de um chat inteligente
            que utiliza IA para classificar e resolver seus problemas rapidamente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <Card className="shadow-xl border-0 hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="text-center pb-8">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <MessageSquare className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Usuário
              </CardTitle>
              <CardDescription className="text-gray-600">
                Obtenha suporte técnico através do nosso chat inteligente
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/auth">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold transition-all duration-300">
                  Acessar Chat de Suporte
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="text-center pb-8">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Atendente
              </CardTitle>
              <CardDescription className="text-gray-600">
                Gerencie chamados e atenda clientes de forma eficiente
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/support/login">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 text-lg font-semibold transition-all duration-300">
                  Painel do Atendente
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">IA Integrada</h3>
            <p className="text-gray-600">
              Nossa IA classifica automaticamente seus problemas para um atendimento mais eficiente
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Chat em Tempo Real</h3>
            <p className="text-gray-600">
              Comunicação instantânea entre usuários e equipe de suporte
            </p>
          </div>

          <div className="text-center">
            <div className="bg-indigo-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Segurança Total</h3>
            <p className="text-gray-600">
              Seus dados são protegidos com criptografia de ponta e autenticação segura
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
