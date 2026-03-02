from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response
from rembg import remove

app = FastAPI()

@app.get("/")
def root():
    return {"status": "ok"}

@app.post("/remove-bg")
async def remove_bg(file: UploadFile = File(...)):
    # lê bytes da imagem enviada
    input_bytes = await file.read()
    # aplica o teu algoritmo de remoção de fundo
    output_bytes = remove(input_bytes)
    # devolve PNG sem fundo
    return Response(content=output_bytes, media_type="image/png")
