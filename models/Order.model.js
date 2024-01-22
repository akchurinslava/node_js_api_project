module.exports = (sequelize, Sequelize,Game,Client) => {
    const Order = sequelize.define("Orders", {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        order_name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        total:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        clients_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: Client,
                key: 'id'
            }
        },
        games_id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references:{
                model: Game,
                key: 'id'
            }
        },
    })
    Game.belongsToMany(Client, {through: Order})
    Client.belongsToMany(Game, {through: Order})
    Game.hasMany(Order)
    Order.belongsTo(Game)
    Client.hasMany(Order)
    Order.belongsTo(Client)
    return Order
}