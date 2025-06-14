
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gemini_utils import classificar_chamado, sugerir_respostas

app = FastAPI()

# Configurar CORS de forma mais robusta
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,  # Mudança importante: False quando allow_origins é *
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"]
)

class TriagemInput(BaseModel):
    message: str

class SugestaoInput(BaseModel):
    history: list[str]
    category: str

@app.get("/")
def read_root():
    return {"message": "API funcionando!"}

@app.options("/{full_path:path}")
def options_handler():
    """Handle preflight OPTIONS requests"""
    return {"message": "OK"}

@app.post("/triage")
def triage(input_data: TriagemInput):
    try:
        print(f"Recebendo triagem: {input_data.message}")
        categoria = classificar_chamado(input_data.message)
        print(f"Categoria classificada: {categoria}")
        return {"category": categoria}
    except Exception as e:
        print(f"Erro na triagem: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/suggest")
def suggest(input_data: SugestaoInput):
    try:
        print(f"Recebendo solicitação de sugestões para categoria: {input_data.category}")
        print(f"Histórico recebido: {input_data.history}")
        
        # Converter o histórico para o formato esperado pelo gemini_utils
        historico_formatado = []
        for i, mensagem in enumerate(input_data.history):
            role = 'user' if i % 2 == 0 else 'model'  # Alternar entre user e model
            historico_formatado.append({
                'role': role,
                'parts': [mensagem]
            })
        
        sugestoes = sugerir_respostas(historico_formatado, input_data.category)
        print(f"Sugestões geradas: {sugestoes}")
        return {"suggestions": sugestoes}
    except Exception as e:
        print(f"Erro nas sugestões: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
