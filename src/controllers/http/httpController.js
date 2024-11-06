class httpController {


    homepage() {
        return (req, res) => {
            res.status(200).render('index', { layout: false });
        };
    }

    loginpage() {
        return (req, res) => {
            res.status(200).render('login/index2', { layout: false });
        };
    }
    
    createpage() {
        return (req, res) => {
            res.status(200).render('login/index', { layout: false });
        };
    }
    testview() {
        return (req, res) => {
            let id = req.params.id;
            res.status(200).render(`test${id}`, { layout: false });
        };
    }
    
}

export default httpController = new httpController();   