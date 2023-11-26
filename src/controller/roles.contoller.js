const dataBase = require('../dataBase.js');

class RolesController {
    async setRole(req, res){
        try{
            const {id_user, role} = req.body; 
            const requestCheckUser = await dataBase.query(
                `SELECT * FROM roles WHERE user_id = '${id_user}'`
            )
            if(requestCheckUser.rowCount > 0){
                const updateUser = await dataBase.query(
                    `UPDATE roles set role = $1 WHERE user_id = $2 RETURNING *`,
                    [role, id_user]
                )
                return res.json(updateUser)
            }
            else{
                const setUser = await dataBase.query(
                    `INSERT INTO roles (user_id, role) values ($1, $2) RETURNING *`,
                    [id_user, role]
                )
                return res.json(setUser)
            }
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    async deleteUserRole(req, res){
        try{
            const id_user = req.params.id
            const deleteRole = await dataBase.query(
                `DELETE FROM roles WHERE user_id = '${id_user}'`
            )
            return res.json(deleteRole.rows[0])
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    async getRoles(req, res){
        try{
            const users = await dataBase.query(`SELECT * FROM roles`);
            res.json(users.rows)
        }
        catch (error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    async getOneRole(req, res){
        try{
            const id = req.params.id
            const users = await dataBase.query(`SELECT * FROM roles WHERE user_id = '${id}'`);
            res.json(users.rows[0])
        }
        catch (error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }
}

module.exports = new RolesController()