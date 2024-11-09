class Service{

  #name;
  #description;
  #price;
  #id;
  #idClient;
  #idEmployee;
  #idMaterial;
  #status;
  #document;

  get name(){
    return this.#name;
  }

  get description(){
    return this.#description;
  }

  get price(){
    return this.#price;
  }

  get id(){ 
    return this.#id;
  }

  get idClient(){
    return this.#idClient;
  }

  get idEmployee(){
    return this.#idEmployee;
  }

  get idMaterial(){
    return this.#idMaterial;
  }
  
  set name(value){
    this.#name = value;
  }

  set description(value){
    this.#description = value;
  }

  set price(value){
    this.#price = value;
  }

  set id(value){
    this.#id = value;
  }

  set idClient(value){
    this.#idClient = value;
  }

  set idEmployee(value){
    this.#idEmployee = value;
  }

  set idMaterial(value){
    this.#idMaterial = value;
  }

  get status(){
    return this.#status;
  }

  set status(value){
    this.#status = value;
  }

  get document(){
    return this.#document;
  }

  set document(value){
    this.#document = value;
  }

  constructor(name, description, price, id, idClient, idEmployee, status){
    this.#name = name;
    this.#description = description;
    this.#price = price;
    this.#id = id;
    this.#idClient = idClient;
    this.#idEmployee = idEmployee;
    this.#status = status;
  }

  toJson(){
    return {
      name: this.#name,
      description: this.#description,
      price: this.#price,
      id: this.#id,
      idClient: this.#idClient,
      idEmployee: this.#idEmployee,
      status: this.#status,
      documents: this.#document,
      materials: this.#idMaterial
    }
  }
    
}