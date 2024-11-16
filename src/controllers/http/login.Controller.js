class loginController {
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
}

export default loginController = new loginController();