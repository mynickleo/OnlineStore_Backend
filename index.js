require('dotenv').config()
const express = require('express')

//Импорт роутеров
const userRouter = require('./routes/user.routes')
const rolesRouter = require('./routes/roles.router') 
const productRouter = require('./routes/product.router') 
const productTypesRouter = require('./routes/productTypes.router') 
const makersRouter = require('./routes/maker.routes')
const basketRouter = require('./routes/basket.router')
const ordersRouter = require('./routes/order.router')

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use('/', userRouter)
app.use('/', rolesRouter)
app.use('/', productRouter)
app.use('/', productTypesRouter)
app.use('/', makersRouter)
app.use('/', basketRouter)
app.use('/', ordersRouter)
const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    }
    catch (error){
        console.log(error)
    }
}

start();