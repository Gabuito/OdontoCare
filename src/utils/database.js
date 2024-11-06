import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Configuração do dotenv
dotenv.config();

// Pool de conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
  waitForConnections: process.env.DB_WAIT_FOR_CONNECTIONS,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
  queueLimit: process.env.DB_QUEUE_LIMIT
});

// Objeto de conexão
const connection = {
  async getConnection() {
    return await pool.getConnection();
  },

  // Função para iniciar uma transação
  async beginTransaction() {
    const conn = await this.getConnection();
    await conn.beginTransaction();
    return conn;
  },

  // Função para commitar(Concluir) uma transação
  async commitTransaction(conn) {
    await conn.commit();
    conn.release();
  },

  // Função para desfazer(Cancelar) uma transação
  async rollbackTransaction(conn) {
    await conn.rollback();
    conn.release();
  },

  // Função para realizar uma query
  async query(sql, values, conn) {
    if (conn) {
      return await conn.query(sql, values);
    } else {
      return await pool.query(sql, values);
    }
  },

  // Função para realizar uma nova query
  async newQuery(sql, values, conn) {
    const [results] = await this.query(sql, values, conn);
    return results;
  },

  // Função para realizar uma query de atualização
  async updateQuery(sql, values, conn) {
    const [results] = await this.query(sql, values, conn);
    return results.affectedRows > 0;
  },

  // Função para realizar uma query de visualização
  async viewQuery(sql, values, conn) {
    const [results] = await this.query(sql, values, conn);
    return results;
  }
};

export default connection;