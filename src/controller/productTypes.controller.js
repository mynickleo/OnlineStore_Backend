const dataBase = require('../dataBase')

class ProductTypesController{
    async getTypes(req, res){
        try{
            const getAllTypes = await dataBase.query(
                `SELECT * FROM products_types`
            )
            return res.json(getAllTypes.rows)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    async createType(req, res){
        try{
            const {name_type} = req.body
            const requestCheckProduct = await dataBase.query(
                `SELECT * FROM products_types WHERE name_type = '${name_type}'`
            )
            if(requestCheckProduct.rowCount > 0){
                return res.status(400).json({message: "This product types already exists"})
            }

            const newType = await dataBase.query(
                `INSERT INTO products_types (name_type) values($1) RETURNING *`,
                [name_type]
            )
            return res.json('Product type has been created')
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    async changeType(req, res){
        try{
            const {id_type, newNameType} = req.body
            const changeProdType = await dataBase.query(
                `UPDATE products_types set name_type = $1 WHERE id_type = $2 RETURNING *`,
                [newNameType, id_type]
            )
            return res.json(changeProdType.rows[0])
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    async deleteType(req, res){
        try{
            const {id_type} = req.body
            const deleteProdType = await dataBase.query(
                `DELETE FROM products_types WHERE id_type = '${id_type}'`
            )
            res.json("Types has been removed")
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }
}

module.exports = new ProductTypesController()