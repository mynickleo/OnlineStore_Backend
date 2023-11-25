const dataBase = require('../dataBase')

class OrdersController{
    async getOrdersDetailsById(req, res){
        try{
            const id_order = req.params.id
            const getOrdersDetailsById = await dataBase.query(
                `SELECT * FROM orders_details WHERE order_id = '${id_order}'`
            )
            return res.json(getOrdersDetailsById.rows)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    async getOrdersById(req, res){
        try{
            const id_order = req.params.id
            const getOrdersById = await dataBase.query(
                `SELECT * FROM orders WHERE id_order = '${id_order}'`
            )
            return res.json(getOrdersById.rows)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    async getOrdersDetailsAll(req, res){
        try{
            const getAllOrdersDetails = await dataBase.query(
                `SELECT * FROM orders_details`
            )
            return res.json(getAllOrdersDetails.rows)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    async getOrdersAll(req, res){
        try{
            const getAllOrders = await dataBase.query(
                `SELECT * FROM orders`
            )
            return res.json(getAllOrders.rows)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    async createOrder(req, res){
        try{
            //Делаем перенос заказов из корзины
            //Сначала получаем id и по нему обращаемся в таблицу к корзине
            const {user_id} = req.body
            const getBasketByID = await dataBase.query(
                `SELECT * FROM basket WHERE user_id = '${user_id}'`
            )
            getBasketByID.rows.forEach((row) => {
                //Сначала создаем Orders Details
                const putRowToOrderDetails = dataBase.query(
                    `INSERT INTO orders_details (user_id, product_id, count_product, datetime) values ($1, $2, $3, $4) RETURNING *`,
                    [user_id, row.product_id, row.count_product, new Date().toISOString().slice(0, 19).replace('T', ' ')]
                )
            })
            const getOrdersDetailsById = await dataBase.query(
                `SELECT * FROM orders_details WHERE user_id = '${user_id}'`
            )
            getOrdersDetailsById.rows.forEach((row) => {
                //Закидываем в таблу к Orders
                const putRowToOrder = dataBase.query(
                    `INSERT INTO orders (id_order, user_id) values ($1, $2) RETURNING *`,
                    [row.order_id, user_id]
                )
            })
            
            const deleteFromBasket = await dataBase.query(
                `DELETE FROM basket WHERE user_id = '${user_id}'`
            )
            res.json(`Order for user ${user_id} was created`)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    async deleteOrder(req, res){
        try{
            const {order_id} = req.body
            const deleteOrder = await dataBase.query(
                `DELETE FROM orders WHERE id_order = '${order_id}'`
            )
            const deleteOrderDetails = await dataBase.query(
                `DELETE FROM orders_details WHERE order_id = '${order_id}'`
            )
            res.json("Deletion of orders completed")
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    async changeProductFromOrder(req, res){
        try{
            const {order_id, product_id, count_product} = req.body
            const changeOrder = await dataBase.query(
                `UPDATE orders_details set product_id = $1, count_product = $2 WHERE order_id = $3 RETURNING *`,
                [product_id, count_product, order_id]
            )
            res.json(`Order with id = ${order_id} has changed`)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }
}

module.exports = new OrdersController()