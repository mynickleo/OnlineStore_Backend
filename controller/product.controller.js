const dataBase = require('../dataBase')

class ProductController {
    async getProducts(req, res){
        try{
            const getAllProducts = await dataBase.query(
                `SELECT * FROM products`
            )
            return res.json(getAllProducts.rows)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    async getProductById(req, res){
        try{
            const product_id = req.params.id
            const getProduct = await dataBase.query(
                `SELECT * FROM products WHERE id_product = '${product_id}'`
            )
            return res.json(getProduct.rows[0])
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    async createProduct(req, res){
        try{
            const {name_product, maker_id, type_id, price} = req.body
            const requestCheckProduct = await dataBase.query(
                `SELECT * FROM products WHERE name_product = '${name_product}'`
            )
            if(requestCheckProduct.rowCount > 0){
                return res.status(400).json({message: "Product with this name already exists"})
            }
            
            const newProduct = await dataBase.query(
                `INSERT INTO products (name_product, maker_id, type_id, price) values($1, $2, $3, $4) RETURNING *`,
                [name_product, maker_id, type_id, price]
            )
            return res.json('Product has been created')
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    async changeProduct(req, res){
        try{
            const {id_product, name_product, maker_id, type_id, price} = req.body
            const updateProduct = await dataBase.query(
                `UPDATE products set name_product = $2, maker_id = $3, type_id = $4, price = $5 where id_product = $1 RETURNING *`,
                [id_product, name_product, maker_id, type_id, price]
            )
            return res.json(updateProduct.rows[0])
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    async deleteProduct(req, res){
        try{
            const {name_product} = req.body
            const deleteProd = await dataBase.query(
                `DELETE FROM products WHERE name_product = '${name_product}'`
            )
            res.json("Product has been removed")
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }
}

module.exports = new ProductController()