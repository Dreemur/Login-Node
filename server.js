const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const morgan = require('morgan');
const path = require('path');

//declare the route of db
const {url} = require('./config/database');
mongoose.connect(url, { });

require('./config/passport')(passport);

app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'fast',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/routing')(app,passport);
app.use(express.static(__dirname + '/views/css'));  //refer to the css files in your template files

app.listen(app.get('port'), () => {
    console.log(`server run on ${app.get('port')}` );
});