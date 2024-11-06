import dashController from "./dashController.js";

class dashEmployeeController extends dashController{
  #worker; //Este worker manipula o DB
  
  constructor() {
    this.#worker = {};
  }

  set worker(worker) {
    this.#worker = worker;
  }

  get worker() {
    return this.#worker;
  }

  view(cb) {
    return async (req, res, next) => {
      // log
      cb({
        level: "Controller",
        aplication: this.constructor.name,
        inFunction: dashEmployeeController.prototype.view.name,
      });

      // get all users
      try {
        let result = await this.#worker.readAll();
        return res
          .status(200)
          .render("dash/viewfunc.ejs", { layout: "dash/layout/layout.ejs", data: result });
      } catch (error) {
        return next(new Error(error));
      }

    };
  }   

  editView(cb) {
    return async (req, res, next) => {
      // log
      cb({
        level: "Controller",
        aplication: this.constructor.name,
        inFunction: dashEmployeeController.prototype.editView.name,
      });

      // get user by id
      try {
        let result = await this.#worker.readById(req.params.id);

        if (result.length === 0) { 
          return res
            .status(200)
            .render("dash/viewfunc.ejs", { layout: "dash/layout/layout.ejs" });
        }

        let cargo = await this.#worker.selectFunc();

        return res 
          .status(200)
          .render("dash/editfunc.ejs", { layout: "dash/layout/layout.ejs", data: result[0] , func: cargo});
      } catch (error) {
        return next(new Error(error));
      }
      
    };
  };
 
  createView(cb) {
    return async (req, res, next) => {
      // log
      cb({
        level: "Controller",
        aplication: this.constructor.name,
        inFunction: dashEmployeeController.prototype.createView.name,
      });
      try{
        let result = await this.#worker.selectFunc();
        return res
        .status(200)
        .render("dash/createfunc.ejs", { layout: "dash/layout/layout.ejs", data: result });
      } catch (error) {
        return next(new Error(error));
      }
    };
  }

  create(cb) {
    return async (req, res, next) => {
      // log
      cb({
        level: "Controller",
        aplication: this.constructor.name,
        inFunction: dashEmployeeController.prototype.create.name,
      });
      // check if user exists
      try {
        let result = await this.#worker.readByCPF(req.body.cpf);
        if (result.length > 0) {
          return res
            .status(200)
            .json({error: true, data: result });
        }
      } catch (error) {
        return next(new Error(error));
      }

      // insert user in database
      try {
        console.log(req.body.func);
        let result = await this.#worker.create(
          req.body.nome,
          req.body.cpf.replace(/\D/g, ''),
          req.body.cro ?? null,
          req.body.funcao,
          req.body.status,
          req.body.salario
        );
        if (result) {
          console.log("Nada");
          return res
            .status(200)
            .render("index.ejs", { layout: false, created: true, data: result });
        }
      } catch (error) {
        return next(new Error(error));
      }

      next();

    };
  }

  update(cb) {
    return async (req, res, next) => {
      // log
      cb({
        level: "Controller",
        aplication: this.constructor.name,
        inFunction: dashEmployeeController.prototype.update.name,
      });

      // check if user exists 
      try {
        let result = await this.#worker.readById(req.params.id1);

        if (!result) { 
          return res
            .status(200)
            .render("dash/viewfunc.ejs", { layout: 'dash/layout/layout.ejs'});
        }
      } catch (error) {
        return next(new Error(error));   
      }
      // update user in database
      try {
        let result = await this.#worker.update(
        
          req.body.nome,
          req.body.cpf,
          req.body.cro,
          req.body.funcao,
          req.body.status,
          req.body.salario,
          req.params.id
        );
        if (result) {
          result = await this.#worker.readAll();
          return res
            .status(200)
            .render("dash/viewfunc.ejs", { layout: "dash/layout/layout.ejs", data: result});
        }
      } catch (error) {
        return next(new Error(error));
      }

      next();
    };
  }

  delete(cb) {
    return async (req, res, next) => {
      // log
      cb({
        level: "Controller",
        aplication: this.constructor.name,
        inFunction: dashEmployeeController.prototype.delete.name,
      });

      // check if user exists
      try {
        let result = await this.#worker.readById(req.params.id);

        if (result.length === 0) {
          return res
            .status(200)
            .render("index.ejs", { layout: false, deleted: false, data: result });
        }
      } catch (error) {
        return next(new Error(error));
      }

      // delete user in database
      try {
        let result = await this.#worker.deleteById(req.params.id);
        if (result) {
          return res
            .status(200)
            .render("index.ejs", { layout: false, deleted: true, data: result });
        }
      } catch (error) {
        return next(new Error(error));
      }

      next();
    };
  }


}

export default new dashEmployeeController();