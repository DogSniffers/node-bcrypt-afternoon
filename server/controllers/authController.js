let bcrypt = require('bcryptjs');

module.exports = {
    register: async(req,res) => {
        let {username,password,isAdmin} = req.body
        const db = req.app.get('db')
        const result = await db.get_user([username])
        const existingUser = result[0];
        if(existingUser){
            return res.status(409).send('Username Taken')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const registeredUser = await db.register_user([isAdmin,username,hash]);
        const user = registeredUser[0];
        req.session.user = {isAdmin: user.is_admin, username: user.username, id: user.id};
        return res.status(201).send(req.session.user);
    },
    login: async(req,res) => {
        let {username,password} = req.body;
        const getUser = await req.app.get('db').get_user([username]);
        const user = getUser[0];
        if(!user){
            res.status(401).send('User not Found. Please register as a new user before logging in')
        };
        const isAuthenticated = bcrypt.compareSync(password,user.hash)
        if(isAuthenticated === false){
            res.status(403).send('Incorrect Password')
            }
            req.session.user = {isAdmin: user.isAdmin, id: user.id, username: user.username}
            return res.send(req.session.user)
        },
        logout: async (req,res) => {
            req.session.destroy()
            res.status(200).send('Successfully Logged-Out')
        }
        }
