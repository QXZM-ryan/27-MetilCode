
import os
from dotenv import load_dotenv

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

# Obtém a chave da API do Google a partir das variáveis de ambiente
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    print("❌ ERRO: GOOGLE_API_KEY não encontrada!")
    print("📝 Por favor:")
    print("   1. Crie o arquivo 'api/.env'")
    print("   2. Adicione: GOOGLE_API_KEY=sua_chave_aqui")
    print("   3. Substitua 'sua_chave_aqui' pela sua chave real do Google Gemini")
    print("   4. Reinicie o servidor")
else:
    print("✅ GOOGLE_API_KEY carregada com sucesso!")
