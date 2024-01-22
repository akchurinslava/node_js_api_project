module.exports = (sequelize, Sequelize) => {
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
        total: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        clients_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Clients',
                key: 'id'
            }
        },
        games_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references:{
                model: 'Games',
                key: 'id'
            }
        },
    })
    return Order
}