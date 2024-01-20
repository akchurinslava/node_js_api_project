const {db} = require('../db');
const Client = db.clients

exports.getAll = async (req, res) => {
    const clients = await Client.findAll({attributes:["name"]})
    res.send(clients)
}

// Get specific client by id
exports.getById = async (req, res) => {
    const clients = await Client.findByPk(req.params.id)
    if (clients === null){
        res.status(404).send({"error": "Client not found"})
        return
    }
    res.send(clients)
}

exports.createNew = async (req, res) => {
    console.log(req.body)
    // const client = await Client.create(req.body)
    let client
    try{
        client = await Client.create(req.body)
    }
    catch (error){
        if (error instanceof db.Sequelize.ValidationError){
            console.log(error)
            res.status(400).send({"error": "Invalid input"})
        }
        else{
            console.log("ClientCreate", error)
            res.status(500).send({"error": "server error, try again later"})
        }
        return
    }
    res.status(201).location(`${getBaseUrl(req)}/clients/${client.id}`).json(client)
}

exports.updateById = async (req, res) => {
    let result
    delete (req.body.id)
    try{
        result = await Client.update(req.body, {where: {id: req.params.id}})
    }
    catch(error) {
        console.log("ClientUpdate: ", error)
        res.status(500).send({"error": "server error, try again later"})
        return
    }
    if (result === 0 || result === undefined){
        res.statsu(404).send({"error":"Client not found"})
        return
    }
    const game = await Client.findByPk(res.params.id)
    res.status(200).location(`${getBaseUrl(req)}/clients/${client.id}`).json(client)
}

exports.deleteById = async (req, res) => {
    let result;
    try{
        result = await Client.destroy({where: {id: req.params.id}})
    }
    catch (error){
        console.log("ClientsCreateDelete ", error)
        res.status(500).send({"error": "server error, try again later"})
        return
        }
        if(result === 0 || result === undefined){
            res.status(404).send({"error": "Client not found"})
            return
        }
        res.status(204).send()
        
    }

getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encrypted ? "https": "http") +
        `://${request.headers.host}`
    )
}