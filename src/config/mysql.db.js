import mysql from 'mysql2'

class Database {

  #conexao;

  get conexao() { return this.#conexao;} 
  set conexao(conexao) { this.#conexao = conexao; }

  constructor() {

      this.#conexao = mysql.createPool({
          host: process.env.DB_HOST,
          database: process.env.DB_DATABASE,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          waitForConnections: process.env.DB_WAIT_FOR_CONNECTIONS,
          connectionLimit: process.env.DB_CONNECTION_LIMIT,
          queueLimit: process.env.DB_QUEUE_LIMIT
      });
      
  }
}

export default Database;



