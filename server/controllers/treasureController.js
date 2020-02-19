module.exports = {
    dragonTreasure: async (req,res) => {
        const db = req.app.get('db');
        const treasure = await db.get_dragon_treasure(1)
        return res.status(200).send(treasure)
    },
    myTreasure: async (req,res) => {
        const db = req.app.get('db');
        const mytreasure = await db.get_user_treasure(req.session.user.id)
        return res.status(200).send(mytreasure)
    },
    addUserTreasure: async (req,res) => {
        const {treasureUrl} = req.body
        const {id} = req.session.user
        const db = req.app.get('db')
        const userTreasure = db.add_user_treasure(treasureUrl,id)
        return res.status(200).send(userTreasure)
    },
    getAllTreasure: async (req,res) => {
        const db = req.app.get('db');
        const allTreasure = await db.get_all_treasure()
        return res.status(200).send(allTreasure)

    }
}