export class LogMiddleware {
 
  log(req, res, next) {
    console.log(`${req.method} ${req.url} {${req.body? req.body : ''}}`);
    next();
  }
}