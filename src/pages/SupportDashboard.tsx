
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock, User, LogOut, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "support";
  timestamp: string;
}

interface Conversation {
  userId: string;
  userName: string;
  userEmail: string;
  category?: string;
  messages: Message[];
  lastUpdated: string;
}

const SupportDashboard = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [support, setSupport] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentSupport = localStorage.getItem("currentSupport");
    if (!currentSupport) {
      navigate("/support/login");
      return;
    }
    
    setSupport(JSON.parse(currentSupport));
    loadConversations();
  }, [navigate]);

  const loadConversations = () => {
    const stored = JSON.parse(localStorage.getItem("conversations") || "[]");
    // Sort by last updated, most recent first
    const sorted = stored.sort((a: Conversation, b: Conversation) => 
      new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    );
    setConversations(sorted);
  };

  useEffect(() => {
    // Auto-refresh conversations every 3 seconds
    const interval = setInterval(loadConversations, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentSupport");
    navigate("/support/login");
  };

  const getLastUserMessage = (messages: Message[]) => {
    const userMessages = messages.filter(m => m.sender === "user");
    return userMessages[userMessages.length - 1]?.content || "Nenhuma mensagem";
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "Erro de Login": return "bg-red-100 text-red-800";
      case "Problemas de Pagamento": return "bg-yellow-100 text-yellow-800";
      case "Dúvida sobre Configuração": return "bg-blue-100 text-blue-800";
      case "Bug no Sistema": return "bg-purple-100 text-purple-800";
      case "Problemas de Performance": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Agora";
    if (diffInMinutes < 60) return `${diffInMinutes} min atrás`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h atrás`;
    return date.toLocaleDateString();
  };

  if (!support) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Painel de Suporte
            </h1>
            <p className="text-gray-600">Bem-vindo, {support.name}!</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={loadConversations}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </Button>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center">
                <MessageSquare className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{conversations.length}</p>
                  <p className="text-gray-600">Conversas Ativas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center">
                <User className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(conversations.map(c => c.userId)).size}
                  </p>
                  <p className="text-gray-600">Usuários Únicos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {conversations.filter(c => 
                      new Date().getTime() - new Date(c.lastUpdated).getTime() < 3600000
                    ).length}
                  </p>
                  <p className="text-gray-600">Ativas (1h)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Conversas de Suporte
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {conversations.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Nenhuma conversa ativa no momento</p>
                <p className="text-sm">As conversas aparecerão aqui quando os usuários enviarem mensagens</p>
              </div>
            ) : (
              <div className="divide-y">
                {conversations.map((conv) => (
                  <div key={conv.userId} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-purple-100 p-2 rounded-full">
                            <User className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{conv.userName}</h3>
                            <p className="text-sm text-gray-600">{conv.userEmail}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-3">
                          {conv.category && (
                            <Badge className={getCategoryColor(conv.category)}>
                              {conv.category}
                            </Badge>
                          )}
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatTime(conv.lastUpdated)}
                          </span>
                        </div>
                        
                        <p className="text-gray-700 text-sm bg-gray-100 p-3 rounded-lg">
                          <strong>Última mensagem:</strong> {getLastUserMessage(conv.messages)}
                        </p>
                      </div>
                      
                      <div className="ml-4">
                        <Link to={`/support/chat/${conv.userId}`}>
                          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                            Responder
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportDashboard;
