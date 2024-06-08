// Habilitar o CORS para poder conectar a Fetch no frontend com a porta 3000 a porta 3001 do backend

module.exports = (request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.setHeader('Access-Control-Allow-Method', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  response.setHeader('Access-Control-Max-Age', '10');
  next();
};
