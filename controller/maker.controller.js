const dataBase = require('../dataBase')

class MakerController{
    async getMakers(req, res){
        try{
            const getAllMakers = await dataBase.query(
                `SELECT * FROM maker_info`
            )
            return res.json(getAllMakers.rows)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    async createMaker(req, res){
        try{
            const {name_maker} = req.body
            const requestCheck = await dataBase.query(
                `SELECT * FROM maker_info WHERE name_maker = '${name_maker}'`
            )
            if(requestCheck.rowCount > 0){
                return res.status(400).json({message: "This maker already exists"})
            }

            const newMaker = await dataBase.query(
                `INSERT INTO maker_info (name_maker) values($1) RETURNING *`,
                [name_maker]
            )
            return res.json('Maker was created')
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    async changeMaker(req, res){
        try{
            const {id_maker, name_maker} = req.body
            const changeMaker = await dataBase.query(
                `UPDATE maker_info set name_maker = $1 WHERE id_maker = $2 RETURNING *`,
                [name_maker, id_maker]
            )
            return res.json(changeMaker.rows[0])
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    async deleteMaker(req, res){
        try{
            const {name_maker} = req.body
            const deleteMaker = await dataBase.query(
                `DELETE FROM maker_info WHERE name_maker = '${name_maker}'`
            )
            res.json("Maker was removed")
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }
}

module.exports = new MakerController()