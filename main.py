import os
# Desativar GPU para evitar crash no Render
os.environ["ORT_DISABLE_GPU"] = "1"

from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response
from rembg import remove

app = FastAPI()

@app.get("/")
def root():
    return {"status": "ok"}

@app.post("/remove-bg")
async def remove_bg(file: UploadFile = File(...)):
    # Lê bytes da imagem enviada
    input_bytes = await file.read()

    # Usa o modelo leve u2netp (essencial para Render free tier)
    output_bytes = remove(input_bytes, model_name="u2netp")

    # Devolve PNG sem fundo
    return Response(content=output_bytes, media_type="image/png")
