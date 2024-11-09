import User from './User.js';
import workerDB from '../services/database.services.js';
import Database from '../config/mysql.db.js'

class Client extends User{
  #cpf;
  #rg;
  #phone;
  #address;
  #city;
  #state;
  #zipCode;
  #country;
  #birthDate;
  #status;
  #createdAt;
  #updatedAt;
  #deletedAt;
  #plan;

  constructor(client) {
    super(client);
    this.#cpf = client.cpf;
    this.#rg = client.rg;
    this.#phone = client.phone;
    this.#address = client.address;
    this.#city = client.city;
    this.#state = client.state;
    this.#zipCode = client.zipCode;
    this.#country = client.country;
    this.#birthDate = client.birthDate;
    this.#status = client.status;
    this.#createdAt = client.createdAt;
    this.#updatedAt = client.updatedAt;
  }


  async save() {
    try {
      workerDB.database(new Database());
      const columns = {
        cpf: this.#cpf,
        rg: this.#rg,
        phone: this.#phone,
        address: this.#address,
        city: this.#city,
        state: this.#state,
        zipCode: this.#zipCode,
        country: this.#country,
        birthDate: this.#birthDate,
        status: this.#status,
        createdAt: this.#createdAt,
        updatedAt: this.#updatedAt,
        deletedAt: this.#deletedAt
      };
      const res = await workerDB.create('tb_clients', columns);
    } catch (err) {
      throw new Error("Falha em salvar o Cliente:" + err.message);
    }
  }



  toJson() {
    return {
      ...super.toJson(),
      cpf: this.#cpf,
      rg: this.#rg,
      phone: this.#phone,
      address: this.#address,
      city: this.#city,
      state: this.#state,
      zipCode: this.#zipCode,
      country: this.#country,
      birthDate: this.#birthDate,
      status: this.#status,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
      deletedAt: this.#deletedAt
    }
  }
}

export default Client;