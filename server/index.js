require('dotenv').config()
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const {CONNECTION_STRING,SESSION_SECRET} = process.env;
const PORT = 4000;
const authCtrl = require('./controllers/authController')

const app = express();
app.use(express.json());

massive(CONNECTION_STRING).then(db =>{
    app.set('db',db)
    console.log('DB CONNECTED')
})
app.use(session({
    resave:true,
    saveUninitialized:false,
    secret: SESSION_SECRET
}))

app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

app.listen(PORT,() =>{
    console.log(`I am listening on ${PORT}`)
})