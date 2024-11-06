
class userController {
  #worker;

  constructor() {
    this.#worker = {};
  }

  set worker(worker) {
    this.#worker = worker;
  }

  get worker() {
    return this.#worker;
  }

  create(cb) {
    return async (req, res, next) => {
      // log
      cb({
        level: "Controller",
        aplication: this.constructor.name,
        inFunction: userController.prototype.create.name,
      });

      // check if user@email exists
      try {
        let result = await this.#worker.readByEmail(req.body.email);

        if (result) {
          return res
            .status(200)
            .render("index.ejs", { layout: false, created: false, data: result });
        }
      } catch (error) {
        return next(new Error(error));
      }

      // insert user in database
      try {
        let result = await this.#worker.create(
          req.body.name,
          req.body.email,
          req.body.password,
          req.body.plan,
          req.body.value
        );
        if (result) {
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

  execute(cb) {
    return async (req, res, next) => {
      // log
      cb({
        level: "Controller",
        aplication: this.constructor.name,
        inFunction: userController.prototype.execute.name,
      });

      // get user by id
      try {
        let result = await this.#worker.readById(req.params.id);
        return res.status(200).render("index.ejs", { layout: false, data: result });
      } catch (error) {
        res.status(500).json({code: 500, message: 'Internal Server Error', description: 'It`s not your fault, but something went wrong with the server'});
        return next(new Error(error));
      }
    };
  }

  update(cb) {
    return async (req, res, next) => {
      cb({
        level: "Controller",
        aplication: this.constructor.name,
        inFunction: userController.prototype.update.name,
      });

      try {
        let result = await this.#worker.update(
          req.params.id,
          req.body.name,
          req.body.username,
          req.body.email,
          req.body.phone,
          req.body.plan,
          req.body.level,
          req.body.password
        );
        return res
          .status(200)
          .render("index.ejs", { layout: false, updated: true, data: result });
      } catch (error) {
        return next(new Error(error));
      }
    };
  }

  delete(cb) {
    return async (req, res, next) => {
      cb({
        level: "Controller",
        aplication: this.constructor.name,
        inFunction: userController.prototype.delete.name,
      });

      try {
        let result = await this.#worker.delete(req.params.id);
        return res
          .status(200)
          .render("index.ejs", { layout: false, deleted: true, data: result });
      } catch (error) {
        return next(new Error(error));
      }
    };
  }
}

export default new userController();
