
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  ENDPOINTS: {
    TRIAGE: '/triage',
    SUGGEST: '/suggest',
  },
  TIMEOUT: 10000, // 10 segundos
};

export const GEMINI_CATEGORIES = [
  'Login e Acesso',
  'Erros de Software/App', 
  'Conectividade/Rede',
  'Hardware',
  'Dúvidas de Uso',
  'Cobrança/Financeiro',
  'Outros/Geral'
] as const;

export type GeminiCategory = typeof GEMINI_CATEGORIES[number];
