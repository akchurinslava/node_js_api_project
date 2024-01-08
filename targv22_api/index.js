const express = require('express');
const app = express();
const port = process.env.APP_PORT;
const mariadb = require("mariadb");
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
//const swaggerDocument = require('./docs/swagger.json');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');
app.use(express.json());
app.use(cors());

const pool = mariadb.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.NAME,
    connectionLimit: 5
})

// const games = [
//     {id: 1, name: "Team Fortress 1", price: "free", rating: 11},
//     {id: 2, name: "Team Fortress 2", price: 2.99, rating: 24},
//     {id: 3, name: "Team Fortress 3", price: 4.32, rating: 39},
//     {id: 4, name: "Team Fortress 4", price: 6.3, rating: 44},
//     {id: 5, name: "Team Fortress 5", price: 6.32, rating: 56},
//     {id: 6, name: "Team Fortress 6", price: 6.3, rating: 61},
//     {id: 7, name: "Team Fortress 7", price: 63.3, rating: 74},
//     {id: 8, name: "Team Fortress 8", price: 6.23, rating: 82},
//     {id: 9, name: "Super Mario 9", price: 353.2, rating: 93}
// ]

app.get('/games/:id', (req, res) =>{
    if(typeof games[req.params.id - 1] === 'undefined'){
        return res.status(404).send({error: "Game not found"})
    }
    res.send(games[req.params.id - 1])
})

app.get('/games', async (req, res) => {
    let connection
    try{
        connection = await pool.getConnection()
        const rows = await connection.query("SELECT id, name FROM games")
        res.send(rows)
    } catch (error){
        throw error
    }finally{
        if(connection) return connection.end()
    }
});

app.post('/games', (req, res) =>{
    if(!req.body.name || !req.body.price || !req.body.rating){
        return res.status(400).send({error: "One or all parameteres are missing"})
    }
    let game = {
        id: games.length + 1,
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating
    }
    games.push(game)
    
    res.status(201).location(`${getBaseUrl(req)}/games/${games.length}`).send(games)
});

app.delete('/games/:id', (req, res) =>{
    if(typeof games[req.params.id - 1] === 'undefined'){
        return res.status(404).send({error: "Game not found"})
    };
    games.splice(req.params.id -1, 1);
    res.status(204).send({error: "No Content"});
});

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, () => {console.log(`API up at: http://localhost:${port}`)});

function getBaseUrl(req){
    return req.connection && req.connection.encrypted ? 'https' : 'http' + `://${req.headers.host}`
};

