
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Send, Bot, User, ArrowLeft, Lightbulb, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { geminiApi } from "@/services/geminiApi";

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

const SupportChat = () => {
  const { userId } = useParams();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [support, setSupport] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const currentSupport = localStorage.getItem("currentSupport");
    if (!currentSupport) {
      navigate("/support/login");
      return;
    }
    
    setSupport(JSON.parse(currentSupport));
    loadConversation();
  }, [navigate, userId]);

  useEffect(() => {
    // Poll for new messages from user
    const interval = setInterval(loadConversation, 2000);
    return () => clearInterval(interval);
  }, [userId]);

  const loadConversation = () => {
    const conversations = JSON.parse(localStorage.getItem("conversations") || "[]");
    const conv = conversations.find((c: Conversation) => c.userId === userId);
    setConversation(conv || null);
  };

  const mockSuggestions = (history: Message[], category?: string): string[] => {
    const lastUserMessage = history.filter(m => m.sender === "user").pop()?.content.toLowerCase() || "";
    
    switch (category) {
      case "Erro de Login":
        if (lastUserMessage.includes("senha")) {
          return [
            "Vou te ajudar a redefinir sua senha. Verifique seu email em alguns minutos.",
            "Pode ser que sua conta esteja temporariamente bloqueada. Vou verificar isso para você.",
            "Tente fazer logout completo e entrar novamente. Se não funcionar, posso resetar sua senha."
          ];
        }
        return [
          "Vamos resolver isso juntos. Pode me informar qual erro específico aparece na tela?",
          "Primeiro, tente limpar o cache do navegador e tente novamente.",
          "Vou verificar se há algum problema conhecido com o sistema de login no momento."
        ];
      
      case "Problemas de Pagamento":
        return [
          "Vou verificar o status do seu pagamento e te atualizo em alguns minutos.",
          "Pode verificar se o cartão não está vencido ou com limite insuficiente?",
          "Vou escalar isso para o financeiro e retorno com uma solução em breve."
        ];
      
      case "Bug no Sistema":
        return [
          "Obrigado por reportar! Vou encaminhar para nossa equipe técnica investigar.",
          "Pode me enviar uma captura de tela do erro? Isso vai ajudar na investigação.",
          "Já registrei o bug em nosso sistema. Vou te manter informado da correção."
        ];
        
      case "Dúvida sobre Configuração":
        return [
          "Claro! Vou te guiar passo a passo na configuração que precisa.",
          "Posso agendar uma chamada de 15 min para te ajudar com isso pessoalmente.",
          "Vou te enviar um tutorial detalhado que vai resolver sua dúvida."
        ];
        
      default:
        return [
          "Entendi sua situação. Vou analisar e te dar uma solução personalizada.",
          "Obrigado por entrar em contato. Estou aqui para te ajudar!",
          "Vou verificar isso internamente e te retorno com uma resposta completa."
        ];
    }
  };

  const handleGetSuggestions = async () => {
    if (!conversation) return;
    
    setIsLoadingSuggestions(true);
    
    try {
      console.log('Solicitando sugestões da IA...');
      
      // Preparar histórico para a IA
      const history = conversation.messages.map(msg => 
        `${msg.sender === 'user' ? 'Usuário' : 'Atendente'}: ${msg.content}`
      );
      
      const result = await geminiApi.suggest(history, conversation.category || 'Geral');
      setSuggestions(result.suggestions);
      
      toast({
        title: "Sugestões geradas pela IA!",
        description: `${result.suggestions.length} respostas inteligentes prontas para uso.`
      });
    } catch (error) {
      console.error('Erro ao gerar sugestões:', error);
      
      // Fallback para sugestões locais
      const mockSuggestions = mockSuggestionsFunction(conversation.messages, conversation.category);
      setSuggestions(mockSuggestions);
      
      toast({
        title: "Sugestões locais geradas",
        description: "Backend indisponível, usando sugestões pré-definidas.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const mockSuggestionsFunction = (history: Message[], category?: string): string[] => {
    const lastUserMessage = history.filter(m => m.sender === "user").pop()?.content.toLowerCase() || "";
    
    switch (category) {
      case "Erro de Login":
        if (lastUserMessage.includes("senha")) {
          return [
            "Vou te ajudar a redefinir sua senha. Verifique seu email em alguns minutos.",
            "Pode ser que sua conta esteja temporariamente bloqueada. Vou verificar isso para você.",
            "Tente fazer logout completo e entrar novamente. Se não funcionar, posso resetar sua senha."
          ];
        }
        return [
          "Vamos resolver isso juntos. Pode me informar qual erro específico aparece na tela?",
          "Primeiro, tente limpar o cache do navegador e tente novamente.",
          "Vou verificar se há algum problema conhecido com o sistema de login no momento."
        ];
      
      case "Problemas de Pagamento":
        return [
          "Vou verificar o status do seu pagamento e te atualizo em alguns minutos.",
          "Pode verificar se o cartão não está vencido ou com limite insuficiente?",
          "Vou escalar isso para o financeiro e retorno com uma solução em breve."
        ];
      
      case "Bug no Sistema":
        return [
          "Obrigado por reportar! Vou encaminhar para nossa equipe técnica investigar.",
          "Pode me enviar uma captura de tela do erro? Isso vai ajudar na investigação.",
          "Já registrei o bug em nosso sistema. Vou te manter informado da correção."
        ];
        
      case "Dúvida sobre Configuração":
        return [
          "Claro! Vou te guiar passo a passo na configuração que precisa.",
          "Posso agendar uma chamada de 15 min para te ajudar com isso pessoalmente.",
          "Vou te enviar um tutorial detalhado que vai resolver sua dúvida."
        ];
        
      default:
        return [
          "Entendi sua situação. Vou analisar e te dar uma solução personalizada.",
          "Obrigado por entrar em contato. Estou aqui para te ajudar!",
          "Vou verificar isso internamente e te retorno com uma resposta completa."
        ];
    }
  };

  const handleSendMessage = (messageContent?: string) => {
    if (!conversation) return;
    
    const content = messageContent || newMessage;
    if (!content.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: content,
      sender: "support",
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...conversation.messages, message];
    const updatedConversation: Conversation = {
      ...conversation,
      messages: updatedMessages,
      lastUpdated: new Date().toISOString()
    };

    // Update conversation in localStorage
    const conversations = JSON.parse(localStorage.getItem("conversations") || "[]");
    const index = conversations.findIndex((c: Conversation) => c.userId === userId);
    
    if (index >= 0) {
      conversations[index] = updatedConversation;
      localStorage.setItem("conversations", JSON.stringify(conversations));
      setConversation(updatedConversation);
    }

    setNewMessage("");
    setSuggestions([]);
    
    toast({
      title: "Mensagem enviada!",
      description: "O usuário receberá sua resposta em tempo real."
    });
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

  if (!support || !conversation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p>Carregando conversa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-100">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/support/dashboard">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              Conversa com {conversation.userName}
            </h1>
            <p className="text-gray-600">{conversation.userEmail}</p>
          </div>
          {conversation.category && (
            <Badge className={getCategoryColor(conversation.category)}>
              {conversation.category}
            </Badge>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 h-[600px] flex flex-col">
              <CardHeader className="border-b bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Chat de Suporte
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 p-0 flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {conversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "support" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-start gap-3 max-w-[80%] ${
                          message.sender === "support" ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div
                          className={`p-2 rounded-full ${
                            message.sender === "support"
                              ? "bg-purple-600"
                              : "bg-blue-600"
                          }`}
                        >
                          {message.sender === "support" ? (
                            <Bot className="h-4 w-4 text-white" />
                          ) : (
                            <User className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <div
                          className={`p-3 rounded-2xl ${
                            message.sender === "support"
                              ? "bg-purple-600 text-white"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p>{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === "support" ? "text-purple-100" : "text-gray-500"
                          }`}>
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t bg-gray-50">
                  <div className="space-y-3">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Digite sua resposta..."
                      className="min-h-[80px] resize-none"
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleSendMessage()}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 flex-1"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Resposta
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Suggestions Panel */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Sugestões de IA Gemini
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <Button 
                  onClick={handleGetSuggestions}
                  disabled={isLoadingSuggestions}
                  className="w-full mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                >
                  {isLoadingSuggestions ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Lightbulb className="h-4 w-4 mr-2" />
                  )}
                  {isLoadingSuggestions ? "Consultando Gemini..." : "Sugerir com IA"}
                </Button>

                {suggestions.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                      <Bot className="h-4 w-4 text-yellow-600" />
                      Respostas sugeridas pelo Gemini:
                    </h4>
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 cursor-pointer hover:from-yellow-100 hover:to-orange-100 transition-colors"
                        onClick={() => handleSendMessage(suggestion)}
                      >
                        <p className="text-sm text-gray-700 mb-2">{suggestion}</p>
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSendMessage(suggestion);
                          }}
                        >
                          Usar esta resposta
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {suggestions.length === 0 && !isLoadingSuggestions && (
                  <div className="text-center py-4">
                    <Bot className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm text-gray-500">
                      Clique no botão acima para gerar sugestões inteligentes com IA
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <CardTitle>Informações do Usuário</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Nome:</label>
                  <p className="text-gray-900">{conversation.userName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email:</label>
                  <p className="text-gray-900">{conversation.userEmail}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Categoria:</label>
                  <p className="text-gray-900">{conversation.category || "Não classificado"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Última atividade:</label>
                  <p className="text-gray-900 text-sm">
                    {new Date(conversation.lastUpdated).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportChat;
