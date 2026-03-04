// NÃO use isso:
// app.listen(3000, 'localhost', () => {...})

// USE ISSO:
const port = process.env.PORT || 3000;

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${port} em 0.0.0.0`);
});
