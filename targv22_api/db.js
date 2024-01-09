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
        }
    }
);

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.games = require("./models/Game.model")(sequelize,Sequelize)

module.exports = db