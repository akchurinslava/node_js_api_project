const gamesController = require('../controllers/GamesController.js');
const ordersController = require('../controllers/OrdersController.js');
const clientsController = require('../controllers/ClientsController.js');

module.exports = (app) => {
    app.route("/games")
        .get(gamesController.getAll)  // Get all games as list
        .post(gamesController.createNew) // Create a new game
    app.route("/orders")
        .get(ordersController.getAll)
        .post(ordersController.createNew)
    app.route("/clients")
        .get(clientsController.getAll)
        .post(clientsController.createNew)
    app.route("/games/:id")
        .get(gamesController.getById) //get a game by id
        .put(gamesController.updateById) //change a info of a game by id
        .delete(gamesController.deleteById) //delete a game by id
    app.route("/orders/:id")
        .get(ordersController.getById) //get a game by id
        .put(ordersController.updateById) //change a info of a game by id
        .delete(ordersController.deleteById) //delete a game by id
    app.route("/clients/:id")
        .get(clientsController.getById) //get a game by id
        .put(clientsController.updateById) //change a info of a game by id
        .delete(clientsController.deleteById) //delete a game by id
}
