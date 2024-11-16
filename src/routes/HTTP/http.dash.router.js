import { Router } from 'express';

const dashRouter = Router();

dashRouter.get('/dashboard', async (req, res) => {
  try {
    
    const API_URL = process.env.API_URL || 'http://localhost:5000';
    
    const response = await fetch(`${API_URL}/api/v1/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'gabriel@gmail.com',
        password: '123',
      })
    });

    
    const data = await response.json();
    
    res.render('dash/index', { 
      layout: 'dash/layout/layout', 
      data: { users: 1090,
        monthy: {
          Janeiro: 255,
          Fevereiro: 390,
          Março: 309,
          Abril: 350,
          Maio: 400,
          Junho: 390,
          Julho: 500,
          Agosto: 540,
          Setembro: 578,
          Outubro: 600
        },
        newUser:{
          name: 'Gabriel Souza',
          plan: 'Plano Duo'
        }
      }
    });

  } catch (error) {
    console.error('Erro ao acessar dashboard:', error);
    // Redireciona para uma página de erro ou renderiza uma mensagem
    res.status(500).render('error', { 
      layout: false, 
      message: 'Erro ao carregar o dashboard' 
    });
  }
});

dashRouter.get('/dashboard/clients/new', async (req, res) => {
  res.render('dash/create_cli', { layout: 'dash/layout/layout', data: {} });
}
);

dashRouter.get('/dashboard/employee/new', async (req, res) => {
  res.render('dash/create_emp', { layout: 'dash/layout/layout', data: {} });
}
);

  

export default dashRouter;