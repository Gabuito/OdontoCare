class httpController {


    homepage() {
        return (req, res) => {
            res.status(200).render('index', { layout: false });
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