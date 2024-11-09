class Employee extends User{
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
  #shift;
  #salary;
  #nextVacation;
  #nextService;
  #abseces;
  #documents;
  #register;

  constructor(employee) {
    super(employee);
    this.#cpf = employee.cpf;
    this.#rg = employee.rg;
    this.#phone = employee.phone;
    this.#address = employee.address;
    this.#city = employee.city;
    this.#state = employee.state;
    this.#zipCode = employee.zipCode;
    this.#country = employee.country;
    this.#birthDate = employee.birthDate;
    this.#status = employee.status;
    this.#createdAt = employee.createdAt;
    this.#updatedAt = employee.updatedAt;
    this.#deletedAt = employee.deletedAt;
    this.#shift = employee.shift;
    this.#salary = employee.salary;
    this.#nextVacation = employee.nextVacation;
    this.#nextService = employee.nextService;
    this.#abseces = employee.abseces;
    this.#documents = employee.documents;
    this.#register = employee.register;
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
      deletedAt: this.#deletedAt,
      shift: this.#shift,
      salary: this.#salary,
      nextVacation: this.#nextVacation,
      nextService: this.#nextService,
      abseces: this.#abseces,
      documents: this.#documents,
      register: this.#register
    }
  }

}