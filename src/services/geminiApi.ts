
import { API_CONFIG, type GeminiCategory } from '@/config/api';

export interface TriageRequest {
  message: string;
}

export interface TriageResponse {
  category: GeminiCategory;
}

export interface SuggestRequest {
  history: string[];
  category: string;
}

export interface SuggestResponse {
  suggestions: string[];
}

export const geminiApi = {
  async triage(message: string): Promise<TriageResponse> {
    console.log('🤖 Enviando mensagem para triagem Gemini:', message);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
    
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TRIAGE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Erro na triagem: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ Categoria Gemini recebida:', result.category);
      return result;
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('❌ Erro na triagem Gemini:', error);
      throw error;
    }
  },

  async suggest(history: string[], category: string): Promise<SuggestResponse> {
    console.log('🤖 Solicitando sugestões Gemini para categoria:', category);
    console.log('📝 Histórico enviado:', history);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
    
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SUGGEST}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ history, category }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Erro ao gerar sugestões: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ Sugestões Gemini recebidas:', result.suggestions);
      return result;
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('❌ Erro nas sugestões Gemini:', error);
      throw error;
    }
  },
};
