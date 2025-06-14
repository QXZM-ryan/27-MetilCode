
import google.generativeai as genai
from config import GOOGLE_API_KEY

genai.configure(api_key=GOOGLE_API_KEY)
MODEL_NAME = "models/gemini-1.5-flash"

categorias_suporte = [
    "Login e Acesso",
    "Erros de Software/App",
    "Conectividade/Rede",
    "Hardware",
    "Dúvidas de Uso",
    "Cobrança/Financeiro",
    "Outros/Geral"
]

def classificar_chamado(texto_problema: str) -> str:
    model = genai.GenerativeModel(MODEL_NAME)

    prompt = f"""
    Classifique o seguinte problema de suporte em uma das categorias fornecidas. Retorne APENAS o nome da categoria.
    As categorias são: {', '.join(categorias_suporte)}.

    Problema: \"{texto_problema}\"
    Categoria:
    """

    try:
        response = model.generate_content(prompt)
        categoria_identificada = response.text.strip()

        if categoria_identificada not in categorias_suporte:
            print(f"Aviso: Categoria '{categoria_identificada}' não reconhecida. Atribuindo a 'Outros/Geral'.")
            return "Outros/Geral"
        
        return categoria_identificada

    except Exception as e:
        print(f"Erro ao classificar o chamado: {e}")
        return "Erro na Classificação"

def sugerir_respostas(historico_conversa: list[dict], categoria_problema: str) -> list[str]:
    model = genai.GenerativeModel(MODEL_NAME)

    contexto_conversa = ""
    for mensagem in historico_conversa:
        if 'parts' in mensagem and mensagem['parts']:
            role = "Atendente" if mensagem['role'] == 'model' else "Usuário"
            content = " ".join(part for part in mensagem['parts'] if isinstance(part, str))
            contexto_conversa += f"{role}: {content}\n"

    prompt = f"""
    Você é um assistente de IA para um atendente de suporte ao cliente. Com base na categoria do problema e no histórico da conversa, gere 3 respostas curtas, úteis e profissionais para o atendente. Cada sugestão deve ser uma frase ou duas.

    Categoria do Problema: {categoria_problema}

    Histórico da Conversa:
    {contexto_conversa.strip()}

    Sugestões para o atendente:
    1.
    2.
    3.
    """

    try:
        response = model.generate_content(prompt)
        raw_suggestions = response.text.strip().split('\n')

        sugestoes_limpas = []
        for item in raw_suggestions:
            item_limpo = item.strip()
            if item_limpo.startswith(('1.', '2.', '3.')):
                sugestoes_limpas.append(item_limpo[3:].strip())
            elif item_limpo:
                sugestoes_limpas.append(item_limpo)

        return sugestoes_limpas[:3]

    except Exception as e:
        print(f"Erro ao gerar sugestões de respostas: {e}")
        return ["Ocorreu um erro ao gerar sugestões.", "Tente reformular a pergunta do usuário."]
