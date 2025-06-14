
# Backend API - Sistema de Suporte com IA

## Configuração

1. Instale as dependências:
```bash
pip install -r requirements.txt
```

2. Configure a chave da API do Google:
   - Copie o arquivo `.env.example` para `.env`
   - Adicione sua chave da API do Google Gemini no arquivo `.env`

3. Execute o servidor:
```bash
python main.py
```

O servidor estará disponível em `http://localhost:8000`

## Endpoints

- `POST /triage` - Classifica automaticamente a categoria do chamado
- `POST /suggest` - Gera sugestões de resposta para o atendente

## Exemplo de uso

### Triagem
```bash
curl -X POST "http://localhost:8000/triage" \
     -H "Content-Type: application/json" \
     -d '{"message": "Não consigo fazer login na minha conta"}'
```

### Sugestões
```bash
curl -X POST "http://localhost:8000/suggest" \
     -H "Content-Type: application/json" \
     -d '{"history": ["Usuário: Não consigo fazer login", "Atendente: Já tentou redefinir a senha?"], "category": "Login e Acesso"}'
```
