const {db} = require('../db');
const Order = db.orders

exports.getAll = async (req, res) => {
    const orders = await Order.findAll({attributes:["order_name"]})
    res.send(orders)
}

// Get specific order by id
exports.getById = async (req, res) => {
    const orders = await Order.findByPk(req.params.id)
    if (orders === null){
        res.status(404).send({"error": "Order not found"})
        return
    }
    res.send(orders)
}

exports.createNew = async (req, res) => {
    console.log(req.body)
    // const order = await Order.create(req.body)
    let order
    try{
        order = await Order.create(req.body)
    }
    catch (error){
        if (error instanceof db.Sequelize.ValidationError){
            console.log(error)
            res.status(400).send({"error": "Invalid input"})
        }
        else{
            console.log("OrderCreate", error)
            res.status(500).send({"error": "server error, try again later"})
        }
        return
    }
    res.status(201).location(`${getBaseUrl(req)}/orders/${order.id}`).json(order)
}

exports.updateById = async (req, res) => {
    let result
    delete (req.body.id)
    try{
        result = await Order.update(req.body, {where: {id: req.params.id}})
    }
    catch(error) {
        console.log("OrderUpdate: ", error)
        res.status(500).send({"error": "server error, try again later"})
        return
    }
    if (result === 0 || result === undefined){
        res.statsu(404).send({"error":"Order not found"})
        return
    }
    const order = await Order.findByPk(res.params.id)
    res.status(200).location(`${getBaseUrl(req)}/orders/${order.id}`).json(order)
}

exports.deleteById = async (req, res) => {
    let result;
    try{
        result = await Order.destroy({where: {id: req.params.id}})
    }
    catch (error){
        console.log("OrdersCreateDelete ", error)
        res.status(500).send({"error": "server error, try again later"})
        return
        }
        if(result === 0 || result === undefined){
            res.status(404).send({"error": "Order not found"})
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