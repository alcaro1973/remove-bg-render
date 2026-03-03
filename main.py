from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response
from rembg import remove
import uvicorn
import os

app = FastAPI()

@app.get("/")
def root():
    return {"status": "ok"}

@app.post("/remove-bg")
async def remove_bg(file: UploadFile = File(...)):
    # Lê bytes da imagem enviada
    input_bytes = await file.read()
    # Remove o fundo usando rembg
    output_bytes = remove(input_bytes)
    # Devolve PNG sem fundo
    return Response(content=output_bytes, media_type="image/png")

# Arranque automático para Render.com
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)


