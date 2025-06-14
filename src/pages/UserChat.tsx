
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, LogOut, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
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

const UserChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const [isTriaging, setIsTriaging] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      loadExistingConversation();
    }
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchUserProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setUserProfile(data);
    }
  };

  const loadExistingConversation = () => {
    if (!user) return;
    
    const conversations = JSON.parse(localStorage.getItem("conversations") || "[]");
    const existingConv = conversations.find((conv: Conversation) => conv.userId === user.id);
    
    if (existingConv) {
      setMessages(existingConv.messages);
      setCategory(existingConv.category);
      setIsFirstMessage(false);
    }
  };

  useEffect(() => {
    // Poll for new messages from support
    const interval = setInterval(() => {
      if (!user) return;
      
      const conversations = JSON.parse(localStorage.getItem("conversations") || "[]");
      const currentConv = conversations.find((conv: Conversation) => conv.userId === user.id);
      
      if (currentConv && currentConv.messages.length > messages.length) {
        setMessages(currentConv.messages);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [user, messages.length]);

  const mockTriage = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("login") || lowerMessage.includes("senha") || lowerMessage.includes("acesso")) {
      return "Erro de Login";
    } else if (lowerMessage.includes("pagamento") || lowerMessage.includes("cobrança") || lowerMessage.includes("fatura")) {
      return "Problemas de Pagamento";
    } else if (lowerMessage.includes("configuração") || lowerMessage.includes("configurar") || lowerMessage.includes("setup")) {
      return "Dúvida sobre Configuração";
    } else if (lowerMessage.includes("bug") || lowerMessage.includes("erro") || lowerMessage.includes("falha")) {
      return "Bug no Sistema";
    } else if (lowerMessage.includes("lento") || lowerMessage.includes("devagar") || lowerMessage.includes("performance")) {
      return "Problemas de Performance";
    } else {
      return "Suporte Geral";
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user || !userProfile) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date().toISOString()
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    setNewMessage("");

    // Se é a primeira mensagem, fazer triagem com IA
    let detectedCategory = category;
    if (isFirstMessage) {
      setIsTriaging(true);
      
      try {
        console.log('Iniciando triagem da primeira mensagem...');
        const triageResult = await geminiApi.triage(newMessage);
        detectedCategory = triageResult.category;
        setCategory(detectedCategory);
        setIsFirstMessage(false);
        
        toast({
          title: "Problema classificado pela IA!",
          description: `Categoria: ${detectedCategory}`
        });
      } catch (error) {
        console.error('Erro na triagem:', error);
        // Fallback para triagem local em caso de erro
        detectedCategory = mockTriage(newMessage);
        setCategory(detectedCategory);
        setIsFirstMessage(false);
        
        toast({
          title: "Classificação local aplicada",
          description: `Categoria: ${detectedCategory} (Backend indisponível)`,
          variant: "destructive"
        });
      } finally {
        setIsTriaging(false);
      }
    }

    // Update conversation in localStorage
    const conversations = JSON.parse(localStorage.getItem("conversations") || "[]");
    const existingConvIndex = conversations.findIndex((conv: Conversation) => conv.userId === user.id);
    
    const conversationData: Conversation = {
      userId: user.id,
      userName: userProfile.name,
      userEmail: userProfile.email,
      category: detectedCategory || undefined,
      messages: updatedMessages,
      lastUpdated: new Date().toISOString()
    };

    if (existingConvIndex >= 0) {
      conversations[existingConvIndex] = conversationData;
    } else {
      conversations.push(conversationData);
    }

    localStorage.setItem("conversations", JSON.stringify(conversations));
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Suporte Técnico
            </h1>
            <p className="text-gray-600">Olá, {userProfile.name}! Como podemos ajudar?</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>

        <Card className="shadow-xl border-0 h-[600px] flex flex-col">
          <CardHeader className="border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Chat de Suporte
                {isTriaging && <RefreshCw className="h-4 w-4 animate-spin" />}
              </span>
              {category && (
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {category}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 p-0 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                  <Bot className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                  <p>Descreva seu problema e receberá suporte especializado!</p>
                  <p className="text-sm mt-2">Nossa IA classificará automaticamente seu chamado.</p>
                </div>
              )}

              {isTriaging && messages.length > 0 && (
                <div className="flex justify-center">
                  <div className="bg-blue-100 p-3 rounded-lg flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
                    <span className="text-blue-700 text-sm">IA analisando seu problema...</span>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-start gap-3 max-w-[80%] ${
                      message.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`p-2 rounded-full ${
                        message.sender === "user"
                          ? "bg-blue-600"
                          : "bg-purple-600"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === "user" ? "text-blue-100" : "text-gray-500"
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={isFirstMessage ? "Descreva seu problema..." : "Digite sua mensagem..."}
                  onKeyPress={(e) => e.key === "Enter" && !isTriaging && handleSendMessage()}
                  className="flex-1"
                  disabled={isTriaging}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={isTriaging || !newMessage.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isTriaging ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserChat;
