const gamesController = require('../controllers/GamesController.js')

module.exports = (app) => {
    app.route("/games")
        .get(gamesController.getAll)  // Get all games as list
        .post(gamesController.createNew) // Create a new game
    app.route("/games/:id")
        .get(gamesController.getById) //get a game by id
}
