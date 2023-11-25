const dataBase = require('../dataBase.js')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {secretKey} = require('../config.js')

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secretKey, {expiresIn: '24h'})
}

class UserController {
    async registerUser(req, res){
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message: 'Errors registration', errors}) 
            }
            const {name, surname, email, password} = req.body;

            const requestCheckUser = await dataBase.query(
                `SELECT * FROM users WHERE email = '${email}'`
            )
            if(requestCheckUser.rowCount > 0){
                return res.status(400).json({message: 'User with this email already exists'})
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const newUser = await dataBase.query(
            `INSERT INTO users (name, surname, email, password) values ($1, $2, $3, $4) RETURNING *`,
            [name, surname, email, hashPassword]);

            const setUserRole = await dataBase.query(
                `INSERT INTO roles (user_id, role) values ($1, $2) RETURNING *`,
                [newUser.rows[0].id, "USER"]
                //[newUser.rows[0].id, "ADMIN"] //-- Поменяйте, если нужен админ
            )
            return res.json(`The user with id = ${newUser.rows[0].id} has been successfully registered`);
        }
        catch (error){
            console.log(error);
            res.status(400).json({message: 'Registration error'})
        }
    }

    async loginUser(req, res){
        try{
            const {email, password} = req.body;
            const user = await dataBase.query(
                `SELECT * FROM users WHERE email = '${email}'`
            )
            const validPassword = bcrypt.compareSync(password, user.rows[0].password);
            if(!validPassword){
                return res.status(400).json({message: 'Invalid password'})
            }
            const userRole = await dataBase.query(
                `SELECT * FROM roles WHERE user_id = '${user.rows[0].id}'`
            )
            const token = generateAccessToken(user.rows[0].id, userRole.rows[0].role)
            return res.json({token})
        }
        catch(error){
            console.log(error);
            res.status(400).json({message: 'Login error'})
        }
    }

    async deleteUser(req, res){
        //При удалении пользователя стоит предусмотреть удаление корзины и заказов (хотя последнее в реальном проекте под вопросом - мало ли, баг какой-нибудь, товары-то он заказал :D)
        try{
            const {id} = req.body
            const deleteUser = await dataBase.query(
                `DELETE FROM users WHERE id = '${id}'`
            )
            return res.json(`User with id = ${id} was deleted`)
        }
        catch(error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    //Для тестов --->
    async getUsers(req, res){
        try{
            const users = await dataBase.query(`SELECT * FROM users`);
            res.json(users.rows)
        }
        catch (error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }

    async getOneUser(req, res){
        try{
            const id = req.params.id
            const users = await dataBase.query(`SELECT * FROM users WHERE id = '${id}'`);
            res.json(users.rows[0])
        }
        catch (error){
            console.log(error)
            return res.status(400).json({message: 'Something was wrong...'})
        }
    }
    //<---
}

module.exports = new UserController()