require('dotenv').config()
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const {CONNECTION_STRING,SESSION_SECRET} = process.env;
const PORT = 4000;
const authCtrl = require('./controllers/authController');
const treasureCtrl = require('./controllers/treasureController');
const auth = require('./middleware/authMiddleWare')

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
app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.myTreasure)
app.post('/api/treasure/user',auth.usersOnly, treasureCtrl.addUserTreasure)
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly,treasureCtrl.getAllTreasure)

app.listen(PORT,() =>{
    console.log(`I am listening on ${PORT}`)
})