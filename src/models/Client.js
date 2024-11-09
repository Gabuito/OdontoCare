import User from './User.js';

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
    this.#deletedAt = client.deletedAt;
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