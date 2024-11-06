


class LogMiddleware {
 
  log() {  
    return (req, res, next) => {
      console.log(`->New Resquest-----------------------\n`.toUpperCase());
      const startTime = Date.now();

      // Sobrescreve o método end para capturar o tempo final da requisição
      const originalEnd = res.end;
      res.end = function (chunk, encoding) {
        const duration = Date.now() - startTime;
        console.log(`LOG -> REQUEST [${new Date().toLocaleDateString("pt-BR")}] : '${req.method}' > '${req.originalUrl}' | RESPONSE : Status ${res.statusCode} in '${duration}ms'\n`.toUpperCase());
        originalEnd.call(this, chunk, encoding);
      };

      next();
    };
  }

  internalLog(stage) { 
    return console.log(`ACESSOU -> ${Object.values(stage).toString().toUpperCase().replaceAll(","," > ")} | OK ✓ \n`);
  }

  error() {
    return (err, req, res, next) => {
      console.log(`ERROR -> WHERE : '${req.originalUrl}' | CODE: '${res.statusCode || 500}' - Error: ${err.message}\n`.toUpperCase());
      next(err);  // Passa o erro adiante
    };
  }
}

export default new LogMiddleware();
