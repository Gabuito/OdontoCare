import Express from 'express';
import Layouts from 'express-ejs-layouts';
import Path from 'path';
import { fileURLToPath } from 'url';
// import authRouter from './routes/authRouter.js';
// import dashRouter from './routes/dashRouter.js';


//rotas
import routerhttp from './routes/http/web.router.js'


const app = Express();
const __filename = fileURLToPath(import.meta.url);  
const __dirname = Path.dirname(__filename);     
app.use(Express.static(Path.join(__dirname, '..', 'public')));
app.set('view engine', 'ejs');
app.set('views', Path.join(__dirname, '..', 'src', 'views'));
app.use(Layouts);

app.use(Express.json());  

// app.use(authRouter);
// app.use(dashRouter);


app.use(routerhttp);


//temporario

app.get('/login1', (req, res) => {
  res.status(200).render('login/index.ejs', {layout : false, perfil : {}});
});

app.get('/login2', (req, res) => {
  res.status(200).render('dash/login.ejs', {layout : 'dash/layout/layout.ejs', perfil : {}});
});

app.listen(5000, '0.0.0.0', () => {
  console.log('\n Server está ativo -> http://localhost:5000 \n');
});