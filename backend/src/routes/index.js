const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const CategoryRouter = require('./CategoryRouter')
const OrderRouter = require('./OrderRouter')

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProductRouter)
    app.use('/api/category', CategoryRouter)
    app.use('/api/order', OrderRouter)
}

module.exports = routes