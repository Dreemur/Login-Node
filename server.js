const express = require('express');
const app = new express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

app.set('port',process.env.PORT || 3000);
app.set('view engine','ejs');

require('./config/routing')(app,passport);

app.listen(app.get('port'), () => {
    console.log(`server run on ${app.get('port')}` );
});