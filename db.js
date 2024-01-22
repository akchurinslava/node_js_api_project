const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.NAME,
    process.env.USER,
    process.env.PASS,
    {
        host: process.env.HOST,
        dialect: "mariadb",
        define: {
            timestamps: false
        },
    },


);

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.games = require("./models/Game.model")(sequelize,Sequelize)
db.clients = require("./models/Client.model")(sequelize,Sequelize)
db.orders = require("./models/Order.model")(sequelize,Sequelize,db.games,db.clients)
module.exports = db

async function Sync(){
    await sequelize.sync({alter:true}) // Modifies existing table erases existing table and recreates it
}

module.exports = {db, Sync}