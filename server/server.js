const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT || 8080
         /* middleware */      
         this.middlewares()
        /* Routes */
        this.routes()
    }

    middlewares(){
        this.app.use(express.json())
        this.app.use(morgan('dev'))
        this.app.use(express.static('public'))
        this.app.use(cors());
    }

    routes(){
        console.log('routes')
        this.app.use('/api/products', require('../routes/products'))
        this.app.use('/api/users', require('../routes/user'))
        this.app.use('/api/cart', require('../routes/carts'))
        this.app.use('/api/pay', require('../routes/pay'))

   
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('servidor en linea', this.port)
        })
    }
}

module.exports = Server