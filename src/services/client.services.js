// ClientService.js
class ClientService {


  static searchById() {
    return async (conn, worker, id) => {
      const query = `SELECT * FROM tb_cliente WHERE id_cliente = ?`;
      const result = await worker.database.viewQuery(query, [id], conn);
      if (result.length === 0) throw new Error('Cliente não encontrado');
      return result[0];
    };
  }

  static searchByCpf() {
    return async (conn, worker, cpf) => {
      const query = `SELECT * FROM tb_dado WHERE dado_tipo = 'Cliente' AND dado_cpf = ?`;
      const result = await worker.database.viewQuery(query, [cpf], conn);
      if (result.length === 0) throw new Error('Dado correspondente não encontrado');
      return result[0];
    };
  }

  compareClienteAndDado() {
    return async (conn, worker, id) => {
      const cliente = await this.searchById(conn, worker, id);
      const dado = await this.searchByCpf(conn, worker,cliente[0].cl_cpf);
      await dado.push(this.s)

      return {
        cliente,
        dado,
        match: cliente.id_cliente === dado.id_dado_original,
      };
    };
  }
}

export default new ClientService();
