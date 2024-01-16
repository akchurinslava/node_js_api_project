require("dotenv").config();
const express = require('express')
const cors = require('cors')
const app = express()
//const mariadb = require("mariadb")
const port = process.env.APP_PORT //|| 8080;
const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
//const swaggerDocument = require('./docs/swagger.json');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');
app.use(express.json())
app.use(cors())

require("./routes/app_routes")(app)

app.get('/games/:id', (req, res) =>{
    if(typeof games[req.params.id - 1] === 'undefined'){
        return res.status(404).send({error: "Game not found"})
    }
    res.send(games[req.params.id - 1])
})

app.get('/orders/:id', (req, res) =>{
    if(typeof orders[req.params.id - 1] === 'undefined'){
        return res.status(404).send({error: "Order not found"})
    }
    res.send(orders[req.params.id - 1])
})



app.get('/games', (req, res) => {
    res.send(games);
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

app.listen(port, async () => {console.log(`API up at: http://localhost:${port}`)});

function getBaseUrl(req){
    return req.connection && req.connection.encrypted ? 'https' : 'http' + `://${req.headers.host}`
};

