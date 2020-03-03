module.exports=(req, res) => {
    delete req.session.username;
    res.redirect('/admin')
}