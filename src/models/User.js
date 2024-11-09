export default class User {

  #name;
  #email;
  #password;
  #id;
  #role;
  #status;
  #permissions;

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
  }

  get password() {
    return this.#password;
  }

  get id() {
    return this.#id;
  }

  get role() {
    return this.#role;
  }

  get status() {
    return this.#status;
  }

  get permissions() {
    return this.#permissions;
  }
  
  set name(value) {
    this.#name = value;
  }

  set email(value) {
    this.#email = value;
  }

  set password(value) {
    this.#password = value;
  }

  set id(value) {
    this.#id = value;
  }

  set role(value) {
    this.#role = value;
  }

  set status(value) {
    this.#status = value;
  }

  set permissions(value) {
    this.#permissions = value;
  }
  
  constructor(user) {
    this.#name = user.name;
    this.#email = user.email;
    this.#password = user.password;
    this.#id = user.id;
    this.#role = user.role;
    this.#status = user.status;
    this.#permissions = user.permissions;
  }

  toJson() {
    return {
      name: this.#name,
      email: this.#email,
      password: this.#password,
      id: this.#id,
      role: this.#role,
      status: this.#status,
      permissions: this.#permissions
  }
};

}