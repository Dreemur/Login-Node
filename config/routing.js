module.exports = (app, passport) => {
    app.get('/',(req,res) => {
        res.render('main');
    })

    app.get('/login',(req,res) => {
        res.render('login');
    })

    app.get('/signup',(req,res) => {
        res.render('signup');
    })

    app.get('/profile',(req,res) => {
        res.render('profile');
    })

    // app.post('login', passport.autenthicate('local-login',{
    //     successRoute: '/profile',
    //     failureRoute: '/login',
    //     failureFlash: true
    // }))

    // app.post('signup', passport.autenthicate('local-signup',{
    //     successRoute: '/profile',
    //     failureRoute: '/signup',
    //     failureFlash: true
    // }))
}