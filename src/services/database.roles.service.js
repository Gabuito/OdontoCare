import database from './database.services.js';

async function getRoles() {
  try {
    const res = await database.readAll('tb_roles');
    const roles = res.map(row => row.rol_sign.toUpperCase());
    return roles;

  } catch (err) {
    throw new Error("Falha em acessar os Cargos:" + err.message);
  }
}

export default getRoles;