const dataBase = require('../dataBase')

class BasketController {
    async putProductToBasket(req, res){
        try{
            const {user_id, product_id, count_product} = req.body
            const requestCheckProductInBasket = await dataBase.query(
                `SELECT * FROM basket WHERE user_id = $1 AND product_id = $2`,
                [user_id, product_id]
            )
            if(requestCheckProductInBasket.rowCount > 0){
                const increaseCount = await dataBase.query(
                    `UPDATE basket set count = count+1 WHERE user_id = $1 AND product_id = $2`,
                    [user_id, product_id]
                )
                return res.json(increaseCount.rows[0])
            }
            else{
                const putProduct = await dataBase.query(
                    `INSERT INTO basket (user_id, product_id, count_product) values ($1, $2, $3) RETURNING *`,
                    [user_id, product_id, count_product]
                )
                return res.json('The product was put in the basket')
            }
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    async deleteProductFromBasket(req, res){
        try{
            const {user_id, product_id} = req.body
            const deleteProduct = await dataBase.query(
                `DELETE FROM basket WHERE user_id = $1 AND product_id = $2`,
                [user_id, product_id]
            )
            return res.json(deleteProduct.rows)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    async getBasketById(req, res){
        try{
            const user_id = req.params.id
            const getBasket = await dataBase.query(
                `SELECT * FROM basket WHERE user_id = '${user_id}'`
            )
            return res.json(getBasket.rows[0])
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }
}

module.exports = new BasketController()