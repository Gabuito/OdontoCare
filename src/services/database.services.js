class Worker {
  #database;

  constructor() {
    this.#database = {};
  }

  set database(database) {
    this.#database = database;
  }

  get database() {
    return this.#database;
  }

  async beginTransaction() {
    return await this.#database.beginTransaction();
  }

  async commitTransaction(conn) {
    await this.#database.commitTransaction(conn);
  }

  async rollbackTransaction(conn) {
    await this.#database.rollbackTransaction(conn);
  }

  async create(table, columns, conn) {
    const sql = `INSERT INTO ${table} (${Object.keys(columns).join(', ')}) VALUES (${Object.keys(columns).map(() => '?').join(', ')})`;
    return await this.#database.newQuery(sql, [...Object.values(columns)], conn);
  }

  async readAll(table, conn) {
    const sql = `SELECT * FROM ${table}`;
    return await this.#database.viewQuery(sql, [], conn);
  }

  async readByColumn(table, column, data, conn) {
    const sql = `SELECT * FROM ${table} WHERE ${column} = ?`;
    return await this.#database.viewQuery(sql, [data], conn);
  }
  
  async update(table, columns, pkey, data, conn) {
    const sql = `UPDATE ${table} SET ${Object.keys(columns).map(key => `${key} = ?`).join(', ')} WHERE ${pkey} = ?`;
    return await this.#database.updateQuery(sql, [...Object.values(columns), data], conn);
  }

  async deleteByColumn(table, pkey, data, conn) {
    const sql = `DELETE FROM ${table} WHERE ${pkey} = ?`;
    return await this.#database.updateQuery(sql, [data], conn);
  }

  async getLatestRow(table) {
    const sql = `SELECT * FROM ${table} ORDER BY id DESC LIMIT 1`;
    return await this.#database.viewQuery(sql, []);
  }
}

export default new Worker();