class dashClientController{
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
        inFunction: dashClientController.prototype.view.name,
      });

      // get all users
      try {
        let result = await this.#worker.readAll();
        
        return res
          .status(200)
          .render("dash/view.ejs", { layout: "dash/layout/layout.ejs", data: result });
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
        inFunction: dashClientController.prototype.editView.name,
      });

      // get user by id
      try {
        let result = await this.#worker.readById(req.params.id);
        console.log(result);

        if (!result) {
          return res
            .status(200)
            .render("dash/view.ejs", { layout: "dash/layout/layout.ejs", data: result });
        }

        return res 
          .status(200)
          .render("dash/edit.ejs", { layout: "dash/layout/layout.ejs", data: result[0] });
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
        inFunction: dashClientController.prototype.createView.name,
      });

      return res
        .status(200)
        .render("dash/create.ejs", { layout: "dash/layout/layout.ejs" });
    };
  }

  create(cb) {
    return async (req, res, next) => {
      // log
      cb({
        level: "Controller",
        aplication: this.constructor.name,
        inFunction: dashClientController.prototype.create.name,
      });
      // check if user exists
      try {
        let result = await this.#worker.readByEmail(req.body.email);
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
        let result = await this.#worker.create(
          req.body.nome,
          req.body.email,
          req.body.senha,
          req.body.plano,
          req.body.value
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
        inFunction: dashClientController.prototype.update.name,
      });

      console.log(req.body);
      console.log(req.params.id);

      // check if user exists
      try {
        let result = await this.#worker.readById(req.params.id);

        if (!result) {
          return res
            .status(200)
            .render("index.ejs", { layout: false, updated: false, data: result });
        }
      } catch (error) {
        return next(new Error(error));
      }
      // update user in database
      try {
        let result = await this.#worker.update(
        
          req.body.nome,
          req.body.email,
          req.body.senha,
          req.body.plano,
          200,
          req.body.status,
          req.params.id
        );
        if (result) {
          return res
            .status(200)
            .json({ updated: true, data: result });
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
        inFunction: dashClientController.prototype.delete.name,
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

export default new dashClientController();